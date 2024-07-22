package com.projekat.cinemaApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projekat.cinemaApp.model.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

	
}
