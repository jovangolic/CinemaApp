package com.projekat.cinemaApp.service;



import java.sql.SQLException;
import java.util.List;

import com.projekat.cinemaApp.model.Hall;

import io.jsonwebtoken.io.IOException;

public interface IHallService {

	Hall createHall(String name) throws IOException, SQLException;
	List<Hall> getAllHalls();
}
