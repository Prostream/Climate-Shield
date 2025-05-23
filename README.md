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
- Word2vec: Gensim
- LLM: microsoft/phi-1_5 
- Other: HTML, CSS

Getting Started

Prerequisites
- Node.js: Make sure Node.js in installed on your system. Download https://nodejs.org/en 
- Docker: Install Docker Desktop from https://www.docker.com/products/docker-desktop
- Docker Compose: Usually comes with Docker Desktop installation
- Word2Vector: Download word2vectore file from google drive https://drive.google.com/file/d/1qzobcrsJlBY8tjXsZf5E1FP9p4dONHzS/view?usp=sharing

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
4. clone llm-server into another folder
  ```bash
  #Build image
  docker build -t my-llm-server .

  #Run container (Please check if you run on CPU/GPU, edit dockerfile if necessary)
  docker run -d --gpus all -p 8000:8000 my-llm-server
  ```
 
Service Information:
- Frontend service runs on port 80
- Backend service runs on port 12000
- MongoDB runs on port 27017
- LLM runs on port 8000

Access the Application:
- Frontend: http://localhost
- Backend API: http://localhost:12000
- LLM: http://localhost:8000/docs


Local Development (without Docker)
Start server on local (open bash from path that clone from Github)
```bash
node server.js 
```

Access
- Open browser and go https://Localhost:12000 

Word2vec generate
  - Dataset download 
    - NLP with Disaster Tweets
      ```bash
      import kagglehub
      path = kagglehub.dataset_download("vbmokin/nlp-with-disaster-tweets-cleaning-data")
      print("Path to dataset files:", path)
      ```
    - About the Test Data(enwik8)
      ```bash
      from gensim.downloader import load as api_load
      wikitext = api_load('text8')
      ```
  - Gensim Word2vec training(Please check detail steps with Gensim_w2v_generate.ipynb)
    ```bash
    from gensim.models import Word2Vec
    model = Word2Vec(
    sentences = combined_corpus,    
    vector_size = 250,      
    window = 20,       
    sg = 1,            
    negative = 15,
    sample = 0.0001,     
    min_count = 2,        
    workers = 4,         
    epochs = 25)
    ```
Ngrok depoly
  - Download Ngrok
    ```bash
    ngrok config add-authtoken <YOUR_TOKEN>
    ngrok http <YOUR_ADDRESS>
    ```


Reference
- OpenWeatherMap.org. (n.d.). Interactive weather maps - OpenWeatherMap. https://openweathermap.org/weathermap?    
  basemap=map&cities=true&layer=$%7BmapLayer%7D&lat=30&lon=0&zoom=2
- NOAA/NWS Storm Prediction Center. (n.d.). https://www.spc.noaa.gov/
- Fire information. (n.d.). https://www.nifc.gov/fire-information
- Earthquake Hazards Program | U.S. Geological Survey. (2024, October 15). https://www.usgs.gov/programs/earthquake-hazards
- National Water Prediction Service - NOAA. (n.d.). https://water.weather.gov/ahps/
- NLP with Disaster Tweets - Cleaning Data. Vitalii Mokin. Kaggle Dataset. Avail-
able at: https://www.kaggle.com/datasets/vbmokin/nlp-with-disaster-tweets-clean
- About the Test Data. Matt Mahoney. Available at: https://mattmahoney.net/
dc/textdata.html
- Word2vec embeddings Gensim https://radimrehurek.com/gensim/models/word2vec.html
- Ngrok The flexible API gateway for instant https://ngrok.com/
