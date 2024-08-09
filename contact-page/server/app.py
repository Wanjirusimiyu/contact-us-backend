from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///contact.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db = SQLAlchemy(app)


class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(50), nullable=False)
    lastName = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phoneNumber = db.Column(db.String(20), nullable=False)
    inquiryType = db.Column(db.String(50), nullable=False)
    message = db.Column(db.Text, nullable=False)

@app.route('/')
def home():
    return 'Contact us API!!'

@app.route('/contact', methods=['POST'])
def contact():
    if request.method == 'POST':
        try:
            data = request.json

            if not all(key in data for key in ['firstName', 'lastName', 'email', 'phoneNumber', 'inquiryType', 'message']):
                return jsonify({'error': 'Missing required fields'}), 400

            new_contact = Contact(
                firstName = data['firstName'],
                lastName = data['lastName'],
                email = data['email'],
                phoneNumber = data['phoneNumber'],
                inquiryType = data['inquiryType'],
                message = data['message']
            )
            db.session.add(new_contact)
            db.session.commit()
            return jsonify({'message': 'Message received!'}), 201
        
        except KeyError as e:
            return jsonify({'error': 'Missing required field: {}'.format(str(e))}), 400
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
# Running the application
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)