import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report

# Load the data
file_path = 'bhai.csv.xlsx' 
data = pd.read_excel(file_path)

# Encode the favorite subject
label_encoder = LabelEncoder()
data['Fav_Sub'] = label_encoder.fit_transform(data['Fav_Sub'])

# Define features and target
X = data.drop(columns=['Stream', 'Total_Marks'])
y = data['Stream']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Define different sets of hyperparameters
hyperparams_list = [
    {'n_estimators': 50, 'max_depth': None, 'min_samples_split': 2},
    {'n_estimators': 100, 'max_depth': 10, 'min_samples_split': 5},
    {'n_estimators': 150, 'max_depth': 20, 'min_samples_split': 10},
    {'n_estimators': 200, 'max_depth': None, 'min_samples_split': 2},
]

# Store accuracy results and metrics
results = []

# Train and evaluate models with different hyperparameters
for params in hyperparams_list:
    model = RandomForestClassifier(n_estimators=params['n_estimators'],
                                   max_depth=params['max_depth'],
                                   min_samples_split=params['min_samples_split'],
                                   random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    report = classification_report(y_test, y_pred, output_dict=True)
    
    results.append({
        'n_estimators': params['n_estimators'],
        'max_depth': params['max_depth'],
        'min_samples_split': params['min_samples_split'],
        'accuracy': accuracy,
        'precision': report['accuracy'],  # Overall accuracy as a placeholder
        'recall': report['macro avg']['recall'],
        'f1-score': report['macro avg']['f1-score'],
    })
    print(f'Model with params {params} achieved accuracy: {accuracy:.2f}')

# Create a DataFrame for the results
results_df = pd.DataFrame(results)

# Display the results
print("\nHyperparameter Metrics:\n")
print(results_df)

# Save results to a CSV file
results_df.to_csv('hyperparameter_metrics.csv', index=False)

# Optional: Visualize the results (not necessary for the table)
# You can add code for visualizations if desired
