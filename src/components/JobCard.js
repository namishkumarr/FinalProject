import React, {useState} from "react";
import "./styles/JobCard.css";

function JobCard({ title, company, location, experience, salary, skills, description, logo, isSaved, onToggleSave }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <div><img className="job-logo" src={logo} alt="logo"></img></div>
        <div className="job-titles"><h3>{title}</h3>
        <p>at <a href="#!">{company}</a></p></div>
        <div className="actions">
        <button className="apply-btn">Apply now</button>
        
        <a className="save-btn" onClick={onToggleSave}>
            {isSaved ? "📌 Saved" : "📌 Save for later"}</a>
        </div>
      </div>
      <div className="job-meta">
        <p>📍 {location}</p>
        <p>💼 {experience}</p>
        <p>💵 {salary}</p>
      </div>
      <div className="skills">
        {skills.map((skill, index) => (
          <span key={index} className="skill">{skill}</span>
        ))}
      </div>
      <p className="description">{isExpanded && <p className="description-2">{description}</p>}
      <a className="read-more-button" onClick={toggleReadMore}>
        {isExpanded ? "Read Less" : "Read More"}
      </a></p>
      
    </div>
  );
}

export default JobCard;
