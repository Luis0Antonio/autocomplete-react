import ICountry from "../types/ICountry";

const searchCountryByName = (query: string, list: ICountry[]): ICountry[] => {
  if (query.length < 1) return [];
  const regex = new RegExp(String.raw`${query}`, "ig");

  const queryResult: ICountry[] = list.reduce((acc: ICountry[], country: ICountry) => {
    const idx = country.name.toLowerCase().indexOf(query.toLowerCase());
    if (idx >= 0) {
      const matchingPortion = country.name.substring(idx, (idx + query.length));
      const buildedName = `<span style="background-color: #FFEFD9; border-radius: 3px">${matchingPortion}</span>`;
      acc.push({
        ...country,
        name: country.name,
        html: country.name.replace(regex, buildedName),
        deepth: idx
      });
    }

    return acc;
  }, []).sort((a: ICountry, b: ICountry) => ((a.deepth || 0) - (b.deepth || 0)));

  return queryResult;
}

export default searchCountryByName;
