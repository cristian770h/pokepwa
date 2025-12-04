import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null);

  // Consumir la API de Ditto al cargar
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/ditto')
      .then(res => res.json())
      .then(data => setPokemon(data));
  }, []);

  // Función 1: Pedir Permiso (Del PDF Page 2) [cite: 19]
  const solicitarPermisoNotificaciones = () => {
    if ("Notification" in window) {
      Notification.requestPermission().then(resultado => {
        console.log("Permiso de notificación:", resultado); // [cite: 24]
        if (resultado === 'granted') {
          alert("¡Permisos concedidos!");
        }
      });
    }
  };

  // Función 2: Enviar Notificación al SW (Del PDF Page 3) [cite: 42]
  const enviarNotificacion = async () => {
    if ("serviceWorker" in navigator) {
      // Esperamos a que el SW esté listo
      const registration = await navigator.serviceWorker.ready; // [cite: 46]
      
      // Enviamos el mensaje 'SHOW_NOTIFICATION' [cite: 47, 48]
      registration.active.postMessage({ 
        type: "SHOW_NOTIFICATION" 
      });
    }
  };

  // Acción combinada: Consultar/Capturar (Simulación)
  const handleSimularCaptura = () => {
    // Aquí podrías lógica para cambiar de pokemon
    enviarNotificacion(); // Dispara la notificación al "capturar"
  };

  return (
    <div className="App">
      <h1>PokePWA</h1>
      
      {/* Botón para activar permisos [cite: 26] */}
      <button onClick={solicitarPermisoNotificaciones}>
        Activar Notificaciones
      </button>

      <hr />

      {pokemon ? (
        <div className="card">
          <h2>{pokemon.name}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} width="150"/>
          
          <br />
          {/* Botón que simula la captura/consulta y dispara la notificación */}
          <button onClick={handleSimularCaptura} style={{marginTop: '10px'}}>
            ¡Capturar / Consultar!
          </button>
        </div>
      ) : (
        <p>Cargando Pokémon...</p>
      )}
    </div>
  )
}

export default App