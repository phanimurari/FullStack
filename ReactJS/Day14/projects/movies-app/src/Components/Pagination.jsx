import React, { useRef, useCallback } from "react";

const Pagination = ({ page, setPage }) => {
  
  const throttle = (func, delay) => {
    let timeoutId = null;
    return (...args) => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          func(...args);
          timeoutId = null;
        }, delay);
      }
    };
  };

  const throttledSetPage = useCallback(throttle(setPage, 500), [setPage]);

  const Previous = () => {
    if (page > 1) {
      throttledSetPage(page - 1);
    }
  };

  const Next = () => {
    if (page < 10) {
      throttledSetPage(page + 1);
    }
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between align-items-center">
        <button
          className="px-3 py-1 m-1 text-center btn-primary"
          onClick={Previous}
        >
          Previous
        </button>
        <button
          className="px-3 py-1 m-1 text-center btn-primary"
          onClick={Next}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
