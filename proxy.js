const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Erforderliches Modul hinzufügen

const app = express();

// CORS-Konfiguration
app.use(cors());

// Proxy-Endpunkt
app.get('/proxy', async (req, res) => {
  try {
    const url = req.query.url;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch URL');
    }
    const data = await response.text();
    res.send(data);
  } catch (error) {
    console.error('Proxy request failed:', error);
    res.status(500).json({ error: 'Proxy request failed' });
  }
});

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
