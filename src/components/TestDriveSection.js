import React, {useRef,useState,useEffect} from "react";
import Lottie from "react-lottie";
import DocScan from "./animations/DocumentScan"
import { useTalentContext } from "./context/TalentContext";
import "./styles/TestDriveSection.css";

const getCircleColor = (score) => {
  if (score >= 85) return "#388E3C";  // Dark green
  if (score >= 70) return "#4CAF50";  // Green
  if (score >= 50) return "#FFEB3B";  // Yellow
  if (score >= 36) return "#FF9800";  // Orange
  return "#F44336";  // Red
};

function TestDriveSection() {

  const { addTalent } = useTalentContext(); 

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: DocScan,
  };

 

  const fileInputRef = useRef(null);
  const [previewState, setPreviewState] = useState("default"); // default, loading, or ready
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null);
  const [uploadedResumeScore, setUploadedResumeScore] = useState(null);
 

  const samples = {
    sample1: {
      title: "backend_developer_sample_8z5N.pdf",
      rating:"82",
      imageUrl:"/data/backend_developer_sample_8z5N.png",
    },
    sample2: {
      title: "fullstack_developer_sample_8j83.pdf",
      rating:"76",
      imageUrl:"/data/fullstack_developer_sample_8j83.png",
    },
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      setSelectedSample(null);
      setPreviewState("loading");
  
      try {
        const response = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          const errorResult = await response.json();
          alert(`Upload failed: ${errorResult.error}`);
          setPreviewState("default");
          return;
        }
  
        const result = await response.json();

        const resumeLink= URL.createObjectURL(file);
        setUploadedFileUrl(resumeLink); // Create a local preview URL
        setPreviewState("loading");
        alert(result.message); // Show confirmation message
        setTimeout(()=>{fetchScore(resumeLink)},10000);

        
      } catch (error) {
        console.error("Error during upload:", error);
        alert("An error occurred while uploading the file.");
        setPreviewState("default"); // Reset to default on error
      }
    }
  };

  const fetchScore = async () => {
    try {
      const apiUrl = "http://localhost:5000/results2"; // Flask API URL
      const saveApiUrl = "http://localhost:5000/saveTalent";
  
      // Use GET method to retrieve the data
      const response = await fetch(apiUrl, {
        method: 'GET', // Use GET to retrieve the data
      });
  
      if (!response.ok) {
        alert("Failed to retrieve score from API.");
        return;
      }
  
      const result = await response.json();
      const empName=result.emp_name;
      const empEmail=result.emp_email;
      const resumeScore = result.resume_score; // Assuming the API returns the score as `resume_score`
      const recommendedField = result.reco_field; // Assuming the API returns the recommended field
      const resumeLLink=result.resume_link;

      setUploadedResumeScore(resumeScore);
      setTimeout(() => {
        setPreviewState("ready");
        animateProgress(resumeScore);
      }, 3000);
  
      // Log the values to the console
      console.log("Employee Name:", empName);
      console.log("Employee Email:", empEmail);
      console.log("Resume Score:", resumeScore);
      console.log("Recommended Field:", recommendedField);

      const saveResponse = await fetch(saveApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: empName,
          email: empEmail,
          resume_score: resumeScore,
          image: "/data/avatar.png",
          state: "Karnataka",
          country: "India",
          resume_link: resumeLLink,
        }),
      });
  
      if (!saveResponse.ok) {
        alert("Failed to save talent data.");
      } else {
        alert("Talent data saved successfully!");
      }
    } catch (error) {
      console.error("Error fetching score:", error);
      alert("An error occurred while fetching the score.");
    }
  };
  


  const handleSampleClick = (sampleKey) => {
    setSelectedSample(samples[sampleKey]);
    setPreviewState("loading");
    setAnimationProgress(0);

    setTimeout(() => {
      setPreviewState("ready");
      animateProgress(samples[sampleKey].rating);
    }, 3000); // Simulate 3 seconds for the Lottie animation
  };

  const animateProgress = (targetRating) => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      if (currentProgress >= targetRating) {
        clearInterval(interval);
      }
      setAnimationProgress(currentProgress);
    }, 20); // Adjust speed by changing the interval time
  };

  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="test-drive-section">
      <div className="tds-container">
        <div className="tds-title-container"><h3>Test Drive Quality Grader</h3></div>
        <div className="tds-p-container"><p>Upload a resume to check its quality</p></div>
        <div className="upload-section">
          <div className="upload-box">
            <div className="upload-box-dotted"><button  className="upload-btn" primary onClick={handleUploadClick}>Upload resume</button><p>or drag and drop your resume here.</p><input
        type="file"
        accept="application/pdf"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      /></div>
            <div className="blank-1"></div>
            <div className="upload-box-p">
              <p>Or view quality of a sample resume</p>
            </div>
            <div className="blank-2"></div>
            <div className="sample-container">
              <div className="sample-1" onClick={() => handleSampleClick("sample1")}>
                <div className="sample-1-a">
                  <div className="sample-1-text-1">Backend Developer</div>
                  <div className="sample-1-text-2">Worked in a startup</div>
                </div>
                <div className="sample-1-b">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style={{fill:"#232326"}} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg>
                </div>
                
              </div>
              <div className="sample-2" onClick={() => handleSampleClick("sample2")}>
                <div className="sample-2-a">
                  <div className="sample-2-text-1">Full Stack Developer</div>
                  <div className="sample-2-text-2">Went to IIT</div>
                </div>
                <div className="sample-2-b">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style={{fill:"#232326"}} d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg>
                </div>
                
              </div>
            </div>
          </div>
          <div className="resume-preview">
          {previewState === "default" && (
              <p>Upload a resume or choose one on the left</p>
            )}
            {previewState === "loading" && (
              <Lottie options={defaultOptions} height={300} width={300} />
            )}
            {previewState === "ready" && (<><div className="resume-preview-ready">
            <div className="pdf-title">
              <span>Quality of</span><span className="title-bold">{selectedSample
                        ? selectedSample.title
                        : "Uploaded Resume"}</span>
            </div>
            <div className="pdf-rating"><div className="tds-circle-container">
            <div className="tds-circle-background" style={{
                          background: `conic-gradient(${getCircleColor(
                            selectedSample
                              ? selectedSample.rating
                              : uploadedResumeScore
                          )} ${animationProgress}%, #e0e0e0 ${animationProgress}%)`,
                        }}></div>
            <div className="tds-circle-progress-1"></div>
            <div className="tds-circle-progress-2"></div>
            <div className="tds-circle-text">{animationProgress}</div>
          </div>
            </div>
            <div className="view-text-div"><div onClick={openModal} className="view-text">
            View Resume
            </div><div><a className="view-text" href="http://192.168.20.145:8501/" target="_blank" rel="noopener noreferrer">View Analysis</a></div></div></div></>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="tds-modal-overlay" onClick={closeModal}>
          <div className="tds-modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="tds-close-btn" onClick={closeModal}>&times;
          </button>
          {selectedSample ? (
              <img
                src={selectedSample.imageUrl}
                alt="Resume"
                className="resume-image"
              />
            ) : uploadedFileUrl ? (
              <embed
                src={uploadedFileUrl}
                type="application/pdf"
                className="resume-pdf"
              />
            ) : (
              <p>No file preview available</p>
            )}
            
          </div>
        </div>
      )}
    </section>
  );
}

export default TestDriveSection;


