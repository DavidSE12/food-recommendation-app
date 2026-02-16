package com.example.foodrecomd.controller;

import org.springframework.web.bind.annotation.*;

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
            @PathVariable String placeId,
            @RequestParam(defaultValue = "full") String detail) {
        try {
            // Validate place ID
            if (placeId == null || placeId.trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ErrorResponse("Place ID is required"));
            }

            RestaurantDetails details;

            // Choose detail level based on query param
            if ("basic".equalsIgnoreCase(detail)) {
                // Budget-friendly: only essential fields
                details = googlePlacesService.getRestaurantDetailsBasic(placeId);
            } else {
                // Full details: all fields including photos and reviews
                details = googlePlacesService.getRestaurantDetails(placeId);
            }

            return ResponseEntity.ok(details);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Failed to fetch restaurant details: " + e.getMessage()));
        }
    }

    
    @GetMapping("/test")
    public String test() {
        return "Food Recommendation API is working!";
    }
}