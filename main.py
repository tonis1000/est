import requests
import xml.etree.ElementTree as ET
from xml.sax.saxutils import escape
from datetime import datetime
import pytz
import codecs

# Funktion zum Löschen des Inhalts der Ausgabedatei und Hinzufügen von Text
def append(text):
    with codecs.open("epg-tmp.xml", "w", "utf-8") as f:
        f.write(text + '\n')

# Funktion zum Generieren der Kanalübersicht und Programmzeiten
def generate_epg(xml_data):
    root = ET.fromstring(xml_data)

    # Iteriere durch jeden Kanal
    for channel in root.findall('channel'):
        channel_id = channel.attrib.get('id')
        channel_icon = None
        for icon in channel.findall('icon'):
            channel_icon = icon.attrib.get('src')

        # Informationen über den Kanal hinzufügen
        push(channel_id, channel_icon, channel.findall('programme'))

# Funktion zum Hinzufügen eines Kanals und seiner Programme zur Ausgabedatei
def push(channel_id, icon, programs):
    append('<channel id="{}">'.format(channel_id))
    append('<display-name>{}</display-name>'.format(escape(channel_id)))
    if icon:
        append('<icon src="{}"/>'.format(escape(icon)))
    append('</channel>')

    # Iteriere durch jedes Programm des Kanals
    for program in programs:
        start = datetime.strptime(program.attrib['start'], "%Y%m%d%H%M%S %z").strftime('%Y%m%d%H%M%S %z')

        stop = ''
        if 'stop' in program.attrib:
            stop = 'stop="{}"'.format(program.attrib['stop'])

        append('<programme start="{}" {} channel="{}">'.format(start, stop, channel_id))
        append('<title lang="el">{}</title>'.format(escape(program.find('title').text)))
        append('<desc>{}</desc>'.format(escape(program.find('desc').text)))
        append('</programme>')

# Abrufen der XML-Daten von der externen URL
url = "https://github.com/GreekTVApp/epg-greece-cyprus/releases/download/EPG/epg.xml"
response = requests.get(url)
if response.status_code == 200:
    xml_data = response.text

    # Generiere die Kanalübersicht
    generate_epg(xml_data)

    print("EPG wurde erfolgreich generiert.")
else:
    print("Fehler beim Abrufen der XML-Daten:", response.status_code)
