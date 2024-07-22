package com.projekat.cinemaApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.projekat.cinemaApp.model.Payment;
import com.projekat.cinemaApp.request.PaymentRequest;
import com.projekat.cinemaApp.response.PaymentResponse;
import com.projekat.cinemaApp.service.PaymentService;
import com.stripe.exception.StripeException;


@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/payments")
public class PaymentController {

	
	@Autowired
	private PaymentService paymentService;
	
	//ako zelim da vratim entitet direktno kao odgovor
	/*@PostMapping("/process")
	public ResponseEntity<Payment> processPayment(@RequestBody PaymentRequest request){
		try {
            Payment payment = paymentService.processPayment(request.getAmount(), request.getCurrency());
            return ResponseEntity.ok(payment);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().build();
        }
	}*/
	
	//dodatna kontrola nad podacima koji se vracaju klijentu
	@PostMapping("/process")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest paymentRequest) {
        try {
            Payment payment = paymentService.processPayment(paymentRequest.getAmount(), paymentRequest.getCurrency());
            PaymentResponse paymentResponse = new PaymentResponse(payment.getId(), payment.getAmount(), payment.getCurrency(), payment.getStatus());
            return ResponseEntity.ok(paymentResponse);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
	
	
}
