import React from "react";
import './Home.css'; 
import './../App.css'; 
import './Misc.css'; 
import { Link } from "react-router-dom";
const Misc = () => {
    return (
        <div className='misc' >
            <h1> Cool little things I've done</h1>
            <h2> Concept maps for courses </h2>
            <p> I was fairly interested in proofs during the time I took CSE 20 with professor Miles Jones in UCSD. Something about the process of being able to show something is true step by step just appeals to my brain- so when I took the entire CSE 20-21-101 pipeline, I couldn't help but map all the concepts onto a huge document. Check out those graphs I have created. </p>
            <p className='bolden'> CSE 20 </p> 
            <Link className='link' to="/misc/cse20">CSE 20 &gt;&gt;</Link> 
        </div>
    );
}

export default Misc;
