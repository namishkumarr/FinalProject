from flask import Flask, request, jsonify
from flask_cors import CORS 
import os
import uuid
import json
import base64
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

results_data = {}
field_data = {}



DATA_FILE = "./src/components/data/ResumeData.json"

UPLOAD_FOLDER = './backend/App/Uploaded_Resumes'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not allowed_file(file.filename):
        return jsonify({'error': 'File type not allowed'}), 400

    filename = secure_filename(file.filename)
    unique_filename = f"{uuid.uuid4()}_{filename}"
    file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
    file.save(file_path)
    results_data['resume_link'] = os.path.abspath(file_path).replace("\\", "/")
    

    return jsonify({'message': f'File {filename} uploaded successfully'}), 200

@app.route('/results1', methods=['POST'])
def receive_results():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    emp_name=data.get('name')
    emp_email=data.get('email')
    resume_score = data.get('resume_score')
    reco_field = data.get('reco_field')

    if emp_name is None or emp_email is None or resume_score is None or reco_field is None:
        return jsonify({'error': 'Missing emp_name or emp_email or resume_score or reco_field'}), 400
    
    results_data['emp_name'] = emp_name
    results_data['emp_email'] = emp_email
    results_data['resume_score'] = resume_score
    results_data['reco_field'] = reco_field

    print(f"Employee Name: {emp_name}")
    print(f"Employee Email: {emp_email}")
    print(f"Resume Score: {resume_score}")
    print(f"Recommended Field: {reco_field}")
    
    return jsonify({'message': 'Results received successfully',
    'emp_name':emp_name,
    'emp_email':emp_email,
    'resume_score': resume_score,
    'reco_field': reco_field}), 200

@app.route('/results2', methods=['GET'])
def get_results():
    if not results_data:
        return jsonify({'error': 'No results found'}), 404
    
    # Return the stored resume score and recommended field
    return jsonify({
        'emp_name':results_data['emp_name'],
        'emp_email':results_data['emp_email'],
        'resume_score': results_data['resume_score'],
        'reco_field': results_data['reco_field'],
        'resume_link':results_data['resume_link']
    }), 200

@app.route("/saveTalent", methods=["POST"])
def save_talent():
    try:
        # Get the new talent data from the request
        new_talent = request.get_json()

        # Load the existing data from the JSON file
        if os.path.exists(DATA_FILE):
            with open(DATA_FILE, "r") as file:
                data = json.load(file)
        else:
            data = []

        # Append the new talent data
        data.append(new_talent)

        # Save the updated data back to the JSON file
        with open(DATA_FILE, "w") as file:
            json.dump(data, file, indent=4)

        return jsonify({"message": "Talent data saved successfully!"}), 200
    except Exception as e:
        print("Error saving talent data:", str(e))
        return jsonify({"message": "Failed to save talent data."}), 500
    

@app.route('/field1', methods=['POST'])
def receive_field():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    reco_field = data.get('reco_field')

    if reco_field is None:
        return jsonify({'error': 'Missing reco_field'}), 400
    
    
    field_data['reco_field'] = reco_field

    
    print(f"Recommended Field: {reco_field}")
    
    return jsonify({'message': 'Results received successfully',
    'reco_field': reco_field}), 200

@app.route('/field2', methods=['GET'])
def get_field():
    if not field_data:
        return jsonify({'error': 'No field found'}), 404
    
    # Return the stored resume score and recommended field
    return jsonify({
        
        'reco_field': results_data['reco_field'],
        
    }), 200

if __name__ == '__main__':
    app.run(port=5000)
