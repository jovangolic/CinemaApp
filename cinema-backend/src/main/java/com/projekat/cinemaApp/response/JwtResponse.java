package com.projekat.cinemaApp.response;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtResponse {

	private Long id;
    private String email;
    private String token;
    private String type = "Bearer";
    private List<String> roles;
    private String refreshToken;

    public JwtResponse(Long id, String email, String token, List<String> roles) {
        this.id = id;
        this.email = email;
        this.token = token;
        this.roles = roles;
    }

	public JwtResponse(Long id, String email, String token, List<String> roles, String refreshToken) {
		this.id = id;
		this.email = email;
		this.token = token;
		this.roles = roles;
		this.refreshToken = refreshToken;
	}
    
    
}
