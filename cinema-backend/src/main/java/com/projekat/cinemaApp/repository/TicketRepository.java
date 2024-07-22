package com.projekat.cinemaApp.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.projekat.cinemaApp.enumeration.TicketStatus;
import com.projekat.cinemaApp.model.Projection;
import com.projekat.cinemaApp.model.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

	
	
	
	@Query("SELECT t FROM Ticket t WHERE t.saleDateTime = :dates AND t.projection = :projection AND t.status = :status")
    List<Ticket> findAvailableTicketsBySaleDateTimeAndProjectionAndStatus(
            @Param("dates") LocalDateTime dates,
            @Param("projection") Projection projection,
            @Param("status") TicketStatus status);
	
	Optional<Ticket> findById(Long ticketId);
	
	Optional<Ticket> findByTicketConfirmationCode(String confirmationCode);
	
	List<Ticket> findByUserEmail(String email);
	
	List<Ticket> findByStatus(TicketStatus status);
	
}
