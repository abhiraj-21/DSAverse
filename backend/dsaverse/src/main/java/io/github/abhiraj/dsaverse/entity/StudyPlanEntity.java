package io.github.abhiraj.dsaverse.entity;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyPlanEntity {
	
	@Id
	@GeneratedValue
	private long id;
	@Column(updatable = false)
	@CreationTimestamp
	private LocalDate createdAt;
	private int totalProblems;
	@OneToMany(mappedBy = "studyPlan", cascade = CascadeType.ALL)
	private List<ProblemEntity> problems;
	@ManyToOne
	@JoinColumn(name = "user_id")
	private UserEntity user;
	
}
