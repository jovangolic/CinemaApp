package com.projekat.cinemaApp.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class SeatHallResponse {

	/*
	 *This is DTO for specific Hall
	 */
	
	private Long id;
	
	private String name;
}
