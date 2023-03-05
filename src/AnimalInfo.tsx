import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { IAnimal } from "./models/IAnimal";
import { getAnimalId } from "./services/animalService";
import moment from 'moment';

export const AnimalInfo = () => {
  const [animal, setAnimal] = useState<IAnimal>();
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        let response = await getAnimalId(+id);

        if (response.animal) {
          setAnimal(response.animal);
          setError(response.error);
        }
      }
    };

    if (animal) return;

    getData();
  });

  const [disabled, setDisabled] = useState(false);

  const handleClick = () => {
    setDisabled(true);
    setFeedingTime();
    feedAnimal();
    ToggleText();
    setviewContent(false);
  };


  const [isFed, setIsFed] = useState(false);
  const [fedTime, setFedTime] = useState<Date | null>(null);

  useEffect(() => {
    localStorage.getItem("fedStatus");
    const storedTime = localStorage.getItem(`animal-${id}-feed-time`);
    if (storedTime === null) {
      if (animal) {
        setFeedStamp(animal.lastFed);
      }
    } else {
      setFeedStamp(storedTime);
      checkStatus(storedTime);
    }
  }, []);

  let time = Date.now();
  let formattedDate = (moment(time)).format('YYYY-MM-DD HH:mm:ss')
  const [feedStamp, setFeedStamp] = useState(formattedDate);
  const setFeedingTime = () => {
    let formattedDate = new Date().toLocaleString();
    setTimeout(formattedDate);
  };

  const [status, setStatus] = useState("Nej");
  const ToggleText = () => {
    let newStatus = setStatus((state) => (state === "Ja" ? "Nej" : "Ja"));
  };

  function feedAnimal() {
    setIsFed(true);
    localStorage.setItem("fedStatus", status);
    localStorage.setItem(`animal-${id}-feed-time`, new Date().toLocaleString());
  }

  function checkStatus(lastFed: string) {
    const lastFedDate = new Date(lastFed);
    const rightNow = new Date();
    if (lastFedDate.getHours() + 3 < rightNow.getHours()) {
      setIsFed(false);
      setStatus("Nej");
      setviewContent(true);
    } else {
      setStatus("Ja");
      setIsFed(true);
      setviewContent(false);
    }
  }

  const styling = {
    width: "50rem",
  };


  const [viewContent, setviewContent] = useState(true);

  return (
    <>
      {error !== "" ? (
        <>
          <h2>{error}</h2>
        </>
      ) : (
        <>
         <div className="card mx-auto" style={styling}>
         <img src={animal?.imageUrl} alt={animal?.name} />
  <div className="card-body">
    <h5 className="card-title">{animal?.name}</h5>
    <p className="card-text">{animal?.longDescription}</p>
  </div>
  <ul className="list-group list-group-flush">
    <li className="list-group-item">Matad: {status}</li>
    <li className={`list-group-item ${viewContent ? "d-none" : ""}`}>Senast matad: {feedStamp}</li>
  </ul>
  <div className="card-body mt-5">
  <button className="btn btn-success" disabled={isFed} onClick={handleClick}> Mata</button>
  </div>
</div>
        </>
      )}
    </>
  );
};
