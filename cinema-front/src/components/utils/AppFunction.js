import axios from "axios";

export const api = axios.create({
    baseURL:"http://localhost:8080"
});

/*kada se korisnik loguje, setuje se token i kredencijali*/
export const getHeader = () =>{
    const token = localStorage.getItem("token");
    return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}

export const getHeaderForFormData = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`
        // No Content-Type for FormData
    }
}

export async function addMovie(name, duration, distributor, country, year, description, photo, token) {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("distributor", distributor);
    formData.append("country", country);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("photo", photo);

    const response = await fetch('http://localhost:8080/movies/add/new-movie', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return true;
    } else {
        const error = await response.json();
        console.error('Error:', error);
        return false;
    }
}

/*export async function addMovie(name, duration,distributor,country,year,description, photo){
    const formData = new FormData();
    formData.append("name",name);
    formData.append("duration",duration);
    formData.append("distributor",distributor);
    formData.append("country",country);
    formData.append("year",year);
    formData.append("description",description);
    
    const fileInput = document.querySelector('#photo');
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = function() {
    const blob = new Blob([reader.result], { type: file.type });
    formData.append('photo', blob);

    fetch('http://localhost:8080/movies/add/new-movie', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + token,
        },
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
    };
    const response = await api.post(`/movies/add/new-movie`,formData,{
        headers: getHeader()
    });
    if(response.status === 201){
        return true;
    }
    else{
        return false;
    }
}*/

export async function updateMovie(movieId, movieData) {
    const formData = new FormData();
    formData.append("name", movieData.name);
    formData.append("duration", movieData.duration);
    formData.append("distributor", movieData.distributor);
    formData.append("country", movieData.country);
    formData.append("year", movieData.year);
    formData.append("description", movieData.description);
    
    if (movieData.photo) {
        formData.append("photo", movieData.photo);
    }

    const headers = getHeaderForFormData();

    const response = await fetch(`http://localhost:8080/movies/update/${movieId}`, {
        method: 'PUT',
        body: formData,
        headers: headers,
    });

    if (!response.ok) {
        throw new Error('Failed to update movie');
    }

    return response.json(); 
}

/*export async function updateMovie(movieId, movieData){
    const formData = new FormData();
    formData.append("name",movieData.name);
    formData.append("duration",movieData.duration);
    formData.append("distributor",movieData.distributor);
    formData.append("country",movieData.country);
    formData.append("year",movieData.year);
    formData.append("description",movieData.description);
    formData.append("photo",movieData.photo);
    const response = await api.put(`/movies/update/${movieId}`, movieData,{
        headers : getHeader()
    });
    return response;
}*/

export async function getAllMovies(){
    try{
        const result = await api.get("/movies/all-movies");
        return result.data;
    }
    catch(error){
        console.error("Error fetching movies:", error);
		throw new Error("Error fetching movies")
    }
}

export async function getMovieById(movieId){
    try{
        const result = await api.get(`/movies/movie/${movieId}`);
        return result.data;
    }
    catch(error){
        throw new Error(`Error fetching movie ${error.message}`);
    }
}

export async function deleteMovie(movieId){
    try{
        const response = await api.delete(`/movies/delete/movie/${movieId}`,{
            headers: getHeader()
        })
        return response.data;
    }
    catch(error){
        throw new Error(`Error deleting movie ${error.message}`);
    }
}

export async function addTicket(projection, seatNumber, price, status){
    const formData = new FormData();
    formData.append("projection",projection)
    formData.append("seatNumber",seatNumber)
    formData.append("price",price)
    formData.append("status",status);
    const response = await api.post(`/tickets/add/new-ticket`,formData,{
        headers:getHeader()
    });
    if(response.status === 201){
        return true;
    }
    else{
        return false;
    }
}

export async function updateTicketStatus(ticketId, statusData){
    const formData = new FormData();
    formData.append("ticketId",statusData.ticketId);
    formData.append("status",statusData.status);
    const response = await api.patch(`/tickets/${ticketId}/status`,statusData,{
        headers:getHeader()
    });
    return response;
}

export async function getTicketsByStatus(status){
    try{
        const response = await api.get(`/tickets/status/${status}`);
        return response.data;
    }
    catch(error){
        throw new Error(`Error fetching tickets by status : ${error.message}`);
    }
}

export async function cancelPurchasedTicket(ticketId){
    try{
        const response = await api.post(`/tickets/cancel-purchased/${ticketId}`);
        return response.data;
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }
        else{
            throw new Error(`Error cancelling purchased ticket : ${error.message}`);
        }
    }
}

export async function cancelReservedTicket(ticketId){
    try{
        const response = await api.post(`/tickets/cancel-reserved/${ticketId}`)
        return response.data;
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }
        else{
            throw new Error(`Error cancelling reserved ticket : ${error.message}`);
        }
    }
}

export async function purchaseReservedTicket(ticketId){
    try{
        const response = await api.post(`/tickets/purchase-reserved/${ticketId}`)
        return response.data;
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }
        else{
            throw new Error(`Error buying ticket : ${error.message}`);
        }
    }
}

export async function getTicketsByUserEmail(email){
    try{
        const response = await api.get(`/tickets/user/${email}/bought-tickets`);
        return response.data;
    }
    catch(error){
        throw new Error(`Error fetching tickets by user email : ${error.message}`);
    }
}

export async function findByTicketConfirmationCode(confirmationCode){
    try{
        const response = await api.get(`/tickets/confirmation/${confirmationCode}`);
        return response.data;
    }
    catch(error){
        throw new Error(`Error fetching tickets : ${error.message}`);
    }
}

