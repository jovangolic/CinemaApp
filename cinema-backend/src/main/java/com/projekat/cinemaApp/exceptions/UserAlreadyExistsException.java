package com.projekat.cinemaApp.exceptions;



public class UserAlreadyExistsException extends RuntimeException {
	public UserAlreadyExistsException(String message) {
        super(message);
    }
}
