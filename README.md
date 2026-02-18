CareerBuddyApp

CareerBuddyApp is an Android application designed to assist students in identifying the best career paths based on their academic performance and personal interests. The app leverages machine learning models served via a Flask API to provide career predictions tailored to each student's input. This project integrates Android development with Python Flask for real-time predictions, making it a comprehensive solution for career guidance.
Features
Career Prediction: Students provide their academic marks and interests, and the app predicts the best career options based on those inputs.
Machine Learning Backend: The Flask API processes student data and generates predictions using a machine learning model.
Seamless Integration: The app communicates directly with the Flask API to fetch predictions.
Table of Contents
Project Structure
Technologies Used
Setup Instructions
Setting up the Flask API (Backend)
Setting up the Android App (Frontend)
Running the Application
API Documentation
License
Project Structure
The project is divided into two main components:
1. CareerPredictApp (Android App)
app.tsx: This is the main entry point of the Android app. It contains the logic for gathering student inputs (marks and interests) and communicating with the Flask API for predictions.
The Android app is built using React Native and provides a smooth user interface for student interactions.
2. pythonMl (Flask API)
app.py: The main Python file for the Flask API. It serves the machine learning model and provides career predictions based on student input.
The backend receives student marks and interests, processes the data through a trained model, and returns the career prediction.
3. Other Project Files
.gitignore: Git ignore configuration for excluding unnecessary files from version control.
node_modules/: Contains the dependencies for the React Native Android application.
Technologies Used
React Native: Used for building the Android application.
Flask: A Python web framework for building the backend API that handles career predictions.
Python: For building the machine learning model and processing data.
Machine Learning Model: The backend uses a machine learning model to predict the best career based on student data.
