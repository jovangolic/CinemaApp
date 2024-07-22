package com.projekat.cinemaApp.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Movie;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.model.ProjectionType;
import com.projekat.cinemaApp.repository.ProjectionRepository;

import lombok.RequiredArgsConstructor;



@RequiredArgsConstructor
@Service
public class ProjectionService implements IProjectionService {

	
	private final ProjectionRepository projectionRepository;

	@Override
	public Projection addNewProjection(Movie movie, ProjectionType projectionType, Hall hall, LocalDateTime date,
			Double price) {
		Objects.requireNonNull(movie, "Movie must not be null");
		Objects.requireNonNull(projectionType, "Projection type must not be null");
		Objects.requireNonNull(hall, "Hall must not be null");
		if (price == null || price < 0) {
            throw new IllegalArgumentException("Price must be a positive number and not null");
        }
		Projection projection = new Projection();
		projection.setMovie(movie);
		projection.setProjectionType(projectionType);
		projection.setHall(hall);
		projection.setDateTime(date);
		projection.setTicketPrice(price);
		return projectionRepository.save(projection);
	}

	@Override
	public Optional<Projection> getProjectionById(Long projectionId) {
		return projectionRepository.findById(projectionId);
	}

	@Override
	public List<Projection> getAllProjections() {
		return projectionRepository.findAll();
	}

	@Override
	public Projection updateProjecton(Long projectionId, Movie movie, ProjectionType projectionType, Hall hall,
			LocalDateTime date, Double price) {
		Projection projection = projectionRepository.findById(projectionId).orElseThrow(
				() -> new IllegalArgumentException("Projection with the given ID does not exist"));
		if(movie != null) {
			projection.setMovie(movie);
		}
		if(projectionType != null) {
			projection.setProjectionType(projectionType);
		}
		if(hall != null) {
			projection.setHall(hall);
		}
		if(date != null) {
			projection.setDateTime(date);
		}
		if(price != null) {
			if(price < 0) {
				throw new IllegalArgumentException("Price must be a positive number");
			}
			projection.setTicketPrice(price);
		}
		return projectionRepository.save(projection);
	}

	@Override
	public void delete(Long projectionId) {
		Projection projection = projectionRepository.findById(projectionId).orElseThrow(
				() -> new IllegalArgumentException("Projection with the given ID does not exist"));
		projectionRepository.delete(projection);
	}

	@Override
	public List<Projection> findByMovieId(Long movieId) {
		return projectionRepository.findByMovieId(movieId);
	}

	@Override
	public List<Projection> search(LocalDateTime dateFrom, LocalDateTime dateTo, Double priceFrom, Double priceTo,
			String projectionTypeName, Long movieId, String hallName) {
		return projectionRepository.search(dateFrom, dateTo, priceFrom, priceTo, projectionTypeName, movieId, hallName);
	}

	@Override
	public List<Projection> getProjectionsByDate(LocalDateTime dateFrom, LocalDateTime dateTo) {
		return projectionRepository.findProjectionsByDate(dateFrom, dateTo);
	}

	@Override
	public List<String> getProjectionsByProjectionType() {
		return projectionRepository.findDistinctProjectionTypes();
	}

	@Override
	public List<Projection> getAvailableProjections(LocalDateTime startDate, LocalDateTime endDate) {
		return projectionRepository.findAvailableProjectionsByDateRange(startDate, endDate);
	}

	
}
