package com.example.foodrecomd.dto;

import java.util.List;

public class RestaurantDTO {
    private String placeId;
    private String name;
    private String address;
    private double rating;
    private int totalRatings;
    private String priceLevel;
    private double lat;
    private double lng;
    private boolean openNow;
    private List<String> photoReferences;
    
    // Getters and Setters
    public String getPlaceId() { return placeId; }
    public void setPlaceId(String placeId) { this.placeId = placeId; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }
    
    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
    
    public int getTotalRatings() { return totalRatings; }
    public void setTotalRatings(int totalRatings) { this.totalRatings = totalRatings; }
    
    public String getPriceLevel() { return priceLevel; }
    public void setPriceLevel(String priceLevel) { this.priceLevel = priceLevel; }
    
    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }
    
    public double getLng() { return lng; }
    public void setLng(double lng) { this.lng = lng; }
    
    public boolean isOpenNow() { return openNow; }
    public void setOpenNow(boolean openNow) { this.openNow = openNow; }
    
    public List<String> getPhotoReferences() { return photoReferences; }
    public void setPhotoReferences(List<String> photoReferences) { 
        this.photoReferences = photoReferences; 
    }
}