import React from "react";
import './../../App.css'; 
import ConceptMap from "../ConceptMap";
import CSE_101_Concept_Map from "./../../assets/CSE_101_Graphs_Concept_Summary.png"; 
import './../Misc.css'; 
const Cse101Map = () => {
    return (
        <div>
            <ConceptMap imageSrc={CSE_101_Concept_Map} className='map' />
        </div>
    );
}

export default Cse101Map;
