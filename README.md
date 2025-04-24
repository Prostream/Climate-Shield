Readme

Overview
- Climate Shield is a website based platform that provide early warning on climate emergencies and organizing post-disaster relief. Our main goal is minimize losses through early warning and help vulnerable groups through better coordination after disasters.   

Features
- User Authentication: Login and registration functionality.
- Create and Manage Posts: User can create posts, specify type, specify category, add tags, and upload images.
- Post Filtering: Filter posts by category(Official, Community, Need, and Offer).
- AI advise: Previous disasters and response measures are summarized by accessing the AI language model.

Tech Used
- Fronted: React, Emotion (for styling)
- Backend: Node.js, Express, Axios (for HTTP requests), CORS (for cross-origin requests)
- Database: MongoDB
- Containerization: Docker, Docker Compose
- Other: HTML, CSS

Getting Started

Prerequisites
- Node.js: Make sure Node.js in installed on your system. Download https://nodejs.org/en 
- Docker: Install Docker Desktop from https://www.docker.com/products/docker-desktop
- Docker Compose: Usually comes with Docker Desktop installation

Clone from Github (bash)
```bash
# Clone frontend repository
git clone https://github.com/Prostream/front_hackthon.git

# Clone backend repository
git clone https://github.com/Prostream/Climate-Shield.git
```

Docker Deployment
1. Make sure Docker and Docker Compose are installed
2. Run the following commands in the project root directory:
```bash
# Build and start all services
docker-compose up -d

# Build and start specific services
docker-compose up -d frontend  # Start frontend only
docker-compose up -d backend   # Start backend only
docker-compose up -d mongodb   # Start database only

# Stop all services
docker-compose down

# Rebuild and start services
docker-compose up -d --build
```

Service Information:
- Frontend service runs on port 80
- Backend service runs on port 12000
- MongoDB runs on port 27017

Access the Application:
- Frontend: http://localhost
- Backend API: http://localhost:12000

Local Development (without Docker)
Start server on local (open bash from path that clone from Github)
```bash
node server.js 
```

Access
- Open browser and go https://Localhost:12000 

Reference
- OpenWeatherMap.org. (n.d.). Interactive weather maps - OpenWeatherMap. https://openweathermap.org/weathermap?    
  basemap=map&cities=true&layer=$%7BmapLayer%7D&lat=30&lon=0&zoom=2
- NOAA/NWS Storm Prediction Center. (n.d.). https://www.spc.noaa.gov/
- Fire information. (n.d.). https://www.nifc.gov/fire-information
- Earthquake Hazards Program | U.S. Geological Survey. (2024, October 15). https://www.usgs.gov/programs/earthquake-hazards
- National Water Prediction Service - NOAA. (n.d.). https://water.weather.gov/ahps/
