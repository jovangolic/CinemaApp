package com.projekat.cinemaApp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.exceptions.ResourceNotFoundException;
import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Movie;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.model.ProjectionType;
import com.projekat.cinemaApp.response.HallResponse;
import com.projekat.cinemaApp.response.MovieProjectionResponse;
import com.projekat.cinemaApp.response.MovieResponse;
import com.projekat.cinemaApp.response.ProjectionAndProjectionTypeResponse;
import com.projekat.cinemaApp.response.ProjectionHallResponse;
import com.projekat.cinemaApp.response.ProjectionResponse;
import com.projekat.cinemaApp.response.ProjectionTypeResponse;
import com.projekat.cinemaApp.service.IProjectionService;

import lombok.RequiredArgsConstructor;



@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/projections")
@RequiredArgsConstructor
public class ProjectionController {

	
	private final IProjectionService projectionService;
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/add/new-projection")
	public ResponseEntity<ProjectionResponse> addNewProjection(
			@RequestParam("movie") Movie movie,
			@RequestParam("type") ProjectionType type,
			@RequestParam("hall") Hall hall,
			@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime date,
			@RequestParam("price") Double price) throws SQLException, IOException{
		Projection savedProjection = projectionService.addNewProjection(movie, type, hall, date, price);
		Movie newMovie = savedProjection.getMovie();
		ProjectionType projectionType = savedProjection.getProjectionType();
		Hall newHall = savedProjection.getHall();
		MovieProjectionResponse movieProjectionResponse = new MovieProjectionResponse(newMovie.getId(), newMovie.getName(), newMovie.getDuration());
		ProjectionAndProjectionTypeResponse typeResponse = new ProjectionAndProjectionTypeResponse(projectionType.getId(),projectionType.getName());
		ProjectionHallResponse projectionHallResponse = new ProjectionHallResponse(newHall.getId(), newHall.getName());
		ProjectionResponse projectionResponse = new ProjectionResponse(savedProjection.getId(),movieProjectionResponse, typeResponse,
				projectionHallResponse, savedProjection.getDateTime(), savedProjection.getTicketPrice());
		return ResponseEntity.ok(projectionResponse);
	}
	
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PutMapping("/update/{projectionId}")
	public ResponseEntity<ProjectionResponse> updateProjection(@PathVariable Long projectionId,
			@RequestParam(required = false) Movie movie,
			@RequestParam(required = false) ProjectionType type,
			@RequestParam(required = false) Hall hall,
			@RequestParam(required = false) LocalDateTime date,
			@RequestParam(required = false) Double price) {
		Projection projection = projectionService.updateProjecton(projectionId, movie, type, hall, date, price);
		ProjectionResponse response = getProjectionResponse(projection);
		return ResponseEntity.ok(response);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/delete/projection/{projectionId}")
	public ResponseEntity<Void> deleteProjection(@PathVariable Long projectionId){
		projectionService.delete(projectionId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	@GetMapping("/projection/{projectionId}")
	public ResponseEntity<Optional<ProjectionResponse>> getProjectionById(@PathVariable Long projectionId){
		Optional<Projection> projection = projectionService.getProjectionById(projectionId);
		return projection.map(p -> {
			ProjectionResponse response = getProjectionResponse(p);
			return ResponseEntity.ok(Optional.of(response));
		}).orElseThrow(
				() -> new ResourceNotFoundException("Projection not found"));
	}
	
	
	@GetMapping("/all-projections")
	public ResponseEntity<List<ProjectionResponse>> getAllProjections() throws SQLException{
		List<Projection> projections = projectionService.getAllProjections();
		List<ProjectionResponse> responses = new ArrayList<>();
		for(Projection p : projections) {
			ProjectionResponse response = getProjectionResponse(p);
			responses.add(response);
		}
		return ResponseEntity.ok(responses);
	}
	
	
	@GetMapping("/projection/projectionType")
	public List<String> getProjectionTypes(){
		return projectionService.getProjectionsByProjectionType();
	}
	
	@GetMapping("/search-projection")
	public ResponseEntity<List<ProjectionResponse>> searchProjection(
			@RequestParam("dateFrom") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDateTime dateFrom,
			@RequestParam("dateTo") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDateTime dateTo,
			@RequestParam("priceFrom") Double priceFrom,
			@RequestParam("priceTo") Double priceTo,
			@RequestParam("projectionTypeName") String projectioTypeName,
			@RequestParam("movieId") Long movieId,
			@RequestParam("hallName") String hallName) {
		List<Projection> projections = projectionService.search(dateFrom, dateTo, priceFrom, priceTo, projectioTypeName, movieId, hallName);
		List<ProjectionResponse> responses = new ArrayList<>();
		for(Projection p : projections) {
			ProjectionResponse response = getProjectionResponse(p);
			responses.add(response);
		}
		if(responses.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.ok(responses);
		}
	}
	
	
	@GetMapping("/{id}/{movieId}")
	public ResponseEntity<List<ProjectionResponse>> getProjectionsByMovieId(@PathVariable Long movieId) {
		List<Projection> projections = getAllProjectionByMovieId(movieId);
		List<ProjectionResponse> responses = projections.stream()
				.map(this::getProjectionResponse)
				.collect(Collectors.toList());
		return ResponseEntity.ok(responses);
	}
	
	
	@GetMapping("/projections-by-date")
	public ResponseEntity<List<ProjectionResponse>> getProjectionsByDate(
			@RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
	        @RequestParam("endDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate){
		List<Projection> projections = projectionService.getProjectionsByDate(startDate, endDate);
		List<ProjectionResponse> responses = new ArrayList<>();
		for(Projection p : projections) {
			ProjectionResponse response = getProjectionResponse(p);
			responses.add(response);
		}
		if(responses.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.ok(responses);
		}
	}
	
	public ProjectionResponse getProjectionResponse(Projection projection) {
		Movie movie = projection.getMovie();
		ProjectionType type = projection.getProjectionType();
		Hall hall = projection.getHall();
		MovieProjectionResponse movieProjectionResponse = new MovieProjectionResponse(movie.getId(), movie.getName(), movie.getDuration());
		ProjectionAndProjectionTypeResponse typeResponse = new ProjectionAndProjectionTypeResponse(type.getId(),type.getName());
		ProjectionHallResponse projectionHallResponse = new ProjectionHallResponse(hall.getId(),hall.getName());
		return new ProjectionResponse(
				projection.getId(),
				movieProjectionResponse,
				typeResponse,
				projectionHallResponse,
				projection.getDateTime(),
				projection.getTicketPrice());
	}
	
	
	private List<Projection> getAllProjectionByMovieId(Long movieId){
		return projectionService.findByMovieId(movieId);
	}
}
