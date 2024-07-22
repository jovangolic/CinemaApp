package com.projekat.cinemaApp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.model.ProjectionType;
import com.projekat.cinemaApp.response.ProjectionTypeResponse;
import com.projekat.cinemaApp.service.IProjectionTypeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/projectionTypes")
@RequiredArgsConstructor
public class ProjectionTypeController {
	
	
	private final IProjectionTypeService typeService;
	
	@PostMapping("/add/new-type")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<ProjectionTypeResponse> createProjectionType(@RequestParam("name") String name) throws SQLException, IOException{
		ProjectionType savedType = typeService.createProjectionType(name);
		ProjectionTypeResponse typeResponse = new ProjectionTypeResponse(savedType.getId(), savedType.getName());
		return ResponseEntity.ok(typeResponse);
	}
	
	
	@GetMapping("/all-types")
	public ResponseEntity<List<ProjectionTypeResponse>> getAllProjectionTypes(){
		List<ProjectionType> types = typeService.getAllTypes();
		List<ProjectionTypeResponse> responses = new ArrayList<>();
		for(ProjectionType pt : types) {
			ProjectionTypeResponse response = getProjectionTypeResponse(pt);
			responses.add(response);
		}
		return ResponseEntity.ok(responses);
	}
	
	
	private ProjectionTypeResponse getProjectionTypeResponse(ProjectionType type) {
		return new ProjectionTypeResponse(type.getId(), type.getName());
	}
}
