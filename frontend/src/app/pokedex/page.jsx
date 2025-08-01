"use client";

import React, { useEffect, useState } from "react";
import styles from './page.module.css';

export default function Pokedex() {
  const [pokemonList, setPokemonList] = useState(null);

  useEffect(() => {
    async function fetchPokemonList() {
      try {
        const res = await fetch("https://127.0.0.1:8080/api/pokemon");
        if (!res.ok) throw new Error("Erreur réseau");
        const data = await res.json();
        setPokemonList(data.member);
      } catch (error) {
        console.error("Erreur de fetch:", error);
      }
    }
    fetchPokemonList();
  }, []);

  if (!pokemonList) return <div>Chargement...</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Pokedex</h1>
      <ul className={styles.pokemonList}>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id} className={styles.pokemonItem}>
            <img src={pokemon.image} alt={pokemon.name} className={styles.pokemonImage} />
            <h2 className={styles.pokemonName}>{pokemon.name}</h2>
            <ul className={styles.typesList}>
              {pokemon.types.map((type) => (
                <li key={type} className={styles.typeItem}>{type}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
