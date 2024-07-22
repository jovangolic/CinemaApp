package com.projekat.cinemaApp.controller;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

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
import org.springframework.web.multipart.MultipartFile;

import com.projekat.cinemaApp.exceptions.PhotoRetrievalException;
import com.projekat.cinemaApp.exceptions.ResourceNotFoundException;
import com.projekat.cinemaApp.model.Movie;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.response.MovieResponse;
import com.projekat.cinemaApp.response.ProjectionResponse;
import com.projekat.cinemaApp.service.IMovieService;
import com.projekat.cinemaApp.service.IProjectionService;

import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/movies")
@RequiredArgsConstructor
public class MovieController {

	private final IMovieService movieService;
	private final IProjectionService projectionService;
	
	
	@PostMapping("/add/new-movie")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<MovieResponse> addNewMovie(
	        @RequestParam("name") String name,
	        @RequestParam("duration") Integer duration,
	        @RequestParam("distributor") String distributor,
	        @RequestParam("country") String country,
	        @RequestParam("year") Integer year,
	        @RequestParam("description") String description,
	        @RequestParam("photo") MultipartFile photo) throws SQLException, IOException {
	    
	    byte[] photoBytes = photo != null && !photo.isEmpty() ? photo.getBytes() : null;
	    Blob photoBlob = photoBytes != null ? new SerialBlob(photoBytes) : null;

	    Movie savedMovie = movieService.addNewMovie(name, duration, distributor, country, year, description, photoBlob);
	    MovieResponse movie = new MovieResponse(savedMovie.getId(), savedMovie.getName(), savedMovie.getDuration(), photoBytes);
	    
	    return ResponseEntity.ok(movie);
	}
	
	
	@PutMapping("/update/{movieId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<MovieResponse> updateMovie(@PathVariable Long movieId,
			@RequestParam(required = false) String name,
			@RequestParam(required = false) Integer duration,
			@RequestParam(required = false) String distributor,
			@RequestParam(required = false) String country,
			@RequestParam(required = false) Integer year,
			@RequestParam(required = false) String description,
			@RequestParam(required = false) MultipartFile photo) throws SQLException, IOException{
		byte[] photoBytes = photo != null && !photo.isEmpty()  ?
				photo.getBytes() : movieService.getMoviePhotoByMovieId(movieId);
		Blob photoBlob = photoBytes != null && photoBytes.length > 0 ? new SerialBlob(photoBytes) : null;
		Movie theMovie = movieService.updateMovie(movieId, name, duration, photoBytes);
		theMovie.setPhoto(photoBlob);
		MovieResponse response = getMovieResponse(theMovie);
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/movie/{movieId}")
	public ResponseEntity<MovieResponse> getMovieById(@PathVariable Long movieId){
		Movie theMovie = movieService.getMovieById(movieId)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found"));
        MovieResponse response = getMovieResponse(theMovie);
        return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/all-movies")
	public ResponseEntity<List<MovieResponse>> getAllMovies() throws SQLException {
		List<Movie> movies = movieService.getAllMovies();
		List<MovieResponse> responses = new ArrayList<>();
		for(Movie m : movies) {
			byte[] photoBytes = movieService.getMoviePhotoByMovieId(m.getId());
			if(photoBytes != null && photoBytes.length > 0) {
				String base64Photo = Base64.getEncoder().encodeToString(photoBytes);
				MovieResponse response = getMovieResponse(m);
				response.setPhoto(base64Photo);
				responses.add(response);
			}
		}
		return ResponseEntity.ok(responses);
	}
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@DeleteMapping("/delete/movie/{movieId}")
	public ResponseEntity<Void> deleteMovie(@PathVariable Long movieId){
		movieService.delete(movieId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	@GetMapping("/movies-by-duration")
	public ResponseEntity<List<MovieResponse>> getMoviesByDuration(
			@RequestParam("durationFrom") Integer durationFrom,
			@RequestParam("durationTo") Integer durationTo){
		List<Movie> durations = movieService.getMoviesByDuration(durationFrom, durationTo);
		List<MovieResponse> responses = new ArrayList<>();
		for(Movie m : durations) {
			MovieResponse response = getMovieResponse(m);
			responses.add(response);
		}
		if(responses.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.ok(responses);
		}
	}
	
	public MovieResponse getMovieResponse(Movie movie) {
		List<Projection> projections = getAllProjectionsByMovieId(movie.getId());
		List<ProjectionResponse> responses = projections.stream()
				.map(p -> new ProjectionResponse()).toList();
		byte[] photoBytes = null;
		Blob photoBlob = movie.getPhoto();
		if(photoBlob != null) {
			try {
				photoBytes = photoBlob.getBytes(1, (int)photoBlob.length());
			}
			catch(SQLException e) {
				throw new PhotoRetrievalException("Error retrieving photo");
			}
		}
		return new MovieResponse(
				movie.getId(),
				movie.getName(),
				movie.getDuration(),
				photoBytes,responses);
	}
	
	private List<Projection> getAllProjectionsByMovieId(Long movieId){
		return projectionService.findByMovieId(movieId);
	}
}
