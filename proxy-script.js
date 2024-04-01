// Funktion zum Ausführen einer Proxy-Anfrage im Browser
async function makeProxyRequest(url) {
  try {
    const response = await fetch(url); // Fetch-API verwenden, um die Anfrage zu senden
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.text(); // Response-Text abrufen
    console.log('Response data:', responseData); // Ausgabe des Response-Texts zur Überprüfung
    return responseData; // Die Daten zurückgeben
  } catch (error) {
    console.error('Proxy request failed:', error);
    throw error; // Fehler weiterleiten
  }
}
