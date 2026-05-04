# 2026 West Bengal Election Results - Live Dashboard

## Overview

A real-time, interactive election results dashboard for the 2026 West Bengal Assembly elections. This dashboard provides a comprehensive visualization of seat distribution across various political parties with data collected from multiple authoritative sources.

## Features

✨ **Live Pie Chart Visualization** - Real-time seat distribution for all parties  
📊 **Statistics Panel** - Detailed breakdown of party performance  
📋 **Results Table** - Comprehensive results with percentages and status indicators  
🔄 **Auto-Refresh** - Updates every 30 seconds during election hours (8 AM - 6 PM)  
📱 **Responsive Design** - Mobile-friendly interface  
🎨 **Modern UI** - Professional styling with intuitive navigation  

## Election Overview

- **State**: West Bengal
- **Total Seats**: 294
- **Election Date**: May 4, 2026
- **Status**: Live Results

## Participating Parties

1. **AITC** (All India Trinamool Congress)
2. **BJP** (Bharatiya Janata Party)
3. **CPI(M)** (Communist Party of India - Marxist)
4. **INC** (Indian National Congress)
5. **Others** (Other Parties & Independents)

## Data Sources

The dashboard aggregates election data from multiple authoritative sources:

1. **Election Commission of India (ECI)** - Official government source
   - https://www.eci.gov.in/

2. **West Bengal Election Commission** - State election authority
   - https://wbsec.gov.in/

3. **News Media** - Exit polls and preliminary results
   - NDTV: https://www.ndtv.com/
   - India Today: https://www.indiatoday.in/
   - News18: https://www.news18.com/

4. **Wikipedia** - Crowdsourced election information
   - https://en.wikipedia.org/wiki/2026_West_Bengal_Legislative_Assembly_election

## Project Structure

```
Bengal-election-live/
├── index.html          # Main dashboard HTML
├── styles.css          # Responsive styling
├── script.js           # Dashboard functionality and chart rendering
├── data.js             # Election data and API integration
├── README.md           # Documentation
└── .gitignore          # Git ignore rules
```

## Getting Started

### Prerequisites

- Web browser (Chrome, Firefox, Safari, Edge)
- Internet connection
- No server required (runs entirely on client-side)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Rajjvk/Bengal-election-live.git
cd Bengal-election-live
```

2. Open in browser:
```bash
# Option 1: Direct file opening
open index.html

# Option 2: Using Python (if available)
python -m http.server 8000
# Then visit http://localhost:8000

# Option 3: Using Node.js http-server
npx http-server
```

## File Descriptions

### index.html
Main dashboard markup with:
- Header with election information
- Pie chart container
- Statistics panel
- Results table
- Data sources section
- Footer

### styles.css
Comprehensive styling with:
- CSS variables for theme colors
- Responsive grid layout
- Mobile-first design
- Dark and light mode compatible
- Professional color scheme

### script.js
Dashboard functionality:
- Chart.js integration for pie chart
- Real-time data visualization
- UI component rendering
- Auto-refresh mechanism
- Update functions for live results

### data.js
Election data management:
- Party information and seat data
- Data source definitions
- Calculation utilities
- API integration hooks
- Live update scheduling

## Chart.js Library

This dashboard uses Chart.js for pie chart visualization:
```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

## Customization

### Updating Party Data

Edit the `parties` array in `data.js`:

```javascript
parties: [
    {
        name: 'AITC',
        fullName: 'All India Trinamool Congress',
        seats: 98,
        color: '#2dd4bf',
        status: 'leading'
    },
    // ... more parties
]
```

### Modifying Colors

Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #1e3a8a;
    --secondary-color: #3b82f6;
    /* ... more colors ... */
}
```

### Adding New Data Sources

Add sources to `dataSources` array in `data.js`:

```javascript
dataSources: [
    {
        name: 'Source Name',
        url: 'https://example.com',
        type: 'Source Type'
    }
]
```

## Live Updates

The dashboard automatically refreshes every 30 seconds during election hours (8 AM - 6 PM):

```javascript
// Edit in script.js
const updateInterval = setInterval(async () => {
    // Refresh logic here
}, 30000); // Change interval as needed
```

## API Integration

To integrate with real election data APIs:

1. Uncomment and modify the API calls in `fetchRealTimeData()` in `data.js`
2. Use official ECI APIs or news media APIs
3. Parse responses and update party seat data

Example:
```javascript
async function fetchRealTimeData() {
    const response = await fetch('https://api.eci.gov.in/results');
    const data = await response.json();
    // Process and update electionData
    return electionData;
}
```

## Browser Support

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge 90+  
✅ Mobile browsers (iOS Safari, Chrome Android)  

## Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px to 1024px
- **Mobile**: Below 768px

## Performance

- Lightweight codebase (~15KB)
- Optimized chart rendering
- Efficient DOM updates
- No external dependencies beyond Chart.js
- Fast load time

## Contributing

To contribute improvements:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add improvement'`)
5. Push to the branch (`git push origin feature/improvement`)
6. Open a Pull Request

## Deployment

### GitHub Pages

1. Push code to main branch
2. Go to repository Settings → Pages
3. Select 'main' branch as source
4. Visit `https://Rajjvk.github.io/Bengal-election-live/`

### Netlify

1. Connect GitHub repository
2. Set build command: (none required)
3. Deploy

### Vercel

1. Import GitHub repository
2. Deploy

## Troubleshooting

### Chart not displaying
- Ensure Chart.js library is loaded
- Check browser console for errors
- Verify data.js is loaded before script.js

### Data not updating
- Check browser console for API errors
- Verify data sources are accessible
- Check auto-refresh is enabled

### Responsive issues
- Clear browser cache
- Test in incognito mode
- Check viewport meta tag in HTML

## License

MIT License - Feel free to use and modify for your needs

## Contact & Support

For issues, suggestions, or contributions:
- GitHub Issues: https://github.com/Rajjvk/Bengal-election-live/issues
- Email: (Add your contact)

## Disclaimer

This dashboard is for informational purposes. For official election results, always refer to:
- Election Commission of India: https://www.eci.gov.in/
- West Bengal Election Commission: https://wbsec.gov.in/

## Changelog

### v1.0.0 (May 4, 2026)
- Initial release
- Pie chart visualization
- Statistics panel
- Results table
- Data sources tracking
- Live update functionality

---

**Last Updated**: May 4, 2026  
**Dashboard Status**: LIVE  
**Election Date**: May 4, 2026
