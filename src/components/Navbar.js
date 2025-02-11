import React, {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Navbar.css";

function Navbar() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isHireTalentModalOpen, setIsHireTalentModalOpen] = useState(false);
  const [warning, setWarning] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsHireTalentModalOpen(false);
  };

  const handleOpenHireTalentModal = () => {
    setIsHireTalentModalOpen(true);
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsHireTalentModalOpen(false);
    setWarning("");
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
    if (e.target.checked) {
      setWarning(""); // Clear warning if checkbox is checked
    }
  };

  const handleSignIn = () => {
    if (!isCheckboxChecked) {
      setWarning("You must agree to the Terms and Privacy Policy to continue.");
      return;
    }
    // Redirect to the job application page
    navigate("/jobs"); // Replace with the correct route
  };

  const handleContinue = () => {
    // Sample credentials
    const validEmail = "namish.k@company.org";
    const validPassword = "ndot@2024!";
  
    // Check if credentials match
    if (email === validEmail && password === validPassword) {
      navigate("/hire");
    } else {
      setWarning("Invalid email or password. Please try again.");
    }
  };
  

  useEffect(() => {
    if (isModalOpen || isHireTalentModalOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = "auto"; // Allow scrolling
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup in case component unmounts
    };
  }, [isModalOpen, isHireTalentModalOpen]);

  return (
    <>
    <nav className="navbar-background">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src="https://cutshort.io/_next/image?url=https%3A%2F%2Fcdn.cutshort.io%2Fpublic%2Fimages%2Fnew_logo_full.png&w=2048&q=75"
            alt="Cutshort Logo"
          />
        </div>
        <ul className="navbar-links">
          {/* Features and About links have black text */}
          <li>
            <a href="#features"><div className="hover-box1">Features</div></a>
          </li>
          <li>
            <a href="#about"><div className="hover-box2">About</div></a>
          </li>

          {/* Buttons with unique styles */}
          <li>
            <a href="#find-jobs" onClick={handleOpenModal} className="btn-primary1">
              Find Jobs
            </a>
          </li>
          <li>
            <a href="#hire-talent" onClick={handleOpenHireTalentModal} className="btn-primary2">
              Hire Talent
            </a>
          </li>
        </ul>
      </div>
    </nav> 
    {isModalOpen && (
        <div className="n-modal-overlay">
          <div className="n-modal-content">
          <div className="modal-content-1">
            <div className="modal-1-title">Sign up or log in to <span>find jobs</span></div>
            <div className="gap"></div>
            <div className="t-c"><input
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  id="terms-checkbox"
                />I agree to the <a>Terms</a> and <a>Privacy Policy</a></div>
            <div className="gap"></div>
            {warning && <div className="warning-message">{warning}</div>}
              <div className="n-modal-buttons">
                <button className="n-sign-in-btn" onClick={handleSignIn}>
                  Sign In
                </button>
                <button className="n-close-btn" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
          </div>
          <div className="modal-content-2">Hiring talent? <span onClick={handleOpenHireTalentModal}>Sign in as a employer</span></div></div>
        </div>
      )}

      {/* Hire Talent Modal */}
      {isHireTalentModalOpen && (
        <div className="n-modal-overlay">
          <div className="n-modal-content">
  <div className="modal-content-1">
    <div className="modal-1-title">Sign up or log in to <span>hire talent</span></div>
    <div className="gap"></div>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)} // Update email state
      placeholder="Your work email"
      className="modal-input"
    />
    <div className="gap"></div>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)} // Update password state
      placeholder="Password"
      className="modal-input"
    />
    <div className="gap"></div>
    {warning && <div className="warning-message">{warning}</div>}
    <div className="n-modal-buttons">
      <button className="n-sign-in-btn" onClick={handleContinue}>
        Continue
      </button>
      <button className="n-close-btn" onClick={handleCloseModal}>
        Close
      </button>
    </div>
  </div>
  <div className="modal-content-2">
    Looking for jobs? <span onClick={handleOpenModal}>Sign in as a candidate</span>
  </div>
</div>

        </div>
      )}
    </>     
   ); 
}

export default Navbar;
