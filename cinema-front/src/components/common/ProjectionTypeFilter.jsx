import React, { useEffect, useState} from "react";
import { getProjectionTypes } from "../utils/AppFunction";

const ProjectionTypeFilter = ({data, setFilteredData}) => {

    const[filter, setFilter] = useState("");
	const [projectionTypes, setProjectionType] = useState([]);

	useEffect(()=> {
		const fetchProjectionTypes = async() => {
			try{
				const types = await getProjectionTypes();
				setProjectionType(types);
			}
			catch(error){
				console.error("Failed to fetch projection types: ", error);
			}
		};
		fetchProjectionTypes();
	},[]);

    const handleSelectChange = (e) => {
		const selectedProjectionType = e.target.value;
		setFilter(selectedProjectionType);
	
		const filterProjectionTypes = data.filter(
		  (projection) =>
			projection.projectionAndProjectionTypeResponse && 
			projection.projectionAndProjectionTypeResponse.name.toLowerCase().includes(selectedProjectionType.toLowerCase())
		);
		setFilteredData(filterProjectionTypes);
	  };

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    };

    

    return(
        <div className="input-group mb-3">
			<span className="input-group-text" id="projection-type-filter">
				FIlter projections by type
			</span>
			<select
				className="form-select"
				aria-label="projection type filter"
				value={filter}
				onChange={handleSelectChange}>
				<option value="">select a projection type to filter....</option>
				{projectionTypes.map((type, index) => (
					<option key={index} value={String(type)}>
						{String(type)}
					</option>
				))}
			</select>
			<button className="btn btn-hotel" type="button" onClick={clearFilter}>
				Clear Filter
			</button>
		</div>
    );
};

export default ProjectionTypeFilter;
