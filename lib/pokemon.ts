export interface PokemonType {
  id: string;
  name: string;
}
export interface Pokemon {
  pokemon?: {
    name: string;
    url: string;
  };
  name: string;
  url: string;
}

export async function fetchPokemonTypes(
  offset: number = 0,
  limit: number = 40,
  //intentionally put 40 here knowing that amount of types is fixed
): Promise<{ types: PokemonType[]; next: string; previous: string }> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/?offset=${offset}&limit=${limit}`);
  const data = await res.json();
  const types = data.results.map((type: { name: string; url: string }) => {
    return { id: type.url.split('/').slice(-2, -1)[0], name: type.name };
  });
  return { types, next: data.next, previous: data.previous };
}

export async function fetchPokemonList(url: string | null = null): Promise<{
  list: Pokemon[];
  next: string;
  previous: string;
  count: number;
}> {
  const res = await fetch(url || 'https://pokeapi.co/api/v2/pokemon');
  const data = await res.json();
  return {
    list: data.results,
    next: data.next,
    previous: data.previous,
    count: data.count,
  };
}

export async function fetchPokemonListByType(type: string | null = null): Promise<{
  pokemon: Pokemon[];
}> {
  const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
  const data = await res.json();
  return {
    pokemon: data.pokemon,
  };
}
