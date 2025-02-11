/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import styles from "./index.module.css";

const CountryCard = ({ common, png }) => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={png} alt={common} />
      <h3>{common}</h3>
    </div>
  );
};

const Countries = () => {
  const API_ENDPOINT =
    "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";
  const [flagData, setFlagData] = useState([]);
  const [text, setText] = useState("");
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
      <input
        type="text"
        value={text}
        onChange={(ev) => setText(ev.target.value)}
      />
      <div className={styles.grid}>
        {flagData.map((data, idx) => (
          <CountryCard key={`country-${idx}`} {...data} />
        ))}
      </div>
    </div>
  );
};

export default Countries;
