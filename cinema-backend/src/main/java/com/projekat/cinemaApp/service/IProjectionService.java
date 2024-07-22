package com.projekat.cinemaApp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Movie;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.model.ProjectionType;

public interface IProjectionService {

	
	Projection addNewProjection(Movie movie, ProjectionType projectionType, Hall hall, LocalDateTime date, Double price);
	
	Optional<Projection> getProjectionById(Long projectionId);
	
	List<Projection> getAllProjections();
	
	Projection updateProjecton(Long projectionId,Movie movie, ProjectionType projectionType, Hall hall, LocalDateTime date, Double price);
	
	void delete(Long projectionId);
	
	List<Projection> findByMovieId(Long movieId);
	
	List<Projection> search(LocalDateTime dateFrom, LocalDateTime dateTo, Double priceFrom, Double priceTo, 
			String projectionTypeName, Long movieId, String hallName);
	
	List<Projection> getProjectionsByDate(LocalDateTime dateFrom, LocalDateTime dateTo);
	
	List<String> getProjectionsByProjectionType();
	
	List<Projection> getAvailableProjections(LocalDateTime startDate, LocalDateTime endDate);
	
}
