package com.projekat.cinemaApp.service;

import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.projekat.cinemaApp.model.Movie;



public interface IMovieService {

	/*Movie addNewMovie(String name, Integer duration, String distributor,
			String country, Integer year, String description, MultipartFile photo) throws IOException, SQLException;*/
	Movie addNewMovie(String name, Integer duration, String distributor, String country, Integer year, String description, Blob photo) throws IOException, SQLException;
	List<Movie> getAllMovies();
	Movie updateMovie(Long movieId, String name, Integer duration, byte[] photoBytes);
	void delete(Long movieId);
	Optional<Movie> getMovieById(Long movieId);
	List<Movie> getMoviesByDuration(Integer durationFrom, Integer durationTo);
	byte[] getMoviePhotoByMovieId(Long movieId) throws SQLException;
}
