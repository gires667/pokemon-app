'use client'

import { useEffect, useState } from 'react';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://127.0.0.1:8080/api/pokemon')
      .then(res => res.json())
      .then(data => {
        setPokemons(data['hydra:member'] || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <h1>Pokédex</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {pokemons.map(pokemon => (
          <li key={pokemon.id} style={{ marginBottom: '20px' }}>
            <h2>{pokemon.name} (#{pokemon.pokeID})</h2>
            <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
            <p>Types: {pokemon.types.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
