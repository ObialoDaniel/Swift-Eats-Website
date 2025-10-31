package com.hc.swifteats.controller;

import com.hc.swifteats.dto.UserRequest;
import com.hc.swifteats.entity.Users;
import com.hc.swifteats.repository.SwiftUserRepository;
import com.hc.swifteats.requests.LoginRequest;
import com.hc.swifteats.service.SwiftUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController("api/users")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin
public class SwiftUserController {
    private final SwiftUserService swiftUserService;
    @PostMapping()
    public ResponseEntity<?> createUser(@RequestBody UserRequest user) {
        try {
            Map<String, String> result = swiftUserService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        }catch (Exception e) {
            log.error("error", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String,Object> result = new HashMap<>();
        try {
            log.info("login request: {}", request);
            result = swiftUserService.authenticate(request);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch(IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
