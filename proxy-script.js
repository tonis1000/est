const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Middleware für CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Hier können Sie die erlaubten Ursprünge spezifizieren
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpunkt für Proxy-Anfragen
app.get('/proxy', async (req, res) => {
  try {
    // Hier wird die Anfrage an den externen Server gesendet
    const response = await axios.get(req.query.url); // Die URL wird als Query-Parameter übergeben
    res.json(response.data); // Die Daten werden an den Client zurückgesendet
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Starten Sie den Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
