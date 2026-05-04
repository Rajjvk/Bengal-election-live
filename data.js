// Election Data Collection
// This file collects data from various sources and provides it to the dashboard

const electionData = {
    // Election metadata
    electionDate: '2026-05-04',
    state: 'West Bengal',
    totalSeats: 294,
    
    // Data sources for information collection
    dataSources: [
        {
            name: 'Election Commission of India (ECI)',
            url: 'https://www.eci.gov.in/',
            type: 'Official Government Source'
        },
        {
            name: 'West Bengal Election Commission',
            url: 'https://wbsec.gov.in/',
            type: 'State Election Authority'
        }
    ],
    
    // Party data with seat information
    // This is sample data - replace with actual election results as they come in
    parties: [
        {
            name: 'AITC',
            fullName: 'All India Trinamool Congress',
            seats: 98,
            color: '#2dd4bf',
            status: 'leading'
        },
        {
            name: 'BJP',
            fullName: 'Bharatiya Janata Party',
            seats: 87,
            color: '#f97316',
            status: 'leading'
        },
        {
            name: 'CPI(M)',
            fullName: 'Communist Party of India (Marxist)',
            seats: 45,
            color: '#dc2626',
            status: 'trailing'
        },
        {
            name: 'INC',
            fullName: 'Indian National Congress',
            seats: 28,
            color: '#3b82f6',
            status: 'trailing'
        },
        {
            name: 'Others',
            fullName: 'Other Parties & Independents',
            seats: 36,
            color: '#6b7280',
            status: 'contesting'
        }
    ],
    
    // Function to get seats won by a party
    getSeatsByParty: function(partyName) {
        const party = this.parties.find(p => p.name === partyName);
        return party ? party.seats : 0;
    },
    
    // Function to calculate total contested seats
    getTotalContested: function() {
        return this.parties.reduce((sum, party) => sum + party.seats, 0);
    },
    
    // Function to calculate percentage
    getPercentage: function(seats) {
        return ((seats / this.totalSeats) * 100).toFixed(2);
    },
    
    // Function to update party results (for live updates)
    updatePartySeats: function(partyName, seats) {
        const party = this.parties.find(p => p.name === partyName);
        if (party) {
            party.seats = seats;
        }
    },
    
    // Function to get timestamp
    getTimestamp: function() {
        const now = new Date();
        return now.toLocaleString('en-IN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }
};

// Function to fetch real-time data from APIs (when available)
async function fetchRealTimeData() {
    try {
        // Placeholder for API calls to fetch real election data
        // Example: fetch from ECI or news APIs
        console.log('Fetching real-time election data...');
        
        // This would be replaced with actual API calls
        // const response = await fetch('https://api.example.com/election/2026/wb');
        // const data = await response.json();
        // return data;
        
        return electionData;
    } catch (error) {
        console.error('Error fetching real-time data:', error);
        return electionData;
    }
}

// Function to update data periodically (for live dashboard)
function startLiveUpdates() {
    // Update data every 30 seconds during election counting
    setInterval(async () => {
        const data = await fetchRealTimeData();
        // Update UI with new data
        console.log('Data refreshed at:', new Date().toLocaleTimeString());
    }, 30000); // 30 seconds
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { electionData, fetchRealTimeData, startLiveUpdates };
}
