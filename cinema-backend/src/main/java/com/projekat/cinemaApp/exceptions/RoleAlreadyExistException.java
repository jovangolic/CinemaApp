package com.projekat.cinemaApp.exceptions;




public class RoleAlreadyExistException extends RuntimeException {
	public RoleAlreadyExistException(String message) {
        super(message);
    }
}
