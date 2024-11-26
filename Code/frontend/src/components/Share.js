import React, { useState } from "react";

const Share = () => {
  const [thought, setThought] = useState("");

  const handleShare = (platform) => {
    const url = encodeURIComponent(thought);
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${url}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, "_blank");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Share Your Meal Thoughts</h1>
      <textarea
        placeholder="What's on your mind?"
        value={thought}
        onChange={(e) => setThought(e.target.value)}
        style={styles.textarea}
      />
      <div style={styles.buttonContainer}>
        <button onClick={() => handleShare("twitter")} style={styles.button}>
          Share on Twitter
        </button>
        <button onClick={() => handleShare("facebook")} style={styles.button}>
          Share on Facebook
        </button>
        <button onClick={() => handleShare("linkedin")} style={styles.button}>
          Share on LinkedIn
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    maxWidth: "600px",
    backgroundColor: "#f9f9f9",
  },
  header: {
    textAlign: "center",
    color: "#333",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    resize: "vertical",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Share;
