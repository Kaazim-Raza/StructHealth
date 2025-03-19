from pydantic import BaseModel
from datetime import datetime

# Pydantic model to define the structure of sensor data
class SensorData(BaseModel):
    deflection: float  # Deflection value from the sensor
    load: float        # Load value from the sensor
    timestamp: datetime  # Timestamp of the sensor reading
