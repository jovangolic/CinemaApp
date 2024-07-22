package com.projekat.cinemaApp.response;

import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProjectionHallResponse {

	/*
	 *This is DTO for specific projection. 
	 */
	private Long id;
	
	private String name;
	
	private Set<ProjectionTypeResponse> projectionTypeResponses = new HashSet<>();
	
	public ProjectionHallResponse(Long id, String name) {
		this.id = id;
		this.name = name;
	}
}


