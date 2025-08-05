package io.github.abhiraj.dsaverse.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.abhiraj.dsaverse.dto.ProblemResponseDTO;
import io.github.abhiraj.dsaverse.dto.StudyPlanDTO;
import io.github.abhiraj.dsaverse.dto.StudyPlanResponseDTO;
import io.github.abhiraj.dsaverse.entity.ProblemEntity;
import io.github.abhiraj.dsaverse.entity.StudyPlanEntity;
import io.github.abhiraj.dsaverse.repository.StudyPlanRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StudyPlanService {

	private final StudyPlanRepository studyPlanRepository;

	public void savePlan(StudyPlanDTO response) {
		
		StudyPlanEntity newPlan = new StudyPlanEntity();
		newPlan.setTotalProblems(response.getProblemList().size());
		
		List<ProblemEntity> problems = new ArrayList<>();
		for (String problemName : response.getProblemList()) {
			ProblemEntity problem = new ProblemEntity();
			problem.setProblemName(problemName);
			problem.setCompleted(false);
			problem.setStudyPlan(newPlan);
			problems.add(problem);
		}
		
		newPlan.setProblems(problems);
		studyPlanRepository.save(newPlan);
	}

	public List<ProblemResponseDTO> problemEntityToProblemResponseDTO(List<ProblemEntity> entities){
		List<ProblemResponseDTO> problems = new ArrayList<>();
		for(ProblemEntity entity : entities) {
			ProblemResponseDTO problem = new ProblemResponseDTO();
			problem.setCompleted(entity.getCompleted());
			problem.setId(entity.getId());
			problem.setProblemName(entity.getProblemName());
			problems.add(problem);
		}
		return problems;
	}
	
	public StudyPlanResponseDTO planEntityToPlanResponseDTO(StudyPlanEntity entity) {
		StudyPlanResponseDTO response = new StudyPlanResponseDTO();
		response.setId(entity.getId());
		response.setCreatedAt(entity.getCreatedAt());
		
		List<ProblemEntity> problems = entity.getProblems();
		response.setProblemList(problemEntityToProblemResponseDTO(problems));
		
		response.setTotalProblems(problems.size());
		
		return response;
	}
	
	@Transactional(readOnly = true)
	public List<StudyPlanResponseDTO> getAllStudyPlans() {
		List<StudyPlanEntity> allStudyPlans = studyPlanRepository.findAllByOrderByCreatedAtDesc();
		List<StudyPlanResponseDTO> response = new ArrayList<>();
		
		for(StudyPlanEntity studyPlan : allStudyPlans) {
			response.add(planEntityToPlanResponseDTO(studyPlan));
		}
		
		return response;
	}


}
