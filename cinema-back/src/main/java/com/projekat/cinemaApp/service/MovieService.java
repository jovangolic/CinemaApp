package com.projekat.cinemaApp.service;


import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.projekat.cinemaApp.exceptions.InternalServerException;
import com.projekat.cinemaApp.exceptions.ResourceNotFoundException;
import com.projekat.cinemaApp.model.Movie;
import com.projekat.cinemaApp.repository.MovieRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class MovieService implements IMovieService {
	
	
	private final MovieRepository movieRepository;
	
	@Override
	public Movie addNewMovie(String name, Integer duration, String distributor, String country, Integer year,
			String description, Blob photo) throws IOException, SQLException {
		Movie movie = new Movie();
        movie.setName(name);
        movie.setDuration(duration);
        movie.setDistributor(distributor);
        movie.setCountry(country);
        movie.setYear(year);
        movie.setDescription(description);
        
        if (photo != null) {
            movie.setPhoto(photo);
        }
        
        return movieRepository.save(movie);
	}

	/*@Override
	public Movie addNewMovie(String name, Integer duration, String distributor,
			String country, Integer year, String description, MultipartFile file) throws IOException, SQLException {
		Movie theMovie = new Movie();
		theMovie.setName(name);
		if(duration <= 0) {
			throw new IllegalArgumentException("Duration must not be less than zero.");
		}
		theMovie.setDuration(duration);
		theMovie.setDistributor(distributor);
		theMovie.setCountry(country);
		if(year == null) {
			throw new IllegalArgumentException("Year must be positive number.");
		}
		theMovie.setYear(year);
		theMovie.setDescription(description);
		if(!file.isEmpty()) {
			byte[] photoBytes = file.getBytes();
			Blob photoBlob = new SerialBlob(photoBytes);
			theMovie.setPhoto(photoBlob);
		}
		return movieRepository.save(theMovie);
	}*/

	@Override
	public List<Movie> getAllMovies() {
		return movieRepository.findAll();
	}

	@Override
	public Movie updateMovie(Long movieId, String name, Integer duration, byte[] photoBytes) {
		Movie movie = movieRepository.findById(movieId).get();
		if(name != null) {
			movie.setName(name);
		}
		if(duration != null) {
			movie.setDuration(duration);
		}
		if(photoBytes != null && photoBytes.length > 0) {
			try {
				movie.setPhoto(new SerialBlob(photoBytes));
			}
			catch(SQLException e) {
				throw new InternalServerException("Fail updating movie.");
			}
		}
		return movieRepository.save(movie);
	}

	@Override
	public void delete(Long movieId) {
		Optional<Movie> theMovie = movieRepository.findById(movieId);
		if(theMovie.isPresent()) {
			movieRepository.deleteById(movieId);
		}
		
	}

	@Override
	public Optional<Movie> getMovieById(Long movieId) {
		return movieRepository.findById(movieId);
	}

	@Override
	public List<Movie> getMoviesByDuration(Integer durationFrom, Integer durationTo) {
		return movieRepository.findByDuration(durationFrom, durationTo);
	}

	@Override
	public byte[] getMoviePhotoByMovieId(Long movieId) throws SQLException {
		Optional<Movie> theMovie = movieRepository.findById(movieId);
		if(theMovie.isEmpty()) {
			throw new ResourceNotFoundException("Sorry, Movie not found");
		}
		Blob photoBlob = theMovie.get().getPhoto();
		if(photoBlob != null) {
			return photoBlob.getBytes(1, (int)photoBlob.length());
		}
		return null;
	}

	

}
