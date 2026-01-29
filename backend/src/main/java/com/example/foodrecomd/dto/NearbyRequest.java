package com.example.foodrecomd.dto;

public class NearbyRequest {
    private double lat;
    private double lng;
    private double radiusKm;
    
    public NearbyRequest() {}
    
    public double getLat() {
        return lat;
    }
    
    public void setLat(double lat) {
        this.lat = lat;
    }
    
    public double getLng() {
        return lng;
    }
    
    public void setLng(double lng) {
        this.lng = lng;
    }
    
    public double getRadiusKm() {
        return radiusKm;
    }
    
    public void setRadiusKm(double radiusKm) {
        this.radiusKm = radiusKm;
    }
}