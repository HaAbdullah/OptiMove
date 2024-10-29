# Start from a base image that includes Python
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Install necessary libraries for OpenCV, GLib, and Stockfish
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libgl1-mesa-glx \
    libglib2.0-0 \
    stockfish \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy the requirements file and install dependencies
COPY requirements.txt . 
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Set the command to run your application
CMD ["python", "main.py"]
