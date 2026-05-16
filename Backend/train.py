import pandas as pd
import numpy as np
import pickle

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from imblearn.combine import SMOTETomek

# Load dataset
df = pd.read_csv("Liver_data.csv")

# Fill missing
df['Albumin_and_Globulin_Ratio'] = df['Albumin_and_Globulin_Ratio'].fillna(
    df['Albumin_and_Globulin_Ratio'].median()
)

# Encode gender
df['Gender'] = np.where(df['Gender'] == 'Male', 1, 0)

# Drop feature
df = df.drop('Direct_Bilirubin', axis=1)

# Split features
X = df.iloc[:, :-1]
y = df.iloc[:, -1]

# SMOTE
smote = SMOTETomek()
X_res, y_res = smote.fit_resample(X, y)

# Train test split
X_train, X_test, y_train, y_test = train_test_split(
    X_res, y_res, test_size=0.3, random_state=33
)

# Train model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("✅ Model trained and saved!")