package com.example.demo.controller;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.repo.AppUserRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200") // Angular dev server
public class AuthController {

    private final AppUserRepository repo;

    public AuthController(AppUserRepository repo) {
        this.repo = repo;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest req) {

        var userOpt = repo.findByUsername(req.getUsername());

        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401)
                    .body(new LoginResponse(false, "Invalid username or password"));
        }

        var user = userOpt.get();

        // Beginner version: plain-text password compare
        if (!user.getPassword().equals(req.getPassword())) {
            return ResponseEntity.status(401)
                    .body(new LoginResponse(false, "Invalid username or password"));
        }

        return ResponseEntity.ok(new LoginResponse(true, "Login success"));
    }
}
