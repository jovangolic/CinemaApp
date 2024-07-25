import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Card, Carousel, Col, Container, Row } from "react-bootstrap"
import { getAllMovies } from "../utils/AppFunction";


const MovieCarousel = () =>{

    const [movies, setMovies] = useState([{id:"", name:"", duration:"", photo:""}]);
    const [errorMessage, setErrorMessage] = useState("")
	const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllMovies()
            .then((data) => {
                setMovies(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setErrorMessage(error.message)
				setIsLoading(false)
            })
    },[]);

    if (isLoading) {
		return <div className="mt-5">Loading movies....</div>
	}
	if (errorMessage) {
		return <div className=" text-danger mb-5 mt-5">Error : {errorMessage}</div>
	}

    return(
        <section className="bg-light mb-5 mt-5 shadow">
            <Link to={"/browse-all-movies"} className="hote-color text-center">
				Browse all movies
			</Link>
            <Container>
                <Carousel indicators={false}>
                    {[...Array(Math.ceil(movies.length / 4))].map((_, index) => (
                        <Carousel.Item key={index}>
                            <Row>
                                {movies.slice(index * 4 + 4).map((movie) => (
                                    <Col key={movie.id} className="mb-4" xs={12} md={6} lg={3}>
                                        <Card>
                                            <Link to={`/buy-ticket/${movie.id}`}>
                                                    <Card.Img
                                                        variant="top"
                                                        src={`data:image/png;base64, ${movie.photo}`}
                                                        alt="Movie Photo"
                                                        className="w-100"
                                                        style={{ height: "200px" }}
                                                    />
                                                </Link>
                                                <Card.Body>
                                                    <Card.Title className="hotel-color">{movie.name}</Card.Title>
                                                    
                                                    <div className="flex-shrink-0">
                                                        <Link to={`/buy-ticket/${movie.id}`} className="btn btn-hotel btn-sm">
                                                            Buy Now
                                                        </Link>
                                                    </div>
                                                </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Container>
        </section>
    );
};

export default MovieCarousel;
