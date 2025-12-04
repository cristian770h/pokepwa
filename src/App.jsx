import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=30')
      .then(res => res.json())
      .then(data => {
        
        const promises = data.results.map(p => fetch(p.url).then(r => r.json()));
        Promise.all(promises).then(details => setPokemons(details));
      });
  }, []);

  
  const handlePokemonClick = (pokeName) => {
    if (!("Notification" in window)) {
      alert("Tu navegador no soporta notificaciones");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(`Has seleccionado a ${pokeName}`, {
          body: "¡Excelente elección de Pokémon!",
          icon: "/pwa-192x192.png" 
        });
      }
    });
  };

  return (
    <div className="pokedex-container">
      <h1>PokePWA DevOps</h1>
      <div className="grid">
        {pokemons.map((poke) => (
          <div key={poke.id} className="card" onClick={() => handlePokemonClick(poke.name)}>
            <img src={poke.sprites.front_default} alt={poke.name} />
            <p>{poke.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App