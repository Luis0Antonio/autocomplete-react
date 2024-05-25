import { FormEvent, useEffect, useState, useRef } from "react";

import { useCountries } from "../hooks/useCountries";

import searchCountryByName from "../utils/searchInCountries";

import ICountry from "../types/ICountry";

import ResultList from "./ResultList";
import CountryCard from "./CountryCard";

function Autocomplete() {
  const [focus, setFocus] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [filteredList, setFilteredList] = useState<ICountry[]>([]);
  const [coutrySelected, setCoutrySelected] = useState<ICountry | null>(null);
  const debounceTimerRef = useRef<number>(0);

  const { countries, countriesLoaded } = useCountries();

  const resultsFound = filteredList.length > 0;
  const inputClasses = resultsFound && focus ? "query-input__with-results" : ""

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;
    if (newQuery.match(/\\|\{|\}|\[|\]|\+/g)) return;
    setQuery(newQuery);
  }

  const handleOnFocus = () => {
    setFocus(true);
    setCoutrySelected(null);
  }

  const handleOnBlur = () => {
    setTimeout(() => {
      setFocus(false);
    }, 100);
  }

  useEffect(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = window.setTimeout(() => {
      setFilteredList(searchCountryByName(query, countries));
    }, 200);
  }, [query, countries]);

  useEffect(() => {
    setQuery("");
  }, [coutrySelected]);

  if (!countriesLoaded) return (<p>Loading countries.</p>);

  return (
    <>
      <input
        className={`query-input ${inputClasses}`}
        type="text"
        value={query}
        placeholder="Search your contry"
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
      />
      {
        resultsFound && <ResultList
          resultList={filteredList}
          focused={focus}
          selectCountry={setCoutrySelected}
        />
      }
      { coutrySelected && <CountryCard country={coutrySelected} />}
    </>
  );
}

export default Autocomplete;
