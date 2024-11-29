from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests (CORS support)

# REST Countries API URL
REST_COUNTRIES_API = "https://restcountries.com/v3.1/all"

@app.route('/api/countries', methods=['GET'])
def get_countries():
    try:
        # Fetch data from the REST Countries API
        response = requests.get(REST_COUNTRIES_API)
        
        # Check if the API request was successful
        if response.status_code == 200:
            raw_data = response.json()
            
            # Process and format the data
            formatted_data = [
                {
                    "name": country.get("name", {}).get("common", "Unknown"),
                    "population": country.get("population", 0),
                    "flag": country.get("flags", {}).get("svg", ""),
                }
                for country in raw_data
            ]
            
            # Send the formatted data to the frontend
            return jsonify({"data": formatted_data}), 200
        else:
            return jsonify({"error": "Failed to fetch data from external API"}), response.status_code
    except Exception as e:
        # Catch any errors and return an error response
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Run the Flask app
    app.run(debug=True)
