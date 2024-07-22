package com.projekat.cinemaApp.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projekat.cinemaApp.model.Movie;



public interface MovieRepository extends JpaRepository<Movie, Long> {

	
	
	
	@Query("SELECT m FROM Movie m WHERE m.duration BETWEEN :durationFrom AND :durationTo")
	List<Movie> findByDuration(@Param("durationFrom") Integer durationFrom,@Param("durationTo")  Integer durationTo);
	
}
