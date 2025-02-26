import { fetchPokemonTypes } from '@/lib/pokemon';

export default async function PokemonTypesPage() {
  const { types } = await fetchPokemonTypes();
  return (
    <div>
      <ul className="flex flex-wrap justify-between gap-3">
        {types.map((type) => (
          <li key={type.id}>
            <div className="w-44 rounded-md border-2 border-solid border-white p-3">
              <p className="bold italic">TYPE: {type.name} </p>
              <p>ID: {type.id} </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
