import React, { useEffect } from 'react'
import image from "../../../Assets/Vector(1).png";
import { useState } from 'react';
import './SearchPage.css'
import {Link} from "react-router-dom"
// import SearchBar from "./SearchBar.jsx"
// import SearchResultsList from './SearchResultsList';
import noResultsImage from "../../../Assets/noResults.png"
export default function SearchPage(){
    const [input, setInput] =useState('')
    
    useEffect(()=>{
        fetch('https://bits-clubs.onrender.com/api/v1/clubs/').then((res) => res.json()).then((data)=>{
            // console.log(data.clubs)
            // setData(data)
            setFilterData(data.clubs)
            setInput(document.getElementById('search-input-box').value)
            
            // console.log(input)
        })
        },[input])
        const [data, setData] = useState([]);
        const [filterData, setFilterData] =useState([]);
    const handleFilter = (value) => {
         if (value.split(' ').join('').split('').length !== 0){
            document.getElementsByClassName('search-results-list')[0].classList.remove('hiddenDisplay')
            const res = filterData.filter(
            (clubs) => {
                return (
                    value &&
                    (clubs.club_name.split(" ").join("").toLowerCase().includes(value.split(" ").join("").toLowerCase() ) || clubs.club_acronym.split(" ").join("").toLowerCase().includes(value.split(" ").join("").toLowerCase() ))
        )}
        )
        setData(res)}
        else {
            document.getElementsByClassName('search-results-list')[0].classList.add('hiddenDisplay')
        }
    }
    return(
        <>
        <div className="search-page-wrapper">
        <div className="search-page-top-wrapper">
            
            <div className="search-page-text-wrapper">
                <span id='search-page-text'>Search for Clubs and Departments</span>
            </div>
            <div className="search-container">
                <div className='search-container-first-child'>           
                <img src={image} alt="searchIcon" />
        <input type="text" name="searchInput" id="search-input-box" placeholder='Search' autoFocus onChange={(e)=>handleFilter(e.target.value)} />
                     </div>

        <div className="search-results-list hiddenDisplay">
        { data.length > 0 ? data.map((result, id) => {
        return <Link to="/" key={id}><div className="search-results-list-item" key={id}> {result.club_name}</div> </Link>
       } ) : <div className='no-search-result'>
        <img src={noResultsImage} alt="NO RESULTS" id='no-search-results-img'/>
        <div className="no-search-results-text">
            <span className="no-search-results-first-text">
            No Results Found
            </span>
            <span className="no-search-results-second-text">
            We Couldn't Find What You Searched For.
            </span>
            <span className="no-search-results-third-text">
            Try Again!
            </span>
        </div>
        </div>} 
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