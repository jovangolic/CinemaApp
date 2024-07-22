package com.projekat.cinemaApp.service;

import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.projekat.cinemaApp.exceptions.NoSuchElementException;
import com.projekat.cinemaApp.exceptions.UserAlreadyExistsException;
import com.projekat.cinemaApp.model.Role;
import com.projekat.cinemaApp.model.User;
import com.projekat.cinemaApp.repository.RoleRepository;
import com.projekat.cinemaApp.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService implements IUserService {
	
	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	
	private final UserRepository userRepository;
	
	private final RoleRepository roleRepository;
	
	private final PasswordEncoder passwordEncoder;
	
	/*@Override
	public User registerUser(User user) {
		//da li postoji korisnik
		if (userRepository.existsByEmail(user.getEmail())){
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user.getPassword());
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        user.setRoles(Collections.singletonList(userRole));
        return userRepository.save(user);
	}*/

	@Override
	public User registerUser(User user) {
		logger.info("Registering user with email: {}", user.getEmail());
		// Da li postoji korisnik
		if (userRepository.existsByEmail(user.getEmail())){
            logger.warn("User with email {} already exists", user.getEmail());
            throw new UserAlreadyExistsException(user.getEmail() + " already exists");
        }
        
        // Pronađi rolu ili baci izuzetak ako ne postoji
        Role userRole = roleRepository.findByName("ROLE_USER")
            .orElseThrow(() -> {
                logger.error("Role ROLE_USER not found");
                return new NoSuchElementException("Role not found");
            });
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        logger.debug("Encoded password for user with email: {}", user.getEmail());
        user.setRoles(Collections.singletonList(userRole));
        
        User savedUser = userRepository.save(user);
        logger.info("User with email {} successfully registered", user.getEmail());
        return savedUser;
	}

	@Override
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@Transactional
	@Override
	public void deleteUser(String email) {
		User theUser = getUser(email);
		if(theUser != null) {
			userRepository.deleteByEmail(email);
		}
		
	}

	@Override
	public User getUser(String email) {
		return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
	}

}
