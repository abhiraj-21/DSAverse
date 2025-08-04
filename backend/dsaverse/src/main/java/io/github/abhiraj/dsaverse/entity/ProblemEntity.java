package io.github.abhiraj.dsaverse.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemEntity {

	@Id
	@GeneratedValue
	private long id;
	private String problemName;
	private boolean isCompleted;
	@ManyToOne
	@JoinColumn(name = "study_plan_id")
	private StudyPlanEntity studyPlan;
	
	@PrePersist
	public void prePersist() {
		isCompleted = false;
	}
	
}
