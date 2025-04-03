

const Courseworks = ({course='default class name', description='default description'}) => {

return(
<div className='courseworks'> 
    <h1> Interesting courses I've taken in UCSD </h1>
    <h2>{course}</h2>
    <p> {description}</p>
</div>


);

}


export default Courseworks; 