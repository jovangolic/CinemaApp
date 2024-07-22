import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Header from "./Header";
import { FaWifi, FaCocktail, FaParking, FaSnowflake, FaClock, FaFilm} from "react-icons/fa";
import { GiPopcorn } from "react-icons/gi";

const CinemaService = () => {


    return(
        <>
            <Container className="mb-2">
                <Header title={"Our Services"} />
                <Row>
                    <h4 className="text-center">Services at <span className="hotel-color">Awesome-O - </span> Cinema
                    <span className="gap-2">
                        <FaClock /> - 16-Hour Front Desk
                    </span>
                    </h4>
                </Row>
                <hr/>
                <Row xs={1} md={2} lg={3} className="g-4 mt-2">
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className="hotel-color">
                                    <FaWifi /> WiFi
                                </Card.Title>
                                <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaCocktail /> Mini-bar
								</Card.Title>
								<Card.Text>Enjoy a refreshing drink or snack from our in-room mini-bar.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaParking /> Parking
								</Card.Title>
								<Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaSnowflake /> Air conditioning
								</Card.Title>
								<Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
							</Card.Body>
						</Card>
					</Col>

                    <Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
                                <GiPopcorn size={50} color="goldenrod" /> Popcorn
								</Card.Title>
								<Card.Text>Enjoy in awesome Popcorn.</Card.Text>
							</Card.Body>
						</Card>
					</Col>

					<Col>
						<Card>
							<Card.Body>
								<Card.Title className="hotel-color">
									<FaFilm /> Movies
								</Card.Title>
								<Card.Text>Relax and enjoy in awesome Movies.</Card.Text>
							</Card.Body>
						</Card>
					</Col>
                </Row>
            </Container>
        </>
    );
};

export default CinemaService;