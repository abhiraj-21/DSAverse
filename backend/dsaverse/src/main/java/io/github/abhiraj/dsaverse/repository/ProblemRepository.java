package io.github.abhiraj.dsaverse.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import io.github.abhiraj.dsaverse.entity.ProblemEntity;

public interface ProblemRepository extends JpaRepository<ProblemEntity, Long>{

}
