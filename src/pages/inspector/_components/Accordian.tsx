import Icon from "@/components/Icon";
import { cn } from "@/utils/style";
import React, { useState } from "react";

type AccordianProps = {
  children: React.ReactNode;
  title: string;
};

function Accordian({ children, title }: AccordianProps) {
  const [isOpen, setIsOpen] = useState(true);

  const handleClickOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className="shadow-black-500 flex flex-col justify-center border-b-1 border-black shadow-md">
      <div
        className="bg-black-200 hover:bg-black-400 flex min-h-[1.4rem] w-full cursor-pointer items-center gap-1 border-b-1 border-black px-1"
        onClick={handleClickOpen}
      >
        <Icon
          icon="Play"
          className={cn("fill-text-primary", isOpen ? "rotate-90" : "")}
          size={12}
        />
        <p>{title}</p>
      </div>
      {isOpen && <div className="flex flex-col">{children}</div>}
    </section>
  );
}

export default Accordian;
