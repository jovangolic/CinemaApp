package com.projekat.cinemaApp.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.dto.UserDTO;
import com.projekat.cinemaApp.enumeration.TicketStatus;
import com.projekat.cinemaApp.exceptions.InvalidTicketRequestException;
import com.projekat.cinemaApp.exceptions.ResourceNotFoundException;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.model.Movie;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.model.ProjectionType;
import com.projekat.cinemaApp.model.Seat;
import com.projekat.cinemaApp.model.Ticket;
import com.projekat.cinemaApp.model.User;
import com.projekat.cinemaApp.request.TicketRequest;
import com.projekat.cinemaApp.request.TicketStatusUpdateRequest;
import com.projekat.cinemaApp.response.HallResponse;
import com.projekat.cinemaApp.response.MovieResponse;
import com.projekat.cinemaApp.response.ProjectionResponse;
import com.projekat.cinemaApp.response.ProjectionTicketResponse;
import com.projekat.cinemaApp.response.ProjectionTypeResponse;
import com.projekat.cinemaApp.response.SeatHallResponse;
import com.projekat.cinemaApp.response.SeatResponse;
import com.projekat.cinemaApp.response.TicketResponse;
import com.projekat.cinemaApp.service.ITicketService;

import lombok.RequiredArgsConstructor;


@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/tickets")
@RequiredArgsConstructor
public class TicketController {

	
	private final ITicketService ticketService;
	
	
	@PostMapping("/add/new-ticket")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	public ResponseEntity<TicketResponse> addNewTicket(
			@RequestParam("projection") Projection projection,
			@RequestParam("seatNumber") Integer seatNumber,
			@RequestParam("price") Double price,
			@RequestParam("status") TicketStatus status) throws SQLException, IOException{
		Ticket savedTicket = ticketService.addNewTicket(projection, seatNumber, price, status);
		TicketResponse response = getTicketResponse(savedTicket);
		return ResponseEntity.ok(response);
	}
	
