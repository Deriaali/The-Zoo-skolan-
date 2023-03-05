import React from "react";
import { useState, useEffect } from "react";
import { IAnimalName } from "./models/IAnimalName";
import { getAllAnimals } from "./services/animalService";
import { Animal } from "./animal";



export const Animals = () => {
  const [animals, setAnimals] = useState<IAnimalName[]>([]);

  useEffect(() => {
    const getData = async () => {
      let animals = await getAllAnimals();

      setAnimals(animals);
    };

    if (animals.length > 0) return;

    getData();
  });

  let animalsHtml = animals.map((animal) => {
    return (
      <Animal
        animal={animal}
        key={animal.id}
      ></Animal>
    );
  });

  return <div className="wrapper">{animalsHtml}</div>;
};