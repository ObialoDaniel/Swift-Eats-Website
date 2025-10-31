package com.hc.swifteats.service;

import com.hc.swifteats.entity.Users;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class JwtService {
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private Long expiration;

    @Value("${jwt.refresh-expiration}")
    private Long refreshExpiration;
    private SecretKey getsecretKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }
    public String generateToken(Users user) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", user.getId());
        claims.put("role", user.getRole());
        claims.put("email",  user.getEmail());
        return Jwts.builder()
                .claims(claims)
                .issuedAt(new Date())
                .subject(user.getEmail())
                .expiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getsecretKey())
                .compact();
    }
    public String generateRefreshToken(Users user) {
        return Jwts.builder()
                .subject(user.getEmail())
                .expiration(new Date(System.currentTimeMillis()+refreshExpiration))
                .issuedAt(new Date())
                .signWith(getsecretKey())
                .compact();
    }
    public boolean isTokenValid(String token) {
        try {
            Claims claims = extractClaims(token);
            return claims.getSubject() != null && !isTokenExpired(token);
        } catch (JwtException e) {
            log.error("Invalid JWT token: {}", e.getMessage());
            return false;
        }
    }

    public boolean isTokenExpired(String token) {
        try {
            return extractClaims(token).getExpiration().before(new Date());
        } catch (JwtException e) {
            return true;
        }
    }
    public Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(getsecretKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}
