package com.example.foodrecomd.service;

import com.example.foodrecomd.dto.UserRequest;
import com.example.foodrecomd.entity.User;
import com.example.foodrecomd.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(UserRequest request) {
        User user = new User();
        user.setName(request.getName());
        user.setAge(request.getAge());
        user.setWeight(request.getWeight());
        user.setBudget(request.getBudget());
        user.setPreferences(request.getPreferences());
        user.setFavoriteFoods(request.getFavoriteFoods());
        user.setAllergies(request.getAllergies());
        return userRepository.save(user);
    }
}
