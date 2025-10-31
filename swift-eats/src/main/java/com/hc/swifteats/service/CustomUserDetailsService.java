package com.hc.swifteats.service;

import com.hc.swifteats.entity.Users;
import com.hc.swifteats.repository.SwiftUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final SwiftUserRepository swiftUserRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users=swiftUserRepository.findByEmail(username).orElse(null);
        if (users!=null){
            return  org.springframework.security.core.userdetails.User
                    .withUsername(users.getEmail())
                    .password(users.getPassword())
                    .roles("USER")
                    .accountExpired(false)
                    .accountLocked(false)
                    .credentialsExpired(false)
                    .disabled(false)
                    .build();

        }else {
            throw new UsernameNotFoundException("User doesn't exists with this email "+username);
        }
    }
}
