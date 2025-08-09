package io.github.abhiraj.dsaverse.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import io.github.abhiraj.dsaverse.entity.UserEntity;
import io.github.abhiraj.dsaverse.repository.ProblemRepository;
import io.github.abhiraj.dsaverse.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;

    public void savePlan(StudyPlanDTO response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        StudyPlanEntity existingPlan = studyPlanRepository.findByUser(user).orElse(null);

        List<String> incomingQuestions = response.getProblemList();

        if (existingPlan != null) {
            List<ProblemEntity> existingProblems = existingPlan.getProblems();

            Map<String, ProblemEntity> existingProblemMap = existingProblems.stream()
                    .collect(Collectors.toMap(
                            p -> p.getProblemName().trim().toLowerCase(),
                            p -> p
                    ));

            List<ProblemEntity> mergedProblems = new ArrayList<>(existingProblems);

            for (String q : incomingQuestions) {
                String normalized = q.trim().toLowerCase();
                if (!existingProblemMap.containsKey(normalized)) {
                    ProblemEntity newProblem = new ProblemEntity();
                    newProblem.setProblemName(q.trim());
                    newProblem.setCompleted(false);
                    newProblem.setStudyPlan(existingPlan);
                    mergedProblems.add(newProblem);
                    existingProblemMap.put(normalized, newProblem);
                }
            }

            existingPlan.setProblems(mergedProblems);
            existingPlan.setTotalProblems(mergedProblems.size());
            studyPlanRepository.save(existingPlan);

        } else {

            StudyPlanEntity newPlan = new StudyPlanEntity();
            newPlan.setUser(user);
            newPlan.setTotalProblems(incomingQuestions.size());

            List<ProblemEntity> problems = new ArrayList<>();
            for (String q : incomingQuestions) {
                ProblemEntity problem = new ProblemEntity();
                problem.setProblemName(q);
                problem.setCompleted(false);
                problem.setStudyPlan(newPlan);
                problems.add(problem);
            }

            newPlan.setProblems(problems);
            studyPlanRepository.save(newPlan);
        }
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
    public StudyPlanResponseDTO getMyStudyPlan() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        UserEntity user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return studyPlanRepository.findByUser(user)
                .map(this::planEntityToPlanResponseDTO)
                .orElseThrow(() -> new RuntimeException("No study plan found for this user"));
    }

    public void updateProblemStatus(long problemId, boolean isCompleted) {
        problemRepository.findById(problemId). ifPresent(problem -> {
            problem.setCompleted(isCompleted);
            problemRepository.save(problem);
        });
    }

}
