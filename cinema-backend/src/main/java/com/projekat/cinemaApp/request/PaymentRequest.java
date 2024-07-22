package com.projekat.cinemaApp.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PaymentRequest {
    private Double amount;
    private String currency;
}
