package com.projekat.cinemaApp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Seat;

public interface SeatRepository extends JpaRepository<Seat, Long> {

	Optional<Seat> findBySeatNumberAndHall(Integer seatNumber, Hall hall);
	List<Seat> findByAvailableAndHall(boolean available, Hall hall);
}
