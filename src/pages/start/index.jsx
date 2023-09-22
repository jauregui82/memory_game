import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserNames from "../../hooks/useUserNames";

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const addName = useUserNames("");

  const handleStartClick = () => {
    if (name.trim() !== "") {
      navigate(`/game/${name}`);
    } else {
      setError("Por favor, ingresa tu nombre.");
    }
  };
  useEffect(() => {
    addName;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">
        ¡Bienvenido al Juego de Memoria!
      </h1>
      <input
        type="text"
        placeholder="Ingresa tu nombre"
        className={`border border-gray-300 p-2 rounded-md mb-4 ${
          error ? "border-red-500" : ""
        }`}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError("");
        }}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleStartClick}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Comenzar
      </button>
    </div>
  );
};

export default WelcomeScreen;
