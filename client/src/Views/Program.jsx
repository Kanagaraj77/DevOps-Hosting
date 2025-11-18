import React from "react";
import Card from "./Components/program/Card";
import "./Components/css/Program.css";
import useFetchData from "../Admin/hooks/useFetchData";

const program = () => {
  const { data: dept } = useFetchData("department", null);
  const { data: career } = useFetchData("career", null);

  const ugDept = dept?.filter((item) => item?.category === "Undergraduate");
  const pgDept = dept?.filter((item) => item?.category === "Postgraduate");
  const rpDept = dept?.filter((item) => item?.category === "Research");

  console.log("career", career);

  const programData = [
    {
      image: "/images/home/gallery7.avif",
      overlayText: "UG",
      title: "UNDERGRADUATE PROGRAMS",
      items: ugDept,
    },
    {
      image: "/images/program/post_program.avif",
      overlayText: "PG",
      title: "POSTGRADUATE PROGRAMS",
      items: pgDept,
    },
    {
      image: "/images/program/research_program.avif",
      overlayText: "RP",
      title: "RESEARCH PROGRAMS",
      items: rpDept,
    },
    {
      image: "/images/program/career_program.avif",
      overlayText: "CP",
      title: "CAREER PROGRAMS",
      items: career,
    },
  ];

  return (
    <div className="program_card_container">
      {programData.map((program, index) => (
        <Card
          key={index}
          image={program.image}
          overlayText={program.overlayText}
          title={program.title}
          items={program.items}
        />
      ))}
    </div>
  );
};

export default program;
