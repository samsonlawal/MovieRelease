import "./index.css";
import React, { useEffect } from "react";
import Header from "./Header";
import Cards from "./Cards";
// import Popup from "./Popup";
import Footer from "./Footer";
import { useRef } from "react";
import MovieInfo from "./MovieInfo";
import NoBookmarkPage from "./NoBookmarkPage";
import noPoster from "./noPoster.png";
import noposter from "./images.jpg";
function App() {
  // State for the movie info
  const [movieData, setMovieData] = React.useState({
    API: "",
    movies: [],
    totalPages: "",
    currentPage: 1,
    totalResults: 0,
    currentMovie: null,
    videos: "",
    casts: "",
  });

  let titleAPI;
  const [lightMode, setLightMode] = React.useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  function toggleLightMode() {
    setLightMode((prevMode) => !prevMode);
    // console.log(lightMode);
  }

  useEffect(() => {
    const datA = window.localStorage.getItem("theme");
    if (datA !== null) {
      setLightMode(JSON.parse(datA));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("theme", JSON.stringify(lightMode));
  }, [lightMode]);

  const trendingAPI = `https://api.themoviedb.org/3/trending/all/week?api_key=812b448acde6be144d26b93a3e68cb8d&language=en-US`;
  const popularMovieAPI =
    "https://api.themoviedb.org/3/movie/popular?api_key=812b448acde6be144d26b93a3e68cb8d&language=en-US";
  const tvAPI = `https://api.themoviedb.org/3/trending/tv/day?api_key=812b448acde6be144d26b93a3e68cb8d&language=en-US`;
  let individualAPI;

  var currentAPI = movieData.API;

  const inputRef = useRef(null);

  // Managing the 'side effects' of fetching and saving the fetched info in the movieData state.
  React.useEffect(() => {
    fetch(trendingAPI)
      .then((res) => res.json())
      .then((data) => {
        setMovieData({
          API: trendingAPI,
          movies: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
          totalResults: data.total_results,
        });
      });
  }, [trendingAPI]);

  const numberOfPages = movieData.totalPages;

  // Getting the first half of poster link
  let poster = `https://www.themoviedb.org/t/p/w500/`;

  // mapping over the array of objects containing movie info
  const MovieCard = movieData.movies?.length ? (
    movieData.movies.map((item) => {
      return (
        <Cards
          movieTitle={
            item.name || item.title || item.original_name || item.original_title
          }
          date={item.release_date || item.first_air_date || "Null"}
          posterPath={
            item.poster_path ? `${poster}${item.poster_path}` : noPoster
          }
          id={item.id}
          key={item.id}
          overview={item.overview}
          movieclick={movieClick}
          lightMode={lightMode}
          // bookmarkIcon={bookmarkIcon}
        />
      );
    })
  ) : currentAPI === "bookmark" ? (
    <NoBookmarkPage />
  ) : (
    ""
  );
  // State for the input value
  const [movieSearch, setMovieSearch] = React.useState("");

  // API url for the search
  const searchAPI = `https://api.themoviedb.org/3/search/multi?api_key=812b448acde6be144d26b93a3e68cb8d&language=en-US&query=${movieSearch}&include_adult=false`;

  // Fetching results on submit
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(searchAPI)
      .then((res) => res.json())
      .then((data) =>
        setMovieData({
          API: searchAPI,
          movies: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
          totalResults: data.total_results,
        })
      );
  };

  // Saving the search input in state
  const handleChange = (event) => {
    setMovieSearch(event.target.value);
  };

  // TRENDING
  const trending = (event) => {
    document.getElementById("input").value = "";

    event.preventDefault();

    fetch(trendingAPI)
      .then((res) => res.json())
      .then((data) =>
        setMovieData({
          API: trendingAPI,
          movies: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
          totalResults: data.total_results,
        })
      );
  };

  //MOVIE
  const movie = (event) => {
    event.preventDefault();
    document.getElementById("input").value = "";

    fetch(popularMovieAPI)
      .then((res) => res.json())
      .then((data) =>
        setMovieData({
          API: popularMovieAPI,
          movies: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
          totalResults: data.total_results,
        })
      );
  };

  // const upcomingMovieAPI =
  //   "https://api.themoviedb.org/3/movie/upcoming?api_key=812b448acde6be144d26b93a3e68cb8d&language=en-US&page=1";
  // const upcomingMovie = (event) => {
  //   event.preventDefault();

  //   fetch(upcomingMovieAPI)
  //     .then((res) => res.json())
  //     .then((data) => setMovieData(data.results));
  // };

  // TV SHOWS
  const tv = (event) => {
    document.getElementById("input").value = "";

    event.preventDefault();

    currentAPI = tvAPI;

    fetch(tvAPI)
      .then((res) => res.json())
      .then((data) =>
        setMovieData({
          API: tvAPI,
          movies: data.results,
          totalPages: data.total_pages,
          currentPage: data.page,
          totalResults: data.total_results,
        })
      );
  };

  let nextPage = (pageNumber) => {
    document.documentElement.scrollTop = 0;

    // console.log(`${currentAPI}&page=${pageNumber}`);

    fetch(`${currentAPI}&page=${pageNumber}`)
      .then((res) => res.json())
      .then((data) => {
        setMovieData({
          API: currentAPI,
          movies: data.results,
          currentPage: pageNumber,
          totalPages: data.total_pages,
        });
      });
  };

  // Link Active Indicator
  var home = document.getElementById("home");
  var movieElem = document.getElementById("movie");
  var tvElem = document.getElementById("tv");
  var seacrhBar = document.getElementById("input");
  var book = document.getElementById("bookmark");

  if (currentAPI === trendingAPI) {
    home.classList.add("active");
    tvElem.classList.remove("active");
    movieElem.classList.remove("active");
    book.classList.remove("active");
    seacrhBar.classList.remove("active-bar");
    titleAPI = "Trending";
  } else if (currentAPI === tvAPI) {
    tvElem.classList.add("active");
    home.classList.remove("active");
    movieElem.classList.remove("active");
    book.classList.remove("active");
    seacrhBar.classList.remove("active-bar");
    titleAPI = "TV Series";
  } else if (currentAPI === popularMovieAPI) {
    movieElem.classList.add("active");
    home.classList.remove("active");
    tvElem.classList.remove("active");
    book.classList.remove("active");
    seacrhBar.classList.remove("active-bar");
    titleAPI = "Movies";
  } else if (currentAPI === searchAPI) {
    movieElem.classList.remove("active");
    home.classList.remove("active");
    tvElem.classList.remove("active");
    seacrhBar.classList.add("active-bar");
    book.classList.remove("active");
  } else if (currentAPI === "bookmark") {
    book.classList.add("active");
    movieElem.classList.remove("active");
    home.classList.remove("active");
    tvElem.classList.remove("active");
    titleAPI = "Bookmarks";
  }

  // MOVIE-INFO

  // const [info, setInfo] = React.useState("");
  // const getinfo = (event) => {
  //   event.preventDefault();
  //   fetch(individualAPI)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setMovieData({
  //         ...movieData,
  //         currentMovie: data,
  //       });
  //     });
  // };
  function movieClick(id) {
    const filtered = movieData.movies.filter((item) => item.id === id);
    let currentID = filtered[0].id;
    let mediaType;
    /*if (currentAPI === tvAPI) {
      mediaType = "tv";
    } else if (currentAPI === popularMovieAPI) {
      mediaType = "movie";
    } */ if (filtered[0].first_air_date) {
      mediaType = "tv";
    } else {
      mediaType = "movie";
    } /* else {
      mediaType = filtered[0].media_type;
    } */

    individualAPI = `https://api.themoviedb.org/3/${mediaType}/${currentID}?api_key=812b448acde6be144d26b93a3e68cb8d&language=en-US&append_to_response=videos,credits,media_type,`;

    // const newCurrentMovie = filtered.length > 0 ? filtered[0] : null;

    fetch(individualAPI)
      .then((res) => res.json())
      .then((data) => {
        setMovieData({
          ...movieData,
          currentMovie: data,
          videos: data.videos.results,
          casts: data.credits.cast,
        });
      });
  }

  // Back Button
  function closeInfo() {
    setMovieData({ ...movieData, currentMovie: null });
    let header = document.getElementById("header");
    header.style.display = "block";
  }

  // Bookmark
  const [bookmark, setBookmark] = React.useState(
    JSON.parse(localStorage.getItem("bookmarkedMovie"))
  );

  function bookmarkIcon() {
    if (localStorage.getItem("bookmarkedMovie") === null) {
      localStorage.setItem(
        "bookmarkedMovie",
        JSON.stringify([movieData.currentMovie])
      );
      setBookmark(JSON.parse(localStorage.getItem("bookmarkedMovie")));
    } else if (!bookmark.some((el) => el.id === movieData.currentMovie.id)) {
      localStorage.setItem(
        "bookmarkedMovie",
        JSON.stringify([...bookmark, movieData.currentMovie])
      );
      setBookmark(JSON.parse(localStorage.getItem("bookmarkedMovie")));
    } else if (bookmark.some((el) => el.id === movieData.currentMovie.id)) {
      localStorage.setItem(
        "bookmarkedMovie",
        JSON.stringify(
          bookmark.filter(function (obj) {
            return obj.id !== movieData.currentMovie.id;
          })
        )
      );

      setBookmark(JSON.parse(localStorage.getItem("bookmarkedMovie")));
    }
  }

  function bookmarkFunc() {
    document.getElementById("input").value = "";

    currentAPI = "bookmark";
    setMovieData({
      ...movieData,
      API: currentAPI,
      movies: JSON.parse(localStorage.getItem("bookmarkedMovie")),
    });
  }

  return (
    <div className="App">
      <Header
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        value={movieSearch}
        trending={trending}
        movie={movie}
        tv={tv}
        inputRef={inputRef}
        toggleLightMode={toggleLightMode}
        lightMode={lightMode}
        bookmarkFunc={bookmarkFunc}
      />
      {movieData.currentMovie == null ? (
        <>
          <section className={lightMode ? "light" : ""}>
            <h3 className={`currentPageName ${lightMode ? "light" : ""}`}>
              {titleAPI}
            </h3>
            {MovieCard}
          </section>
          <Footer
            numberOfPages={numberOfPages}
            nextPage={nextPage}
            currentPage={movieData.currentPage}
            lightMode={lightMode}
            movieData={movieData}
            API={movieData.API}
          />
        </>
      ) : (
        <MovieInfo
          closeInfo={closeInfo}
          movie={movieData.currentMovie}
          poster={poster}
          videos={movieData.videos}
          casts={movieData.casts}
          lightMode={lightMode}
          bookmarkIcon={bookmarkIcon}
          bookmark={bookmark}
        />
      )}
    </div>
  );
}

export default App;
