package io.github.abhiraj.dsaverse.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtUtil {
	
	@Value("${jwt.secret}")
	private String secret;
	@Value("${jwt.expirationDateInMs}")
	private int jwtExpirationInMs;
	
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<>();
		boolean isAdmin = userDetails.getAuthorities().stream()
									.anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));
		boolean isUser = userDetails.getAuthorities().stream()
				.anyMatch(a -> a.getAuthority().equals("ROLE_USER"));
		
		if(isAdmin) {
			claims.put("isAdmin", true);
		}
	
		if(isUser) {
			claims.put("isUser", true);
		}
		
		String username = userDetails.getUsername();
		Date issuedAt = new Date(System.currentTimeMillis());
		Date expiration = new Date(issuedAt.getTime() + jwtExpirationInMs);
		
		String token = Jwts.builder()
							.setClaims(claims)
							.setSubject(username)
							.setIssuedAt(issuedAt)
							.setExpiration(expiration)
							.signWith(SignatureAlgorithm.HS512, secret)
							.compact();
		
		return token;
	}
	
	public String getUsernameFromToken(String token) {
		Claims body = Jwts.parser()
						.setSigningKey(secret)
						.parseClaimsJws(token)
						.getBody();
		return body.getSubject();
	}
	
	//Checks if the username coming from backend matches to any username from our DB
	public boolean validateToken(String token, UserDetails userDetails) {
		String usernameFromToken = getUsernameFromToken(token);
		if(userDetails.getUsername().equals(usernameFromToken)) {
			Claims body = Jwts.parser()
					.setSigningKey(secret)
					.parseClaimsJws(token)
					.getBody();
			if(body.getExpiration().after(new Date())) {
				return true;
			}	
		}
		return false;
	}
	
}
