import { useQuery, UseQueryResult } from "react-query";
import axios from "axios";
import { PokemonResponse } from "global/types/pokemon";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/";

const getPokemonList = async (page: number, query: string) => {
  let data;
  if (query === "") {
    data = await axios.get<PokemonResponse>(`pokemon?offset=${page}&limit=20`);
    return data.data;
  } else {
    data = await axios.get<PokemonResponse>(`pokemon/${query}`);
    return {
      count: 0,
      data: [data.data],
    };
  }
};

export default function usePokemonList(
  page: number,
  query?: string
): UseQueryResult<PokemonResponse, Error> {
  return useQuery(
    ["pokemonList", page, query],
    () => getPokemonList(page, query),
    {
      enabled: true,
      refetchOnWindowFocus: false,
    }
  );
}
