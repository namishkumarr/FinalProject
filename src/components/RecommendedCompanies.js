import React from "react";
import "./styles/RecommendedCompanies.css";

const companies = [
  { name: "CallHub", url: "https://callhub.io", description: "Voice broadcasting solutions." },
  { name: "Fractal Analytics", url: "https://fractal.ai", description: "AI and analytics services." },
  { name: "Streamlyn Media", url: "https://streamlyn.com", description: "Adtech monetization solutions." },
  { name: "Sun King", url: "https://sunking.com", description: "Renewable energy solutions." },
  { name: "Paytm", url: "https://paytm.com", description: "Fintech and e-commerce platform." },
];

const RecommendedCompanies = () => {
  return (
    <div className="recommended-companies">
      <h3 className="title">Recommended Companies</h3>
      <ul className="company-list">
        {companies.map((company, index) => (
          <li key={index} className="company-item">
            <a href={company.url} target="_blank" rel="noopener noreferrer" className="company-link">
              {company.name}
            </a>
            <p className="company-description">{company.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedCompanies;
