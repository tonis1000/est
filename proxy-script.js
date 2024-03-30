// Funktion zum Ausführen einer Proxy-Anfrage im Browser
async function makeProxyRequest(url) {
  try {
    // Hier wird die Anfrage an den externen Server gesendet
    const response = await fetch(url); // Fetch-API verwenden, um die Anfrage zu senden
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Die Daten als JSON zurückgeben
  } catch (error) {
    console.error('Proxy request failed:', error);
    throw error; // Fehler weiterleiten
  }
}

// Beispielaufruf der Proxy-Funktion
const proxyURL = 'https://raw.githubusercontent.com/tonis1000/atonis/master/proxy.php';
makeProxyRequest(proxyURL)
  .then(data => {
    console.log('Proxy response:', data);
    // Hier kannst du die erhaltenen Daten verarbeiten
  })
  .catch(error => {
    console.error('Proxy request failed:', error);
  });
