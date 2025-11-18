import React, { useState, useEffect } from 'react';
import ucasstudent4 from '/images/home/ucasstudent4.webp';
import ucasstudent5 from '/images/home/ucasstudent5.webp';
import ucasstudent6 from '/images/home/ucasstudent6.webp';
import ucasstudents10 from '/images/home/ucasstudents10.webp';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

console.log('Image 4:', ucasstudent4);
console.log('Image 5:', ucasstudent5);
console.log('Image 6:', ucasstudent6);
console.log('Image 10:', ucasstudents10);

const Testimonial = () => {
  const alumniData = [
    {
      

        name: "Ramya Raju",
        title: "BA English Graduate",
        company: "Zifo RND Solutions, Chennai",
        quote: "The time I spent at UCAS was pivotal in shaping my career. It helped me develop critical thinking and communication skills essential for my role. The education and practical exposure I received there enabled me to bridge the gap between technology and real-world challenges, making a significant impact.",
        image: ucasstudent6
    
  
      
    },
    {
      name: "Arun Kumar",
      title: "Data Scientist",
      company: "Tech Solutions, Coimbatore",
      quote: "My time at UCAS was pivotal in shaping my career as a Data Scientist. The hands-on training in statistical modeling and machine learning provided me with a strong foundation, which has been essential in tackling complex business challenges and driving data-driven solutions in my current role.",
      image: ucasstudent5
    },
    {
      name: "Chandhru E",
      title: "Information Technology Specialist",
      company: "IBM, Bangalore",
      quote: "My experience at UCAS was instrumental in shaping my career as an Information Technology Specialist. The comprehensive training in systems integration, software development, and healthcare IT, combined with a strong focus on problem-solving, has equipped me with the skills needed to innovate and create impactful IT solutions in the healthcare sector at IBM",
      image: ucasstudent4
    },
    {
      name: "Krishna",
      title: "Information Technology Professional",
      company: "TCS, Chennai",
      quote: "My journey at UCAS laid a solid foundation for my career in IT. The focus on problem-solving, IT management, and hands-on experience prepared me to tackle complex IT infrastructure challenges at TCS. These skills continue to drive my success in this fast-paced industry and are essential to the work I do today.",
      image: ucasstudents10
    },
  ];
  const options = {
    items: 1,
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    smartSpeed: 500,
    autoplay: true,
    
  };

  return (
    <div className='ucastestimonial-section'>
         <div className="ucascarousel container">

        
      <div
        className="ucastestcarousel"

      >
         <OwlCarousel className="owl-carousel owl-theme" {...options}>
        {alumniData.map((alumni, index) => (
          <div className="ucasslide" key={index} style={{ minWidth: "100%" }}>
            <h1 className='testimonial_heading'>Alumni Spotlight</h1>
            <div className="center">
            <img src={alumni.image} alt={alumni.name} className="ucasprofile-img" />
            </div>

            <p className="testimonial_quote">{alumni.quote}</p>
            <p className="ucasname-title">
              {alumni.name} - {alumni.title}, {alumni.company}
            </p>
          </div>
        ))}
          </OwlCarousel>
      </div>
    

    </div>
    </div>
   
  );
};

export default Testimonial;
