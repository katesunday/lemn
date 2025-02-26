import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <div className="mt-3 flex flex-col items-center gap-2">
        <Link
          href="/types"
          className="w-1/4 cursor-pointer rounded-md border-2 border-solid p-2 text-center hover:bg-blue"
        >
          Pokemon Types
        </Link>
        <Link
          href="/pokemonList"
          className="w-1/4 cursor-pointer rounded-md border-2 border-solid p-2 text-center hover:bg-blue"
        >
          Pokemon List
        </Link>
      </div>
    </div>
  );
}
