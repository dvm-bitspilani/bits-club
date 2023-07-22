import React from 'react'
import image from "../../../Assets/Vector(1).png";
import { useState } from 'react';
import './SearchPage.css'
import SearchBar from "./SearchBar.jsx"
import SearchResultsList from './SearchResultsList';
export default function SearchPage(){
    const [results, setResults] =useState([]);

    return(
        <>
        <div className="search-page-wrapper">
        <div className="search-page-top-wrapper">
            
            <div className="search-page-text-wrapper">
                <span id='search-page-text'>Search for Clubs and Departments</span>
            </div>
            <div className="search-container">
                <div className='search-container-first-child'>           
                     <SearchBar setResults ={setResults}/>
                     </div>

        <div className="search-results-list">
            <SearchResultsList results = {results}/>
        </div>
        </div>
        </div>
        {/* <div className="search-page-bottom-wrapper">
            <button className='search-page-btn'>Next</button>
        </div> */}
        </div>
        </>
    )
}