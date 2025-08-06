package io.github.abhiraj.dsaverse.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import io.github.abhiraj.dsaverse.dto.UserDTO;
import io.github.abhiraj.dsaverse.entity.Role;
import io.github.abhiraj.dsaverse.entity.UserEntity;
import io.github.abhiraj.dsaverse.repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {

	private UserRepository userRepository;
	
	public ResponseEntity<UserDTO> registerNewUser(UserDTO userDto) {
		UserEntity user = userDTOToUserEntity(userDto);
		
		if(userRepository.findByUsername(user.getUsername()).isPresent()) {
			return ResponseEntity.internalServerError().body(null);
		}
		user.setRole(Role.USER);
		userRepository.save(user);
		return ResponseEntity.ok(userDto);
	}
	
	public ResponseEntity<UserDTO> login(UserDTO userDto) {
		UserEntity user = userRepository.findByUsername(userDto.getUsername()).orElse(null);
		
		if (user == null) {
		    return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		}
		
		if (!user.isActivated()) {
		    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}
		
		if (!userDto.getPassword().equals(user.getPassword())) {
		    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
		}

		UserDTO responseUserDto = userEntityToUserDTO(user);
		return ResponseEntity.ok(responseUserDto);
	}
	
	public UserEntity userDTOToUserEntity(UserDTO userDTO) {
		UserEntity user = new UserEntity();
		user.setEmail(userDTO.getEmail());
		user.setPassword(userDTO.getPassword());
		user.setUsername(userDTO.getUsername());
		user.setActivated(true);
		return user;
	}
	
	public UserDTO userEntityToUserDTO(UserEntity user) {
		UserDTO userDto = new UserDTO();
		userDto.setEmail(user.getEmail());
		userDto.setUsername(user.getUsername());
		userDto.setActivated(user.isActivated());
		return userDto;		
	}
	
}
