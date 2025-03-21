import React from "react";
import './Home.css'; 
import './../App.css'; 
import './Misc.css'; 
import { Link } from "react-router-dom";
const Misc = () => {
    return (
        <div className='misc' >
            <h1> Recommendations and resources </h1>
            <p> My undergraduate major at UCSD is Cogntive science major with a specialization in Machine Learnimg. The course content are interesting, the materials I learn are not the most helpful for industry. Thus, a lot of the learning I have done consist of researching resources online and making an effort to follow the pipeline I created for myself. </p>
            <p> Here are some resources I would like to share with folks on the same boat as me, or are simply interested in learning more on your free time! </p>


            <p>
            neetcode 
            codepath 
            freecodecamp.io
            roadmap.sh


            </p>
        </div>
    );
}


export default Misc;
