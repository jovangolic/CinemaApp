import React, { useEffect, useState } from "react"
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Col, Row } from "react-bootstrap"
import ProjectionPaginator from "../common/ProjectionPaginator"
import { deleteProjection, getAllProjections, getAllHalls, getAllProjectionTypes,getAllMovies } from "../utils/AppFunction"

const ExistingProjections = () => {

    /*const[projections, setProjections] = useState([
        {id:"",movie:"",projectionType:"",hall:"",date:"",price:""}
    ]);*/
    const [projections, setProjections] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
	const [projectionsPerPage] = useState(8)
	const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
    const[movies, setMovie] = useState([""]);
    const[halls, setHalls] = useState([""]);
    const[projectionTypes, setProjectionTypes] = useState([""]);

    useEffect(()=> {
        fetchProjections();
        fetchMovies();
        fetchHalls();
        fetchProjectionTypes();
    },[]);

    const fetchProjections = async() => {
        setIsLoading(true);
        try{
            const result = await getAllProjections();
            setProjections(result);
            setIsLoading(false);
        }
        catch(error){
            setErrorMessage(error.message)
			setIsLoading(false)
        }
    };

    const fetchMovies = async() => {
        try{
            const result = await getAllMovies();
            setMovie(result);
        }
        catch(error){
            setErrorMessage(error.message)
			setIsLoading(false)
        }
    };

    const fetchHalls = async() => {
        try{
            const result = await getAllHalls();
            setHalls(result);
        }
        catch(error){
            setErrorMessage(error.message)
			setIsLoading(false)
        }
    };

    const fetchProjectionTypes = async() =>{
        try{
            const result = await getAllProjectionTypes()
            setProjectionTypes(result);
        }
        catch(error){
            setErrorMessage(error.message)
			setIsLoading(false)
        }
    };

    useEffect(()=>{
        setCurrentPage(1);
    },[projections]);

    const handlePaginationClick = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const handleDelete = async(projectionId) => {
        try{
            const result = await deleteProjection(projectionId);
            if(result === ""){
                setSuccessMessage(`Projection No ${projectionId} deleted`);
                fetchProjections()
            }
            else{
                console.error(`Error deleting projection:  ${result.message}`);
            }
        }
        catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
    };

    const calculateTotalPages = () => {
        const totalProjections = projections.length;
        return Math.ceil(totalProjections / projectionsPerPage);
    };

    const indexOfLastProjection = currentPage * projectionsPerPage;
    const indexOfFirstProjection = indexOfLastProjection - projectionsPerPage;
    const currentProjections = projections.slice(indexOfFirstProjection, indexOfLastProjection);

    return(
        <>
        <div className="container col-md-8 col-lg-6">
				{successMessage && <p className="alert alert-success mt-5">{successMessage}</p>}

				{errorMessage && <p className="alert alert-danger mt-5">{errorMessage}</p>}
		</div>
        {isLoading ? (
            <p>Loading projections ....</p>
        ) : (
            <>
            <section className="mt-5 mb-5 container">
                <div className="d-flex justify-content-between mb-3 mt-5">
                    <h2>Existing Projections</h2>
                </div>    
                    <Row>
                        <Col md={6} className="d-flex justify-content-end">
						    <Link to={"/add-projection"}>
							    <FaPlus /> Add Projection
						    </Link>
					    </Col>
                </Row>
                <table className="table table-bordered table-hover">
                    <thead>
                        <tr className="text-center">
                        <th>ID</th>
                        <th>Movie</th>
                        <th>Projection Type</th>
                        <th>Hall</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProjections.map((projection) => (
                            <tr key={projection.id} className="text-center">
                                <td>{projection.id}</td>
                                <td>{projection.movieResponse.name}</td>
                                <td>{projection.typeResponse.name}</td>
                                <td>{projection.hallResponse.name}</td>
                                <td>{new Date(projection.dateTime).toLocaleString()}</td>
                                <td>{projection.ticketPrice}</td>
                                <td className="gap-2">
                                    <Link to={`/edit-projection/${projection.id}`} className="gap-2">
										<span className="btn btn-info btn-sm">
											<FaEye />
										</span>
										<span className="btn btn-warning btn-sm ml-5">
											<FaEdit />
										</span>
									</Link>
									<button
										className="btn btn-danger btn-sm ml-5"
										onClick={() => handleDelete(projection.id)}>
										<FaTrashAlt />
									</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <ProjectionPaginator
                    currentPage={currentPage} 
                    totalPages={calculateTotalPages()}
                    onPageChange={handlePaginationClick}
                />
            </section>
            </>
        )}
        </>
    );
};

export default ExistingProjections;