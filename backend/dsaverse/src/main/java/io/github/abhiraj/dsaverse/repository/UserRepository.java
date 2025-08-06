package io.github.abhiraj.dsaverse.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.abhiraj.dsaverse.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
	
	Optional<UserEntity> findByUsername(String username);
	
}
