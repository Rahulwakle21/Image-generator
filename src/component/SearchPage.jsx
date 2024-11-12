import React, { useState } from "react";
import axios from "axios";
import ImageResult from "./ImageResult";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      console.log("API Key:", import.meta.env.VITE_UNSPLASH_API_KEY);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos`,
        {
          params: {
            query: query,
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
          },
        }
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for imagesss..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <div className="image-results">
        {images.map((image) => (
          <ImageResult key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
