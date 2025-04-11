import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useState } from "react";

const ControlledAccordion = ({ title, children }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen((prev) => !prev);

    return (
        <Accordion open={open} icon={<span>{open ? "▲" : "▼"}</span>}>
            <AccordionHeader onClick={handleOpen} className="font-monospace">
                {title}
            </AccordionHeader>
            <AccordionBody>
                {children}
            </AccordionBody>
        </Accordion>
    );
};

export default ControlledAccordion;
