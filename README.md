Country Population Lookup
(Note: During the presentation I noticed that the problem was the fact that I was using a unstable version of flask and the structure of the backend needed to change and with a bit of
a amateur mistake I uploaded the previous version of the website with the outdate API)

An interactive application for comparing country populations with real-time visualization.

FEATURES
--------
- Real-time country search with suggestions
- Interactive population charts
- Compare up to 6 countries simultaneously
- Fully responsive design

PREREQUISITES
------------
- Node.js (https://nodejs.org/)
- Python (for backend)
- NPM (included with Node.js)

INSTALLATION
-----------
1. Clone the repository:
   git clone https://github.com/owlyoungish349/Elanco2ndInterview.git
   cd Elanco2ndInterview

2. Install Backend Dependencies (Optional):
   pip install flask flask-cors requests

3. Install Frontend Dependencies:
   npm install

RUNNING THE APPLICATION
----------------------
Frontend:(commands into the terminal)
   cd frontend
   cd frontend
   npm run dev
   Access at: http://localhost:5173

Backend (Optional):(run app.py)
  backend\venv\app.py 
   API available at: http://127.0.0.1:5000/api/countries

DEPENDENCIES
-----------
Frontend:
- Axios
- React-Chart.js 2
- Chart.js

Backend:
- Flask
- Flask-CORS
- Requests

TROUBLESHOOTING
--------------
Frontend Issues:
- Verify Node.js compatibility
- Check API endpoint accessibility

Backend Issues:
- Update Flask: pip install --upgrade flask

TECH STACK
----------
- Frontend: React.js
- Backend: Flask
- Charts: Chart.js
- HTTP Client: Axios
- API Integration: REST

LICENSE
-------
MIT

Made for Elanco Interview
