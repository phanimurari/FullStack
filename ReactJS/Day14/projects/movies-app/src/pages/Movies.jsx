import { useState } from "react";
import { img_300, unavailable, base_url } from "../config";
import Pagination from "../Components/Pagination";
import Genre from "../Components/Genre";
import useGenre from "../hooks/useGenre";
import useFetch from "../hooks/useFetch";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState([]);
  const [value, setValue] = useState([]);
  const genreURL = useGenre(value);
  const { data: state } = useFetch(
    `${base_url}3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`
  );

  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 text-center mt-2 mb-4 fs-1 fw-bold text-decoration-underline">
            Movies
          </div>
          <Genre
            genre={genre}
            setGenre={setGenre}
            setPage={setPage}
            type="movie"
            value={value}
            setValue={setValue}
          />
          {state &&
            state.map((Val) => {
              const {
                name,
                title,
              poster_path,
              first_air_date,
              release_date,
              media_type,
              id,
            } = Val;
            return (
              <>
                <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
                  <div className="card bg-dark" key={id}>
                    <img
                      src={
                        poster_path ? `${img_300}/${poster_path}` : unavailable
                      }
                      className="card-img-top pt-3 pb-0 px-3"
                      alt={title || name}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center fs-5">
                        {title || name}
                      </h5>
                      <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                        <div>{media_type === "tv" ? "TV Series" : "Movie"}</div>
                        <div>{first_air_date || release_date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default Movies;
