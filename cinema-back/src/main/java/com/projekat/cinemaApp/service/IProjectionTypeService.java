package com.projekat.cinemaApp.service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.projekat.cinemaApp.model.ProjectionType;



public interface IProjectionTypeService {

	
	ProjectionType createProjectionType(String name) throws SQLException, IOException;
	Optional<ProjectionType> getProjectionTypeById(Long id);
	List<ProjectionType> getAllTypes();
}
