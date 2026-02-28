package com.example.foodrecomd.service;

// Restaurant DTO
import com.example.foodrecomd.dto.RestaurantDTO;
import com.example.foodrecomd.dto.RestaurantDetails;
import com.example.foodrecomd.dto.Review;

import com.example.foodrecomd.config.GoogleMapsConfig;


// Main Package of Google Map Service, Manage connection and authentication with Google Map APIs (CORE)
import com.google.maps.GeoApiContext;

// 
import com.google.maps.PlacesApi;
import com.google.maps.model.*;
import org.springframework.stereotype.Service;
import com.google.maps.PlaceDetailsRequest;



import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;




@Service
public class GooglePlacesService {
    
    private final GeoApiContext context;
    private final GoogleMapsConfig googleMapsConfig;

    public GooglePlacesService(GeoApiContext context, GoogleMapsConfig googleMapsConfig) {
        this.context = context;
        this.googleMapsConfig = googleMapsConfig;
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
                .await();
            if (response == null) {
                throw new RuntimeException(
                        "Google Places API returned null response. Possible causes: " +
                                "invalid API key, quota exceeded, request denied, or network issue."
                );
            }
            // Filter result
            Arrays.sort( response.results , (r1, r2) -> {
                double score1 = caculateScore(r1, lat, lng);
                double score2 = caculateScore(r2, lat, lng);
                return Double.compare(score2, score1);
            });

            // PlacesSearchResult[] price = response.results;
            // String check = price.priceLevel;

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
        // double priceScore = getPriceScore(result.priceLeve);

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

    
//    public PlaceDetails getPlaceDetails(String placeId) {
//        try {
//            return PlacesApi.placeDetails(context, placeId).await();
//        } catch (Exception e) {
//            throw new RuntimeException("Error fetching place details: " + e.getMessage(), e);
//        }
//    }
//
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
            // dto.setPriceLevel(result.pri);
            
            if (result.openingHours != null) {
                dto.setOpenNow(result.openingHours.openNow);
            }
            
            if (result.photos != null && result.photos.length > 0) {
                List<String> photoRefs = Arrays.stream(result.photos)
                        .map(photo -> photo.photoReference)
                        .collect(Collectors.toList());
                dto.setPhotoReferences(photoRefs);

                String photoUrl = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=" +
                        photoRefs.get(0) + "&key=" + googleMapsConfig.getApiKey();
                dto.setPhotoUrl(photoUrl);
            }
            restaurants.add(dto);
        }

        return restaurants;
    }

    /**
     * Get detailed information about a restaurant by Place ID
     * Uses NEW Place Details API with field selection for cost optimization
     */
    public RestaurantDetails getRestaurantDetails(String placeId) {
        try {
            // Define which fields to fetch (cost-optimized selection)
            // Be strategic: only request fields you actually need!

            PlaceDetailsRequest request = PlacesApi.placeDetails(context, placeId);

            // Specify exactly which fields we need
            // This is CRITICAL for cost control!
            request.fields(
                    // ESSENTIALS (cheaper tier)
                    PlaceDetailsRequest.FieldMask.FORMATTED_ADDRESS,

                    // PRO (medium cost)
                    PlaceDetailsRequest.FieldMask.NAME,

                    // ENTERPRISE (higher cost) - only if you need them
                    PlaceDetailsRequest.FieldMask.OPENING_HOURS,
                    PlaceDetailsRequest.FieldMask.WEBSITE,
                    PlaceDetailsRequest.FieldMask.PRICE_LEVEL,

                    // ENTERPRISE PLUS (most expensive) - only if you need them
                    PlaceDetailsRequest.FieldMask.REVIEWS,
                    PlaceDetailsRequest.FieldMask.PHOTOS
            );

            PlaceDetails placeDetails = request.await();

            // Convert to our DTO
            RestaurantDetails details = new RestaurantDetails();
            details.setPlaceId(placeId);

            // NAME (Pro SKU)
            details.setName(placeDetails.name);

            // FORMATTED_ADDRESS (Essentials SKU)
            details.setAddress(placeDetails.formattedAddress);

            // WEBSITE (Enterprise SKU)
            details.setWebsite(placeDetails.website != null ? placeDetails.website.toString() : null);

            // PRICE_LEVEL (Enterprise SKU)
            if (placeDetails.priceLevel != null) {
                int level = placeDetails.priceLevel.ordinal() + 1;
                details.setPriceLevel("$".repeat(level));
            }


            // OPENING_HOURS (Enterprise SKU)
            if (placeDetails.openingHours != null) {
                if (placeDetails.openingHours.weekdayText != null) {
                    details.setOpeningHours(Arrays.asList(placeDetails.openingHours.weekdayText));
                } else {
                    details.setOpeningHours(new ArrayList<>());
                }
            } else {
                details.setOpeningHours(new ArrayList<>());
            }

            // PHOTOS (Enterprise Plus SKU)
            if (placeDetails.photos != null && placeDetails.photos.length > 0) {
                List<String> photoUrls = Arrays.stream(placeDetails.photos)
                        .limit(12) // Max 10 photos
                        .map(photo -> buildPhotoUrl(photo.photoReference))
                        .collect(Collectors.toList());
                details.setPhotos(photoUrls);
            } else {
                details.setPhotos(new ArrayList<>());
            }

            // REVIEWS (Enterprise Plus SKU)
            if (placeDetails.reviews != null && placeDetails.reviews.length > 0) {
                List<Review> reviewList = Arrays.stream(placeDetails.reviews)
                        .limit(8) // Max 5 reviews
                        .map(review -> {
                            Review r = new Review();
                            r.setAuthorName(review.authorName);
                            r.setRating(review.rating);
                            r.setText(review.text);
                            r.setTime(review.time);
                            return r;
                        })
                        .collect(Collectors.toList());
                details.setReviews(reviewList);
            } else {
                details.setReviews(new ArrayList<>());
            }

            return details;

        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch place details: " + e.getMessage(), e);
        }
    }
    /**
     * Build Google Places Photo API URL
     */
    private String buildPhotoUrl(String photoReference) {
        return String.format(
                "https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=%s&key=%s",
                photoReference,
                googleMapsConfig.getApiKey()
        );
    }

    }