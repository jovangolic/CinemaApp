import React, { useState, useEffect } from "react"
import moment from "moment"
import Button from "react-bootstrap/Button"
import { useNavigate } from "react-router-dom"

const BoughtTicketsSummary = ({buying, payment, isFormValid}) => {
    const saleDateTime = moment(buying.saleDateTime)
	const [isBuyingConfirmed, setIsBuyingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

    const handleConfirmBuying = () => {
        setIsProcessingPayment(true);
        setTimeout(()=>{
            setIsProcessingPayment(false)
            setIsBuyingConfirmed(true)
            
        },3000);
    };

    useEffect(()=>{
        if(isBuyingConfirmed){
            navigate("/bought-ticket-success")
        }
    },[isBuyingConfirmed, navigate]);

    return(
        <div className="row">
            <div className="col-md-6"></div>
            <div className="card card-body mt-5">
                <h4 className="card-title hotel-color">Ticket Summary</h4>
                <p>
                    Projection: <strong>{buying.projection}</strong>
                </p>
                <p>
                    Seat: <strong>{buying.seat}</strong>
                </p>
                <p>
                    Sales date: <strong>{moment(buying.saleDateTime).format("MMM Do YYYY")}</strong>
                </p>
                <p>
                    Price: <strong>{buying.price}</strong>
                </p>
                <p>
                    Ticket status: <strong>{buying.status}</strong>
                </p>
                <p>
                    Email: <strong>{buying.user.email}</strong>
                </p>
                {payment > 0 ? (
                    <>
                    <p>
							Total payment: <strong>${payment}</strong>
					</p>
                    {isFormValid && !isBuyingConfirmed ? (
                        <Button variant="success" onClick={handleConfirmBuying}>
                            {isProcessingPayment ? (
                                <>
                                <span
									className="spinner-border spinner-border-sm mr-2"
									role="status"
									aria-hidden="true"></span>
									Buying Confirmed, redirecting to payment...
                                </>
                            ) : (
                                "Confirm Buying & proceed to payment"
                            )}
                        </Button>
                    ) : isBuyingConfirmed ? (
                        <div className="d-flex justify-content-center align-items-center">
							<div className="spinner-border text-primary" role="status">
								<span className="sr-only">Loading...</span>
							</div>
						</div>
                    ) : null}
                    </>
                ) : (
                    <p className="text-danger">Sale date must not be in the past.</p>
                )}
            </div>
        </div>
    );
};

export default BoughtTicketsSummary;