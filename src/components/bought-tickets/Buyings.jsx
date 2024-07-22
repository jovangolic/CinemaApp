import React, { useState, useEffect } from "react"
import Header from "../common/Header";
import BoughtTicketsTable from "./BoughtTicketsTable";
import { deleteTicket, getAllTickets } from "../utils/AppFunction";

const Buyings = () => {

    const[buyingnfo ,setBuyingInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")

    useEffect(()=>{
        setTimeout(() => {
            getAllTickets()
            .then((data) => {
                setBuyingInfo(data)
                setIsLoading(false)
            })
            .catch((error) => {
                setError(error.message)
				setIsLoading(false)
            })
        }, 1000);
    },[]);

    const handleBuyingCancellation = async(buyingId) => {
        try{
            await deleteTicket(buyingId)
            const data = await getAllTickets();
            setBuyingInfo(data);
        }
        catch (error) {
			setError(error.message)
		}
    };


    return(
        <select style={{ backgroundColor: "whitesmoke" }}>
            <Header title={"Existing Tickets"} />
            {error && <div className="text-danger">{error}</div>}
            {isLoading ? (
                <div>Loading existing tickets</div>
            ) : (
                <BoughtTicketsTable
                buyingInfo={buyingnfo}
                handleBuyingCancellation={handleBuyingCancellation}
                />
            )}
        </select>
    );
};

export default Buyings;