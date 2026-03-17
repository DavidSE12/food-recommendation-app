package com.example.foodrecomd.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String age;

    private String weight;

    private String budget;

    @ElementCollection
    @CollectionTable(name = "user_preferences", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "preference")
    private List<String> preferences = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "user_favorite_foods", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "food")
    private List<String> favoriteFoods = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "user_allergies", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "allergy")
    private List<String> allergies = new ArrayList<>();

    // Getters and Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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
