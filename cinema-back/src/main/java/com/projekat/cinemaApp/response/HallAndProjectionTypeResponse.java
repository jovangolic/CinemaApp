package com.projekat.cinemaApp.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class HallAndProjectionTypeResponse {

	/*
	 *This is DTO for specific projection. 
	 */
	private Long id;
	
	private String name;
}
