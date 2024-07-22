package com.projekat.cinemaApp.response;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class MovieResponse {

	
	private Long id;
	
	private String name;
	
	private Integer duration;
	
	private String distributor;
	
	private String country;
	
	private Integer year;
	
	private String description;
	
	private String photo;
	
	private List<ProjectionResponse> projectionResponses = new ArrayList<>();
	
	public MovieResponse(Long id, String name, Integer duration) {
		this.id = id;
		this.name = name;
		this.duration = duration;
	}
	
	public MovieResponse(Long id, String name, Integer duration, byte[] photoBytes) {
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
	}
	
	public MovieResponse(Long id, String name, Integer duration, byte[] photoBytes, List<ProjectionResponse> projectionResponses) {
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
		this.projectionResponses = projectionResponses;
	}

	
}
