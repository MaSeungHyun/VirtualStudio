import React from "react";

type ContentProps = {
  title: string;
  children: React.ReactNode;
};

function Content({ title, children }: ContentProps) {
  return (
    <section className="bg-black-600 border-black-600 hover:bg-black-50/50 grid grid-cols-[1.5fr_2fr] items-center gap-1 overflow-hidden border-b-1">
      <div className="px-2">{title}</div>
      <div className="flex flex-col gap-1 px-0.5 py-1">{children}</div>
    </section>
  );
}

export default Content;
