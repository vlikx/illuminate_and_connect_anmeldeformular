// EmailJS History Exporter (CommonJS)
// Usage: node export_emailjs_history.cjs
// Required: EMAILJS_API_KEY, EMAILJS_SERVICE_ID, EMAILJS_USER_ID environment variables

const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');

const API_KEY = process.env.EMAILJS_API_KEY;
const SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const USER_ID = process.env.EMAILJS_USER_ID;
const API_URL = `https://api.emailjs.com/api/v1.1/history`;

if (!API_KEY) {
  console.error('Please set EMAILJS_API_KEY as environment variable.');
  process.exit(1);
}
if (!SERVICE_ID) {
  console.error('Please set EMAILJS_SERVICE_ID as environment variable.');
  process.exit(1);
}
if (!USER_ID) {
  console.error('Please set EMAILJS_USER_ID as environment variable.');
  process.exit(1);
}

async function fetchHistory() {
  try {
    const response = await axios.get(API_URL, {
      params: {
        user_id: API_KEY, // Public Key
        accessToken: USER_ID, // Private Key
        page: 1,
        count: 100
      }
    });
    // API returns { is_last_page, rows: [...] }
    return response.data.rows;
  } catch (error) {
    console.error('Error fetching history:', error.response?.data || error.message);
    process.exit(1);
  }
}

async function exportToCSV() {
  const history = await fetchHistory();
  if (!history || !Array.isArray(history)) {
    console.error('No history data found.');
    return;
  }
  // Parse template_params JSON and extract only relevant fields
  const rows = history.map(item => {
    let params = {};
    try {
      params = item.template_params ? JSON.parse(item.template_params) : {};
    } catch (e) {
      params = {};
    }
    return {
      vorname: params.vorname || '',
      nachname: params.nachname || '',
      email: params.email || '',
      rolle: params.rolle || '',
      nachricht: params.nachricht || '',
      datenschutz: params.datenschutz || '',
      verarbeitung: params.verarbeitung || '',
      date: item.updated || '',
    };
  });
  const parser = new Parser({ fields: [
    'vorname', 'nachname', 'email', 'rolle', 'nachricht', 'datenschutz', 'verarbeitung', 'date'
  ] });
  const csv = parser.parse(rows);
  fs.writeFileSync('emailjs_history.csv', csv);
  console.log('Exported to emailjs_history.csv');
}

exportToCSV();
