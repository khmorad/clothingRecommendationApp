from flask import Flask, request, jsonify, send_from_directory
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
import os
from dotenv import load_dotenv
import base64
import logging
import io

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


# connecting to mysql database
app.config['MYSQL_HOST'] = os.getenv("host")
app.config['MYSQL_USER'] = os.getenv("user")
app.config['MYSQL_PASSWORD'] = os.getenv("password")
app.config['MYSQL_DB'] = os.getenv("dbName")
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)

# Employee section

@app.route('/employee', methods=['POST'])
def create_employee():
    try:
        cur = mysql.connection.cursor()
        data = request.json
        name = data['name']
        dob = data['dob']
        department = data['department']
        job_title = data['job_title']
        report_to = data.get('report_to', None)
        password = data['password']
        cur.execute(
            "INSERT INTO Employees (Name, DOB, Department, jobTitle, reportTo, Password) VALUES (%s, %s, %s, %s, %s, %s)",
            (name, dob, department, job_title, report_to, password)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Employee created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/employee', methods=['GET'])
def get_employees():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Employees")
        employees = cur.fetchall()
        cur.close()
        return jsonify(employees), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/employee/<int:employee_id>', methods=['PUT'])
def update_employee(employee_id):
    try:
        cur = mysql.connection.cursor()
        data = request.json
        name = data['name']
        dob = data['dob']
        department = data['department']
        job_title = data['job_title']
        report_to = data.get('report_to', None)
        password = data['password']
        cur.execute(
            "UPDATE Employees SET Name = %s, DOB = %s, Department = %s, jobTitle = %s, reportTo = %s, Password = %s WHERE Employee_ID = %s",
            (name, dob, department, job_title, report_to, password, employee_id)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Employee updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/employee/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM Employees WHERE Employee_ID = %s", (employee_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Employee deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# customer section

@app.route('/customer', methods=['POST'])
def create_customer():
    try:
        cur = mysql.connection.cursor()
        data = request.json
        customer_id = data['Customer_ID']
        name = data['Name']
        dob_str = data['DOB']
        dob = datetime.strptime(dob_str, '%a, %d %b %Y %H:%M:%S %Z').strftime('%Y-%m-%d')
        address = data['Address']
        phone_number = data['PhoneNumber']
        email = data['Email']
        employee_id = data['Employee_ID']
        password = data['Password']
        cur.execute(
            "INSERT INTO Customers (Customer_ID, Name, DOB, Address, PhoneNumber, Email, Employee_ID, Password) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (customer_id, name, dob, address, phone_number, email, employee_id, password)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Customer created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/customer', methods=['GET'])
def get_customers():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM Customers")
        customers = cur.fetchall()
        cur.close()
        return jsonify(customers), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/customer/<int:customer_id>', methods=['PUT'])
def update_customer(customer_id):
    try:
        cur = mysql.connection.cursor()
        data = request.json
        name = data['Name']
        dob_str = data['DOB']
        dob = datetime.strptime(dob_str, '%a, %d %b %Y %H:%M:%S %Z').strftime('%Y-%m-%d')
        address = data['Address']
        phone_number = data['PhoneNumber']
        email = data['Email']
        employee_id = data['Employee_ID']
        password = data['Password']
        cur.execute(
            "UPDATE Customers SET Name = %s, DOB = %s, Address = %s, PhoneNumber = %s, Email = %s, Employee_ID = %s, Password = %s WHERE Customer_ID = %s",
            (name, dob, address, phone_number, email, employee_id, password, customer_id)
        )
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Customer updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/customer/<int:customer_id>', methods=['DELETE'])
def delete_customer(customer_id):
    try:
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM Customers WHERE Customer_ID = %s", (customer_id,))
        mysql.connection.commit()
        cur.close()
        return jsonify({"message": "Customer deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

#//transactions section
@app.route("/transactions", methods=["POST"])
def add_transaction():
    try:
        data = request.json
        if not data or 'Transaction_ID' not in data or 'VIN' not in data or 'Customer_ID' not in data or'Date' not in data or 'Price' not in data or 'Employee_ID' not in data:
            return jsonify({'error': 'Missing required fields in request'}), 400

        id = data['Transaction_ID']
        vin = data['VIN']

        date_str = data['Date']
        date = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %Z').strftime('%Y-%m-%d')

        price = data['Price']
        employee_id = data['Employee_ID']
        customer_id = data['Customer_ID']
        cursor = mysql.connection.cursor()
        cursor.execute(
            "INSERT INTO transactions (Transaction_ID, VIN, Customer_ID, Date, Price, Employee_ID) VALUES (%s, %s, %s, %s, %s, %s)",
            (id, vin, customer_id, date, price, employee_id))
        mysql.connection.commit()

        return jsonify({'message': 'Transaction created successfully'}), 201
    except KeyError as e:
        return jsonify({'error': f'Missing key in request: {e}'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()

@app.route("/transactions", methods=['GET'])
def get_transactions():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('SELECT * from transactions;')
        transactions = cursor.fetchall()
        cursor.close()
        return jsonify(transactions), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/transactions/<int:Transaction_ID>", methods=['GET'])
def get_single_transactions(Transaction_ID):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute('SELECT * FROM transactions WHERE Transaction_ID = %s ', [Transaction_ID])
        transaction = cursor.fetchone()
        if transaction:
            return jsonify(transaction), 200
        else:
            return jsonify({'error': 'Transaction not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/transactions/<int:Transaction_ID>", methods=['PUT'])
def update_transaction(Transaction_ID):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("SELECT * FROM Transactions WHERE Transaction_ID = %s", [Transaction_ID])
        existing_transaction = cursor.fetchone()

        if not existing_transaction:
            return jsonify({'error': 'Transaction not found'}), 404

        data = request.get_json()
        if not data:
            return jsonify({'error': 'Missing update data in request'}), 400

        update_data = {}
        if 'VIN' in data:
            update_data['VIN'] = data['VIN']
        if 'Customer_ID' in data:
            update_data['Customer_ID'] = data['Customer_ID']
        if 'Date' in data:
            date_str = data['Date']
            date = datetime.strptime(date_str, '%a, %d %b %Y %H:%M:%S %Z').strftime('%Y-%m-%d')
            update_data['Date'] = date
        if 'Price' in data:
            update_data['Price'] = data['Price']
        if 'Employee_ID' in data:
            update_data['Employee_ID'] = data['Employee_ID']

        set_clause = ", ".join([f"{key} = %s" for key in update_data.keys()])
        update_query = f"UPDATE Transactions SET {set_clause} WHERE Transaction_ID = %s"
        update_params = list(update_data.values()) + [Transaction_ID]

        cursor.execute(update_query, update_params)

        if cursor.rowcount == 0:
            return jsonify({'message': 'No changes made to transaction'}), 200

        mysql.connection.commit()
        return jsonify({'message': 'Transaction updated successfully'}), 200
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()

@app.route("/transactions/<int:Transaction_ID>", methods=['DELETE'])
def delete_transaction(Transaction_ID):
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("DELETE FROM Transactions WHERE Transaction_ID = %s", [Transaction_ID])

        if cursor.rowcount == 0:
            return jsonify({'error': 'Transaction not found'}), 404

        mysql.connection.commit()
        return jsonify({'message': 'Transaction deleted successfully'}), 200
    except Exception as e:
        mysql.connection.rollback()
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()

if __name__ == "__main__":
    app.run(port=5001)

