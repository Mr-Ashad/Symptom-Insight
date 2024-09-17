#import necessary libraries

import pandas as pd
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score, classification_report
from sklearn.neighbors import KNeighborsClassifier


# Reading Dataset
data = pd.read_csv("datasets/Symptom2Disease.csv")
description_data = pd.read_csv("datasets/disease_description.csv")
precaution_data = pd.read_csv("datasets/disease_precautions.csv")

diseases= data["label"].unique()
num_of_classes = data['label'].nunique()


stop_words = set(stopwords.words("english"))

def clean_text(sent):
    #remove punctuations
    sent = sent.translate(str.maketrans('','',string.punctuation)).strip()

    #remove stopwords
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(sent)
    words = [word for word in words if word not in stop_words]

    return " ".join(words).lower()

data["text"] = data["text"].apply(clean_text)

# Training Data 
x_train,x_test,y_train,y_test = train_test_split(data["text"], data["label"], test_size=0.2, random_state=42) 

tfidf_vectorizer =  TfidfVectorizer(max_features=1500)
tfidf_train =  tfidf_vectorizer.fit_transform(x_train).toarray()
tfidf_test = tfidf_vectorizer.transform(x_test).toarray()

# Initializing classifier
svm = SVC(kernel='linear')  # You can choose different kernels such as 'rbf' or 'poly'

# train classifier
svm.fit(tfidf_train, y_train)

# Predict on the test set
model_test = svm.predict(tfidf_test)

'''accuracy = accuracy_score(y_test, model_test)
print("Accuracy:", accuracy)'''

def svm_output(model,text):
    text =clean_text(text)
    tfidf_text = tfidf_vectorizer.transform([text]).toarray()
    disease = model.predict(tfidf_text)
    return disease[0]

# KNeighborsClassifier
'''
knn = KNeighborsClassifier(n_neighbors=5)
knn.fit(tfidf_train, y_train)
predictions = knn.predict(tfidf_test )'''

'''Function to  generate report about the dataset
  def report(y_test,predictions):
    """Function to create classification report"""
    accuracy = accuracy_score(y_test, predictions)
    print(f'Accuracy: {accuracy:.2f}')
    print(classification_report(y_test, predictions))

report(y_test,predictions) '''

'''def knn_output(model,text):
    text = clean_text(text)
    tfidf = tfidf_vectorizer.transform([text]).toarray()
    disease = model.predict(tfidf)

    return disease[0]'''

# Custom Input
'''symp1 = "sneezing and cough "
output_disease= svm_output(svm,symp1)
print(output_disease)'''

#Fuction to get the description of the disease
def get_description(disease_name):
    disease_row = description_data[description_data['disease'] == disease_name] # Search for disease in DataFrame

    if not disease_row.empty:
        description = disease_row.iloc[0]['description']  # Extract description
        return description
    else:
        return f"{disease_name} description not found"

# Function to get precautions for the disease

def get_precautions(disease):
    # Find the row corresponding to the given disease
    disease_row = precaution_data.loc[precaution_data['disease'] == disease]
    
    # Check if the disease exists in the DataFrame
    if not disease_row.empty:
        # Extract precautions for the disease
        precautions = disease_row['precautions'].values[0]
        return precautions    

    else:
        return "Precautions not found for the given disease."

#print(get_description(output_disease))
#print(get_precautions(output_disease))

