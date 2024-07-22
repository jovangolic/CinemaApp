package com.projekat.cinemaApp.exceptions;


public class InvalidTicketRequestException extends RuntimeException {
	public InvalidTicketRequestException(String message) {
		super(message);
	}
}
