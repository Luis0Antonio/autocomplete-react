import ICountry from "../types/ICountry";

interface CountryCardProps {
  country: ICountry
}

function CountryCard({ country }: CountryCardProps) {
  return (
    <div className="country-card">
      <img
        src={country.flag}
        alt={`Flag of ${country.name}`}
      />
      <h2>{country.name}</h2>
    </div>
  );
}

export default CountryCard;
