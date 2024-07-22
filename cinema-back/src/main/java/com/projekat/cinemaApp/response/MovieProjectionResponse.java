package com.projekat.cinemaApp.response;

import java.util.Base64;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MovieProjectionResponse {

	/*
	 *This is DTO for specific projection. 
	 */
	private Long id;
	
	private String name;
	
	private Integer duration;
	
	private String distributor;
	
	private String country;
	
	private Integer year;
	
	private String description;
	
	private String photo;
	
	public MovieProjectionResponse(Long id, String name, Integer duration) {
		this.id = id;
		this.name = name;
		this.duration = duration;
	}
	
	public MovieProjectionResponse(Long id, String name, Integer duration, byte[] photoBytes) {
		this.id = id;
		this.name = name;
		this.duration = duration;
		this.photo = photoBytes != null ? Base64.getEncoder().encodeToString(photoBytes) : null;
	}
}
