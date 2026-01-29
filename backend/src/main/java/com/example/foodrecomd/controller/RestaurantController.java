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
    
    @GetMapping("/test")
    public String test() {
        return "Food Recommendation API is working!";
    }
}