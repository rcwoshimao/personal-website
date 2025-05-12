import React from "react";
import { motion } from "framer-motion";
import Courseworks from "./Courseworks";
import './Misc.css';

const fadeInDown = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const CourseworksPage = () => {
    return (
        <motion.div 
            className='misc'
            initial="hidden"
            animate="visible"
            variants={fadeInDown}
        >
            <h1>Reflection on Courses I took at UCSD</h1>
            <Courseworks />
        </motion.div>
    );
}

export default CourseworksPage; 