import json
import os
from app.models import SensorData

# File path where sensor data logs will be stored
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE_PATH = os.path.join(BASE_DIR, "sensor_logs.json")

# Function to process and save sensor data by appending it to the file
def process_sensor_data(data: SensorData):
    try:
        # Convert data to dictionary format
        sensor_data = {
            "deflection": data.deflection,
            "load": data.load,
            "timestamp": data.timestamp.isoformat()
        }

        # Check if file exists
        if os.path.exists(DATA_FILE_PATH):
            # Append new data to the existing file
            with open(DATA_FILE_PATH, 'r+') as f:
                try:
                    existing_data = json.load(f)
                except json.JSONDecodeError:
                    existing_data = []
                    print(f"Warning: File '{DATA_FILE_PATH}' was corrupted or empty. Starting a new log.")

                # Append the new sensor data to the existing data
                existing_data.append(sensor_data)
                
                # Move file pointer to the beginning and write updated data
                f.seek(0)
                json.dump(existing_data, f, indent=4)
        else:
            # Create the file and write the first sensor data entry
            with open(DATA_FILE_PATH, 'w') as f:
                json.dump([sensor_data], f, indent=4)

        return sensor_data

    except IOError as e:
        raise Exception(f"Failed to process sensor data due to file error: {str(e)}")
    except Exception as e:
        raise Exception(f"An unexpected error occurred while processing sensor data: {str(e)}")

# Function to get the latest sensor data from the file
def get_latest_sensor_data():
    try:
        if os.path.exists(DATA_FILE_PATH):
            with open(DATA_FILE_PATH, 'r') as f:
                sensor_data_logs = json.load(f)
                if sensor_data_logs:
                    return sensor_data_logs[-1]  # Return the last entry
                else:
                    raise Exception("No sensor data available in the file.")
        else:
            raise FileNotFoundError(f"The file '{DATA_FILE_PATH}' does not exist.")

    except FileNotFoundError as e:
        raise Exception(str(e))
    except json.JSONDecodeError:
        raise Exception(f"Failed to decode JSON from file '{DATA_FILE_PATH}'. The file may be corrupted.")
    except Exception as e:
        raise Exception(f"An unexpected error occurred while retrieving the latest sensor data: {str(e)}")

# Function to get all sensor data logs from the file
def get_all_sensor_data():
    try:
        if os.path.exists(DATA_FILE_PATH):
            with open(DATA_FILE_PATH, 'r') as f:
                sensor_data_logs = json.load(f)
            if sensor_data_logs:
                return sensor_data_logs
            else:
                raise Exception("No sensor data available in the file.")
        else:
            raise FileNotFoundError(f"The file '{DATA_FILE_PATH}' does not exist.")

    except FileNotFoundError as e:
        raise Exception(str(e))
    except json.JSONDecodeError:
        raise Exception(f"Failed to decode JSON from file '{DATA_FILE_PATH}'. The file may be corrupted.")
    except Exception as e:
        raise Exception(f"An unexpected error occurred while retrieving sensor data logs: {str(e)}")
