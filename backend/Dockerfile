# Use Python 3.11 base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy requirements.txt to the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Expose the app port
EXPOSE 8000

# Run the application with Hypercorn
CMD ["hypercorn", "main:app", "--bind", "0.0.0.0:8000"]
