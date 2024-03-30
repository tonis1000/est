// main.js

// Dein bestehender Code hier...

// Beispiel Testanfrage an den Proxy
var proxyURL = 'https://github.com/tonis1000/atonis/blob/master/proxy.php?url=';
var testURL = 'https://tonis1000.github.io/atonis/'; // Beispiel-URL zum Testen
fetch(proxyURL + encodeURIComponent(testURL))
    .then(response => {
        if (response.ok) {
            console.log('Der Proxy funktioniert.');
        } else {
            console.error('Der Proxy funktioniert nicht. Statuscode:', response.status);
        }
    })
    .catch(error => {
        console.error('Fehler beim Testen des Proxys:', error);
    });
