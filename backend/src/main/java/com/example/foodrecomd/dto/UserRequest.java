package com.example.foodrecomd.dto;

import java.util.List;

public class UserRequest {

    private String name;
    private String age;
    private String weight;
    private String budget;
    private List<String> preferences;
    private List<String> favoriteFoods;
    private List<String> allergies;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getAge() { return age; }
    public void setAge(String age) { this.age = age; }

    public String getWeight() { return weight; }
    public void setWeight(String weight) { this.weight = weight; }

    public String getBudget() { return budget; }
    public void setBudget(String budget) { this.budget = budget; }

    public List<String> getPreferences() { return preferences; }
    public void setPreferences(List<String> preferences) { this.preferences = preferences; }

    public List<String> getFavoriteFoods() { return favoriteFoods; }
    public void setFavoriteFoods(List<String> favoriteFoods) { this.favoriteFoods = favoriteFoods; }

    public List<String> getAllergies() { return allergies; }
    public void setAllergies(List<String> allergies) { this.allergies = allergies; }
}
