#!/bin/bash

# Cloud SQL Proxy Startup Script
# Usage: ./start-cloud-sql-proxy.sh INSTANCE_CONNECTION_NAME [PORT]

INSTANCE_CONNECTION_NAME=${1:-""}
PORT=${2:-"5432"}

if [ -z "$INSTANCE_CONNECTION_NAME" ]; then
    echo "❌ Error: Instance connection name required"
    echo ""
    echo "Usage: ./start-cloud-sql-proxy.sh INSTANCE_CONNECTION_NAME [PORT]"
    echo ""
    echo "Example:"
    echo "  ./start-cloud-sql-proxy.sh my-project:us-central1:thearc-prod"
    echo "  ./start-cloud-sql-proxy.sh my-project:us-central1:thearc-prod 5433"
    echo ""
    echo "To find your instance connection name:"
    echo "  1. Go to Google Cloud Console > SQL > Instances"
    echo "  2. Click on your instance"
    echo "  3. Copy the 'Connection name'"
    exit 1
fi

# Check if cloud-sql-proxy exists
if [ ! -f "./cloud-sql-proxy" ]; then
    echo "❌ Cloud SQL Proxy not found!"
    echo ""
    echo "Please download it first:"
    ARCH=$(uname -m)
    if [[ "$ARCH" == "arm64" ]]; then
        echo "  curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.darwin.arm64"
    else
        echo "  curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.8.0/cloud-sql-proxy.darwin.amd64"
    fi
    echo "  chmod +x cloud-sql-proxy"
    exit 1
fi

# Check if already running
if pgrep -f "cloud-sql-proxy.*$INSTANCE_CONNECTION_NAME" > /dev/null; then
    echo "⚠️  Cloud SQL Proxy is already running for this instance"
    echo "   Stopping existing process..."
    pkill -f "cloud-sql-proxy.*$INSTANCE_CONNECTION_NAME"
    sleep 2
fi

# Check authentication
if [ -z "$GOOGLE_APPLICATION_CREDENTIALS" ]; then
    # Check for service account key in project directory
    if [ -f "./service-account-key.json" ]; then
        export GOOGLE_APPLICATION_CREDENTIALS="./service-account-key.json"
        echo "✅ Using service account key: ./service-account-key.json"
    elif [ -f "./gcp-service-account-key.json" ]; then
        export GOOGLE_APPLICATION_CREDENTIALS="./gcp-service-account-key.json"
        echo "✅ Using service account key: ./gcp-service-account-key.json"
    elif gcloud auth application-default print-access-token > /dev/null 2>&1; then
        echo "✅ Using gcloud application-default credentials"
    else
        echo "⚠️  Not authenticated with Google Cloud"
        echo ""
        echo "Options:"
        echo "  1. Place service account key as: ./service-account-key.json"
        echo "  2. Or run: gcloud auth application-default login"
        echo ""
        read -p "Do you want to authenticate with gcloud now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            gcloud auth application-default login
        else
            echo "❌ Authentication required. Exiting."
            exit 1
        fi
    fi
else
    echo "✅ Using GOOGLE_APPLICATION_CREDENTIALS: $GOOGLE_APPLICATION_CREDENTIALS"
fi

echo "🚀 Starting Cloud SQL Proxy..."
echo "   Instance: $INSTANCE_CONNECTION_NAME"
echo "   Port: $PORT"
echo ""

# Start the proxy
./cloud-sql-proxy "$INSTANCE_CONNECTION_NAME" --port "$PORT" &
PROXY_PID=$!

# Wait a moment for it to start
sleep 2

# Check if it's running
if ps -p $PROXY_PID > /dev/null; then
    echo "✅ Cloud SQL Proxy started successfully (PID: $PROXY_PID)"
    echo ""
    echo "📝 Update your .env file:"
    echo "   DATABASE_URL=\"postgresql://thearc_user:%3FOGT%28JRuR4%2AF2%26%3Cg@127.0.0.1:$PORT/thearc_prod\""
    echo ""
    echo "🛑 To stop the proxy:"
    echo "   pkill -f 'cloud-sql-proxy.*$INSTANCE_CONNECTION_NAME'"
    echo "   or: kill $PROXY_PID"
else
    echo "❌ Failed to start Cloud SQL Proxy"
    exit 1
fi

