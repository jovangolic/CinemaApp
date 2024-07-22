package com.projekat.cinemaApp.service;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.projekat.cinemaApp.enumeration.TicketStatus;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.model.Ticket;

public interface ITicketService {

	Ticket addNewTicket(Projection projection,  Integer seatNumber, Double price, TicketStatus status) throws SQLException, IOException;
	
	Optional<Ticket> getTicketById(Long tickeId);
	
	List<Ticket> getAllTickets();
	
	void deleteTicket(Long ticketId);
	
	List<Ticket> getAvailableTickets(LocalDateTime dates, Projection projection, TicketStatus status);
	
	Ticket updateTicket(Long ticketId, Projection projection,  Integer seatNumber, Double price);
	
	Ticket findByTicketConfirmationCode(String confirmationCode);
	
	String saveTicket(Long projectionId, Ticket ticketRequest, TicketStatus status);
	
	List<Ticket> getTicketsByUserEmail(String email);
	
	Ticket updateTicketStatus(Long ticketId, TicketStatus status);
    
    Ticket purchaseReservedTicket(Long ticketId);
    
    Ticket cancelReservedTicket(Long ticketId);
    
    Ticket cancelPurchasedTicket(Long ticketId);
    
    List<Ticket> getTicketsByStatus(TicketStatus status);
}
