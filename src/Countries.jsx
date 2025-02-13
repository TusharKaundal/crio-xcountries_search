/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./index.css";

const CountryCard = ({ common, png }) => {
  return (
    <div className="countryCard">
      <img className="cardImage" src={png} alt={common} />
      <h4>{common}</h4>
    </div>
  );
};

const searchFlag = (text, flagData) => {
  return flagData.filter((flag) => flag.common.toLowerCase().includes(text));
};

const Countries = () => {
  const API_ENDPOINT =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [flagData, setFlagData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(0);

  const fetchData = async () => {
    try {
      const data = await fetch(API_ENDPOINT);
      const jsonData = await data.json();
      setFlagData(jsonData);
      setFilteredData(jsonData);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => {
      if (searchText != "") {
        const data = searchFlag(searchText.toLowerCase(), flagData);
        console.log(data);
        setFilteredData(data);
      } else {
        setFilteredData(flagData);
      }
    }, 1000);
    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [searchText, flagData]);

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="wrapper">
      <input
        id="searchID"
        type="text"
        value={searchText}
        placeholder="Search for countries..."
        onChange={(ev) => handleInput(ev)}
      />
      <div className="grid">
        {filteredData.map((data, idx) => (
          <CountryCard key={`country-${idx}`} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
