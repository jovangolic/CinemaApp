import React, { useState } from "react"
import { Link } from "react-router-dom"
import { addMovie } from "../utils/AppFunction";


const AddMovie = () => {

    const[newMovie, setNewMovie] = useState({
        name:"",
        duration:"", 
        distributor:"", 
        country:"", 
        year:"", 
        description:"", 
        photo:null
    });
    const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")
	const [imagePreview, setImagePreview] = useState("")

    const handleMovieInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovie(prevMovie => ({
            ...prevMovie,
            [name]: name === "duration" || name === "year" ? parseInt(value) || "" : value
        }));
    };

    //metoda za biranje slike prilikom kreiranja novog filma
    const handleImageChange = (e) => {
        /*
        [0] u e.target.files[0] koristi se za pristup prvoj izabranoj datoteci iz liste datoteka
        koju korisnik može da izabere putem HTML <input> elementa tipa "file" 
        */
        const selectedImage = e.target.files[0];
        setNewMovie(prevMovie => ({ ...prevMovie, photo: selectedImage }));
        setImagePreview(URL.createObjectURL(selectedImage));
    };

    //dugme
    const handleSubmit = async (e) => {
        //sprecavanje podrazumevanog ponasanja. Koristi se za ove vrste dogadjaja:
        //onSubmit, onClick, onDragOver
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Pretpostavljam da čuvaš token u localStorage
            if (!token) {
                setErrorMessage('Token is not available');
                return;
            }

            const success = await addMovie(
                newMovie.name,
                newMovie.duration,
                newMovie.distributor,
                newMovie.country,
                newMovie.year,
                newMovie.description,
                newMovie.photo,
                token
            );

            if (success) {
                setSuccessMessage("A new movie was added successfully.");
                setNewMovie({ name: "", duration: "", distributor: "", country: "", year: "", description: "", photo: null });
                setImagePreview("");
                setErrorMessage("");
            } else {
                setErrorMessage("Error adding new movie.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }

        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);

    };

    return(
        <section className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <h2 className="mt-5 mb-2">Add new movie</h2>
                    {successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

					{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}
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
								value={newMovie.name}
								onChange={handleMovieInputChange}
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
								value={newMovie.duration}
								onChange={handleMovieInputChange}
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
								value={newMovie.distributor}
								onChange={handleMovieInputChange}
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
								value={newMovie.country}
								onChange={handleMovieInputChange}
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
								value={newMovie.year}
								onChange={handleMovieInputChange}
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
								value={newMovie.description}
								onChange={handleMovieInputChange}
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
								<Link to={"/existing-movies"} className="btn btn-outline-info">
									Existing movies
								</Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Movie
								</button>
							</div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddMovie;