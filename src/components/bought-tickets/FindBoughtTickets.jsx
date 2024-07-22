import React, { useState } from "react"
import moment from "moment"
import { deleteTicket, findByTicketConfirmationCode } from "../utils/AppFunction";

const FindBoughtTickets = () => {

    const [confirmationCode, setConfirmationCode] = useState("")
	const [error, setError] = useState(null)
	const [successMessage, setSuccessMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const TicketStatus = {
        CANCELLED: "CANCELLED",
        RESERVED: "RESERVED",
        PURCHASED: "PURCHASED",
        AVAILABLE: "AVAILABLE"
    };
    const [ticketInfo, setTicketInfo] = useState({
        id:"",
        projection:{id:"",movie:{name:""}},
        seat:{id:"",seatNumber:"",hall:{id:"",name:""}},
        saleDateTime:"",
        price:"",
        status:TicketStatus,
        ticketConfirmationCode:"",
        user:{email:""}
    });
    const emptyTicketInfo = {
        id:"",
        projection:{id:"",movie:{name:""}},
        seat:{id:"",seatNumber:"",hall:{id:"",name:""}},
        saleDateTime:"",
        price:"",
        status:TicketStatus,
        ticketConfirmationCode:"",
        user:{email:""}
    };

	const handleInputChange = (event) => {
		setConfirmationCode(event.target.value)
	}

    const handleFormSubmit = async(event) => {
        event.preventDefault()
		setIsLoading(true)
        try{
            const data = await findByTicketConfirmationCode(confirmationCode);
            setTicketInfo(data);
            setError(null)
        }
        catch(error){
            setTicketInfo(emptyTicketInfo);
            if (error.response && error.response.status === 404) {
				setError(error.response.data.message)
			} 
            else {
				setError(error.message)
			}
        }
        setTimeout(() => setIsLoading(false), 2000)
    };

    const handleBuyingCancellation = async() => {
        try{
            await deleteTicket(ticketInfo.id)
            setIsDeleted(true)
			setSuccessMessage("Buying has been cancelled successfully!")
			setTicketInfo(emptyTicketInfo);
			setConfirmationCode("")
			setError(null)
        }
        catch (error) {
			setError(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setIsDeleted(false)
		}, 2000)
    };

    return(
        <>
        <div className="container mt-5 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-center mb-4">Find My Bought-Tickets</h2>
			<form onSubmit={handleFormSubmit} className="col-md-6">
				<div className="input-group mb-3">
					<input
						className="form-control"
						type="text"
						id="confirmationCode"
						name="confirmationCode"
						value={confirmationCode}
						onChange={handleInputChange}
						placeholder="Enter the bought-ticket confirmation code"
					/>

					<button type="submit" className="btn btn-hotel input-group-text">
						Find bought-ticket
					</button>
				</div>
			</form>
            {isLoading ? (
                <div>Finding your bought-tickets...</div>
            ) : error ? (
                <div className="text-danger">Error: {error}</div>
            ) : ticketInfo.confirmationCode ? (
                <div className="col-md-6 mt-4 mb-5">
                    <h3>Ticket Information</h3>
                    <p className="text-success">Confirmation Code: {ticketInfo.bookingConfirmationCode}</p>
                    <p>Ticket Number: {ticketInfo.id}</p>
                    <p>Projection Number: {ticketInfo.projection.id}</p>
                    <p>Projection: {ticketInfo.projection.movie.name}</p>
                    <p>Seat Number: {ticketInfo.seat.seatNumber}</p>
                    <p>Sale Date: {ticketInfo.saleDateTime}</p>
                    <p>Price: {ticketInfo.price}</p>
                    <p>Ticket Status: {ticketInfo.status}</p>
                    <p>Email: {ticketInfo.user.email}</p>
                    {!isDeleted && (
							<button
								onClick={() => handleBuyingCancellation(ticketInfo.id)}
								className="btn btn-danger">
								Cancel Ticket
							</button>
						)}
                </div>
            ) : (
                <div>find ticket...</div>
            )}
            {isDeleted && <div className="alert alert-success mt-3 fade show">{successMessage}</div>}
        </div>
        </>
    );
};

export default FindBoughtTickets;