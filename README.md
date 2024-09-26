# Symptom-Insight
Symptom Insight is a web application which is designed to answer the query of the user related to disease and symptoms. React js is the framework used to create this application and Flask for backend. The algorithm used in the data model is SVM (Support Vector Machine).  

Website : https://symptom-insight.vercel.app

⦁	React.js Framework: Symptom Insight's user interface is developed using React.js, ensuring a seamless and intuitive experience for users. The framework's flexibility and scalability enable dynamic interactions, facilitating efficient symptom input and result presentation.

⦁	Python Data Preprocessing: Python serves as the backbone for data preprocessing within Symptom Insight. Leveraging Python's extensive libraries and data manipulation capabilities, the system efficiently cleans and organizes user-provided symptom data for subsequent analysis.

⦁	SVM Algorithm: At the core of Symptom Insight's data modeling lies the Support Vector Machine (SVM) algorithm. SVMs excel in classification tasks, making them ideal for predicting potential diseases based on reported symptoms. By leveraging SVMs, Symptom Insight delivers accurate and reliable diagnoses to users in real-time

## About Dataset and its source
The dataset "Symptom2Disease" was provided by the authors Niyar R Barman, Faizal Karim, and Krish Sharma. It consists of 1200 datapoints and contains two columns: "label" and "text". 

The "label" column contains disease labels, while the "text" column contains natural language symptom descriptions. It was updated a year ago.

Link of dataset : https://www.kaggle.com/datasets/niyarrbarman/symptom2disease

The dataset “disease_description.csv” and “disease_precautions” was created by myself.
It was created for providing description and precautions for model predicted diseases.

## Data Preprocessing
Punctuation Removal: Stripping away punctuation marks from the text helps in standardizing the data and removing unnecessary noise.

Tokenization: The process of tokenization involves splitting the text into individual words or tokens. This step breaks down the text into its fundamental units, facilitating further analysis.

## Feature Extraction:
Feature extraction involves transforming raw data into a set of features that can be used to train a machine learning model. In natural language processing (NLP), TF-IDF vectorization is a popular technique for feature extraction. TF-IDF assigns weights to words based on their frequency in individual documents and across the entire dataset. 

## Model Training:
Model training is the process of teaching a machine learning algorithm to recognize patterns and relationships within the data. In the provided code, an SVM (Support Vector Machine) classifier is trained using the TF-IDF transformed training dataset. SVM is a supervised learning algorithm used for classification tasks. During training, the SVM model learns to differentiate between different classes by finding the optimal hyperplane that maximally separates data points belonging to different classes in the feature space.

## Model Prediction:
Once the model is trained, it can be used to make predictions on new, unseen data. In the provided code, the trained SVM model is applied to the test dataset to predict the corresponding disease labels based on the extracted features. By leveraging the patterns learned during training, the model extrapolates these insights to make predictions on text data it has not seen before. 



