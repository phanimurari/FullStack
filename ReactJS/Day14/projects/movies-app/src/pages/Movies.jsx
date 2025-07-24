import { useState, useEffect } from "react";
import { img_300, unavailable, base_url, api_key } from "../config";
import Pagination from "../Components/Pagination";
import Genre from "../Components/Genre";
import useGenre from "../useGenre";

const Movies = () => {
  const [state, setState] = useState([]); //store the fetched data
  const [page, setPage] = useState(1); //keep a track of the page numbers
  const [genre, setGenre] = useState([]); //used to store the origional genre values
  const [value, setValue] = useState([]); //used to store the selected genre values
  const genreURL = useGenre(value);

  const fetchTrending = async () => {

    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWZmMTE0YjExY2FmMThlZTIxY2NmNTg5MTdmMmJjZCIsIm5iZiI6MTc1MzM2MzM2Mi42Miwic3ViIjoiNjg4MjMzYTIzYzQ4YzRhNWJmNzJkZjgyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ag4iUSdTQnDPE3Lq8GwXQhFs0ermZoqRXUU6aqa8Mkk'
  }
};

    const data = await fetch(`
    ${base_url}3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreURL}`, options);
     const dataJ = await data.json();
    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page, genreURL]);

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
          {state.map((Val) => {
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
