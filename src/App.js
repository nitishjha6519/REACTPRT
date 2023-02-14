import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import UnsplashAPI from "./component/api";

// https://docs.google.com/document/d/1yRxzh36gv_jLEJitnOg6gkmUAh7ctdRjYd0rkCJZiUw/edit#

function App() {
  const [searchTerm, setSearch] = useState();
  const [arr, setArr] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(1);

  function loadImages() {
    let URL = `https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}`;
    let Options = {
      method: "GET",
      headers: {
        Authorization: "Client-ID X5rjwu1leDd77NqvNmMClRCLJTyKia4ktllMyHKbFiA",
      },
    };

    fetch(URL, Options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setArr((prev) => [...prev, ...data.results]);
      });
  }

  const handleClick = (e) => {
    e.preventDefault();
    setToggle(false);

    console.log("clicked");

    loadImages();
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      let vh = window.innerHeight;
      console.log({ vh });

      let scrollHeight = document.documentElement.scrollHeight;
      console.log({ scrollHeight });

      let scrollTop = document.documentElement.scrollTop;
      console.log({ scrollTop });

      if (vh + 10 + scrollTop >= scrollHeight) {
        setPage((page) => (page += 1));
        console.log(page);
        loadImages();
      }
    });
  }, [page]);

  const handleBookmark = () => {
    setToggle(true);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>React Photo Search</h1>
        <button id="bookmarks" onClick={handleBookmark}>
          Bookmarks
        </button>
      </div>
      <div className="search">
        <form onSubmit={handleClick}>
          <input
            type="text"
            name="input"
            id="input"
            placeholder="search free high resolution images"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button id="button">search</button>
        </form>
      </div>

      <UnsplashAPI
        arr={arr}
        bookmark={bookmark}
        setBookmark={setBookmark}
        toggle={toggle}
      />
    </div>
  );
}

export default App;