	@PutMapping("/update/{ticketId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<TicketResponse> updateTicket(@PathVariable Long ticketId,
			@RequestParam(required = false) Projection projection,
			@RequestParam(required = false) Integer seatNumber,
			@RequestParam(required = false) Double price) throws SQLException, IOException{
		Ticket ticket = ticketService.updateTicket(ticketId, projection, seatNumber, price);
		TicketResponse response = getTicketResponse(ticket);
		return ResponseEntity.ok(response);
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	//ovde se koristi @PatchMapping da se azurira samo deo resursa (status karte) a ne cela karta
	@PatchMapping("/{ticketId}/status")
	public ResponseEntity<TicketResponse> updateTicketStatus(@PathVariable Long ticketId,
			@RequestBody TicketStatusUpdateRequest statusUpdateRequest){
		Ticket updateTicket = ticketService.updateTicketStatus(ticketId, statusUpdateRequest.getStatus());
		TicketResponse response = getTicketResponse(updateTicket);
		return ResponseEntity.ok(response);
	}
	
	//metoda za kupovinu rezervisane karte
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	@PostMapping("/purchase-reserved/{ticketId}")
	public ResponseEntity<TicketResponse> purchaseReservedTicket(@PathVariable Long ticketId, @RequestBody TicketRequest ticketRequest){
		Long projectionId = ticketRequest.getProjectionId();
		if (projectionId == null) {
	        throw new IllegalArgumentException("Projection ID is required");
	    }
		Ticket updateTicket= ticketService.purchaseReservedTicket(ticketId);
		TicketResponse response = getTicketResponse(updateTicket);
		return ResponseEntity.ok(response);
	}
	
	//metoda za oktazivanje rezervisane karte
	@PostMapping("/cancel-reserved/{ticketId}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	public ResponseEntity<TicketResponse> cancelReservedTicket(@PathVariable Long ticketId, @RequestBody TicketRequest ticketRequest){
		Long projectionId = ticketRequest.getProjectionId();
		if (projectionId == null) {
	        throw new IllegalArgumentException("Projection ID is required");
	    }
		Ticket cancelTicket = ticketService.cancelReservedTicket(ticketId);
		TicketResponse response = getTicketResponse(cancelTicket);
		return ResponseEntity.ok(response);
	}
	
	//metoda za otkazivanje kupljene karte
	@PostMapping("/cancel-purchased/{ticketId}")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_USER')")
	public ResponseEntity<TicketResponse> cancelPurchasedTicket(@PathVariable Long ticketId, @RequestBody TicketRequest ticketRequest){
		Long projectionId = ticketRequest.getProjectionId();
		if (projectionId == null) {
	        throw new IllegalArgumentException("Projection ID is required");
	    }
		Ticket cancelTicket = ticketService.cancelPurchasedTicket(ticketId);
		TicketResponse response = getTicketResponse(cancelTicket);
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/available-tickets")
	public ResponseEntity<List<TicketResponse>> getAvailableTickets(
			@RequestParam("date") @DateTimeFormat(iso=DateTimeFormat.ISO.DATE) LocalDateTime date,
			@RequestParam("projection") Projection projection,
			@RequestParam("status") TicketStatus status) throws SQLException{
		List<Ticket> availableTickets = ticketService.getAvailableTickets(date, projection ,status);
		List<TicketResponse> responses = new ArrayList<>();
		for(Ticket ticket : availableTickets) {
			TicketResponse response = getTicketResponse(ticket);
			responses.add(response);
		}
		if(responses.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		else {
			return ResponseEntity.ok(responses);
		}
	}
	
	//metoda za pretragu karata po njihovom statusu
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	@GetMapping("/status/{status}")
	public ResponseEntity<List<TicketResponse>> getTicketsByStatus(@PathVariable TicketStatus status){
		List<Ticket> tickets = ticketService.getTicketsByStatus(status);
		List<TicketResponse> responses = tickets.stream().map(
				this::getTicketResponse)
				.collect(Collectors.toList());
		return ResponseEntity.ok(responses);
	}
	
	@DeleteMapping("/delete/ticket/{ticketId}")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<Void> deleteTicket(@PathVariable Long ticketId){
		ticketService.deleteTicket(ticketId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	
	
	@GetMapping("/all-tickets")
	public ResponseEntity<List<TicketResponse>> getAllTickets() throws SQLException{
		List<Ticket> tickets = ticketService.getAllTickets();
		List<TicketResponse> ticketResponses = new ArrayList<>();
		for(Ticket t : tickets) {
			TicketResponse response = getTicketResponse(t);
			ticketResponses.add(response);
		}
		return ResponseEntity.ok(ticketResponses);
	}
	
	@GetMapping("/ticket/{ticketId}")
	public ResponseEntity<Optional<TicketResponse>> getTicketById(@PathVariable Long ticketId){
		Optional<Ticket> ticket = ticketService.getTicketById(ticketId);
		return ticket.map(
				t -> {
					TicketResponse ticketResponse = getTicketResponse(t);
					return ResponseEntity.ok(Optional.of(ticketResponse));
				}).orElseThrow(
						() -> new ResourceNotFoundException("Ticket not found"));
	}
	
	
	@PostMapping("/ticket/{projectionId}/buy")
	public ResponseEntity<?> saveTicket(@PathVariable Long projectionId, @RequestBody Ticket ticketRequest,@RequestParam("status") TicketStatus status){
		try {
			String confirmationCode = ticketService.saveTicket(projectionId, ticketRequest, status);
			return ResponseEntity.ok("Ticket bought successfully. Your confirmation code is : " + confirmationCode);
		}catch(InvalidTicketRequestException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	
	@GetMapping("/confirmation/{confirmationCode}")
	public ResponseEntity<?> getTicketByConfirmationCode(@PathVariable String confirmationCode){
		try {
			Ticket ticket = ticketService.findByTicketConfirmationCode(confirmationCode);
			TicketResponse response = getTicketResponse(ticket);
			return ResponseEntity.ok(response);
		}catch(ResourceNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	
	@GetMapping("/user/{email}/bought-tickets")
	public ResponseEntity<List<TicketResponse>> getTicketsByUserEmail(@PathVariable String email){
		List<Ticket> tickets = ticketService.getTicketsByUserEmail(email);
		List<TicketResponse> responses = new ArrayList<>();
		for(Ticket t : tickets) {
			TicketResponse response = getTicketResponse(t);
			responses.add(response);
		}
		return ResponseEntity.ok(responses);
	}
	
	private TicketResponse getTicketResponse(Ticket ticket) {
		Projection projection = ticket.getProjection();
		Seat seat = ticket.getSeat();
		Movie movie = projection.getMovie();
		Hall hall = projection.getHall();
		User user = ticket.getUser();
		ProjectionType type = projection.getProjectionType();
		MovieResponse movieResponse = new MovieResponse(movie.getId(), movie.getName(),movie.getDuration());
		ProjectionTypeResponse typeResponse = new ProjectionTypeResponse(type.getId(),type.getName());
		HallResponse hallResponse = new HallResponse(hall.getId(),hall.getName());
		ProjectionTicketResponse projectionTicketResponse = new ProjectionTicketResponse(projection.getId(), movieResponse, typeResponse,hallResponse,
				projection.getDateTime(), projection.getTicketPrice());
		SeatResponse seatResponse = new SeatResponse(seat.getId(), seat.getSeatNumber());
		UserDTO userDTO = new UserDTO(user.getFirstName(), user.getLastName(), user.getEmail(),user.getPassword());
		return new TicketResponse(ticket.getId(),
				projectionTicketResponse,
				seatResponse,
				ticket.getSaleDateTime(),
				ticket.getStatus(), userDTO);
	}
	
}
