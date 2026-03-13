import React from "react";
import "./VideoGallery.css"; // Import CSS file for styling

// import video1 from "@/public/assets/video1.mp4"
// import video2 from "@/public/assets/video2.mp4"
// import video3 from "@/public/assets/video3.mp4"
// import video4 from "@/public/assets/video4.mp4"
// import video5 from "@/public/assets/video5.mp4"

const videos = [
  {
    id: 1,
    thumbnail: "https://www.sunnystateagency.com/images/Matty.jpg",
    videoUrl: "/assets/video1.mp4",
    caption: "DO I LOOK LIKE",
    width: "450px",
    height: "400px",
  },
  {
    id: 2,
    thumbnail: "https://www.sunnystateagency.com/images/nigel.jpg",
    videoUrl: "/assets/video2.mp4",
    caption: "THIS ONE IS",
    width: "400px",
    height: "350px",
  },
  {
    id: 3,
    thumbnail: "https://www.sunnystateagency.com/images/steve-o.jpg",
    videoUrl: "/assets/video3.mp4",
    caption: "",
    width: "600px",
    height: "500px",
  },
  {
    id: 4,
    thumbnail: "https://www.sunnystateagency.com/images/nikki.jpg",
    videoUrl: "/assets/video4.mp4",
    caption: "HE'S MOST KNOWN FOR",
    width: "400px",
    height: "350px",
  },
  {
    id: 5,
    thumbnail: "https://www.sunnystateagency.com/images/andrew.jpg",
    videoUrl: "/assets/video5.mp4",
    caption: "",
    width: "450px",
    height: "400px",
  },
];

const VideosStack = () => {
  return (
    <>
      <div className="flex md:flex-row flex-col items-center justify-center gap-2 lg:gap-10 py-10 px-4 lg:px-8">
        {videos.map((video) => (
          <div
            className="video-card"
            key={video.id}
            style={{ width: video.width, height: video.height }}
          >
            <div className="video-thumbnail">
              <video
                src={video.videoUrl}
                // poster={video.thumbnail} // Thumbnail image before video plays
                autoPlay
                muted
                loop
                className="video-element"
              ></video>

            </div>
            {video.caption && <div className="caption">{video.caption}</div>}
          </div>
        ))}
      </div>
    </>
  );
};

export default VideosStack;
