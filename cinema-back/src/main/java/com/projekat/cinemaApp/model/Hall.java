package com.projekat.cinemaApp.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
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
public class Hall {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	
	@ManyToMany
	@JoinTable(name="hall_projection_type", joinColumns = @JoinColumn(name="hall_id"),
			inverseJoinColumns = @JoinColumn(name="projection_id"))
	private Set<ProjectionType> projectionTypes;
	
	@OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Seat> seats;
	
	@OneToMany(mappedBy = "hall", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Projection> projections;
	
	public void addProjection(Projection projection) {
		this.projections.add(projection);
		if(!equals(projection.getHall())) {
			projection.setHall(this);
		}
	}
}
