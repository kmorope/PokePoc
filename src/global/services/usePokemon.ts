import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { Pokemon } from "global/types/pokemon";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

const getPokemon = async (id: string) => {
  let result: Pokemon;
  const data = await axios.get<Pokemon>(`pokemon/${id}`);
  if (data.status === 200) {
    result = data.data;
  }
  return result;
};

export default function usePokemon(id: string): UseQueryResult<Pokemon, Error> {
  return useQuery(["pokemon", id], () => getPokemon(id), {
    enabled: true,
    refetchOnWindowFocus: false,
  });
}
