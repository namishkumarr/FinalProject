import React from "react";
import TalentCard from "./TalentCard";

import ResumeData from "./data/ResumeData.json";
import "./styles/HirePage.css";

function HireApp() {

  

  const sortedResumeData = [...ResumeData].sort((a, b) => b.resume_score - a.resume_score);

  return (
    <div className="hire-container">
      <header className="top-nav-h">
        <div className="hire-talent">
          <img className="cs-logo" src="https://cutshort.io/_next/image?url=https%3A%2F%2Fcdn.cutshort.io%2Fpublic%2Fimages%2Fnew_logo_half.png&w=32&q=75" alt="cslogo"></img><span>Hire talent<img alt="dropdown" className="drop-down" src="https://cutshort.io/_next/image?url=https%3A%2F%2Fcdn.cutshort.io%2Fpublic%2Fimages%2Fshort_arrow_sq.png&w=16&q=75"></img></span>
        </div>
        </header>
        <div className="content-h">
        {/* Fixed left filters */}
        <aside className="filters-container">
          
        </aside>

        {/* Main content for job listings */}
        <main className="main-content-h">
          <h2 className="length">Showing {sortedResumeData.length} results</h2>
          <div className="talent-list">
          {sortedResumeData.map((talent, index) => (
              <TalentCard
                key={index}
                image={talent.image}
                name={talent.name}
                state={talent.state}
                country={talent.country}
                resume_score={talent.resume_score}
                resume_link={talent.resume_link}
                email={talent.email}
              />
              ))}                         
          </div>
        </main>

        
      </div>
    </div>
  );
}

export default HireApp;
