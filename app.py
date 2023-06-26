from flask import Flask, jsonify, render_template, request
import requests
from config import API_KEY
app = Flask(__name__)

# Route to fetch API locations
@app.route('/api/locations')
def get_api_locations():
    # Make a request to the OpenWeatherMap API to fetch the locations
    url = f'http://api.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid={API_KEY}'
    response = requests.get(url)
    
    if response.status_code == 200:
        locations = response.json()
        return jsonify(locations=locations)
    else:
        return jsonify(error='Error fetching API locations'), 500

# Route to fetch weather data for a specific location
@app.route('/api/weather')
def get_weather_data():
    location = request.args.get('location')

    # Make API call to retrieve weather data for the location
    # Replace this with your actual code to fetch weather data using the OpenWeatherMap API

    # Example response data
    weather_data = {
        'temperature': 25,
        'description': 'Sunny',
    }

    return jsonify(weather_data)


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()
