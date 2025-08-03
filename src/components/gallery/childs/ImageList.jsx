import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function ImageList({ images, fetchImages }) {
  const [commentInputs, setCommentInputs] = useState({});

  const handleLike = async (id) => {
    await fetch(`${API_URL}/api/images/${id}/like`, {
      method: "POST",
    });
    fetchImages(); // gọi lại hàm cha
  };

  const handleComment = async (id) => {
    const text = commentInputs[id];
    if (!text) return;
    await fetch(`${API_URL}/api/images/${id}/comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setCommentInputs({ ...commentInputs, [id]: "" });
    fetchImages(); // gọi lại hàm cha
  };

  return (
    <div>
      <h2>Gallery</h2>
      <div className="image-list">
        {/* Display Image */}
        {images.map((img) => (
          <div key={img._id} className="image-card">
            <img
              src={img.secure_url || `${API_URL}/${img.path}`}
              alt={img.originalname}
              width={200}
            />
            {/* Like Image */}
            <div>
              <button onClick={() => handleLike(img._id)}>
                &#10084;&#65039; Like ({img.likes})
              </button>
            </div>
            {/* comment image */}
            <div>
              <strong>Comments:</strong>
              <ul>
                {img.comments.map((cmt, idx) => (
                  <li key={idx}>{cmt.text}</li>
                ))}
              </ul>
              <input
                value={commentInputs[img._id] || ""}
                onChange={(e) =>
                  setCommentInputs({
                    ...commentInputs,
                    [img._id]: e.target.value,
                  })
                }
                placeholder="Tell us what you think"
              />
              <button onClick={() => handleComment(img._id)}>Send</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageList;
