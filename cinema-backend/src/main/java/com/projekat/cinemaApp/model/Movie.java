package com.projekat.cinemaApp.model;

import java.sql.Blob;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;



@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Movie {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	private Integer duration;
	
	private String distributor;
	
	private String country;
	
	private Integer year;
	
	private String description;
	
	@Lob
	private Blob photo;
	
	@OneToMany(mappedBy = "movie", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Projection> projections = new ArrayList<>();
	
	public void addProjection(Projection projection) {
        this.projections.add(projection);
        if (!projection.getMovie().equals(this)) {
            projection.setMovie(this);
        }
    }
}
