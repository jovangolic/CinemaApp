import { parseISO } from "date-fns"
import React, { useState, useEffect } from "react"
import DateSlidr from "../common/DateSlider";

const BoughtTicketsTable = ({buyingInfo, handleBuyingCancellation}) => {

    const[filteredBuyings, setFilteredBuyings] = useState(buyingInfo);

    const filterBuyings = () => {};

    useEffect(()=>{
        setFilteredBuyings(buyingInfo)
    },[buyingInfo]);

    return(
        <section className="p-4">

            <table className="table table-bordered table-hover shadow">
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>TicketID</th>
                        <th>ProjectionID</th>
                        <th>Seat Number</th>
                        <th>Sale-date-time</th>
                        <th>Price</th>
                        <th>Ticket-status</th>
                        <th>Confirmation Code</th>
                        <th>User email</th>
                        <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {filteredBuyings.map((buying, index) => (
                        <tr key={buying.id}>
                            <td>{index + 1}</td>
                            <td>{buying.id}</td>
                            <td>{buying.projection.id}</td>
                            <td>{buying.seat.seatNumber}</td>
                            <td>{buying.saleDateTime}</td>
                            <td>{buying.price}</td>
                            <td>{buying.status}</td>
                            <td>{buying.confirmationCode}</td>
                            <td>{buying.user.email}</td>
                            <td>
                                <button 
                                className="btn btn-danger btn-sm"
                                onClick={() => handleBuyingCancellation(buying.id)}>
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );

};

export default BoughtTicketsTable;