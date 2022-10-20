import { useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { Country } from "../../types";
import { Suggestion } from "../Suggestion";
import "./styles.css";

const ENDPOINT_URL = "https://restcountries.com/v2/name/";

export function AutoComplete() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [countrySelected, setCountrySelected] = useState(false);
  const [hasNoResults, setHasNoResults] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    async function fetchCountries() {
      if (debouncedSearchTerm) {
        const response = await fetch(
          `${
            ENDPOINT_URL + debouncedSearchTerm
          }?fields=name,alpha2Code,capital,flag`
        );

        if (response.ok) {
          const data = await response.json();
          // sort out countries that don't match with their primary name
          const filteredCountries = data.filter((country: Country) =>
            country.name
              .toLowerCase()
              .includes(debouncedSearchTerm.toLowerCase())
          );
          setCountries(filteredCountries);
          setHasNoResults(false);
        } else {
          // API returns 404 if no results are found
          setCountries([]);
          setHasNoResults(true);
        }
      } else {
        setCountries([]);
        setHasNoResults(false);
      }
    }

    fetchCountries();
  }, [debouncedSearchTerm]);

  return (
    <div className="container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a country"
        onFocus={() => {
          setCountries([]);
          setCountrySelected(false);
          setSearchTerm("");
          setHasNoResults(false);
        }}
        className="search-input"
      />
      {(countries.length > 0 || hasNoResults) && !countrySelected ? (
        <div className="suggestion-container">
          {hasNoResults ? (
            <div className="no-results">
              {`No countries found for "${debouncedSearchTerm}"`}
            </div>
          ) : (
            <ul className="suggestion-list">
              {countries.map((country) => (
                <Suggestion
                  key={country.alpha2Code}
                  onClick={() => {
                    setSearchTerm(country.name);
                    setCountrySelected(true);
                  }}
                  country={country}
                  searchTerm={debouncedSearchTerm}
                />
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </div>
  );
}
