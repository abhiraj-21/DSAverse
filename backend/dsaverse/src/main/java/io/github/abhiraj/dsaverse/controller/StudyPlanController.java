package io.github.abhiraj.dsaverse.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.github.abhiraj.dsaverse.dto.StudyPlanDTO;
import io.github.abhiraj.dsaverse.service.StudyPlanService;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class StudyPlanController {

	private final StudyPlanService studyPlanService;
	
	
	@PostMapping("/save-plan")
	public ResponseEntity<StudyPlanDTO> savePlan(@RequestBody StudyPlanDTO response) {
		studyPlanService.savePlan(response);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
}
