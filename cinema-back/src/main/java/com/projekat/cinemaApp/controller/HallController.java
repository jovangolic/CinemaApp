package com.projekat.cinemaApp.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.model.Hall;
import com.projekat.cinemaApp.response.HallResponse;
import com.projekat.cinemaApp.service.IHallService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/halls")
@RequiredArgsConstructor
public class HallController {

	
	private final IHallService hallService;
	
	
	
	@PostMapping("/add/new-hall")
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public ResponseEntity<HallResponse> createHall(@RequestParam("name") String name) throws IOException, SQLException{
		Hall savedHall = hallService.createHall(name);
		HallResponse response = new HallResponse(savedHall.getId(), savedHall.getName());
		return ResponseEntity.ok(response);
	}
	
	
	@GetMapping("/all-halls")
	public ResponseEntity<List<HallResponse>> getAllHalls(){
		List<Hall> halls = hallService.getAllHalls();
		List<HallResponse> responses = new ArrayList<>();
		for(Hall h : halls) {
			HallResponse response = getHallResponse(h);
			responses.add(response);
		}
		return ResponseEntity.ok(responses);
	}
	
	private HallResponse getHallResponse(Hall hall) {
		return new HallResponse(hall.getId(), hall.getName());
	}
}
