package com.example.foodrecomd.controller;

import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.example.foodrecomd.dto.RestaurantDetails;

import com.example.foodrecomd.dto.NearbyRequest;
import com.example.foodrecomd.dto.RestaurantDTO;
import com.example.foodrecomd.service.GooglePlacesService;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*") // Allow mobile app to access
public class RestaurantController {

    private final GooglePlacesService googlePlacesService;
    
    public RestaurantController(GooglePlacesService googlePlacesService) {
        this.googlePlacesService = googlePlacesService;
    }

    @PostMapping("/nearby")
    public List<RestaurantDTO> getNearbyRestaurants(@RequestBody NearbyRequest req) {
        int radiusMeters = (int)(req.getRadiusKm() * 1000);
        return googlePlacesService.findNearbyRestaurants(
            req.getLat(), 
            req.getLng(), 
            radiusMeters
        );
    }

    /**
     * GET /api/restaurant/{placeId}
     * Get FULL restaurant details (all fields)
     * Use this when user wants complete information
     *
     * Cost: Higher (includes photos, reviews)
     */
    @GetMapping("/restaurant/{placeId}")
    public ResponseEntity<?> getRestaurantDetails(
            @PathVariable String placeId){
        try {
            // Validate place ID
            if (placeId == null || placeId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body("Place ID is required");
            }

            RestaurantDetails details = googlePlacesService.getRestaurantDetails(placeId);

            return ResponseEntity.ok(details);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to fetch restaurant details: " + e.getMessage());
        }
    }

    
    @GetMapping("/test")
    public String test() {
        return "Food Recommendation API is working!";
    }
}