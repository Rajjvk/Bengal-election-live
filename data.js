// Election Data Collection with Live ECI Web Scraping
// Fetches real-time data from https://results.eci.gov.in/

const electionData = {
    // Election metadata
    electionDate: '2026-05-04',
    state: 'West Bengal',
    stateCode: 'S25', // West Bengal code for ECI URL
    totalSeats: 294,
    
    // Data sources for information collection
    dataSources: [
        {
            name: 'Election Commission of India (ECI)',
            url: 'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm',
            type: 'Official Government Source'
        },
        {
            name: 'West Bengal Election Commission',
            url: 'https://wbsec.gov.in/',
            type: 'State Election Authority'
        }
    ],
    
    // Party data with seat information
    // This data will be updated in real-time from ECI
    parties: [
        {
            name: 'BJP',
            fullName: 'Bharatiya Janata Party',
            seats: 178,
            color: '#f97316',
            status: 'leading'
        },
        {
            name: 'AITC',
            fullName: 'All India Trinamool Congress',
            seats: 92,
            color: '#2dd4bf',
            status: 'trailing'
        },
        {
            name: 'AJUP',
            fullName: 'All India Majlis-E-Ittehadul Muslimeen',
            seats: 2,
            color: '#8b5cf6',
            status: 'trailing'
        },
        {
            name: 'BGPM',
            fullName: 'Bolo Gram Panchayat Movement',
            seats: 1,
            color: '#06b6d4',
            status: 'trailing'
        },
        {
            name: 'CPI(M)',
            fullName: 'Communist Party of India (Marxist)',
            seats: 1,
            color: '#dc2626',
            status: 'trailing'
        },
        {
            name: 'AISF',
            fullName: 'All India Students Federation',
            seats: 1,
            color: '#ec4899',
            status: 'trailing'
        },
        {
            name: 'Others',
            fullName: 'Other Parties & Independents',
            seats: 19,
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
    
    // Function to update party results
    updatePartySeats: function(partyName, seats) {
        const party = this.parties.find(p => p.name === partyName);
        if (party) {
            party.seats = seats;
            // Update status based on seats
            if (seats > 147) {
                party.status = 'leading';
            } else {
                party.status = 'trailing';
            }
        }
    },
    
    // Function to update multiple parties at once
    updateMultipleParties: function(updatedParties) {
        updatedParties.forEach(updated => {
            this.updatePartySeats(updated.name, updated.seats);
        });
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

// Function to fetch and parse ECI results
async function fetchECIResults() {
    try {
        console.log('🔄 Fetching live results from ECI...');
        
        const eciUrl = 'https://results.eci.gov.in/ResultAcGenMay2026/partywiseresult-S25.htm';
        
        // Use CORS proxy for browser compatibility
        const corsProxy = 'https://corsproxy.io/?';
        const proxyUrl = corsProxy + encodeURIComponent(eciUrl);
        
        const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const html = await response.text();
        console.log('✅ HTML received from ECI');
        
        // Parse the HTML
        const results = parseECIHTML(html);
        
        if (results && results.length > 0) {
            console.log('📊 Parsed results:', results);
            return results;
        }
        
        console.warn('⚠️ No results found in HTML');
        return null;
        
    } catch (error) {
        console.error('❌ Error fetching ECI results:', error.message);
        return null;
    }
}

// Parse ECI HTML response
function parseECIHTML(html) {
    try {
        console.log('🔍 Parsing ECI HTML...');
        
        // Create a temporary DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Find the results table
        const tables = doc.querySelectorAll('table');
        console.log(`Found ${tables.length} tables`);
        
        let results = [];
        
        // Look for party-wise results table
        tables.forEach((table, tableIndex) => {
            const rows = table.querySelectorAll('tr');
            console.log(`Table ${tableIndex}: ${rows.length} rows`);
            
            rows.forEach((row, rowIndex) => {
                const cells = row.querySelectorAll('td');
                if (cells.length >= 2) {
                    const partyName = cells[0]?.textContent?.trim() || '';
                    const seatsText = cells[1]?.textContent?.trim() || '';
                    
                    // Extract number from seats cell
                    const seats = parseInt(seatsText) || 0;
                    
                    // Filter valid parties
                    if (partyName && seats > 0) {
                        console.log(`📍 Found: ${partyName} - ${seats} seats`);
                        results.push({
                            name: partyName,
                            seats: seats
                        });
                    }
                }
            });
        });
        
        return results.length > 0 ? results : null;
        
    } catch (error) {
        console.error('Error parsing HTML:', error);
        return null;
    }
}

// Main function to fetch real-time data
async function fetchRealTimeData() {
    try {
        console.log('🚀 Starting real-time data fetch cycle...');
        
        // Fetch from ECI
        const eciResults = await fetchECIResults();
        
        if (eciResults && eciResults.length > 0) {
            console.log('✅ Got live data from ECI, updating dashboard...');
            
            // Match party abbreviations and update
            eciResults.forEach(result => {
                const partyName = normalizePartyName(result.name);
                if (partyName) {
                    electionData.updatePartySeats(partyName, result.seats);
                }
            });
            
            console.log('✅ Dashboard updated with live ECI data');
            return electionData;
        }
        
        console.warn('⚠️ Could not fetch live data, using cached data');
        return electionData;
        
    } catch (error) {
        console.error('❌ Error in fetchRealTimeData:', error);
        return electionData;
    }
}

// Normalize party names from ECI format
function normalizePartyName(eciName) {
    const nameMap = {
        'BJP': 'BJP',
        'BHARATIYA JANATA PARTY': 'BJP',
        'AITC': 'AITC',
        'ALL INDIA TRINAMOOL CONGRESS': 'AITC',
        'CPIM': 'CPI(M)',
        'CPI(M)': 'CPI(M)',
        'COMMUNIST PARTY OF INDIA (MARXIST)': 'CPI(M)',
        'AJUP': 'AJUP',
        'AIMIM': 'AJUP',
        'BGPM': 'BGPM',
        'AISF': 'AISF'
    };
    
    const normalized = eciName.toUpperCase().trim();
    return nameMap[normalized] || null;
}

// Function to start continuous live updates
function startLiveUpdates() {
    console.log('🎯 Starting continuous live election updates from ECI...');
    console.log('⏱️ Updates every 10 seconds');
    
    // Initial fetch
    fetchRealTimeData();
    
    // Update every 10 seconds
    setInterval(async () => {
        try {
            await fetchRealTimeData();
            const now = new Date();
            console.log(`⏱️ Live data cycle completed at ${now.toLocaleTimeString()}`);
        } catch (error) {
            console.error('Error in live update cycle:', error);
        }
    }, 10000); // 10 seconds
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        electionData, 
        fetchRealTimeData,
        fetchECIResults,
        parseECIHTML,
        startLiveUpdates 
    };
}
