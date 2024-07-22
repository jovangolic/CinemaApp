package com.projekat.cinemaApp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import com.projekat.cinemaApp.model.Seat;


import io.jsonwebtoken.io.IOException;

public interface ISeatService {

	
	Seat createSeat(Long seatId, Integer seatNumber, Long hallId) throws IOException, SQLException;
	Optional<Seat> getSeatById(Long id);
	List<Seat> getAvailableSeatsByHall(boolean available, Long hallId);
	List<Seat> getAllSeats();
}
