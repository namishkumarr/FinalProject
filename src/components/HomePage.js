import React,{useRef} from "react";

import Navbar from "./Navbar";
import HeaderSection from "./HeaderSection";
import QualityGraderSection from "./QualityGraderSection";
import TestDriveSection from "./TestDriveSection";
import FooterSection from "./FooterSection";


import "./styles/HomePage.css";

function HomeApp() {
  const testDriveRef = useRef(null);

  const scrollToTestDrive = () => {
    if (testDriveRef.current) {
      const elementPosition =
      testDriveRef.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - 69, // Subtract navbar height
        behavior: "smooth",
      });
      
    }
  };

  return (
    <div className="HomeApp">
      
      <Navbar />
      <HeaderSection onTryNowClick={scrollToTestDrive}/>
      <QualityGraderSection />
      <div ref={testDriveRef}>
      <TestDriveSection />
      </div>
      
      <FooterSection />
      
    </div>
  );
}

export default HomeApp;
