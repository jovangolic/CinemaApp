package com.projekat.cinemaApp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;




@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Seat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private Integer seatNumber;
	
	private boolean available = true;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="hall_id")
	private Hall hall;
}
