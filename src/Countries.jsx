/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const CountryCard = ({ name, flag, abbr }) => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={flag} alt={abbr} />
      <h3>{name}</h3>
    </div>
  );
};

const Countries = () => {
  const API_ENDPOINT = "https://xcountries-backend.azurewebsites.net/all";
  const [flagData, setFlagData] = useState([]);
  const fetchData = async () => {
    try {
      const data = await fetch(API_ENDPOINT);
      const jsonData = await data.json();
      setFlagData(jsonData);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input type="text" />
      <div className={styles.grid}>
        {flagData.map((data, idx) => (
          <CountryCard key={`country-${idx}`} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
