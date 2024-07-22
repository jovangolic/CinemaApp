import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getMovieById, updateMovie } from "../utils/AppFunction";



const EditMovie = () => {

    const[movie, setMovie] = useState({
        name:"",
        duration:"",
        distributor:"",
        country:"",
        year:"",
        description:"",
        photo:""
    });

    const [imagePreview, setImagePreview] = useState("")
	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
    const{ movieId } = useParams();

    //metoda za biranje slike prilikom kreiranja novog filma
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setMovie({...movie, photo: selectedImage});
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    const handleInputChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;
        if (name === "duration" || name === "year") {
            value = !isNaN(value) ? parseInt(value) : "";
        }
        setMovie({ ...movie, [name]: value });
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try{
                const movieData = await getMovieById(movieId);
                setMovie(movieData);
                setImagePreview(movieData.photo);
            }
            catch(error){
                console.error(error);
            }
        };
        fetchMovie();
    }, [movieId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await updateMovie(movieId, movie);
            if(response.status === 200){
                setSuccessMessage("Movie updated successfully.");
                const updatedMovieData = await getMovieById(movieId);
                setMovie(updatedMovieData);
                setImagePreview(updatedMovieData.photo);
                setErrorMessage("");
            }
            else{
                setErrorMessage("Error updating movie.");
            }
        }
        catch(error){
            console.error(error);
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    };

    return(
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Movie</h3>
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
                            <label htmlFor="name" className="form-label">
									Movie Name
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={movie.name}
								onChange={handleInputChange}
							/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="duration" className="form-label">
									Duration:
							</label>
							<input
								required
								type="number"
								className="form-control"
								id="duration"
								name="duration"
								value={movie.duration}
								onChange={handleInputChange}
							/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="distributor" className="form-label">
                                Distributor:
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="distributor"
								name="distributor"
								value={movie.distributor}
								onChange={handleInputChange}
							/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="country" className="form-label">
                                Country:
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="country"
								name="country"
								value={movie.country}
								onChange={handleInputChange}
							/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">
                                Year:
							</label>
							<input
								required
								type="number"
								className="form-control"
								id="year"
								name="year"
								value={movie.year}
								onChange={handleInputChange}
							/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Description:
							</label>
							<input
								required
								type="text"
								className="form-control"
								id="description"
								name="description"
								value={movie.description}
								onChange={handleInputChange}
							/>
                        </div>
                        <div className="mb-3">
								<label htmlFor="photo" className="form-label">
									Movie Photo
								</label>
								<input
									required
									name="photo"
									id="photo"
									type="file"
									className="form-control"
									onChange={handleImageChange}
								/>
								{imagePreview && (
									<img
										src={imagePreview}
										alt="Preview movie photo"
										style={{ maxWidth: "400px", maxHeight: "400px" }}
										className="mb-3"></img>
								)}
							</div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-movies"} className="btn btn-outline-info ml-5">
                                    Back
                                </Link>
                                <button type="submit" className="btn btn-outline-warning">
                                    Edit Movie
                                </button>
						</div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditMovie;