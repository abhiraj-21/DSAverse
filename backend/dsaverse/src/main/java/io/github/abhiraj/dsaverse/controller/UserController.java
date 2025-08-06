package io.github.abhiraj.dsaverse.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.abhiraj.dsaverse.dto.UserDTO;
import io.github.abhiraj.dsaverse.service.UserService;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UserController {

	UserService userService;
	
	@PostMapping(value = "/register")
	public ResponseEntity<UserDTO> register(@RequestBody UserDTO userDto) {
		return userService.registerNewUser(userDto);
	}
	
	@PostMapping(value = "/login")
	public ResponseEntity<UserDTO> login(@RequestBody UserDTO userDto) {
		return userService.login(userDto);
	}

}
