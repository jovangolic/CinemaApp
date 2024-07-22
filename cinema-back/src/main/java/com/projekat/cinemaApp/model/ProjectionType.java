package com.projekat.cinemaApp.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
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
public class ProjectionType {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@ManyToMany(mappedBy = "projectionTypes")
	private Set<Hall> halls;
	
	@OneToMany(mappedBy = "projectionType",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private Set<Projection> projections;
}
