package com.projekat.cinemaApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.projekat.cinemaApp.model.ProjectionType;

public interface ProjectionTypeRepository extends JpaRepository<ProjectionType, Long> {

	
	@Query("SELECT DISTINCT pt.name FROM ProjectionType pt ")
	List<String> findDistinctProjectionTypes();

}
