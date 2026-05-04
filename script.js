// Main Dashboard Script
// Handles chart rendering, UI updates, and interactivity

let chartInstance = null;

// Initialize dashboard on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    updateTimestamp();
    startLiveUpdates();
});

// Initialize the dashboard
function initializeDashboard() {
    renderPieChart();
    renderStatsPanel();
    renderResultsTable();
    renderDataSources();
}

// Update timestamp every second
function updateTimestamp() {
    setInterval(() => {
        const timestamp = electionData.getTimestamp();
        document.getElementById('timestamp').textContent = timestamp;
    }, 1000);
}

// Render pie chart using Chart.js
function renderPieChart() {
    const ctx = document.getElementById('seatChart').getContext('2d');
    
    const labels = electionData.parties.map(p => p.name);
    const data = electionData.parties.map(p => p.seats);
    const colors = electionData.parties.map(p => p.color);
    
    chartInstance = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: colors,
                borderColor: '#ffffff',
                borderWidth: 3,
                hoverOffset: 10,
                hoverBorderWidth: 5,
                hoverBorderColor: '#333'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        color: '#1f2937',
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    padding: 15,
                    titleFont: {
                        size: 14,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: 13
                    },
                    callbacks: {
                        label: function(context) {
                            const party = electionData.parties[context.dataIndex];
                            const percentage = electionData.getPercentage(party.seats);
                            return [
                                party.fullName,
                                `Seats: ${party.seats}`,
                                `Percentage: ${percentage}%`
                            ];
                        }
                    }
                }
            }
        }
    });
}

// Render statistics panel
function renderStatsPanel() {
    const statsList = document.getElementById('statsList');
    statsList.innerHTML = '';
    
    electionData.parties.forEach(party => {
        const percentage = electionData.getPercentage(party.seats);
        const statItem = document.createElement('div');
        statItem.className = 'stat-item';
        statItem.innerHTML = `
            <div class="stat-item-info">
                <div class="stat-color-box" style="background-color: ${party.color};"></div>
                <span class="stat-item-name">${party.fullName}</span>
            </div>
            <div>
                <span class="stat-item-value">${party.seats}</span>
                <span class="stat-item-percentage">(${percentage}%)</span>
            </div>
        `;
        statsList.appendChild(statItem);
    });
}

// Render results table
function renderResultsTable() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    electionData.parties.forEach(party => {
        const percentage = electionData.getPercentage(party.seats);
        let statusClass = 'status-' + party.status;
        let statusText = party.status.charAt(0).toUpperCase() + party.status.slice(1);
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <strong>${party.fullName}</strong>
                <br><small style="color: #6b7280;">${party.name}</small>
            </td>
            <td><strong>${party.seats}</strong></td>
            <td>${percentage}%</td>
            <td><span class="status-badge ${statusClass}">${statusText}</span></td>
        `;
        tableBody.appendChild(row);
    });
}

// Render data sources
function renderDataSources() {
    const sourcesList = document.getElementById('sourcesList');
    sourcesList.innerHTML = '';
    
    electionData.dataSources.forEach(source => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${source.name}</strong> - ${source.type}
            <br><small><a href="${source.url}" target="_blank" rel="noopener noreferrer">${source.url}</a></small>
        `;
        sourcesList.appendChild(li);
    });
}

// Live update function
function startLiveUpdates() {
    // Update every 30 seconds during election hours (8 AM to 6 PM)
    const updateInterval = setInterval(async () => {
        const now = new Date();
        const hours = now.getHours();
        
        // Only update during election hours
        if (hours >= 8 && hours < 18) {
            try {
                // Call to fetch real-time data
                await fetchRealTimeData();
                
                // Refresh all visualizations
                refreshDashboard();
                
                console.log('Dashboard updated at', now.toLocaleTimeString());
            } catch (error) {
                console.error('Error updating dashboard:', error);
            }
        }
    }, 30000); // Update every 30 seconds
    
    return updateInterval;
}

// Refresh all dashboard components
function refreshDashboard() {
    // Destroy and recreate chart
    if (chartInstance) {
        chartInstance.destroy();
    }
    
    // Re-render all components
    renderPieChart();
    renderStatsPanel();
    renderResultsTable();
    
    console.log('Dashboard refreshed');
}

// Update specific party seats (for manual updates)
function updatePartySeat(partyName, newSeats) {
    electionData.updatePartySeats(partyName, newSeats);
    refreshDashboard();
    console.log(`Updated ${partyName} to ${newSeats} seats`);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initializeDashboard, 
        updatePartySeat, 
        refreshDashboard,
        renderPieChart
    };
}