package com.projekat.cinemaApp.response;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProjectionResponse {

	
	private Long id;
	
	private MovieProjectionResponse movieProjectionResponse;
	
	private ProjectionAndProjectionTypeResponse projectionAndProjectionTypeResponse;
	
	private ProjectionHallResponse projectionHallResponse;
	
	private LocalDateTime dateTime;
	
	private Double ticketPrice;
	
	private Set<TicketResponse> ticketResponses = new HashSet<>();
	
	public ProjectionResponse(Long id, MovieProjectionResponse movieProjectionResponse, LocalDateTime dateTime, Double ticketPrice) {
		this.id = id;
		this.movieProjectionResponse = movieProjectionResponse;
		this.dateTime = dateTime;
		this.ticketPrice = ticketPrice;
	}
	
	public ProjectionResponse(Long id, MovieProjectionResponse movieProjectionResponse,ProjectionAndProjectionTypeResponse projectionAndProjectionTypeResponse,
			ProjectionHallResponse projectionHallResponse, LocalDateTime dateTime, Double ticketPrice) {
		this.id = id;
		this.movieProjectionResponse = movieProjectionResponse;
		this.projectionAndProjectionTypeResponse = projectionAndProjectionTypeResponse;
		this.projectionHallResponse = projectionHallResponse;
		this.dateTime = dateTime;
		this.ticketPrice = ticketPrice;
	}
	
}
