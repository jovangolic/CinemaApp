import React, { useState} from "react";

const ProjectionTypeFilter = ({data, setFilteredData}) => {

    const[filter, setFilter] = useState("");

    const handleSelectChange = (e) => {
        const selectedProjectionType = e.target.value;
        setFilter(selectedProjectionType);

        const filterProjectionTypes = data.filter((projection) => 
        projection.projectionType.toLowerCase().includes(selectedProjectionType.toLowerCase()))
        setFilteredData(filterProjectionTypes);
    };

    const clearFilter = () => {
        setFilter("");
        setFilteredData(data);
    };

    const projectionTypes = ["", ...new Set(data.map((projection) => projection.projectionType))];

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