export async function getTicketById(ticketId){
    try{
        const response = await api.get(`/tickets/ticket/${ticketId}`);
        return response.data;
    }
    catch(error){
        throw new Error(`Error fetching ticket : ${error.message}`);
    } 
}

export async function buyTicket(projectionId, ticketRequest, status){
    try{
        const response = await api.post(`/tickets/ticket/${projectionId}/buy`,ticketRequest,status);
        return response.data;
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }
        else{
            throw new Error(`Error buying ticket : ${error.message}`);
        }
    }
}

export async function deleteTicket(ticketId){
    try{
        const response = await api.delete(`/tickets/delete/ticket/${ticketId}`,{
            headers: getHeader()
        })
        return response.data;
    }
    catch(error){
        throw new Error(`Error deleting ticket : ${error.message}`);
    }
}

export async function getAllTickets(){
    try{
        const response = await api.get("/tickets/all-tickets");
        return response.data;
    }
    catch(error){
        console.error("Error fetching tickets:", error);
		throw new Error("Error fetching tickets")
    }
}

export async function getAvailableTickets(dates, projection, status){
    try{
        const response = await api.get(`/tickets/available-tickets`,{
            params:{
                dates:dates.trim(),
                projection:projection.trim(),
                status:status.trim()
            }
        });
        return response;
    }
    catch (error) {
        throw new Error("Error fetching available tickets");
    }
}

export async function addProjection(movie,projectionType,hall,date,price){
    const formData = new FormData();
    formData.append("movie",movie);
    formData.append("projectionType",projectionType);
    formData.append("hall",hall);
    formData.append("date",date);
    formData.append("price",price);
    const response = await api.post(`/projections/add/new-projection`,formData,{
        headers: getHeader()
    })
    if(response.status === 201){
        return true;
    }
    else{
        return false;
    }

}

export async function updateProjection(projectionId, projectionData){
    const formData = new FormData();
    formData.append("movie",projectionData.movie);
    formData.append("projectionType",projectionData.projectionType);
    formData.append("hall",projectionData.hall);
    formData.append("date",projectionData.date);
    formData.append("price",projectionData.price);
    const response = await api.put(`/projections/update/${projectionId}`, projectionData,{
        headers: getHeader()
    });
    return response;
}

export async function getProjectionById(projectionId){
    try{
        const response = await api.get(`/projections/projection/${projectionId}`)
        return response.data;
    }
    catch(error){
        throw new Error(`Error fetching projections : ${error.message}`);
    }
}

export async function getProjectionTypes(){
    try{
        const result = await api.get("/projections/projection/projectionType");
        return result.data;
    }
    catch(error){
        throw new Error("Error fetching projection types");
    }
}

export async function getAllProjections(){
    try{
        const response = await api.get("/projections/all-projections");
        return response.data;
    }
    catch(error){
        console.error("Error fetching projections:", error);
		throw new Error("Error fetching projections")
    }
}

export async function getAllProjectionTypes(){
    try{
        const response = await api.get("/projectionTypes/all-types");
        return response.data;
    }
    catch(error){
        console.error("Error fetching projection types:", error);
		throw new Error("Error fetching projection types")
    }
}

export async function getAvailableSeatsByHallId(hallId) {
    try {
        const result = await api.get(`/seats/available/${hallId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching available seats: ${error.message}`);
    }
}

export async function getSeats(){
    try{
        const response = await api.get("/seats/all-seats");
        return response.data;
    }
    catch(error){
        throw new Error(`Error fetching seats : ${error.message}`);
    }
}

export async function getAvailableSeats(projectionId){
    try{
        const result = await api.get(`/tickets/available-seats/${projectionId}`);
        return result.data;
    }
    catch(error){
        throw new Error(`Error fetching available seats : ${error.message}`);
    }
}

export async function getAllHalls(){
    try{
        const response = await api.get("/halls/all-halls");
        return response.data;
    }
    catch(error){
        console.error("Error fetching halls:", error);
		throw new Error("Error fetching halls")
    }
}

export async function deleteProjection(projectionId){
    try{
        const response = await api.delete(`/projections/delete/projection/${projectionId}`,{
            headers: getHeader()
        });
        return response.data;
    }
    catch (error) {
		throw new Error(`Error deleting projection ${error.message}`)
	}
}

/*funkcija za registraciju, kao parametar, prosledjuje se registration objekat */
export async function registerUser(registration){
    try{
        const response = await api.post("/auth/register-user", registration);
        return response.data
    }
    catch(error){
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        }
        else{
            throw new Error(`User registration error : ${error.message}`);
        }
    }
}

/*funkicja za logovanje, kao parametar se prosledjuje login objekat */
export async function loginUser(login){
    try{
        const response = await api.post("/auth/login" , login);
        if(response.status >= 200 && response.status < 300){
            return response.data
        }
        else{
            return null;
        }
    }
    catch(error){
        console.error(error);
        return null;
    }
}

/*ova funkcija je za dobavljanje korisnika. Kao parametar se prosledjuje id korisnika i njegov token */
export async function getUserProfile(userId, token){
    try{
        const response = await api.get(`users/profile/${userId}`, {
            headers : getHeader()
        })
        return response.data;
    }
    catch(error){
        throw error;
    }
}

/*funkicja za brisanje korisnika */
export async function deleteUser(userId){
    try{
        const response = await api.delete(`/users/delete/${userId}`,{
            headers : getHeader()
        })        
        return response.data;
    }
    catch(error){
        return error.message;
    }
}

/*funkcija koja dobavlja jednog korisnika*/
export async function getUser(userId, token){
    try{
        const response = await api.get(`/users/${userId}`,{
            headers : getHeader()
        });
        return response.data;
    }
    catch(error){
        throw error;
    }
}





