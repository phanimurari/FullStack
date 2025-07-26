import React, { useState, useEffect } from "react";
import Pagination from "../Components/Pagination";
import { api_key, base_url, img_300, unavailable } from "../config";

// const Search = () => {
//   const [searchText, setSearchText] = useState("");
//   const [page, setPage] = useState(1);
//   const [content, setContent] = useState([]);

//   // Logic to make API call
//   const fetchSearch = async () => {
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWZmMTE0YjExY2FmMThlZTIxY2NmNTg5MTdmMmJjZCIsIm5iZiI6MTc1MzM2MzM2Mi42Miwic3ViIjoiNjg4MjMzYTIzYzQ4YzRhNWJmNzJkZjgyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ag4iUSdTQnDPE3Lq8GwXQhFs0ermZoqRXUU6aqa8Mkk",
//       },
//     };

//     const data = await fetch(
//       `${base_url}3/search/movie?query=${searchText}`,
//       options
//     );
//     const { results } = await data.json();
//     setContent(results);
//   };

//   useEffect(() => {
//     // --- Without Debouncing ---
//     // If we don't use debouncing, the API call would be made on every keystroke.
//     // This is inefficient as it would send a request to the server for every single character typed.
//     // For example: if (searchText) fetchSearch();

//     // --- With Debouncing ---
//     // The following code implements debouncing.
//     // It waits for the user to stop typing for 500ms before making the API call.
//     // 1. A timer is set for 500ms when the component mounts or searchText changes.
//     const timer = setTimeout(() => {
//       // 2. If searchText has a value after 500ms, we call the API.
//       if (searchText) {
//         fetchSearch();
//       }
//     }, 500);

//     // 3. The cleanup function `clearTimeout(timer)` is crucial.
//     // It runs every time the `searchText` changes (before the next effect runs).
//     // This clears the previously set timer, so if the user is still typing,
//     // the API call is not made. The API call is only made when the user
//     // pauses for 500ms.
//     return () => {
//       clearTimeout(timer);
//     };
//   }, [searchText]);

//   const Trigger = (e) => {
//     setSearchText(e.target.value);
//   };
//   return (
//     <>
//       <div className="container">
//         <div className="row pt-3 mb-5 pb-5">
//           <div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center">
//             <input
//               type="text"
//               placeholder="search..."
//               onChange={Trigger}
//               className="form-control-lg col-6 search bg-dark text-white border border-0"
//             />
//           </div>
//           {content &&
//             content.map((Val) => {
//               const {
//                 name,
//                 title,
//                 poster_path,
//                 first_air_date,
//                 release_date,
//                 media_type,
//                 id,
//               } = Val;
//               return (
//                 <>
//                   <div className="col-md-3 col-sm-4 py-3" id="card" key={id}>
//                     <div className="card bg-dark" key={id}>
//                       <img
//                         src={
//                           poster_path
//                             ? `${img_300}/${poster_path}`
//                             : unavailable
//                         }
//                         className="card-img-top pt-3 pb-0 px-3"
//                       />
//                       <div className="card-body">
//                         <h5 className="card-title text-center fs-5">
//                           {title || name}
//                         </h5>
//                         <div className="d-flex fs-6 align-items-center justify-content-evenly movie">
//                           <div>{media_type === "tv" ? "TV" : "Movie"}</div>
//                           <div>{first_air_date || release_date}</div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               );
//             })}
//           {page > 1 && <Pagination page={page} setPage={setPage} />}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Search;


// --- Alternative Implementation with AbortController ---

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    // 1. Create a new AbortController for each effect.
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSearch = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMWZmMTE0YjExY2FmMThlZTIxY2NmNTg5MTdmMmJjZCIsIm5iZiI6MTc1MzM2MzM2Mi42Miwic3ViIjoiNjg4MjMzYTIzYzQ4YzRhNWJmNzJkZjgyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.Ag4iUSdTQnDPE3Lq8GwXQhFs0ermZoqRXUU6aqa8Mkk",
          },
          // 2. Pass the signal to the fetch request.
          signal,
        };

        const data = await fetch(
          `${base_url}3/search/movie?query=${searchText}`,
          options
        );
        const { results } = await data.json();
        setContent(results);
      } catch (error) {
        // 3. When the request is aborted, fetch throws an error.
        // We catch it here to prevent it from crashing the app.
        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error(error);
        }
      }
    };

    if (searchText) {
      fetchSearch();
    }

    // 4. The cleanup function calls `controller.abort()`.
    // This cancels the in-flight fetch request when the component unmounts
    // or when the `searchText` changes, triggering a new effect.
    // This is highly effective at preventing race conditions.
    return () => {
      controller.abort();
    };
  }, [searchText]);

  const Trigger = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div className="container">
        <div className="row pt-3 mb-5 pb-5">
          <div className="col-12 pt-5 pb-3 mt-5 d-flex justify-content-center align-items-center">
            <input
              type="text"
              placeholder="search with AbortController..."
              onChange={Trigger}
              className="form-control-lg col-6 search bg-dark text-white border border-0"
            />
          </div>
          {content &&
            content.map((Val) => {
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
                          poster_path
                            ? `${img_300}/${poster_path}`
                            : unavailable
                        }
                        className="card-img-top pt-3 pb-0 px-3"
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
                  </div>
                </>
              );
            })}
          {page > 1 && <Pagination page={page} setPage={setPage} />}
        </div>
      </div>
    </>
  );
};

export default Search
