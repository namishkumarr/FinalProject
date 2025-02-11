import React, { useRef, useState, useEffect } from "react";
import Lottie from "react-lottie";
import DocScan from "./animations/DocumentScan";
import "./styles/TestDriveSection.css";

const getCircleColor = (score) => {
  if (score >= 85) return "#388E3C"; // Dark green
  if (score >= 70) return "#4CAF50"; // Green
  if (score >= 50) return "#FFEB3B"; // Yellow
  if (score >= 36) return "#FF9800"; // Orange
  return "#F44336"; // Red
};

function TestDriveSection() {
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

  const samples = {
    sample1: {
      title: "backend_developer_sample_8z5N.pdf",
      rating: 82,
      imageUrl: "https://example.com/sample1.png",
    },
    sample2: {
      title: "fullstack_developer_sample_8j83.pdf",
      rating: 76,
      imageUrl: "https://example.com/sample2.png",
    },
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
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
        <div className="tds-title-container">
          <h3>Test Drive Quality Grader</h3>
        </div>
        <div className="tds-p-container">
          <p>Upload a resume to check its quality</p>
        </div>
        <div className="upload-section">
          <div className="upload-box">
            <div className="upload-box-dotted">
              <button
                className="upload-btn"
                primary
                onClick={handleUploadClick}
              >
                Upload resume
              </button>
              <p>or drag and drop your resume here.</p>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
            <div className="upload-box-p">
              <p>Or view quality of a sample resume</p>
            </div>
            <div className="sample-container">
              <div
                className="sample-1"
                onClick={() => handleSampleClick("sample1")}
              >
                <div className="sample-1-a">
                  <div className="sample-1-text-1">Backend Developer</div>
                  <div className="sample-1-text-2">Worked in a startup</div>
                </div>
              </div>
              <div
                className="sample-2"
                onClick={() => handleSampleClick("sample2")}
              >
                <div className="sample-2-a">
                  <div className="sample-2-text-1">Full Stack Developer</div>
                  <div className="sample-2-text-2">Went to IIT</div>
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
            {previewState === "ready" && (
              <div className="resume-preview-ready">
                <div className="pdf-title">
                  <span>Quality of</span>
                  <span className="title-bold">{selectedSample.title}</span>
                </div>
                <div className="pdf-rating">
                  <div className="tds-circle-container">
                    <div
                      className="tds-circle-background"
                      style={{
                        background: `conic-gradient(${getCircleColor(
                          selectedSample.rating
                        )} ${animationProgress}%, #e0e0e0 ${animationProgress}%)`,
                      }}
                    ></div>
                    <div className="tds-circle-text">{animationProgress}%</div>
                  </div>
                </div>
                <div onClick={openModal} className="view-resume-text">
                  View Resume
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={closeModal}>
              &times;
            </button>
            <img
              className="resume-image"
              src={selectedSample.imageUrl}
              alt="Sample Resume"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default TestDriveSection;
