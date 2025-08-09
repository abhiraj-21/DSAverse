package io.github.abhiraj.dsaverse.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import io.github.abhiraj.dsaverse.dto.StudyPlanDTO;
import io.github.abhiraj.dsaverse.dto.StudyPlanResponseDTO;
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

	@GetMapping("/get-all-plans")
	public ResponseEntity<StudyPlanResponseDTO> retrieveAllPlans(){
		return ResponseEntity.ok(studyPlanService.getMyStudyPlan());
	}

    @PutMapping("/update-problem-status/{problemId}")
    public ResponseEntity<Void> updateProblemStatus(@PathVariable Long problemId, @RequestBody Boolean isCompleted) {
        if (problemId == null || problemId <= 0) {
            return ResponseEntity.badRequest().body(null);
        }
        if (isCompleted == null) {
            return ResponseEntity.badRequest().body(null);
        }
        studyPlanService.updateProblemStatus(problemId, isCompleted);
        return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }
	
}
