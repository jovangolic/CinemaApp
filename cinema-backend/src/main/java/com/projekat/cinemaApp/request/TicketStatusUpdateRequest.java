package com.projekat.cinemaApp.request;

import com.projekat.cinemaApp.enumeration.TicketStatus;

public class TicketStatusUpdateRequest {

	
	private TicketStatus status;

    public TicketStatus getStatus() {
        return status;
    }

    public void setStatus(TicketStatus status) {
        this.status = status;
    }
}
