package io.github.abhiraj.dsaverse.controller;

import io.github.abhiraj.dsaverse.dto.JwtRequest;
import io.github.abhiraj.dsaverse.dto.JwtResponse;
import io.github.abhiraj.dsaverse.dto.UserDTO;
import io.github.abhiraj.dsaverse.service.AuthService;
import io.github.abhiraj.dsaverse.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {

    private UserService userService;
    private AuthService authService;

    @PostMapping(value = "/register")
    public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDto) {
        return userService.registerNewUser(userDto);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest) {
        return authService.authenticateUser(jwtRequest);
    }

}
