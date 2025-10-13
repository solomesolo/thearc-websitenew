# Use an official Python runtime as a parent image
FROM python:3.10-slim

# Set environment variables
ENV PYTHONUNBUFFERED 1
ENV PATH="/root/.local/bin:$PATH"

# Set work directory
WORKDIR /code

# Install system dependencies
RUN apt-get update && \
    apt-get -y install netcat-openbsd gcc postgresql libpq-dev python3-dev musl-dev && \
    apt-get -y install htop less vim curl && \
    rm -rf /var/lib/apt/lists/*

# Install Python dependencies
RUN curl -sSL https://install.python-poetry.org | python3 - && \
    poetry config virtualenvs.create false

# Copy the project files to the container
COPY pyproject.toml ./poetry.lock /code/

# Install project dependencies
RUN poetry install -vv --no-root

# Copy the rest of the project
COPY .. /code/