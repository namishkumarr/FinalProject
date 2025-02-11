import React, { useState,useEffect } from "react";
import JobCard from "./JobCard";
import Filters from "./Filters";
import JobsData from "./data/JobsData.json";
import RecommendedCompanies from "./RecommendedCompanies";
import "./styles/JobsPage.css";

function JobApp() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [recoField, setRecoField] = useState(null);

  // Function to handle saving or unsaving a job
  const handleToggleSaveJob = (job) => {
    if (savedJobs.includes(job)) {
      setSavedJobs(savedJobs.filter((savedJob) => savedJob !== job));
    } else {
      setSavedJobs([...savedJobs, job]);
    }
  };

  // Function to handle tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchRecoField = async () => {
      try {
        const fieldUrl="http://localhost:5000/field2";
        const response = await fetch(fieldUrl, {
          method: 'GET', // Use GET to retrieve the data
        }); // Replace with your API URL
        if (!response.ok) {
          console.error("Failed to fetch recommended field");
          return;
        }
        const result = await response.json();
        setRecoField(result.reco_field); // Assuming the API response has reco_skill
      } catch (error) {
        console.error("Error fetching recommended field:", error);
      }
    };

    fetchRecoField();
  }, []);

  const jobsToDisplay = activeTab === "all"
  ? recoField
    ? JobsData.filter((job) => job.reco_field.includes(recoField))
    : JobsData
  : recoField
    ? savedJobs.filter((job) => job.reco_field.includes(recoField))
    : savedJobs;


  return (
    <div className="jobs-page-container">
      {/* Fixed top navigation */}
      <header className="top-nav">
        <div className="find-jobs">
          <img className="cs-logo" src="https://cutshort.io/_next/image?url=https%3A%2F%2Fcdn.cutshort.io%2Fpublic%2Fimages%2Fnew_logo_half.png&w=32&q=75" alt="cslogo"></img><span>Find jobs<img alt="dropdown" className="drop-down" src="https://cutshort.io/_next/image?url=https%3A%2F%2Fcdn.cutshort.io%2Fpublic%2Fimages%2Fshort_arrow_sq.png&w=16&q=75"></img></span>
        </div>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "all" ? "active" : ""}`}
            onClick={() => handleTabSwitch("all")}
          >
            All jobs
          </button>
          <button
            className={`tab ${activeTab === "saved" ? "active" : ""}`}
            onClick={() => handleTabSwitch("saved")}
          >
            Saved jobs
          </button>
        </div>
      </header>

      <div className="content">
        {/* Fixed left filters */}
        <aside className="filters-container">
          <Filters />
        </aside>

        {/* Main content for job listings */}
        <main className="main-content">
          <h2 className="length">Showing {jobsToDisplay.length} jobs</h2>
          <div className="job-list">
            {jobsToDisplay.map((job, index) => (
              <JobCard
                key={index}
                title={job.title}
                company={job.company}
                location={job.location}
                experience={job.experience}
                salary={job.salary}
                skills={job.skills}
                description={job.description}
                logo={job.logo}
                isSaved={savedJobs.includes(job)}
                onToggleSave={() => handleToggleSaveJob(job)}
              />
            ))}
          </div>
        </main>

        {/* Recommended Companies */}
        <aside className="recommended-companies">
          <RecommendedCompanies />
        </aside>
      </div>
    </div>
  );
}

export default JobApp;
