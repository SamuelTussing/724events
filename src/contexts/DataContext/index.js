import PropTypes from "prop-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const DataContext = createContext({});

export const api = {
  loadData: async () => {
    const json = await fetch("/events.json");
    return json.json();
  },
};

export const DataProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const getData = useCallback(async () => {
    try {
      setData(await api.loadData());
    } catch (err) {
      setError(err);
    }
  }, []);
  useEffect(() => {
    if (data) return;
    getData();
  });

  // on défini la variable last, utilisé dans le footer pour définir le projet le plus récent réalisé.
  // on récupère d'abord la liste des évènements dans une variable
  const events = data?.events;
  // On tri les event par date pour celà on réutilise la même méthode que dans le slide
  const sortEvents = events?.sort((evtA, evtB) => 
  new Date(evtA.date) > new Date(evtB.date) ? -1 : 1);
  // la variable last contiendra l'évènement le plus récent réalisé (index 0)
  const last = sortEvents?.[0];

  return (
    <DataContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        data,
        error,
        last,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export const useData = () => useContext(DataContext);

export default DataContext; 
  