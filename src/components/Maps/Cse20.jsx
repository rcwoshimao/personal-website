import React from "react";
import './../../App.css'; 
import ConceptMap from "../ConceptMap";
import CSE_20_Concept_Map from "./../../assets/CSE_20_Concept_Summary_downscaled.png"; 
import './../Misc.css'; 
const Cse20 = () => {
    return (
        <div>
            <ConceptMap imageSrc={CSE_20_Concept_Map} className='map' />
        </div>
    );
}

export default Cse20;
