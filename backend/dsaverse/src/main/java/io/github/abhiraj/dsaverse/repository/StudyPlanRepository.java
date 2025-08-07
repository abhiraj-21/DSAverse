package io.github.abhiraj.dsaverse.repository;

import java.util.List;
import java.util.Optional;

import io.github.abhiraj.dsaverse.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import io.github.abhiraj.dsaverse.entity.StudyPlanEntity;

public interface StudyPlanRepository extends JpaRepository<StudyPlanEntity, Long>{

	List<StudyPlanEntity> findAllByOrderByCreatedAtDesc();

    Optional<StudyPlanEntity> findByUser(UserEntity user);
}
