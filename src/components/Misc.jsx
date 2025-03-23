import React from "react";
import './Home.css'; 
import './../App.css'; 
import './Misc.css'; 

const Misc = () => {
    return (
        <div className='misc'>
            <h1> Tech Recommendations and Resources</h1>
            <p>
                Those are the resources I have used to learn things throughout the years! 
            </p>
            <br/>
            <h2>Interview Preparation</h2>
            <ul>
                <li><a href="https://neetcode.io/" target="_blank" rel="noopener noreferrer">Neetcode</a> - Great structured LeetCode guide with video explanations.</li>
                <li><a href="https://www.codepath.org/courses/technical-interview-prep" target="_blank" rel="noopener noreferrer">CodePath's Technical Interview Prep</a> - A structured course with mentorship.</li>
            </ul>
            <br/>
            <h2>Web & Mobile Development</h2>
            <ul>
                <li><a href="https://www.freecodecamp.org/" target="_blank" rel="noopener noreferrer">FreeCodeCamp</a> - Self-paced courses on web development and data analysis.</li>
                <li><a href="https://roadmap.sh/backend" target="_blank" rel="noopener noreferrer">Backend Roadmap</a> - A self-guided learning path for backend development.</li>
                <li><a href="https://www.codepath.org/courses/web-development" target="_blank" rel="noopener noreferrer">CodePath Web Dev Course</a> - Hands-on course with project-building experience.</li>
            </ul>
            <br/>
            <h2>Machine Learning</h2>
            <ul>
                <li>ACM Quarterly Projects - Hands-on learning with mentorship in ML, Design, and Cybersecurity.</li>
                <li>E4E Projects - Research-oriented machine learning projects.</li>
            </ul>
            <br/>

            <h1> What do I do in my free time? </h1>

            <h2>I draw some.</h2> 
            
            <h2>Mental Health & Books</h2>
            <ul>
                <li><i>The Subtle Art of Not Giving a F*ck</i> by Mark Manson</li>
                <li><i>One Hundred Years of Solitude</i> by Gabriel García Márquez</li>
            </ul>

        </div>
    );
}

export default Misc;
