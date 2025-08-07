package io.github.abhiraj.dsaverse.service;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import io.github.abhiraj.dsaverse.dto.UserDTO;
import io.github.abhiraj.dsaverse.entity.Role;
import io.github.abhiraj.dsaverse.entity.UserEntity;
import io.github.abhiraj.dsaverse.repository.UserRepository;
import lombok.AllArgsConstructor;

@Service
//@AllArgsConstructor
public class UserService {

	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

	public ResponseEntity<UserDTO> registerNewUser(UserDTO userDto) {
		UserEntity user = userDTOToUserEntity(userDto);
		
		if(userRepository.findByUsername(user.getUsername()).isPresent()) {
			return ResponseEntity.internalServerError().body(null);
		}
		user.setRole(Role.USER);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);
		return ResponseEntity.ok(userDto);
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
