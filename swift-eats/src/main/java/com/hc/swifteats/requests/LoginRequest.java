package com.hc.swifteats.requests;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    @Email(message = "wrong email structure")
    private String email;
    @NotBlank(message = "field can not be blank")
    private String password;
}
