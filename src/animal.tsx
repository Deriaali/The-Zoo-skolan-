import { useNavigate } from "react-router-dom";
import { IAnimalName } from "./models/IAnimalName";

interface IAnimalProps {
  animal: IAnimalName;
}

export const Animal = (props: IAnimalProps) => {
  const navigate = useNavigate();

  const getInfo = () => {
    navigate(`/animal/${props.animal.id}`);
  };

  const styling = {
    width: "18rem",
  };

  return (
    <>
      <div className="container">
      <div className="row justify-content-md-center">
      <div className="col">
      <div className="card mt-3 mx-auto" style={styling}>
      <img src={props.animal.imageUrl} className="card-img-top" alt={props.animal.name}/>
  <div className="card-body mt-3">
    <h5 className="card-title">{props.animal.name}</h5>
    <a className="btn btn-primary" onClick={getInfo}>Mer info</a>
  </div>
</div>
</div>
      </div>
      </div>
    </>
  );
};
