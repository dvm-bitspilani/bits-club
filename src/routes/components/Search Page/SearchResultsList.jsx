import React from "react";
import noResultsImage from "../../../Assets/noResults.png";
import { Link } from "react-router-dom";
import "./SearchResultsList.css";
const SearchResultsList = ({ results }) => {
  return (
    <>
      {results.length > 0 ? (
        results.map((result, id) => {
          return (
            <div className="search-results-list-item" key={id}>
                {result.club_name}
            </div>
          );
        })
      ) : (
        <div className="no-search-result">
          <img
            src={noResultsImage}
            alt="NO RESULTS"
            id="no-search-results-img"
          />
          <div className="no-search-results-text">
            <span className="no-search-results-first-text">
              No Results Found
            </span>
            <span className="no-search-results-second-text">
              We Couldn't Find What You Searched For.
            </span>
            <span className="no-search-results-third-text">Try Again!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResultsList;
