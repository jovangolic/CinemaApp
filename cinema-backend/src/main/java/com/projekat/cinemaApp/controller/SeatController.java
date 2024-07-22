package com.projekat.cinemaApp.controller;

import java.sql.SQLException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Seat;
import com.projekat.cinemaApp.response.HallResponse;
import com.projekat.cinemaApp.response.SeatHallResponse;
import com.projekat.cinemaApp.response.SeatResponse;
import com.projekat.cinemaApp.service.ISeatService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/seats")
@RequiredArgsConstructor
public class SeatController {
	
	
	private final ISeatService seatService;
	
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@PostMapping("/add/new-seat")
	public ResponseEntity<SeatResponse> createSeat(@RequestBody SeatResponse seatResponse) throws IOException, SQLException{
		Seat seat = seatService.createSeat(seatResponse.getId(),seatResponse.getSeatNumber(), seatResponse.getSeatHallResponse().getId());
		SeatResponse response = new SeatResponse(seat.getId(), seat.getSeatNumber(), new SeatHallResponse(seat.getHall().getId(), seat.getHall().getName()));
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	
	@GetMapping("/all-seats")
	public ResponseEntity<List<SeatResponse>> getAllSeats(){
		List<Seat> seats = seatService.getAllSeats();
		List<SeatResponse> responses = seats.stream().map(this::getSeatResponse).collect(Collectors.toList());
		return ResponseEntity.ok(responses);
	}
	
	@GetMapping("/available/{hallId}")
	public ResponseEntity<List<SeatResponse>> getAvailableSeats(@PathVariable Long hallId){
		List<Seat> availableSeats = seatService.getAvailableSeatsByHall(true, hallId);
		List<SeatResponse> responses = availableSeats.stream().map(this::getSeatResponse).collect(Collectors.toList());
		return ResponseEntity.ok(responses);
	}
	
	
	private SeatResponse getSeatResponse(Seat seat) {
		return new SeatResponse(seat.getId(), seat.getSeatNumber());
	}
}
