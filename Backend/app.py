from flask import Flask, request, jsonify
from flask_cors import CORS   
import pickle
from preprocess import preprocess_input

app = Flask(__name__)
CORS(app)   

# Load model
model = pickle.load(open("model.pkl", "rb"))

@app.route('/')
def home():
    return "Liver Disease Prediction API Running"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Preprocess
        input_data = preprocess_input(data)

        # Predict
        prediction = model.predict(input_data)[0]

        result = "Liver Disease Detected" if prediction == 1 else "No Liver Disease"

        return jsonify({
            "prediction": int(prediction),
            "result": result
        })

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)