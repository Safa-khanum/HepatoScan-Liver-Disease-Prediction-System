
## HepatoScan – Liver Disease Prediction System

HepatoScan is an AI-powered liver disease prediction system designed to analyze patient health parameters and predict the possibility of liver disease using Machine Learning algorithms. The project aims to assist in early diagnosis by providing fast, accurate, and data-driven predictions through an interactive web interface.

The system uses medical dataset analysis, data preprocessing, feature selection, and predictive modeling techniques to improve healthcare decision-making. It combines a user-friendly frontend with a powerful backend prediction model to deliver real-time results efficiently.

### 🚀 Features

* Liver disease prediction using Machine Learning
* Data preprocessing and feature engineering
* Interactive and responsive user interface
* Real-time prediction generation
* Model training and evaluation
* Accuracy visualization and performance metrics
* Secure and scalable architecture

## 📂 Project Structure

```bash
HepatoScan-Liver-Disease-Prediction-System/
│
├── dataset/
│   ├── liver_patient_dataset.csv
│   └── processed_dataset.csv
│
├── model/
│   ├── train_model.py
│   ├── prediction_model.pkl
│   ├── scaler.pkl
│   └── model_evaluation.py
│
├── backend/
│   ├── app.py
│   ├── routes.py
│   ├── prediction.py
│   └── requirements.txt
│
├── templates/
│   ├── index.html
│   ├── result.html
│   └── about.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── script.js
│   │
│   └── images/
│       └── liver_banner.png
│
├── notebooks/
│   └── data_analysis.ipynb
│
├── screenshots/
│   ├── homepage.png
│   ├── prediction_page.png
│   └── result_output.png
│
├── tests/
│   ├── test_prediction.py
│   └── test_routes.py
│
├── docs/
│   ├── architecture.png
│   └── project_report.pdf
│
├── .gitignore
├── README.md
├── LICENSE
└── requirements.txt
```

### 🛠️ Technologies Used

* Python
* Machine Learning
* Flask / Backend Framework
* HTML
* CSS
* JavaScript
* Pandas
* NumPy
* Scikit-learn

---

# 🏗️ System Architecture

```text
                 ┌─────────────────────┐
                 │     User Input      │
                 │ Patient Health Data │
                 └─────────┬───────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │   Frontend Interface │
                 │ HTML / CSS / JS UI  │
                 └─────────┬───────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │     Flask Server    │
                 │  Request Handling   │
                 └─────────┬───────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │ Data Preprocessing  │
                 │ Cleaning & Scaling  │
                 └─────────┬───────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │ Machine Learning ML │
                 │ Prediction Model    │
                 └─────────┬───────────┘
                           │
                           ▼
                 ┌─────────────────────┐
                 │ Prediction Result   │
                 │ Disease / No Disease│
                 └─────────────────────┘
```

---

# 📊 Workflow

1. User enters medical parameters.
2. Frontend sends data to backend server.
3. Backend preprocesses the data.
4. Machine Learning model analyzes input.
5. Prediction result is generated.
6. Result is displayed to the user instantly.

---

# 🎯 Project Objective

The main objective of HepatoScan is to leverage Machine Learning techniques for early liver disease detection, helping healthcare professionals and patients make informed medical decisions quickly and efficiently.

---

# ⭐ Future Enhancements

* Deep Learning integration
* Cloud deployment
* Medical report upload support
* Real-time doctor consultation module
* Improved prediction accuracy using advanced models
