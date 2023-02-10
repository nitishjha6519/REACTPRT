import React, { useEffect, useState } from "react";
import "./api.css";

const UnsplashAPI = ({ arr, bookmark, setBookmark, toggle }) => {
  const addBookmark = (e) => {
    let link = e.target.id;
    console.log(bookmark);
    console.log(link);

    if (bookmark.indexOf(link) === -1) {
      setBookmark([...bookmark, link]);
    }
  };

  const removeBookmark = (e) => {
    let link = e.target.src;
    let ind = bookmark.indexOf(link);
    bookmark.splice(ind, 1);

    setBookmark(bookmark);
  };

  return (
    <>
      <div className="grid">
        {toggle
          ? bookmark.map((item, i) => {
              return (
                <div className="image" key={i}>
                  <img
                    src={item}
                    alt={i}
                    className="img"
                    onClick={removeBookmark}
                  />
                </div>
              );
            })
          : arr.map((item) => {
              return (
                <div className="image" key={item.id}>
                  <img
                    src={item.urls.small}
                    alt={item.alt_description}
                    className="img"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="red"
                    id={item.urls.small}
                    onClick={addBookmark}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
              );
            })}
      </div>
    </>
  );
};

export default UnsplashAPI;
