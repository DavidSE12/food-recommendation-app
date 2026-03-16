# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A location-based restaurant discovery app. The **frontend** is a React Native Expo mobile app; the **backend** is a Java Spring Boot REST API integrated with Google Places API.

## Commands

### Frontend (`frontend/`)
```bash
npm start           # Start Expo dev server
npm run android     # Run on Android emulator
npm run ios         # Run on iOS simulator
npm run lint        # Run ESLint
```

### Backend (`backend/`)
```bash
./gradlew bootRun   # Run Spring Boot server (port 8080)
./gradlew build     # Build artifact
./gradlew test      # Run tests
```

## Architecture

### Frontend
- **Routing:** File-based with Expo Router. Tabs at `app/(tabs)/`, dynamic restaurant detail at `app/restaurant/[placeId].tsx`.
- **State:** React Context API only — `LocationContext` (GPS via expo-location) and `RestaurantContext` (restaurant data + favorites, auto-refreshes every 5 min).
- **API base URL:** Hardcoded to `http://192.168.56.1:8080` (Android emulator host IP). Must be changed for physical devices or other environments.
- **Path alias:** `@/*` maps to `src/*`.

### Backend
- **Layers:** Controller → Service → Google Places API. DTOs for data transfer.
- **Key endpoints:**
  - `POST /api/nearby` — find nearby restaurants (body: `{ lat, lng, radiusKm }`)
  - `GET /api/restaurant/{placeId}` — full restaurant details
  - `GET /api/test` — health check
- **Ranking algorithm:** Multi-factor score combining rating, log(userRatingsTotal), Haversine distance, and open-now bonus. See `GooglePlacesService.java`.
- **Google Maps:** Uses field masking on Places API requests to minimize billing costs.

### Known Gaps
- PostgreSQL is defined in `compose.yaml` but **not yet integrated** — no Spring Data JPA wiring exists.
- Favorites are stored client-side only; no backend favorites endpoint is implemented.
- User ID is hardcoded to `'user_123'` in `RestaurantContext`.
