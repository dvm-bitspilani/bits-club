import React from 'react'
import image from "../../../Assets/Vector(1).png";
import { useState } from 'react';
import './SearchPage.css'
export default function SearchBar({setResults}){
    const [input, setInput] = useState('');

const fetchData = (value) =>{
fetch('https://bits-clubs.onrender.com/api/v1/clubs/').then((response) => response.json()).then((json) => {
    const results = json.clubs.filter((clubs) => {
        return (
            value &&
            clubs.club_name.split(" ").join("").toLowerCase().includes(value.split(" ").join("").toLowerCase() )
)});
    setResults(results);
})
}
const searchInputUpdate = (value) => {
    setInput(value)   
    fetchData(value);
}
  return (
    <>
<img src={image} alt="searchIcon" />
        <input type="text" name="searchInput" id="search-input-box" placeholder='Search' value = {input} autoFocus onChange={(e)=>searchInputUpdate(e.target.value)} />
    </>
  )
}
