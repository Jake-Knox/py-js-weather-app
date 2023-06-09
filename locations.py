import requests
from config import API_KEY #importing my API KEY (gitignored)

def get_all_locations(api_key):
    url = f"http://api.openweathermap.org/data/2.5/weather?q=blank&appid={api_key}"

    locations = []
    page = 1

    while True:
        response = requests.get(url.replace('blank', f'page={page}'))
        data = response.json()

        if response.status_code != 200:
            print(f"Error fetching data for page {page}. Response: {response.text}")
            break

        if 'list' not in data:
            break

        for item in data['list']:
            location = item['name']
            locations.append(location)

        page += 1

    return locations


all_locations = get_all_locations(API_KEY)
print(all_locations)
