package com.projekat.cinemaApp.service;

import java.util.List;

import com.projekat.cinemaApp.model.User;



public interface IUserService {

	User registerUser(User user);
	List<User> getUsers();
	void deleteUser(String email);
	User getUser(String email);
	
}
