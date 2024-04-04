from flask import Flask
import requests
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape
from datetime import datetime
import pytz

app = Flask(__name__)

# Funktion zum Generieren der Kanalübersicht und Programmzeiten
def generate_epg(xml_data):
    epg_output = []

    root = ET.fromstring(xml_data)

    # Iteriere durch jeden Kanal
    for channel in root.findall('channel'):
        channel_id = channel.attrib.get('id')
        channel_icon = None
        for icon in channel.findall('icon'):
            channel_icon = icon.attrib.get('src')

        channel_info = {
            'id': channel_id,
            'icon': channel_icon,
            'programs': []
        }

        # Iteriere durch jedes Programm des Kanals
        for program in channel.findall('programme'):
            program_info = {}
            start = datetime.strptime(program.attrib['start'], "%Y%m%d%H%M%S %z").strftime('%Y%m%d%H%M%S %z')

            stop = ''
            if 'stop' in program.attrib:
                stop = 'stop="{}"'.format(program.attrib['stop'])

            program_info['start'] = start
            program_info['title'] = program.find('title').text
            program_info['desc'] = program.find('desc').text

            channel_info['programs'].append(program_info)

        epg_output.append(channel_info)

    return epg_output

# Flask-Endpunkt zum Abrufen der EPG-Daten
@app.route('/epg')
def get_epg():
    url = "https://github.com/GreekTVApp/epg-greece-cyprus/releases/download/EPG/epg.xml"
    response = requests.get(url)
    if response.status_code == 200:
        xml_data = response.text

        # Generiere die Kanalübersicht
        epg_data = generate_epg(xml_data)

        return {'epg_data': epg_data}, 200
    else:
        return {'error': 'Fehler beim Abrufen der XML-Daten'}, response.status_code

if __name__ == '__main__':
    app.run(debug=True)
