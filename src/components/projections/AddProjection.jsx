import React, { useState } from "react"
import { Link } from "react-router-dom"
import { addProjection } from "../utils/AppFunction";
import ProjectionTypeSelector from "../common/ProjectionTypeSelector";

const AddProjection = () => {

    const[newProjection, setNewProjection] = useState({
        movie:"",
        projectionType:"",
        hall:"",
        date:"",
        price:""
    });

    const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

    const handleProjectionInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if(name === "price"){
            if(!isNaN(value)){
                value = parseInt(value);
            }
            else{
                value = "";
            }
        }
        setNewProjection({...newProjection, [name] : value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try{
            const success = await addProjection(newProjection.movie,newProjection.projectionType,newProjection.hall,
                newProjection.date,newProjection.price
            );
            if(success !== undefined){
                setSuccessMessage("New projection added successfully");
                setNewProjection({movie:"",projectionType:"",hall:"",date:"",price:""})
                setErrorMessage("");
            }
            else {
				setErrorMessage("Error adding new room")
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
    
    return(
        <>
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add new Projection</h2>
                    {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

					{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
							<label htmlFor="movie" className="form-label">
								Movie
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="movie"
								name="movie"
								value={newProjection.movie}
								onChange={handleProjectionInputChange}
							/>
						</div>
                        <div className="mb-3">
                            <label htmlFor="projectionType" className="form-label">
                                Projection Type    
                            </label>     
                            <div>
                                <ProjectionTypeSelector
                                    handleProjectionInputChange={handleProjectionInputChange}
                                    newProjection={newProjection}
                                />    
                            </div>   
                        </div> 
                        <div className="mb-3">
							<label htmlFor="hall" className="form-label">
								Hall
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="hall"
								name="hall"
								value={newProjection.hall}
								onChange={handleProjectionInputChange}
							/>
						</div> 
                        <div className="mb-3">
							<label htmlFor="date" className="form-label">
								Date
							</label>
							<input
								required
								type="date"
								className="form-control"
								id="date"
								name="date"
								value={newProjection.date}
								onChange={handleProjectionInputChange}
							/>
						</div>  <div className="mb-3">
							<label htmlFor="price" className="form-label">
								Price
							</label>
							<input
								required
								type="number"
								className="form-control"
								id="price"
								name="price"
								value={newProjection.price}
								onChange={handleProjectionInputChange}
							/>
						</div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
							<Link to={"/existing-projections"} className="btn btn-outline-info">
									Existing projections
							</Link>
							<button type="submit" className="btn btn-outline-primary ml-5">
								Save Projection
							</button>
						</div>
                    </form>    
                </div>
            </div>
        </section>
        </>
    );

};

export default AddProjection;