'use client';
import {
  fetchPokemonList,
  fetchPokemonListByType,
  fetchPokemonTypes,
  Pokemon,
  PokemonType,
} from '@/lib/pokemon';
import { useEffect, useState, useCallback } from 'react';
import DropDown from '@/app/components/DropDown';
import Loading from '@/app/loading';
import ErrorBoundary from '@/app/components/ErrorBoundary';

type State = {
  list: Pokemon[] | null;
  next: string | null;
  previous: string | null;
  count: number | null;
  types: PokemonType[];
  limit: number;
  isLoading: boolean;
};

export default function PokemonList() {
  const [state, setState] = useState<State>({
    list: null,
    next: null,
    previous: null,
    count: null,
    types: [],
    limit: 20,
    isLoading: false,
  });

  const fetchPokemonData = useCallback(async (url: string | null) => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const { types } = await fetchPokemonTypes();
      const { list, next, previous, count } = await fetchPokemonList(url);

      setState((prevState) => ({
        ...prevState,
        list,
        next,
        previous,
        count,
        types,
        isLoading: false,
      }));

      if (url) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        const newLimit = urlParams.get('limit');
        if (newLimit) {
          setState((prevState) => ({
            ...prevState,
            limit: parseInt(newLimit),
          }));
        }
      }
    } catch {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      throw new Error();
    }
  }, []);

  useEffect(() => {
    fetchPokemonData(null);
  }, [fetchPokemonData]);

  const changePage = async (direction: 'next' | 'previous') => {
    const url = direction === 'next' ? state.next : state.previous;
    if (url) {
      await fetchPokemonData(url);
    }
  };

  const sortByType = async (type: string | null) => {
    setState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      if (type) {
        const { pokemon } = await fetchPokemonListByType(type);
        setState((prevState) => ({
          ...prevState,
          list: pokemon,
          next: null,
          previous: null,
          isLoading: false,
        }));
      } else {
        await fetchPokemonData(null);
      }
    } catch {
      setState((prevState) => ({ ...prevState, isLoading: false }));
      throw new Error();
    }
  };

  return (
    <ErrorBoundary>
      <div className="flex flex-col gap-3">
        {state.count && state.types && (
          <>
            <div>
              <p>Pokemon LIST</p>
              <p>
                There are total: <span className="font-bold italic">{state.count}</span> pokemons!
              </p>
            </div>
            <div>
              <DropDown list={state.types} callback={sortByType} />
            </div>
          </>
        )}

        {state.isLoading ? (
          <Loading />
        ) : (
          <div>
            <ul className="flex flex-wrap justify-between gap-3">
              {state.list?.length &&
                state.list.map((item, index) => {
                  const globalIndex =
                    (state.previous
                      ? parseInt(state.previous.split('offset=')[1]) + state.limit
                      : 0) +
                    index +
                    1;
                  return (
                    <li key={index}>
                      <div className="w-48 rounded-md border-2 border-solid border-white p-3">
                        {globalIndex} : {item.name || item.pokemon?.name}
                      </div>
                    </li>
                  );
                })}
              {state.list?.length === 0 && <span>Nothing was found</span>}
            </ul>
            <div className="mt-2 flex justify-end gap-3">
              {state.previous && (
                <button
                  className="w-32 border-b hover:border-b-black"
                  onClick={() => changePage('previous')}
                >
                  Previous Page
                </button>
              )}
              {state.next && (
                <button
                  className="w-28 border-b hover:border-b-black"
                  onClick={() => changePage('next')}
                >
                  Next page
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}
