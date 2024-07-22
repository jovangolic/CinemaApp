import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import MovieCarousel from "../common/MovieCarousel";
import BoughtTicketsForm from "../bought-tickets/BoughtTicketsForm";
import { getMovieById } from "../utils/AppFunction";


const Checkout = () => {
    const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
    const [movieInfo,setMovieInfo] = useState({
        photo:"",
        name:"",
        duration:""
    });
    const { movieId} = useParams();

    useEffect(()=>{
        setTimeout(()=> {
            getMovieById(movieId)
            .then((data) => {
                setMovieInfo(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
                setIsLoading(false)
            })
        },2000)
    },[movieId]);

    return(
        <div>
            <section className="container">
                <div className="row">
                    <div className="col-md-4 mt-5 mb-5">
                        {isLoading ? (
                            <p>Loading Movie information...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <div className="room-info">
                                <img
									src={`data:image/png;base64,${movieInfo.photo}`}
									alt="Movie photo"
									style={{ width: "100%", height: "200px" }}
								/>
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Movie Name:</th>
                                            <td>{movieInfo.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Duration:</th>
                                            <td>{movieInfo.duration}</td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                    <div className="col-md-8">
                        <BoughtTicketsForm />
                    </div>
                </div>
            </section>
            <div className="container">
                <MovieCarousel />
            </div>
        </div>
    );
};

export default Checkout;