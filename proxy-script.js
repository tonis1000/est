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

// Proxy-URL relativ zum aktuellen Verzeichnis
const proxyURL = 'proxy.php'; // Annahme: Der Proxy befindet sich im selben Verzeichnis wie Ihre Webseite

// Beispielaufruf der Proxy-Funktion für eine HTTP-Quelle
const httpURL = 'http://example.com/some/resource'; // Beispiel-HTTP-URL
makeProxyRequest(proxyURL + '?url=' + encodeURIComponent(httpURL))
  .then(data => {
    console.log('Proxy response:', data);
    // Hier kannst du die erhaltenen Daten verarbeiten
  })
  .catch(error => {
    console.error('Proxy request failed:', error);
  });
