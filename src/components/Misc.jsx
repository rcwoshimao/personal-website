import React from "react";
import './Home.css'; 
import './../App.css'; 
import './Misc.css'; 
import { Link } from "react-router-dom";
const Misc = () => {
    return (
        <div>
            <h1> Test </h1>
            <Link to="/misc/cse20">Go to CSE 20</Link> 
        </div>
    );
}

export default Misc;
