// Funktion zum Ausführen einer Proxy-Anfrage im Browser
async function makeProxyRequest(url) {
  try {
    // Hier wird die Anfrage an den externen Server gesendet
    const response = await fetch(url); // Fetch-API verwenden, um die Anfrage zu senden
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.text(); // Response-Text abrufen
    console.log('Response data:', responseData); // Ausgabe des Response-Texts zur Überprüfung
    return JSON.parse(responseData); // Die Daten als JSON zurückgeben
  } catch (error) {
    console.error('Proxy request failed:', error);
    throw error; // Fehler weiterleiten
  }
}

