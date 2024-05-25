import ICountry from "../types/ICountry";

interface ResultListProps {
  resultList: ICountry[],
  focused: boolean,
  selectCountry: React.Dispatch<React.SetStateAction<ICountry | null>>
}

function ResultList({ resultList, focused, selectCountry }: ResultListProps) {
  const focusedClases = !focused ? "hide-list" : "";

  const handleOnClick = (country: ICountry) => {
    selectCountry(country)
  }

  return (
    <ul
      className={`list ${focusedClases}`}
    >
      { resultList.length >= 0 && resultList.map(item => (
        <li
          key={item.name}
          className="list-item"
          onClick={() => handleOnClick(item)}
        >
          <img
            className="list-flag"
            src={item.flag}
            alt={`Flag of ${item.name}`}
          />
            <span dangerouslySetInnerHTML={{ __html: item.html || "" }} />
          </li>
      ))}
    </ul>
  );
}

export default ResultList;
