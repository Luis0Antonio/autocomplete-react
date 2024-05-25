import IApiResponse from "../types/IApiResponse";

const COUNTRIES_AND_FLAGS_API = "https://countriesnow.space/api/v0.1/countries/flag/images";

const getCountries = async (): Promise<IApiResponse[]> => {
  const res = await fetch(COUNTRIES_AND_FLAGS_API);
  const response = await res.json();

  return response.data as IApiResponse[];
}

export default getCountries;
