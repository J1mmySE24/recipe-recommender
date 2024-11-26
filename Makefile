.PHONY: setup-backend setup-frontend start-backend start-frontend start

# Variables for directory paths
BACKEND_DIR = Code/backend
FRONTEND_DIR = Code/frontend
DB_DIR = $(BACKEND_DIR)/db

# Backend setup: Install dependencies and run the database script
setup-backend:
	cd $(BACKEND_DIR) && npm install
	cd $(DB_DIR) && node insertRecipes.js

# Frontend setup: Install dependencies
setup-frontend:
	cd $(FRONTEND_DIR) && npm install

# Start backend server
start-backend:
	cd $(BACKEND_DIR) && npm run dev

# Start frontend server
start-frontend:
	cd $(FRONTEND_DIR) && npm start

setup:
	@echo "Setting up the project..."
	make setup-backend & make setup-frontend

llama:
	ollama pull llama3.2-vision

# Start both backend and frontend
start:
	@echo "Starting backend and frontend..."
	make start-backend & make start-frontend
