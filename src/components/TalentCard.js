import React,{useState} from "react";
import "./styles/TalentCard.css";

const getCircleColor = (score) => {
    if (score >= 85) return "#388E3C";  // Dark green
    if (score >= 70) return "#4CAF50";  // Green
    if (score >= 50) return "#FFEB3B";  // Yellow
    if (score >= 36) return "#FF9800";  // Orange
    return "#F44336";  // Red
  };

function TalentCard({image,name,state,country,resume_score,resume_link,email}){
    const progress = resume_score;

    const [isModalOpen, setModalOpen] = useState(false);

    const handleViewResume = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden"; // Lock scrolling
  };

    const handleCloseModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto"; // Unlock scrolling
  };

    const handleInviteToApply = () => {
    const subject = "Interview Invitation";
    const body = `Dear ${name},%0D%0A%0D%0AWe have reviewed your resume and are impressed by your rating. We would like to invite you to an interview for a job opening. Kindly click on the link below to register your details and confirm your availability for the interview.%0D%0A%0D%0A[Insert Registration Link Here]%0D%0A%0D%0AThank you.%0D%0A%0D%0ABest regards,%0D%0A[Your Company Name]`;

    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink; // Open the mail client
  };

    return(<>
    <div className="talent-card">
        <div className="talent-meta-1">
            <div className="talent-profile"><img src={image} alt="profile"></img></div>
            <div className="talent-details">
                <h3>{name}</h3>
                <p>{state}, {country}</p>
            </div>
        </div>
        <div className="talent-meta-2">
        <div className="talent-score">
        <div className="circle-container">
            <div className="circle-background" style={{ background: `conic-gradient(${getCircleColor(resume_score)} ${progress}%,#e0e0e0 ${progress}%)` }}></div>
            <div className="circle-progress-1"></div>
            <div className="circle-progress-2"></div>
            <div className="circle-text">{resume_score}</div>
          </div>
        </div>
      <div className="talent-view" onClick={handleViewResume}>
        <p>View Resume</p>
      </div>
      <div className="talent-invite">
        <button className="invite-apply-btn" onClick={handleInviteToApply}>Invite to Apply</button>
      </div>
        </div>
        
    </div>
    {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <object 
  data={resume_link} 
  type={resume_link.endsWith('.pdf') ? "application/pdf" : "image/*"} 
  className="resume-display"
/>
          </div>
        </div>
      )}</>
);
}

export default TalentCard;