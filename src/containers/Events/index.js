import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  // mise a jour du state de type à l'aide du bouton select
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
 
  
  // filteredevent utilise le useState Type pour filtrer les events possédant le type
  // indiqué par le bouton Select.
  // on filtre donc d'abord les events par type avant de filtrer pour la pagination
  
  const filteredEvents = data?.events
  .filter((event) => event.type === type || !type)
  .filter((event, index) => {
      if (
          (currentPage - 1) * PER_PAGE <= index &&
          PER_PAGE * currentPage > index
      ) {
          return true;
      }
      return false;
  });



  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  // on map les data pour récupérer les différentes catégories pour le bouton
  const typeList = new Set(data?.events.map((event) => event.type));

  
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => value ? changeType(value) : changeType(null)}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList; 
