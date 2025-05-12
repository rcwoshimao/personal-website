import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const ControlledAccordion = ({ title, children }) => {
    const [open, setOpen] = useState(true);

    const handleOpen = () => setOpen((prev) => !prev);

return (
    <Accordion
      open={open}
      icon={
        open ? (
          <ChevronUpIcon className="h-5 w-5 text-gray-700" />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-gray-700" />
        )
      }
    >
      <AccordionHeader onClick={handleOpen} className="font-monospace">
        {title}
      </AccordionHeader>
      <AccordionBody>{children}</AccordionBody>
    </Accordion>
  );
};

export default ControlledAccordion;
