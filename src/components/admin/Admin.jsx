import React from "react";
import { Link } from "react-router-dom";

const Admin = () => {
    return(
        <section className="container mt-5">
			<h2>Welcome to Adimin Panel</h2>
			<hr />
			<Link to={"/existing-movies"}>Manage Movies</Link> <br />
			<Link to={"/existing-projections"}>Manage Projections</Link><br/>
            <Link to={"/existing-tickets"}>Manage Tickets</Link>
		</section>
    );
};

export default Admin;