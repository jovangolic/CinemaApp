package com.projekat.cinemaApp.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Seat;
import com.projekat.cinemaApp.repository.HallRepository;
import com.projekat.cinemaApp.repository.SeatRepository;


import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;


@RequiredArgsConstructor
@Service
public class SeatService implements ISeatService {
	
	
	private final SeatRepository seatRepository;
	private final HallRepository hallRepository;

	@Override
	public Seat createSeat(Long seatId, Integer seatNumber, Long hallId)
			throws IOException, SQLException {
		Hall hall = hallRepository.findById(hallId).orElseThrow(
				() -> new IllegalArgumentException("Hall not found with id : " + hallId));
		Seat seat = new Seat();
		seat.setId(seatId);
		seat.setSeatNumber(seatNumber);
		seat.setHall(hall);
		return seat;
	}

	@Override
	public Optional<Seat> getSeatById(Long id) {
		return Optional.of(seatRepository.findById(id).get());
	}

	@Override
	public List<Seat> getAvailableSeatsByHall(boolean available, Long hallId) {
		Hall hall = hallRepository.findById(hallId).orElseThrow(
				() -> new IllegalArgumentException("Hall not found with id : " + hallId));
		return seatRepository.findByAvailableAndHall(true, hall);
	}

	@Override
	public List<Seat> getAllSeats() {
		return seatRepository.findAll();
	}

}
