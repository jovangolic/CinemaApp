import React, { useEffect } from "react"
import moment from "moment"
import { useState } from "react"
import { Form, FormControl, Button } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { getProjectionById, buyTicket,
     getAllProjections, getSeats, getAllHalls, getAvailableSeats } 
     from "../utils/AppFunction"
import BoughtTicketsSummary from "./BoughtTicketsSummary"

const BoughtTicketsForm = () => {

    const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [ticketPrice, setTicketPrice] = useState(0)
    const [projections, setProjections] = useState([]);
    const [seats, setSeats] = useState([]);
    const [halls, setHalls] = useState([]);
    const [selectedHall, setSelectedHall] = useState("");
    const TicketStatus = {
        CANCELLED: "CANCELLED",
        RESERVED: "RESERVED",
        PURCHASED: "PURCHASED",
        AVAILABLE: "AVAILABLE"
    };

    const currentUser = localStorage.getItem("userId")
    const { projectionId } = useParams()
	const navigate = useNavigate()
    const[tickets, setTickets] = useState({
        projection:"",
        seat:"",
        status:TicketStatus.AVAILABLE,
        user:currentUser
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const projectionsData = await getAllProjections();
                setProjections(projectionsData);

                const hallsData = await getAllHalls();
                setHalls(hallsData);

                if (hallsData.length > 0) {
                    const seatsData = await getAvailableSeats(hallsData[0].id);
                    setSeats(seatsData);
                }
            } catch (error) {
                console.error("Error fetching data", error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (projectionId) {
            getProjectionPriceById(projectionId);
        }
    }, [projectionId]);

    const handleInputChange = (e) => {
		const { name, value } = e.target
		setTickets({ ...tickets, [name]: value })
		setErrorMessage("")
	}

    const handleHallChange = (e) => {
        setSelectedHall(e.target.value);
        setTickets({ ...tickets, seat: "" }); // Resetovanje izabranog sedista kada se promeni sala
      };

    const getProjectionPriceById = async(projectionId) =>{
        try{
            const response = await getProjectionById(projectionId);
            setTicketPrice(response.ticketPrice);
        }
        catch (error) {
			throw new Error(error)
		}
    }

    const calculatePayment = () => {
        const paymentPrice = ticketPrice ? ticketPrice : 0;
        return paymentPrice;
    };


    const isSaleDateValid = () => {
        if(!moment(buyTicket.saleDateTime).isSameOrAfter(buyTicket.saleDateTime)){
            setErrorMessage("Sale date must not be in the past")
			return false
		}
        else {
			setErrorMessage("")
			return true
		}
    };

    /*const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.currentTarget
        if(form.checkValidity() === false || !isSaleDateValid()){
            e.stopPropagation();
        }
        else{
            isSubmitted(true);
            handleFormSubmit()
        }
        setValidated(true);
    };

    const handleFormSubmit = async() => {
        try{
            const confirmationCode = await buyTicket(projectionId, tickets);
            setIsSubmitted(true)
			navigate("/bought-ticket-success", { state: { message: confirmationCode } })
        }
        catch(error){
            const errorMessage = error.message;
            console.log(errorMessage);
            navigate("bought-ticket-success", {state : {error: errorMessage}})
        }
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false || !isSaleDateValid()) {
            e.stopPropagation();
        } else {
            try {
                const confirmationCode = await buyTicket(projectionId, tickets);
                setIsSubmitted(true);
                navigate("/bought-ticket-success", { state: { message: confirmationCode } });
            } catch (error) {
                console.error("Error buying ticket", error);
                setErrorMessage("Error buying ticket. Please try again.");
            }
        }
        setValidated(true);
    };

    return(
        <>
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-6">
                    <div className="card card-body mt-5">
                        <h4 className="card-title">Buy Ticket</h4>
                        <Form onSubmit={handleSubmit} noValidate validated={validated}>
                            <Form.Group>
                                <Form.Label>Projection</Form.Label>
                                <Form.Select
                                    required
                                    id="projection"
                                    name="projection"
                                    value={tickets.projection}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Choose your projection</option>
                                    {projections.map((projection) => (
                                        <option key={projection.id} value={projection.id}>
                                            {projection.movie ? projection.movie.id : "No Movie"} - {moment(projection.dateTime).format("MMMM Do YYYY, h:mm:ss a")}
                                         </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
										Please choose your projection.
								</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Hall</Form.Label>
                                <Form.Select
                                    required
                                    id="hall"
                                    name="hall"
                                    value={selectedHall}
                                    onChange={handleHallChange}
                                >
                                    <option value="">Choose your hall</option>
                                    {halls.map((hall) => (
                                    <option key={hall.id} value={hall.id}>
                                        {hall.name}
                                    </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Please choose your hall.
                                </Form.Control.Feedback>
                            </Form.Group>

                            
                            <Form.Group>
                                    <Form.Label>Seat</Form.Label>
                                    <Form.Select
                                        required
                                        type="number"
                                        id="seat"
                                        name="seat"
                                        value={tickets.seat}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Choose your seat</option>
                                        {seats.map((seat) => (
                                            <option key={seat.id} value={seat.id}>
                                                Seat {seat.seatNumber} - Hall {seat.hall.name}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose your seat.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            
                            <Form.Group>
                                <Form.Label>Ticket Status</Form.Label>
                                <Form.Select
                                required
                                id="status"
                                name="status"
                                value={tickets.status}
                                onChange={handleInputChange}
                                >
                                    <option value="">Choose ticket status</option>
                                    {Object.values(TicketStatus).map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
									Please choose ticket status.
								</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group>
								<Form.Label htmlFor="email" className="hotel-color">
									Email
								</Form.Label>
								<FormControl
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={tickets.user.email}
                                    placeholder="Enter your email"
                                    onChange={handleInputChange}
                                />
								<Form.Control.Feedback type="invalid">
									Please enter a valid email address.
								</Form.Control.Feedback>
							</Form.Group>
                            
                            <div className="form-group mt-2 mb-2">
								<button type="submit" className="btn btn-hotel">
									Continue
								</button>
							</div>
                        </Form>
                        {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                    </div>
                </div>
                <div className="col-md-4">
                    {isSubmitted && (
                        <BoughtTicketsSummary 
                        buying={tickets}
                        payment={calculatePayment()}
                        isFormValid={!errorMessage && validated}
                        
                        />
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default BoughtTicketsForm;

/*
{selectedHall && (
                            <Form.Group>
                                <Form.Label>Seat</Form.Label>
                                <Form.Select
                                required
                                id="seat"
                                name="seat"
                                value={tickets.seat}
                                onChange={handleInputChange}
                                >
                                <option value="">Choose your seat</option>
                                {seats
                                    .filter((seat) => seat.hall && seat.hall.id === selectedHall)
                                    .map((seat) => (
                                    <option key={seat.id} value={seat.id}>
                                        Seat {seat.seatNumber}
                                    </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                Please choose your seat.
                                </Form.Control.Feedback>
                            </Form.Group>
                            )} */