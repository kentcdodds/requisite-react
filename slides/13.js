// WARNING, THIS IS NOT PRODUCTION READY.
// THIS IS LIKELY TO CHANGE IN THE FUTURE!!!

import React from 'react'
import fetchPokemon from '../fetch-pokemon'
// fetchPokemon('Pikachu').then(pikachuData => {})

function PokemonInfo({pokemonName}) {
  const pokemon = pokemonResource.read(pokemonName)
  return <pre>{JSON.stringify(pokemon, null, 2)}</pre>
}

function App() {
  return <PokemonInfo pokemonName="Pikachu" />
}
