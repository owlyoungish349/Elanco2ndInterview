from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

@app.route('/api/countries', methods=['GET'])
def get_countries():
    url = "https://countriesnow.space/api/v0.1/countries/population/cities"
    response = requests.get(url)

    if response.status_code == 200:
        # Return the raw data from the external API
        return jsonify(response.json())
    else:
        # Handle errors from the external API
        return jsonify({"error": "Failed to fetch data"}), 500

if __name__ == '__main__':
    app.run(debug=True)
