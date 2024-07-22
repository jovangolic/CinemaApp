import React, { useContext } from "react"
import { Card, Col } from "react-bootstrap"
import { Link } from "react-router-dom"

const MovieCard = ({movie}) => {

    return(
        <Col key={movie.id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex flex-wrap align-items-center">
                    <div className="flex-shrrink-0 mr-3 mb-3 mb-md-0">
                        <Link to={`/buy-ticket/${movie.id}`}>
                            <Card.Img
								variant="top"
								src={`data:image/png;base64, ${movie.photo}`}
								alt="Movie Photo"
								style={{ width: "100%", maxWidth: "200px", height: "auto" }}
							/>
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3 px-5">
                        <Card.Title className="hotel-color">{movie.name}</Card.Title>
                        <Card.Title className="hotel-color">{movie.duration} / minutes</Card.Title>
                        <Card.Title className="hotel-color">{movie.description}Some description.</Card.Title>
                    </div>
                    <div className="flex-shrink-0 mt-3">
                        <Link to={`/buy-ticket/${movie.id}`} className="btn btn-hotel btn-sm">
                            Buy Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default MovieCard;