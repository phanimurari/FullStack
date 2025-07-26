import React, { useState } from "react";
import { base_url, img_300, unavailable } from "../config";
import Pagination from "../Components/Pagination";
import useFetch from "../hooks/useFetch";

const Trending = () => {
  const [page, setPage] = useState(1);
  const { data: state } = useFetch(
    `${base_url}3/trending/all/day?page=${page}`
  );
  
  return (
    <>
      <div className="container">
        <div className="row py-5 my-5">
          <div className="col-12 mt-2 mb-4 fs-1 fw-bold text-decoration-underline head d-flex justify-content-center align-items-center">
            <i className="fas fa-fire mx-4 text-danger"></i>
            <h4 className="fs-2">Trending Today</h4>
            <i className="fas fa-fire mx-4 text-danger"></i>
          </div>
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
