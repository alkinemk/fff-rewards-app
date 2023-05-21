# Use an appropriate Python base image
FROM python:3.10

# Set the working directory
WORKDIR /app

# Copy the backend code into the container
COPY . .

# Install dependencies
RUN pip3 install -r requirements.txt

# Expose the port on which the WSGI server will listen
EXPOSE 5000

# Set the command to start the WSGI server
# CMD ["gunicorn", "-b", "0.0.0.0:5000", "your_app:app"]
CMD ["python3", "-m" , "flask", "run", "--host=0.0.0.0"]