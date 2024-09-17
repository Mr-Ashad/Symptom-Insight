from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS library
import joblib
from re import search, IGNORECASE
from data_model.SI_data_model import svm as model
from data_model.SI_data_model import svm_output, get_description, get_precautions
from data_model.SI_data_model import clean_text

app = Flask(__name__)

# Enable CORS on the app
CORS(app)  # Allows requests from all domains
# OR to be more specific:
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Save the model using joblib
joblib.dump(model, 'model.pkl')

@app.route('/description', methods=['POST'])
def get_description_route():
    try:
        data = request.json.get('data')
        diseases = ['Psoriasis', 'Varicose Veins', 'Typhoid', 'Chicken Pox', 'Impetigo', 'Dengue',
                    'Fungal Infection', 'Common Cold', 'Pneumonia', 'Dimorphic Hemorrhoids',
                    'Arthritis', 'Acne', 'Bronchial Asthma', 'Hypertension', 'Migraine',
                    'Cervical Spondylosis', 'Jaundice', 'Malaria', 'Urinary Tract Infection',
                    'Allergy', 'Gastroesophageal Reflux Disease', 'Drug Reaction',
                    'Peptic Ulcer Disease', 'Diabetes']
        
        data = data.title()
        for disease in diseases:
            if match := search(rf"(\b{disease}\b)", data, flags=IGNORECASE):
                desc_disease = match.group(1)
                desc = get_description(desc_disease)
                return jsonify({'desc': desc})
        
        return jsonify({'error': 'Disease not found'})
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("dsssd")
        data = request.json.get('data')
        print(f"Received data for prediction: {data}")

        disease = svm_output(model, data)
        description = get_description(disease)
        precautions = get_precautions(disease)

        return jsonify({'disease': disease, 'description': description, 'precautions': precautions})
    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
