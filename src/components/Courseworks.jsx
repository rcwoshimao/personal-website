import { courses } from "./../personal-data"; // Import the projects data
import "./Courseworks.css"; 
import BlockQuote from "./BlockQuote/Block_Quote";
const Courseworks = () => {

return(
<div className='courseworks'> 
    <h1> Reflection on Courses I took at UCSD </h1>
    <h3> I am a class 2026 Sixth college Student Cognitive Science with Machine Learning specialization at UCSD. For folks looking at this site in the future, the information provided here would be outdated; but I still would love to document and look back at the good times I had here in college. I will not be listing all courses here, but a selected few that I find interesting and worthy of talking about. </h3>
    <br/> 
    {courses.map((course, index) => (
        <div className = 'course' key={index}> 
            <h2>{course.name}</h2>
            <h3 className='course-info'>  {course.quarter} | {course.status} | {course.gradingOption} | {course.grade} | {course.quarter}| {course.professor} </h3>
            <BlockQuote className='course-oneliner' quote={course.oneLiner}/>
            <p className='course-description'>{course.description}</p>
            <br/> 
        </div>
    ))}
</div>
);
}

export default Courseworks; 