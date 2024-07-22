package com.projekat.cinemaApp.service;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.repository.HallRepository;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class HallService implements IHallService {
	
	
	private final HallRepository hallRepository;

	@Override
	public Hall createHall(String name) throws IOException, SQLException {
		Hall hall = new Hall();
		hall.setName(name);
		return hallRepository.save(hall);
	}

	@Override
	public List<Hall> getAllHalls() {
		return hallRepository.findAll();
	}

}
