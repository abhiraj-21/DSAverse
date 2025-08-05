package io.github.abhiraj.dsaverse.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudyPlanResponseDTO {

	private Long id;
	private int totalProblems;
	private List<ProblemResponseDTO> problemList;
	private LocalDate createdAt;
	
}
