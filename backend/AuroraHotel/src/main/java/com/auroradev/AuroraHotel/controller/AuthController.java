package com.auroradev.AuroraHotel.controller;

import com.auroradev.AuroraHotel.dto.LoginRequest;
import com.auroradev.AuroraHotel.dto.Response;
import com.auroradev.AuroraHotel.entity.User;
import com.auroradev.AuroraHotel.service.interfac.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private IUserService userService;
    

    @PostMapping("/register")
    public ResponseEntity<Response> register(@RequestBody @jakarta.validation.Valid User user) {
        Response response = userService.register(user);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<Response> login(@RequestBody @jakarta.validation.Valid LoginRequest loginRequest) {
        Response response = userService.login(loginRequest);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
