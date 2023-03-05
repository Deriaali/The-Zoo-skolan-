import axios from "axios";
import { IResponse } from "../models/IResponse";
import { IAnimal } from "../models/IAnimal";
import { IAnimalName } from "../models/IAnimalName";

export const getAllAnimals = async (): Promise<IAnimalName[]> => {
  let response = await axios.get<IAnimalName[]>(
    "https://animals.azurewebsites.net/api/animals/"
  );
    console.log(response)
  return response.data;
};

export const getAnimalId = async (id: number): Promise<IResponse> => {
  try {
    let response = await axios.get<IAnimal>(
      "https://animals.azurewebsites.net/api/animals/" +
        id
    );

    return { animal: response.data, error: "" };
  } catch {
    return { error: "Error accured" };
  }
};