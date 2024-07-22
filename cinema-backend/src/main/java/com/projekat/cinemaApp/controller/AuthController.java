package com.projekat.cinemaApp.controller;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.dto.UserDTO;
import com.projekat.cinemaApp.exceptions.UserAlreadyExistsException;
import com.projekat.cinemaApp.model.User;
import com.projekat.cinemaApp.request.LoginRequest;
import com.projekat.cinemaApp.response.JwtResponse;
import com.projekat.cinemaApp.security.jwt.JwtUtils;
import com.projekat.cinemaApp.security.user.CinemaUserDetails;
import com.projekat.cinemaApp.security.user.CinemaUserDetailsService;
import com.projekat.cinemaApp.service.IUserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
	
	
	private final IUserService userService;
	private final AuthenticationManager authenticationManager;
	private final JwtUtils jwtUtils;
	private final CinemaUserDetailsService userDetailsService;
	
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	/*@PostMapping("/register-user")
	public ResponseEntity<?> registerUser(@RequestBody User user){
		try {
			userService.registerUser(user);
			return ResponseEntity.ok("Registration successful!");
		}
		catch(UserAlreadyExistsException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}*/
	
	
	//metoda za registraciju novog korisnika
		@PostMapping("/register-user")
		public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO){
			logger.info("Registering user with email: {}", userDTO.getEmail());
			try {
	            User user = new User();
	            user.setFirstName(userDTO.getFirstName());
	            user.setLastName(userDTO.getLastName());
	            user.setEmail(userDTO.getEmail());
	            user.setPassword(userDTO.getPassword());

				userService.registerUser(user);
				logger.info("User with email {} successfully registered", userDTO.getEmail());
				return ResponseEntity.ok("Registration successful!");
			}
			catch(UserAlreadyExistsException e) {
				logger.error("Error registering user: {}", e.getMessage());
				return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
			}
		}
		
		//metoda za logovanje postojeceg korisnika
		@PostMapping("/login")
		public ResponseEntity<?> authenticateUsers(@Valid @RequestBody LoginRequest request){
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			//generisanje tokena
			String jwt = jwtUtils.generateJwtTokenForUser(authentication);
			CinemaUserDetails userDetails = (CinemaUserDetails)authentication.getPrincipal();
			List<String> roles = userDetails.getAuthorities().stream().map(
					GrantedAuthority::getAuthority).toList();
			return ResponseEntity.ok(new JwtResponse(
					userDetails.getId(),
					userDetails.getEmail(),
					jwt,
					roles));
		}
		
		
		@PostMapping("/refresh-token")
		public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request){
			String refreshToken = request.get("refreshToken");
			if(refreshToken == null || !jwtUtils.validateToken(refreshToken)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired refresh token");
			}
			String username = jwtUtils.getUserNameFromToken(refreshToken);
			UserDetails userDetails = userDetailsService.loadUserByUsername(username);
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
			String newJwt = jwtUtils.generateJwtTokenForUser(authentication);
			return ResponseEntity.ok(
					new JwtResponse(
				            ((CinemaUserDetails) userDetails).getId(),
				            userDetails.getUsername(),
				            newJwt,
				            userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()),
				            refreshToken));
		}

}
