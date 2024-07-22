package com.projekat.cinemaApp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;


import com.projekat.cinemaApp.enumeration.TicketStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;




@Entity
@AllArgsConstructor
//@NoArgsConstructor
@Data
public class Projection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="movie_id")
	private Movie movie;
	
	@ManyToOne
	@JoinColumn(name="projection_type_id")
	private ProjectionType projectionType;
	
	@ManyToOne
	@JoinColumn(name="hall_id")
	private Hall hall;
	
	@Column(name="date_time")
	private LocalDateTime dateTime;
	
	private Double ticketPrice;
	
	@OneToMany(mappedBy = "projection", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Ticket> tickets;
	
	public Projection() {
		this.tickets = new HashSet<>();
	}
	
	public Ticket addTicket(Seat seat, TicketStatus status) {
		// Provera da li je sediste vec zauzeto za odredjenu projekciju
        boolean isSeatTaken = tickets.stream().anyMatch(ticket -> ticket.getSeat().equals(seat));
        if (isSeatTaken) {
            throw new IllegalArgumentException("Seat is already taken for this projection!");
        }
		//ako je uslov false, onda se kreira karta
		Ticket ticket = new Ticket();
		ticket.setProjection(this);
		ticket.setStatus(status);
		ticket.setSeat(seat);
		ticket.setSaleDateTime(LocalDateTime.now());
		//dodavanje u skup
		tickets.add(ticket);
		//vracanje kupljene karte
		return ticket;
	}
	
	public void setMovie(Movie movie) {
		this.movie = movie;
		if(movie != null && !movie.getProjections().contains(this)) {
			movie.getProjections().add(this);
		}
	}
}
