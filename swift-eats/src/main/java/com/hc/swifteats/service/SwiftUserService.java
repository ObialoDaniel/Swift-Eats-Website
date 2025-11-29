package com.hc.swifteats.service;

import com.hc.swifteats.dto.UserRequest;
import com.hc.swifteats.entity.Users;
import com.hc.swifteats.enums.Roles;
import com.hc.swifteats.repository.SwiftUserRepository;
import com.hc.swifteats.requests.LoginRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SwiftUserService {
    private final SwiftUserRepository swiftUserRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public Map<String, String> createUser(UserRequest user) {
        log.info("Create User: {}", user);
        if(swiftUserRepository.existsByEmail(user.getEmail())) {
            log.error("User with email {} already exists", user.getEmail());
            throw new RuntimeException("User with email " + user.getEmail() + " already exists");
        }
        String hashedPassword = passwordEncoder.encode(user.getPassword());
        Users users = Users.builder()
                .role(Roles.USER)
                .phone(user.getPhone())
                .lastName(user.getLastName())
                .firstName(user.getFirstName())
                .email(user.getEmail())
                .address(user.getAddress())
                .password(hashedPassword)
                .build();
         Users savedUser = swiftUserRepository.save(users);
         log.info("Created User with id : {}", savedUser.getId());

        Map<String,String> response = new  HashMap<>();
        response.put("code", "00");
        response.put("message", "User created successfully");
        return response;
    }

    public Map<String, Object> authenticate(LoginRequest request) {
        Map<String,Object> response = new  HashMap<>();
        log.info("Authenticate User: {}", request);
        Users user = swiftUserRepository.findByEmail(request.getEmail()).orElse(null);
        if(user == null) {
            log.error("User with email {} not found", request.getEmail());
            throw new RuntimeException("User with email " + request.getEmail() + " not found");
        }
        String hashedPassword = user.getPassword();
        if(!hashedPassword.equals(passwordEncoder.encode(hashedPassword))) {
            log.error("User passwords do not match");
            throw new RuntimeException("User passwords do not match");
        }
        String token =  jwtService.generateToken(user);
        String refreshToken = jwtService.generateRefreshToken(user);
        response.put("token", token);
        response.put("refreshToken",  refreshToken);
        return response;
    }
}
