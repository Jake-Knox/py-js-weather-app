from flask import Flask, render_template, request
import requests

from config import API_KEY #importing my API KEY (gitignored)

app = Flask(__name__)

# API_KEY = ''
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

def get_weather(city):
    url = f'{BASE_URL}?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    data = response.json()
    return data

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/weather", methods=['POST'])
def weather():
    city = request.form['city']
    weather_data = get_weather(city)
    temperature = weather_data['main']['temp']
    description = weather_data['weather'][0]['description']
    return render_template('weather.html', temperature=temperature, description=description)

if __name__ == '__main__':
    app.run()
