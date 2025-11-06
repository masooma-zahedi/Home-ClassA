// src/components/VideoCard.jsx
import React, { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";

const VideoCard = ({ title, description, videoFileName }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center">
      <Card
        className="m-3 p-3 shadow-sm rounded-4 border border-danger bg-warning text-center "
        style={{ maxWidth: "680px", marginLeft: "auto", marginRight: "auto" }}
      >
        <Card.Body>
          <Card.Title className="fs-4 fw-bold mb-2">{title}</Card.Title>
          <Card.Text className="mb-3">{description}</Card.Text>
            <div className="container mt-4">
              <div className="position-relative" style={{ maxWidth: "700px",maxHeight:"600px", margin: "auto" }}>
                <video ref={videoRef} width="100%" height="100%" controls className="rounded ">
                  <source src={videoFileName} type="video/mp4" />
                  مرورگر شما ویدیو را پشتیبانی نمی‌کند.
                </video>
              </div>
            </div>
          <Button
            variant={isPlaying ? "danger" : "success"}
            onClick={handlePlayPause}
            className="px-4 py-2 fw-bold"
          >
            {isPlaying ? "توقف" : "پخش"}
          </Button>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};

export default VideoCard;
