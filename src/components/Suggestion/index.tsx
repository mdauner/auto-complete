import React from "react";
import { Country } from "../../types";
import "./styles.css";

interface SuggestionParams {
  onClick: () => void;
  country: Country;
  searchTerm: string;
}

export function Suggestion({ country, onClick, searchTerm }: SuggestionParams) {
  // highlight the part of the country name that matches the search term
  const formattedTitle = country.name
    .split(new RegExp(`(${searchTerm})`, "gi"))
    .map((part, index) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {part}
          </span>
        );
      } else {
        return <span key={index}>{part}</span>;
      }
    });

  return (
    <li className="suggestion" onClick={onClick}>
      <div className="row">
        <div className="content">
          <span className="title">{formattedTitle}</span>
          <span className="subtitle">{country.capital}</span>
        </div>
        <div className="flag-container">
          <img src={country.flag} alt={country.name} className="flag" />
        </div>
      </div>
    </li>
  );
}
