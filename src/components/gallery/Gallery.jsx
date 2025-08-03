import { useState, useEffect } from "react";
import UploadForm from "./childs/UploadForm";
import ImageList from "./childs/ImageList";
import "./Gallery.css";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [dark, setDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  const fetchImages = () => {
    fetch("http://localhost:9999/api/images")
      .then((res) => res.json())
      .then(setImages);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Toggle theme
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <div className={`gallery-container${dark ? " dark" : ""}`}>
      <div style={{ textAlign: "right", marginBottom: 10 }}>
        <button onClick={() => setDark((d) => !d)}>
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <div className="upload-section">
        <UploadForm onUploaded={fetchImages} />
      </div>
      <ImageList images={images} fetchImages={fetchImages} />
    </div>
  );
}
