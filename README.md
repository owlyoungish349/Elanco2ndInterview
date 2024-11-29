Country Population Lookup - Elanco 2nd Interview Task
This application provides a lookup interface for country populations, leveraging a dynamic front-end design and a REST API backend.

Features
Search for countries by name with real-time suggestions.
View a chart and details of selected countries' populations.
Add up to 6 countries for comparison.
Fully responsive design, compatible with most devices.
Prerequisites
Before running the application, ensure you have the following installed on your system:

Node.js: Download and install from Node.js.
NPM: Comes with Node.js. Verify installation with npm -v.
Dependencies
Install the following dependencies for the project:

Backend (Optional if provided API is used):
Flask: A lightweight Python web framework.
Flask-CORS: For handling Cross-Origin Resource Sharing.
Requests: For API requests to external services.
Install them using:

bash
Copy code
pip install flask flask-cors requests
Frontend:
Axios: For making HTTP requests.
React-Chart.js 2: For rendering the population chart.
Chart.js: Dependency for React-Chart.js 2.
Install them using:

bash
Copy code
npm install axios react-chartjs-2 chart.js
How to Run
Step 1: Clone the Repository
Clone the project repository from GitHub:

bash
Copy code
git clone https://github.com/owlyoungish349/Elanco2ndInterview.git
Navigate to the project folder:

bash
Copy code
cd Elanco2ndInterview
Step 2: Install Dependencies
Run the following command to install all required dependencies for the front-end:

bash
Copy code
npm install
Step 3: Start the Application
Frontend:
Start the development server:

bash
Copy code
npm run dev
The application will run locally, typically at http://localhost:5173.

Backend (Optional if using provided API):
Run the backend server:

bash
Copy code
python app.py
The backend will run locally at http://127.0.0.1:5000/api/countries.

Troubleshooting
If the application doesn't load correctly:

Verify that the Node.js version is compatible with the project.
Ensure the API endpoint is accessible and running.
If backend issues arise:

Update the Flask library to the latest stable version:
bash
Copy code
pip install --upgrade flask
Check the backend structure and logic for compatibility.
This project demonstrates both front-end development and backend integration to provide a seamless user experience. Originally, issues were encountered due to an unstable version of Flask and a poorly structured backend. Updating the Flask library and refining the backend logic resolved these issues, ensuring stable performance.
