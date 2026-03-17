# Food Recommendation App

A location-based mobile application that helps users discover nearby restaurants using intelligent scoring algorithms, real-time map interaction, and an AI food assistant.

Built with **React Native (Expo)** for the frontend and **Java Spring Boot** for the backend, integrated with Google Maps & Places API and OpenRouter AI.

---

## Overview

The app helps users discover the best nearby restaurants based on:

- Current GPS location
- Rating and popularity (review count)
- Distance
- Open-now status
- Personal dietary preferences and budget

---

## Features

- Real-time GPS location detection
- Interactive Google Maps with restaurant markers and bottom sheet
- Text search for restaurants powered by Google Places Text Search API
- Custom multi-factor restaurant ranking algorithm
- AI Food Assistant chatbox (powered by OpenRouter)
- User profile with dietary preferences, allergies, and budget
- Wishlist / favorites displayed on the home screen
- Restaurant detail screen with photos, reviews, and opening hours
- Auto-refresh nearby restaurants every 5 minutes

---

## Tech Stack

### Frontend
| Library | Purpose |
|---|---|
| React Native + Expo | Mobile app framework |
| TypeScript | Type safety |
| Expo Router | File-based navigation |
| react-native-maps | Interactive map |
| @gorhom/bottom-sheet | Restaurant list bottom sheet |
| expo-location | GPS access |
| AsyncStorage | Local user profile persistence |
| OpenRouter API | AI chat assistant |

### Backend
| Library | Purpose |
|---|---|
| Java 17 | Language |
| Spring Boot 4 | REST API framework |
| Google Maps Java Client | Places API integration |
| PostgreSQL + Hibernate | Database (user profiles) |
| Gradle | Build tool |

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/nearby` | Find nearby restaurants `{ lat, lng, radiusKm }` |
| `GET` | `/api/restaurant/{placeId}` | Full restaurant details |
| `GET` | `/api/search?query=&lat=&lng=` | Text search for restaurants |
| `POST` | `/api/users` | Save / update user profile |
| `GET` | `/api/test` | Health check |

---

## Scoring Algorithm

Restaurants returned by `/api/nearby` are ranked by a multi-factor score:

```
score = (rating × log(totalReviews)) × 0.5
      + distanceScore × 0.2
      + openNowBonus × 0.2
```

Distance is calculated using the Haversine formula.

---

## Project Structure

```
FoodRecomdApp/
├── frontend/                        # React Native Expo app
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── home.tsx             # Home screen
│   │   │   ├── explore.tsx          # Map + search screen
│   │   │   └── profile.tsx          # User profile screen
│   │   └── restaurant/[placeId].tsx # Restaurant detail screen
│   └── src/
│       ├── components/
│       │   ├── home/
│       │   │   ├── AIChatModal.tsx        # AI chatbox FAB + modal
│       │   │   ├── CategoriesSection.tsx  # Filtered restaurant cards
│       │   │   ├── WishlistSection.tsx    # Saved restaurants
│       │   │   ├── SearchResultsModal.tsx # Search results
│       │   │   └── CompactRestaurantCard.tsx
│       │   ├── explore/
│       │   │   └── RestaurantBottomSheet.tsx
│       │   └── profile/
│       │       └── ProfileHeader.tsx
│       ├── context/
│       │   ├── LocationContext.tsx    # GPS state
│       │   ├── RestaurantContext.tsx  # Restaurants + favorites state
│       │   └── UserContext.tsx        # User profile state
│       └── config/
│           └── ai.ts                 # OpenRouter API config
│
├── backend/                          # Spring Boot API
│   └── src/main/java/com/example/foodrecomd/
│       ├── controller/
│       │   ├── RestaurantController.java
│       │   └── UserController.java
│       ├── service/
│       │   ├── GooglePlacesService.java
│       │   └── UserService.java
│       ├── dto/
│       │   ├── RestaurantDTO.java
│       │   ├── RestaurantDetails.java
│       │   ├── NearbyRequest.java
│       │   └── UserRequest.java
│       ├── entity/
│       │   └── User.java
│       └── repository/
│           └── UserRepository.java
│
└── README.md
```

---

## Setup

### Prerequisites
- Node.js 18+
- Java 17+
- Docker (for PostgreSQL via Docker Compose)
- Android emulator or physical device

### 1. Clone

```bash
git clone https://github.com/DavidSE12/food-recommendation-app.git
cd FoodRecomdApp
```

### 2. Backend

Create a `.env` file in `backend/`:
```
GOOGLE_MAPS_API_KEY=your_key_here
```

Start the backend (Docker Compose starts PostgreSQL automatically):
```bash
cd backend
GOOGLE_MAPS_API_KEY=$(grep GOOGLE_MAPS_API_KEY .env | cut -d= -f2) ./gradlew bootRun
```

Backend runs at `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npx expo start
```

> **Physical device:** Update the API base URL in `src/context/RestaurantContext.tsx` and `src/context/UserContext.tsx` to your machine's local network IP address (e.g. `192.168.1.x`). The default `192.168.56.1` only works with the Android emulator.

---

## Known Limitations

- Favorites are stored client-side only — no backend persistence
- User profile is device-local with no authentication
- No JWT / session management

---

## Author

**David Huynh**
Bachelor of Information Technology (Software Engineering)
La Trobe University
