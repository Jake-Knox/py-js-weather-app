from flask import Flask, jsonify, render_template, request
import requests
from config import API_KEY
app = Flask(__name__)

@app.route('/get_weather_data')
def get_weather_data():
    location = request.args.get('location')
    url = f'http://api.openweathermap.org/data/2.5/weather?q={location}&units=metric&appid={API_KEY}'

    print(f'Location = {location}')

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()

        print(data)
        
        # process the data
        temperature = data['main']['temp']
        description = data['weather'][0]['description']
        feelsLike = data['main']['feels_like']
        tempMin = data['main']['temp_min']
        tempMax = data['main']['temp_max']
        humidity = data['main']['humidity']

        # use the weather data
        # print(f'Temperature: {temperature}')
        # print(f'Description: {description}')

        weather_data = {
            'temperature': temperature,
            'description': description,
            'feelsLike': feelsLike,
            'tempMin': tempMin,
            'tempMax': tempMax,
            'humidity': humidity,
        }

        return jsonify(weather_data)
    else:
        print(f'Error getching weather data. Status code: {response.status_code}')
        return jsonify({'error': 'Error fetching weather data'}), 404
# # test
# location = 'London'
# get_weather_data(location)

@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run()


# new idea
# text file to store when a location is searched for 
# new search will increase number
# use to show top 5/10/etc places searched for when site loads
# mainly a dev thing, wouldn't work well in proper site
# but would look good for this kind of project
# eg. Bolton,5 /n Manchester,10 /n Madrid, 13 etc
