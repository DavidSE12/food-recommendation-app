package com.example.foodrecomd.controller;

import com.example.foodrecomd.dto.UserRequest;
import com.example.foodrecomd.entity.User;
import com.example.foodrecomd.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody UserRequest request) {
        User saved = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
