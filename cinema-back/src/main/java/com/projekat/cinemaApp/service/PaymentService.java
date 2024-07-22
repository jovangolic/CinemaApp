package com.projekat.cinemaApp.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.projekat.cinemaApp.model.Payment;
import com.projekat.cinemaApp.repository.PaymentRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentService {

	@Value("${stripe.api.key}")
	private String stripeApiKey;
	
	private final PaymentRepository paymentRepository;
	
	@PostConstruct
	public void init() {
		Stripe.apiKey = stripeApiKey;
	}
	
	
	public Payment processPayment(Double amount, String currency) throws StripeException {
		Map<String, Object> chargeParams = new HashMap<String, Object>();
		chargeParams.put("amount", (int) (amount * 100)); // amount in cents
        chargeParams.put("currency", currency);
        chargeParams.put("source", "tok_visa"); // Test token, replace with actual token from frontend
        Charge charge = Charge.create(chargeParams);
        Payment payment = new Payment();
        payment.setAmount(amount);
        payment.setCurrency(currency);
        payment.setStatus(charge.getStatus());
		return paymentRepository.save(payment);
	}
}
