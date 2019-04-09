import React, {useState, Suspense} from 'react'

const cache = {}

function PokemonInfo({pokemonName}) {
  const pokemon = cache[pokemonName]
  if (pokemon === undefined) {
    const promise = fetchPokemon(pokemonName).then(
      p => (cache[pokemonName] = p),
    )
    throw promise
  }
  return <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
}

function fetchPokemon(name) {
  const pokemonQuery = `
      query ($name: String) {
        pokemon(name: $name) {
          id
          number
          name
          attacks {
            special {
              name
              type
              damage
            }
          }
        }
      }
    `
  return window
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name},
      }),
    })
    .then(r => r.json())
    .then(response => response.data.pokemon)
}

function App() {
  const [pokemonName, setPokemonName] = useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    setPokemonName(e.target.elements.pokemonName.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName-input">Pokemon Name (ie Pikachu)</label>
        <input id="pokemonName-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      <div>
        {pokemonName ? (
          <Suspense fallback={<div>loading...</div>}>
            <PokemonInfo pokemonName={pokemonName} />
          </Suspense>
        ) : null}
      </div>
    </div>
  )
}

export default App
