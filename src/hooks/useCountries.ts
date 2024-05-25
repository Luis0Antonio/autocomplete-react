import { useEffect, useState } from 'react'

import getCountries from "../services/countries";

import IApiResponse from "../types/IApiResponse";
import ICountry from "../types/ICountry";

export function useCountries() {
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [countriesLoaded, setCountriesLoaded] = useState<boolean>(false);

  useEffect(() => {
    getCountries().then(
      (apiResponse: IApiResponse[]) => {
        const buildCountriesList: ICountry[] = apiResponse.map((c) => ({ name: c.name, flag: c.flag }));
        setCountries(buildCountriesList);
        setCountriesLoaded(true);
      }
    );
  }, []);

  return { countries, countriesLoaded }
}
