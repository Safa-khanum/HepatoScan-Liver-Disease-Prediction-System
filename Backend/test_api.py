import requests

url = "http://127.0.0.1:5000/predict"

data = {
    "Age": 45,
    "Gender": "Male",
    "Total_Bilirubin": 1.2,
    "Alkaline_Phosphotase": 200,
    "Alamine_Aminotransferase": 30,
    "Aspartate_Aminotransferase": 40,
    "Total_Protiens": 6.5,
    "Albumin": 3.5,
    "Albumin_and_Globulin_Ratio": 1.1
}

response = requests.post(url, json=data)

print(response.json())