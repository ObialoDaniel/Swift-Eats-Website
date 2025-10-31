package com.hc.swifteats.repository;

import com.hc.swifteats.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SwiftUserRepository extends JpaRepository<Users, Integer> {
    boolean existsByEmail(String email);
}
