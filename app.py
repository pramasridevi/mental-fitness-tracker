
from flask import Flask, request, jsonify
import pandas as pd
import joblib
import json
from pathlib import Path
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
MODEL_DIR = BASE_DIR / "models"

# Load the trained ML model
model = joblib.load(MODEL_DIR / "mental_fitness_model.pkl")

# Load the encoded feature names
with open(MODEL_DIR / "model_features.json") as file:
    feature_names = json.load(file)

# Load the prediction threshold
with open(MODEL_DIR / "model_threshold.json") as file:
    threshold = json.load(file)["threshold"]

# Original features used during training
raw_features = [
    "Age", "Work_Hours_Per_Week", "Remote_Work",
    "Job_Satisfaction", "Work_Stress_Level",
    "Work_Life_Balance", "Exercise_Per_Week",
    "Sleep_Hours_Night", "Caffeine_Drinks_Day",
    "Screen_Time_Hours_Day", "Social_Media_Hours_Day",
    "Hobby_Time_Hours_Week", "Diet_Quality",
    "Financial_Stress", "Social_Support",
    "Close_Friends_Count", "Feel_Understood", "Loneliness"
]


@app.route("/")
def home():
    return jsonify({
        "message": "Mental Fitness Tracker API is running!"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(silent=True)

        if not isinstance(data, dict):
            return jsonify({
                "error": "Please send input as JSON."
            }), 400

        missing = [name for name in raw_features if name not in data]

        if missing:
            return jsonify({
                "error": "Some inputs are missing.",
                "missing_features": missing
            }), 400

        # Keep only the expected input features
        input_data = pd.DataFrame(
            [{name: data[name] for name in raw_features}]
        )

        # Apply the same encoding style used during training
        input_encoded = pd.get_dummies(
            input_data, drop_first=True, dtype=int
        )

        # Match the model's expected columns
        input_encoded = input_encoded.reindex(
            columns=feature_names, fill_value=0
        )

        probability = float(
            model.predict_proba(input_encoded)[0][1]
        )
        prediction = int(probability >= threshold)

        return jsonify({
            "prediction": prediction,
            "probability_class_1": round(probability, 4),
            "threshold": threshold,
            "message": (
                "Predicted survey label: class 1"
                if prediction == 1
                else "Predicted survey label: class 0"
            ),
            "notice": (
                "Experimental survey-model output only; "
                "not a medical diagnosis."
            )
        })

    except (TypeError, ValueError) as error:
        return jsonify({"error": str(error)}), 400


if __name__ == "__main__":
    app.run(debug=True)
