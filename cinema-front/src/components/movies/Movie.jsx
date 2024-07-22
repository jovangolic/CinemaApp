import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { getAllMovies } from "../utils/AppFunction";
import MovieCard from "./MovieCard";
import MoviePaginator from "../common/MoviePaginator";

const Movie = () => {

    const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [moviesPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

    useEffect(()=>{
        setIsLoading(true);
        getAllMovies().then((data) => {
            setData(data);
            setFilteredData(data);
            setIsLoading(false);
        }).catch((error) => {
            setError(error.message);
            setIsLoading(false)
        });
    },[]);

    if(isLoading){
        return <div>Loading movies....</div>
    }
    if(error){
        return <div className="text-danger">Error : {error}</div>
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredData.length / moviesPerPage);
    const renderMovies = () => {
        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        return filteredData.slice(startIndex, endIndex)
            .map((movie) => <MovieCard key={movie.id} movie={movie} />);
    };

    return(
        <Container>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <MoviePaginator 
                        currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange} />
                </Col>
            </Row>
            <Row>
                {renderMovies()}
            </Row>
            <Row>
                <Col md={6} className="d-flex align-items-center justify-content-end">
                    <MoviePaginator 
                        currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange} />
                </Col>
            </Row>
        </Container>
    );
};

export default Movie;