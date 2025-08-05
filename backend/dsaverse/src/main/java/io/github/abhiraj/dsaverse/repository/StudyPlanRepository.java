package io.github.abhiraj.dsaverse.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.abhiraj.dsaverse.entity.StudyPlanEntity;

public interface StudyPlanRepository extends JpaRepository<StudyPlanEntity, Long>{

	List<StudyPlanEntity> findAllByOrderByCreatedAtDesc();
	
}
