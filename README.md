🍽️ Food Recommendation App

A location-based mobile application that recommends nearby restaurants using intelligent scoring algorithms and real-time map interaction.

Built with React Native (Expo) and Java Spring Boot backend, integrated with Google Maps & Places API.

📱 Overview

This application helps users discover the best nearby restaurants based on:

📍 User’s current location

⭐ Rating

👥 Popularity (number of reviews)

💰 Price level

📏 Distance

🟢 Open-now status

Restaurants are displayed on an interactive map with dynamic markers and a bottom sheet UI for easy browsing.

🚀 Features

📍 Real-time GPS location detection

🗺️ Interactive Google Maps integration

📌 Dynamic restaurant markers

📊 Custom restaurant ranking algorithm

📱 Bottom sheet restaurant preview cards

🔄 Backend-powered data fetching

🧠 Distance + rating + popularity scoring system

⚡ Smooth map animation and UI transitions

🏗️ Tech Stack
Frontend

React Native (Expo)

TypeScript

react-native-maps

@gorhom/bottom-sheet

Expo Location

Backend

Java

Spring Boot

RESTful API architecture

Google Places API

Gradle



Factors considered:

⭐ Higher ratings increase score

👥 Popular places rank higher

📏 Closer restaurants score better

💰 Balanced pricing improves ranking

🟢 Open restaurants get bonus points

📂 Project Structure
FoodRecomdApp/
│
├── frontend/          # React Native Expo App
│   ├── app/
│   ├── src/components/
│   └── ...
│
├── backend/           # Spring Boot API
│   ├── controller/
│   ├── service/
│   ├── dto/
│   └── ...
│
└── README.md

⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/YOUR_USERNAME/food-recommendation-app.git
cd FoodRecomdApp

2️⃣ Backend Setup
cd backend
./gradlew bootRun


Backend runs at:

http://localhost:8080


For Android Emulator:

http://10.0.2.2:8080

3️⃣ Frontend Setup
cd frontend
npm install
npx expo start
