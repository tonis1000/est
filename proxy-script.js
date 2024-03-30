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
const proxyURL = 'https://github.com/tonis1000/atonis/blob/master/proxy.php?url=https%3A%2F%2Fraw.githubusercontent.com%2Fgluk03%2Fiptvgluk%2Fdd9409c9f9029f6444633267e3031741efedc381%2FTV.m3u';
makeProxyRequest(proxyURL)
  .then(data => {
    console.log('Proxy response:', data);
    // Hier kannst du die erhaltenen Daten verarbeiten
  })
  .catch(error => {
    console.error('Proxy request failed:', error);
  });
