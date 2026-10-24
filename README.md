🧠 Mental Fitness Tracker

An ML-Powered Application for Mental Well-Being Awareness

The Mental Fitness Tracker is a web application that uses Machine Learning to analyze user-provided lifestyle and well-being survey responses. It provides a model-based prediction along with personalized suggestions to encourage healthier daily habits and improve overall well-being.

🚀 Features

Lifestyle Assessment: Collects information about sleep, exercise, work stress, screen time, social support, and other lifestyle factors.

Machine Learning Prediction: Uses a trained ML model to generate a prediction based on submitted responses.

Prediction Probability: Displays the model's estimated probability for the positive class when available.

Personalized Suggestions: Provides practical recommendations based on the user's responses.

Interactive User Interface: Built with React for a responsive and user-friendly experience.

REST API Integration: Connects the React frontend to a Flask backend for prediction processing.

Privacy-Conscious Design: Does not require users to submit identifying information for the assessment.

🛠️ Technology Stack

Component

Technologies

Frontend

React.js, JavaScript, HTML, CSS

Backend

Python, Flask

Machine Learning

Scikit-learn

API Communication

REST API, JSON

Cross-Origin Requests

Flask-CORS

Development Tools

VS Code, Git, GitHub

Deployment

Vercel (frontend), Render (backend)

⚙️ How It Works

Enter Details: The user completes the lifestyle and well-being assessment form.

Submit Responses: The React frontend sends the input data to the Flask prediction API.

Process Inputs: The backend prepares the inputs and passes them to the trained machine learning model.

Generate Prediction: The model returns a predicted class and probability, where supported.

Display Results: The frontend displays the result and personalized suggestions based on the user's responses.

Encourage Healthy Habits: The user can follow the suggestions and make gradual lifestyle improvements.

📋 Assessment Parameters

The application considers factors such as:

Age and weekly working hours

Remote work and job satisfaction

Work stress and work-life balance

Exercise frequency and nightly sleep duration

Caffeine consumption

Daily screen time and social media usage

Time spent on hobbies

Diet quality and financial stress

Social support and close friendships

Feeling understood and loneliness

🏗️ Project Structure

Mental_Health_fitness/
│
├── app.py
├── requirements.txt
├── models/
│   ├── mental_fitness_model.pkl
│   ├── model_features.json
│   └── model_threshold.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md

Note: The structure above represents the expected layout. Adjust it to match the actual files in your repository.

💻 Getting Started

Prerequisites

Install the following before running the project:

Python 3.10 or another version compatible with your ML dependencies

Node.js and npm

Git

1. Clone the Repository

git clone https://github.com/YOUR-USERNAME/mental-fitness-tracker.git
cd mental-fitness-tracker

Replace YOUR-USERNAME with your GitHub username and use your actual repository URL.

2. Set Up the Backend

Create and activate a Python virtual environment.

Windows:

python -m venv venv
venv\Scripts\activate

Install the dependencies:

pip install -r requirements.txt

Start the Flask server:

python app.py

The backend should run at:

https://mental-fitness-tracker-2.onrender.com/predict

3. Set Up the Frontend

Open a second terminal:

cd frontend
npm install
npm run dev

Open the local URL displayed by Vite in your terminal, usually http://localhost:5173.

Ensure the frontend sends requests to the running Flask backend.

🔌 API Endpoint

POST /predict

Accepts the assessment responses as JSON and returns the model prediction and related information.

Example request format:

{
  "Age": 22,
  "Work_Hours_Per_Week": 40,
  "Remote_Work": 1,
  "Job_Satisfaction": 3,
  "Work_Stress_Level": 3,
  "Work_Life_Balance": 3,
  "Exercise_Per_Week": 3,
  "Sleep_Hours_Night": 7,
  "Caffeine_Drinks_Day": 1,
  "Screen_Time_Hours_Day": 6,
  "Social_Media_Hours_Day": 2,
  "Hobby_Time_Hours_Week": 4,
  "Diet_Quality": 3,
  "Financial_Stress": 2,
  "Social_Support": 3,
  "Close_Friends_Count": 3,
  "Feel_Understood": 1,
  "Loneliness": 2
}

The values are illustrative. Use the exact field types and allowed values expected by your model.

Response format:

{
  "prediction": 1,
  "probability_class_1": 0.78,
  "threshold": 0.5,
  "message": "Prediction generated successfully"
}

This is an illustrative response. Actual output values and message wording depend on the backend implementation.

🌐 Deployment

The application can be deployed as two separate services:

Frontend: Vercel — deploy the React/Vite application using the frontend directory as the project root.

Backend: Render — deploy the Flask application using app.py and the required Python dependencies.

After deployment, configure the frontend to use the actual Render backend URL. Configure Flask-CORS to allow requests from the deployed Vercel domain.

🔮 Future Enhancements

Add user accounts and optional assessment history.

Provide progress tracking and lifestyle trend visualizations.

Generate more context-aware recommendations.

Add weekly and monthly well-being summaries.

Improve model performance through validation and evaluation.

Introduce accessible design and mobile-friendly enhancements.

Expand educational resources on healthy habits and well-being.

🔒 Privacy and Disclaimer

This application is an educational and experimental project. Its predictions are based on survey inputs and a trained machine learning model. They are not a clinical assessment, medical diagnosis, or substitute for professional mental health care.

Model predictions may be inaccurate or biased. Users should not make important health decisions based solely on the application's output. Avoid submitting sensitive personal information.
link:https://mental-fitness-tracker.vercel.app/

👩‍💻 Author

Rama Sri Devi

Computer Science and Engineering — Artificial Intelligence and Machine Learning

Built to explore the practical application of Machine Learning, React, and Flask in promoting awareness of healthy lifestyle habits.
