from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def index():
    # Hier können wir die EPG-Daten von main.py abrufen
    epg_data = requests.get('http://localhost:5000/epg').text
    return render_template('index.html', epg_data=epg_data)

if __name__ == '__main__':
    app.run(debug=True)
