import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProjectionCard = ({ projection }) => {
    if (!projection) {
        return null;
    }

    const { id, movieResponse, typeResponse, hallResponse, dateTime, ticketPrice } = projection;

    return (
        <Col key={id} className="mb-4" xs={12}>
            <Card>
                <Card.Body className="d-flex align-items-center">
                    <div className="flex-shrink-0 mr-3">
                        <Link to={`/buy-ticket/${id}`}>
                            {movieResponse && movieResponse.photo ? (
                                <Card.Img
                                    variant="top"
                                    src={`data:image/png;base64, ${movieResponse.photo}`}
                                    alt="Movie Photo"
                                    style={{ width: "150px", height: "auto" }}
                                />
                            ) : (
                                <div
                                    style={{
                                        width: "150px",
                                        height: "225px",
                                        backgroundColor: "#e0e0e0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    No Image
                                </div>
                            )}
                        </Link>
                    </div>
                    <div className="flex-grow-1 ml-3">
                        <Card.Title className="hotel-color">{movieResponse ? movieResponse.name : "N/A"}</Card.Title>
                        <Card.Title className="hotel-color">{typeResponse ? typeResponse.name : "N/A"}</Card.Title>
                        <Card.Title className="hotel-color">{hallResponse ? hallResponse.name : "N/A"}</Card.Title>
                        <Card.Title className="hotel-color">
                            {dateTime ? new Date(dateTime[0], dateTime[1] - 1, dateTime[2], dateTime[3], dateTime[4]).toLocaleString() : "N/A"}
                        </Card.Title>
                        <Card.Title className="hotel-color">RSD {ticketPrice}</Card.Title>
                        <Link to={`/buy-ticket/${id}`} className="btn btn-hotel btn-sm mt-2">
                            Buy Now
                        </Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ProjectionCard;


