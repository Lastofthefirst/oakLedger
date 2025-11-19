# Invoice Generator PWA

A modern, mobile-friendly Progressive Web App for creating professional invoices. Works offline and provides a simple, low-burden user experience.

## Features

- **Progressive Web App**: Installable on any device, works offline
- **Mobile-Optimized**: Responsive design that works great on phones and tablets
- **Modern Dark UI**: Beautiful interface inspired by modern design principles
- **Letterhead Support**: Upload your company logo/letterhead (persisted locally)
- **Smart Invoice Numbering**: Auto-incrementing invoice numbers with padded zeros (e.g., INV-001, INV-045)
- **Optional Fields**: No required fields - only show what you need in the PDF
- **Local Storage**: Your business info and letterhead are saved for reuse
- **PDF Export**: Generate professional PDFs with jsPDF
- **Zero Backend**: Everything runs in the browser, no server needed

## How to Use

### Installation

1. **Local Testing**:
   - Serve the files with any HTTP server (service workers require HTTPS or localhost)
   - Example with Python: `python3 -m http.server 8000`
   - Open `http://localhost:8000` in your browser

2. **Deploy**:
   - Upload to any static hosting service (GitHub Pages, Netlify, Vercel, etc.)
   - The app will be installable as a PWA on HTTPS

3. **Install as App**:
   - On mobile: Open in browser and tap "Add to Home Screen"
   - On desktop: Click the install icon in the address bar

### Invoice Numbering

The app uses smart invoice number tracking:

- **Auto-increment**: Leave blank to use the next number (e.g., INV-001, INV-002)
- **Custom numbers**: Enter any number (e.g., "45" becomes "INV-045")
- **Smart tracking**: Next invoice increments from last used (45 → 46, 75 → 76)
- **Padded zeros**: Numbers are always 3 digits minimum (001, 045, 100)

### Letterhead

1. Click the upload area at the top to select your logo/letterhead
2. Image is stored locally and appears on:
   - The header of the web app
   - All generated PDF invoices
3. Click the letterhead image to change it anytime
4. Maximum size: 2MB

### Creating an Invoice

1. **Business Details** (saved for reuse):
   - Enter your business name, your name, and phone number
   - These are automatically saved to localStorage

2. **Invoice Details**:
   - Invoice number: Auto-generated or enter your own
   - Client information
   - Dates (invoice date and optional end date)
   - Services provided
   - Fee amount
   - Optional notes

3. **Generate PDF**:
   - Click "Preview" to see how it will look
   - Click "Create PDF" to download
   - Invoice number auto-increments for next time

### Optional Fields

All fields are optional! The PDF will only include sections with data:
- No business info? No "FROM" section
- No client address? No address shown
- No notes? No notes section
- Empty fields don't clutter the invoice

## Technical Details

### Files

- `index.html` - Main application file with UI and logic
- `manifest.json` - PWA configuration
- `service-worker.js` - Offline caching and PWA functionality

### Storage

All data is stored in browser localStorage:
- Business name, your name, phone number
- Letterhead image (base64 encoded)
- Last invoice number used

### Dependencies

- **Tailwind CSS**: Loaded from CDN for styling
- **jsPDF**: Loaded from CDN for PDF generation

Both libraries are cached by the service worker for offline use.

## Browser Support

Works in all modern browsers that support:
- Service Workers
- localStorage
- ES6 JavaScript
- HTML5 File API

Tested on:
- Chrome/Edge (desktop and mobile)
- Safari (iOS and macOS)
- Firefox

## Privacy

- All data is stored locally in your browser
- No data is sent to any server
- No tracking or analytics
- Your invoices and business info never leave your device

## Development

To modify or extend:

1. Edit `index.html` for UI and functionality changes
2. Edit `manifest.json` for PWA settings (name, colors, icons)
3. Edit `service-worker.js` for offline caching strategy
4. Update `CACHE_NAME` in service worker when making changes

## License

Free to use and modify for personal or commercial purposes.
