import React, { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import ProjectionPaginator from "../common/ProjectionPaginator";
import ProjectionCard from "./ProjectionCard";
import { getAllProjections }from "../utils/AppFunction";
import ProjectionTypeFilter from "../common/ProjectionTypeFilter";

const Projection = () => {

    const [data, setData] = useState([])
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [projectionsPerPage] = useState(6)
	const [filteredData, setFilteredData] = useState([{ id: "" }])

    useEffect(() => {
        setIsLoading(true);
        getAllProjections()
        .then((data) => {
            setData(data)
			setFilteredData(data)
			setIsLoading(false)
        })
        .catch((error) => {
            setError(error.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
		return <div>Loading projections.....</div>
	}
	if (error) {
		return <div className=" text-danger">Error : {error}</div>
	}

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const totalPages = Math.ceil(filteredData.length / projectionsPerPage)

	const renderProjections = () => {
		const startIndex = (currentPage - 1) * projectionsPerPage
		const endIndex = startIndex + projectionsPerPage
		return filteredData
			.slice(startIndex, endIndex)
			.map((projection) => <ProjectionCard key={projection.id} projection={projection} />)
	}

    return(
        <Container>
			<Row>
				<Col md={6} className="mb-3 mb-md-0">
					<ProjectionTypeFilter data={data} setFilteredData={setFilteredData} />
				</Col>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<ProjectionPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>

			<Row>{renderProjections()}</Row>

			<Row>
				<Col md={6} className="d-flex align-items-center justify-content-end">
					<ProjectionPaginator
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={handlePageChange}
					/>
				</Col>
			</Row>
		</Container>
    );
};

export default Projection;