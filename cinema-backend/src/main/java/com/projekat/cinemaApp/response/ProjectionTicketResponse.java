package com.projekat.cinemaApp.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectionTicketResponse {

	/*
	 *This is DTO for specific projection. 
	 */
	
	private Long id;
	
	private MovieResponse movieResponse;
	
	private ProjectionTypeResponse typeResponse;
	
	private HallResponse hallResponse;
	
	private LocalDateTime dateTime;
	
	private Double ticketPrice;
}
