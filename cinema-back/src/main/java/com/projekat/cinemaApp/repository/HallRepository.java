package com.projekat.cinemaApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projekat.cinemaApp.model.Hall;

public interface HallRepository extends JpaRepository<Hall, Long> {

}
