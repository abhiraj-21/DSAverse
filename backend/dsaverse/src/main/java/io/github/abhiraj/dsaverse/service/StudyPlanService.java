package io.github.abhiraj.dsaverse.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import io.github.abhiraj.dsaverse.dto.StudyPlanDTO;
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


}
