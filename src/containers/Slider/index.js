import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // classement des 3 evenements présent dans le slider par ordre chronologique
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );

  const nextCard = () => {
    setTimeout(
      // index < byDateDesc.length-1 pour eviter une page blanvhe lorsque le slider arrive à la dernière image
      () => setIndex(index < byDateDesc.length-1 ? index + 1 : 0),
      5000
    );
  };
  useEffect(() => {
    if(byDateDesc){
      nextCard();
    }
  });

  return (

    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
      ))}

      <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
             {byDateDesc?.map((event,BPIndex) =>
             <input
             key={event.title}
             type="radio"
             name="radio-button"
             checked={BPIndex === index}
             // ajout d'un readOnly car on ne souhaite pas que la valeur de l'input soit modifié par le user
             readOnly/>
             )}
            
          </div>
          </div>
      
    </div>

  );
};

export default Slider;
