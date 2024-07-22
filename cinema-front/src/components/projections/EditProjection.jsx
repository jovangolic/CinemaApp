import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getProjectionById, updateProjection } from "../utils/AppFunction";

const EditProjection = () => {

    const[projection, setProjection] = useState({
        movie:"",
        projectionType:"",
        hall:"",
        date:"",
        price:""
    });
    const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
    const{ projectionId } = useParams();

    /*const handleInputChange = (e) => {
        const { name, value} = e.target;
        setProjection({...projection, [name]:value});
    };*/
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setProjection((prevProjection) => ({
			...prevProjection,
			[name]: value !== undefined ? value : ""
		}));
	};

    useEffect(() => {
		const fetchProjection = async () => {
			try {
				const projectionData = await getProjectionById(projectionId);
				// Postavljanje default vrednosti ako su neki atributi undefined
				setProjection({
					movie: projectionData.movie || "",
					projectionType: projectionData.projectionType || "",
					hall: projectionData.hall || "",
					date: projectionData.dateTime || "",
					price: projectionData.ticketPrice || ""
				});
			} catch (error) {
				console.error(error);
			}
		};
		fetchProjection();
	}, [projectionId]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const response = await updateProjection(projectionId, projection);
            if(response.status === 200){
                setSuccessMessage("Projection successfully updated");
                const updateProjectionData = await getProjectionById(projectionId)
                setProjection(updateProjectionData);
                setErrorMessage("");
            }
            else {
				setErrorMessage("Error updating room")
			}
        }
        catch (error) {
			console.error(error)
			setErrorMessage(error.message)
		}
    };

    return(
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Projection</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && (
						<div className="alert alert-success" role="alert">
							{successMessage}
						</div>
					)}
					{errorMessage && (
						<div className="alert alert-danger" role="alert">
							{errorMessage}
						</div>
					)}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
							<label htmlFor="movie" className="form-label hotel-color">
								Movie
							</label>
							<input
								type="text"
								className="form-control"
								id="movie"
								name="movie"
								value={projection.movie}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
							<label htmlFor="projectionType" className="form-label hotel-color">
								Projection Type
							</label>
							<input
								type="text"
								className="form-control"
								id="projectionType"
								name="projectionType"
								value={projection.projectionType}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
							<label htmlFor="hall" className="form-label hotel-color">
								Hall
							</label>
							<input
								type="text"
								className="form-control"
								id="hall"
								name="hall"
								value={projection.hall}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
							<label htmlFor="dateTime" className="form-label hotel-color">
								Date
							</label>
							<input
								type="datetime-local"
								className="form-control"
								id="dateTime"
								name="dateTime"
								value={projection.date}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="mb-3">
							<label htmlFor="price" className="form-label hotel-color">
                                Price
							</label>
							<input
								type="number"
								className="form-control"
								id="price"
								name="price"
								value={projection.price}
								onChange={handleInputChange}
							/>
						</div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-projections"} className="btn btn-outline-info ml-5">
								Back
							</Link>
							<button type="submit" className="btn btn-outline-warning">
								Edit Projection
							</button>
						</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProjection;