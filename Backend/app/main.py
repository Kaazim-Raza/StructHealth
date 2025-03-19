from fastapi import FastAPI, HTTPException
from .sensors import process_sensor_data, get_latest_sensor_data, get_all_sensor_data
from .models import SensorData

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "StructHealth API is running"}

# POST API to receive and save sensor data to a file
@app.post("/sensor-data/")
async def receive_sensor_data(data: SensorData):
    try:
        processed_data = process_sensor_data(data)
        return {"message": "Data received", "processed_data": processed_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# GET API to read the latest sensor data from the file
@app.get("/latest-sensor-data/")
async def latest_sensor_data():
    try:
        latest_data = get_latest_sensor_data()
        return {"message": "Latest sensor data", "data": latest_data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# New API to return all sensor logs (deflection, load, timestamp)
@app.get("/all-sensor-logs/")
async def all_sensor_logs():
    try:
        sensor_logs = get_all_sensor_data()
        return {"message": "All sensor logs", "logs": sensor_logs}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
