package io.github.abhiraj.dsaverse.service;

import io.github.abhiraj.dsaverse.dto.JwtRequest;
import io.github.abhiraj.dsaverse.dto.JwtResponse;
import io.github.abhiraj.dsaverse.security.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private AuthenticationManager authenticationManager;
    private JwtUtil jwtUtil;
    private UserDetailsService userDetailsService;

    public ResponseEntity<JwtResponse> authenticateUser(JwtRequest jwtRequest) {

        Authentication authenticate = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        jwtRequest.getUsername(), jwtRequest.getPassword()
                )
        );

        String token = jwtUtil.generateToken(userDetailsService.loadUserByUsername(jwtRequest.getUsername()));

        return ResponseEntity.ok(new JwtResponse(token));
    }

}
