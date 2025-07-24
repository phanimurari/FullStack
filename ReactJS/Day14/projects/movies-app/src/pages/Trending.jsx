import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
import { api_key, base_url, img_300, unavailable } from "../config";
// import { AppProvider } from "../Components/context";
import Pagination from "../Components/Pagination";

const Trending = () => {
  const [state, setState] = useState([]);
  const [page, setPage] = useState(1); 

  const fetchTrending = async () => {

    const options = {
       method: 'GET',
       headers: {
       accept: 'application/json',
       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWZmMTE0YjExY2FmMThlZTIxY2NmNTg5MTdmMmJjZCIsIm5iZiI6MTc1MzM2MzM2Mi42Miwic3ViIjoiNjg4MjMzYTIzYzQ4YzRhNWJmNzJkZjgyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ag4iUSdTQnDPE3Lq8GwXQhFs0ermZoqRXUU6aqa8Mkk'
      }
    };


    const data = await fetch(`
    ${base_url}3/trending/all/day?page=${page}`, options);
    const dataJ = await data.json();
    // console.log(dataJ.results);
    setState(dataJ.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [page]);

  console.log(state);
  
  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
            <i className="fas fa-fire mx-4 text-danger"></i>
            <h4 className="fs-2">Trending Today</h4>
            <i className="fas fa-fire mx-4 text-danger"></i>
          </div>
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
                <div
                  key={id}
                  className="col-md-3 col-sm-4 py-3 d-flex justify-content-center g-4"
                  id="card"
                >
                  {/* <NavLink
                    to={}
                    style={{ color: "white", textDecoration: "none" }}
                  > */}
                  <div className="card bg-dark">
                    <img
                      src={
                        poster_path ? `${img_300}/${poster_path}` : unavailable
                      }
                      className="card-img-top pt-3 pb-0 px-3"
                      alt={title}
                    />
                    <div className="card-body">
                      <h5 className="card-title text-center fs-5">
                        {title || name}
                      </h5>
                      <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
                        <div>{media_type === "tv" ? "TV" : "Movie"}</div>
                        <div>{first_air_date || release_date}</div>
                      </div>
                    </div>
                  </div>
                  {/* </NavLink> */}
                </div>
                {/* <AppProvider media_type={media_type} id={id} /> */}
              </>
            );
          })}
          <Pagination page={page} setPage={setPage} />
        </div>
      </div>
    </>
  );
};

export default Trending;