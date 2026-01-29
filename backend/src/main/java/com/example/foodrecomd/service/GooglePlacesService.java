package com.example.foodrecomd.service;

import com.example.foodrecomd.dto.RestaurantDTO;
import com.google.maps.GeoApiContext;
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
    
    public List<RestaurantDTO> findNearbyRestaurants(double lat, double lng, int radiusMeters) {
        try {
            PlacesSearchResponse response = PlacesApi.nearbySearchQuery(context, 
                    new LatLng(lat, lng))
                .radius(radiusMeters)
                .type(PlaceType.RESTAURANT)
                .await();
            
            return convertToRestaurantDTOs(response.results);
            
        } catch (Exception e) {
            throw new RuntimeException("Error fetching nearby restaurants: " + e.getMessage(), e);
        }
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