package com.projekat.cinemaApp.response;



import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SeatResponse {

	private Long id;
	
	private Integer seatNumber;
	
	private SeatHallResponse seatHallResponse;
	
	public SeatResponse(Long id, Integer seatNumber) {
		this.id = id;
		this.seatNumber = seatNumber;
	}
	
}
