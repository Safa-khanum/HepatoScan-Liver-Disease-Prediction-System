import numpy as np

def preprocess_input(data):
    processed = []

    # Gender encoding
    gender = 1 if data['Gender'].lower() == 'male' else 0

    processed.append(data['Age'])
    processed.append(gender)
    processed.append(data['Total_Bilirubin'])
    processed.append(data['Alkaline_Phosphotase'])
    processed.append(data['Alamine_Aminotransferase'])
    processed.append(data['Aspartate_Aminotransferase'])
    processed.append(data['Total_Protiens'])
    processed.append(data['Albumin'])
    processed.append(data['Albumin_and_Globulin_Ratio'])

    return np.array(processed).reshape(1, -1)