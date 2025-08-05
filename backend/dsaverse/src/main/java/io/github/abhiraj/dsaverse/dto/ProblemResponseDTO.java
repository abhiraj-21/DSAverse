package io.github.abhiraj.dsaverse.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemResponseDTO {

	private Long id;
	private String problemName;
	private boolean completed;
	
}
