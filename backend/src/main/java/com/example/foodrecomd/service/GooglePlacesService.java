package com.example.foodrecomd.service;

// Restaurant DTO
import com.example.foodrecomd.dto.RestaurantDTO;

// Main Package of Google Map Service, Manage connection and authentication with Google Map APIs (CORE)
import com.google.maps.GeoApiContext;

// 
import com.google.maps.PlacesApi;
import com.google.maps.model.*;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;


@Service
public class GooglePlacesService {
    
    private final GeoApiContext context;
    
    public GooglePlacesService(GeoApiContext context) {
        this.context = context;
    }
    
    // public List<RestaurantDTO> findNearbyRestaurants(double lat, double lng, int radiusMeters) {
    //     try {
    //         PlacesSearchResponse response = PlacesApi.nearbySearchQuery(context, 
    //                 new LatLng(lat, lng))
    //             .radius(radiusMeters)
    //             .type(PlaceType.RESTAURANT)
    //             .await();
            
    //         return convertToRestaurantDTOs(response.results);
            
    //     } catch (Exception e) {
    //         throw new RuntimeException("Error fetching nearby restaurants: " + e.getMessage(), e);
    //     }
    // }

    public List<RestaurantDTO> findNearbyRestaurants (double lat, double lng, int radiusMeter) {
        try {
            PlacesSearchResponse response = PlacesApi.nearbySearchQuery(context, 
                new LatLng(lat, lng))
                .radius(radiusMeter)
                .type(PlaceType.RESTAURANT)
                .awaitIgnoreError();

            // Filter result
            Arrays.sort( response.results , (r1, r2) -> {
                double score1 = caculateScore(r1, lat, lng);
                double score2 = caculateScore(r2, lat, lng);
                return Double.compare(score2, score1);
            });

            return convertToRestaurantDTOs(response.results);

        }
        catch (Exception e){
            throw new RuntimeException("Error fetching nearby restaurant: " , e);
        }
    }


    // rating, popularity(totalReview), prozimity, price, opennow 
    public double caculateScore (PlacesSearchResult result, double userLat, double userLng ){
        
        // Rating Score
        double ratingScore = result.rating;
        
        // Total Review Score
        double popularityScore = Math.log(result.userRatingsTotal);

        // Prozimity Score
        double distanceScore = calculateDistance(
            userLat, userLng,
            result.geometry.location.lat,
            result.geometry.location.lng
        );

        // Price Score
        // double priceScore = getPriceScore(result.priceLevel);

        // Bonus opening score
        double openNowBonus = 0;
        if (result.openingHours != null && result.openingHours.openNow){
            openNowBonus = 2;
        }


        double finalScore = (ratingScore * popularityScore) * 0.5
                            + distanceScore * 0.2
                            // + priceScore * 0.1
                            + openNowBonus * 0.2;
        return finalScore;

    }
    
    // Using Haversin Fomular to calculate distance between two point 
    private double calculateDistance (double lat1,double lng1,double lat2,double lng2){
         final int EARTH_RADIUS = 6371000; // meters
        
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                   Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
                   Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return EARTH_RADIUS * c;
    }

    
    public PlaceDetails getPlaceDetails(String placeId) {
        try {
            return PlacesApi.placeDetails(context, placeId).await();
        } catch (Exception e) {
            throw new RuntimeException("Error fetching place details: " + e.getMessage(), e);
        }
    }
    
    private List<RestaurantDTO> convertToRestaurantDTOs(PlacesSearchResult[] results) {
        List<RestaurantDTO> restaurants = new ArrayList<>();
        
        for (PlacesSearchResult result : results) {
            RestaurantDTO dto = new RestaurantDTO();
            dto.setPlaceId(result.placeId);
            dto.setName(result.name);
            dto.setAddress(result.vicinity);
            dto.setRating(result.rating);
            dto.setTotalRatings(result.userRatingsTotal);
            dto.setLat(result.geometry.location.lat);
            dto.setLng(result.geometry.location.lng);
            
            // Set default price level since it's not available in nearby search
            dto.setPriceLevel("Not Available");
            
            if (result.openingHours != null) {
                dto.setOpenNow(result.openingHours.openNow);
            }
            
            if (result.photos != null && result.photos.length > 0) {
                List<String> photoRefs = Arrays.stream(result.photos)
                    .map(photo -> photo.photoReference)
                    .collect(Collectors.toList());
                dto.setPhotoReferences(photoRefs);
            }
            
            restaurants.add(dto);
        }
        
        return restaurants;
    }
}