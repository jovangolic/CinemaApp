import React, { useState, useEffect } from "react"
import { getProjectionTypes } from "../utils/AppFunction";


const ProjectionTypeSelector = ({handleProjectionInputChange, newProjection}) => {

    const[projectionTypes, setProjectionTypes] = useState([""]);
    const[showNewProjectionTypeInput, setShowNewProjectionTypeInput] = useState(false);
    const[newProjectionType, setNewProjectionType] = useState("");

    useEffect(()=>{
        getProjectionTypes()
        .then((data) => {
            setProjectionTypes(data)
        })
    },[]);

    const handleNewProjectionTypeInputChange = (e) => {
        setNewProjectionType(e.target.value);
    };

    const handleAddNewProjectionType = () => {
        if(newProjectionType !== ""){
            setProjectionTypes({...projectionTypes, newProjectionType});
            setNewProjectionType("");
            setShowNewProjectionTypeInput(false);
        }
    };

    return(
        <>
        {projectionTypes.length > 0 && (
            <div>
                <select
                required
                className="form-select"
                name="projectionType"
                onChange={(e) => {
                    if(e.target.value === "Add New"){
                        setShowNewProjectionTypeInput(true)
                    }
                    else{
                        handleProjectionInputChange(e)
                    }
                }}
                value={newProjection.projectionType}>
                    <option value="">Select projection type</option>
                    <option value={"Add New"}>Add New</option>
                    {projectionTypes.map((pType, index) =>(
                        <option key={pType} value={pType}>{pType}</option>
                    ))}
                </select>
                {showNewProjectionTypeInput && (
                    <div className="mt-2">
                        <div className="input-group">
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter new Porjection Type"
                            value={newProjectionType}
                            onChange={handleNewProjectionTypeInputChange}
                            />
                            <button className="btn btn-hotel" type="button" onClick={handleAddNewProjectionType}>
                                Add
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}
        </>
    );
};

export default ProjectionTypeSelector;