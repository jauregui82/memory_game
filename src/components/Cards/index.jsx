import { useState } from "react";
import Card from "../Card";

const shuffleArray = (array) => {
  const newArray = [...array];
  return newArray.map((_, index, arr) => {
    const randomIndex =
      Math.floor(Math.random() * (arr.length - index)) + index;
    [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
    return arr[index];
  });
};

const Cards = () => {
  const initialItems = [
    { id: 1, type: "origin", img: "html.png", stat: "" },
    { id: 1, img: "html.png", stat: "" },
    { id: 2, type: "origin", img: "css.png", stat: "" },
    { id: 2, img: "css.png", stat: "" },
    { id: 3, type: "origin", img: "js.png", stat: "" },
    { id: 3, img: "js.png", stat: "" },
    { id: 4, type: "origin", img: "scss.png", stat: "" },
    { id: 4, img: "scss.png", stat: "" },
    { id: 5, type: "origin", img: "react.png", stat: "" },
    { id: 5, img: "react.png", stat: "" },
    { id: 6, type: "origin", img: "vue.png", stat: "" },
    { id: 6, img: "vue.png", stat: "" },
    { id: 7, type: "origin", img: "angular.png", stat: "" },
    { id: 7, img: "angular.png", stat: "" },
    { id: 8, type: "origin", img: "nodejs.png", stat: "" },
    { id: 8, img: "nodejs.png", stat: "" },
  ];

  const [items, setItems] = useState(shuffleArray(initialItems));
  const [prev, setPrev] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);

  const check = (current) => {
    if (items[current].id === items[prev].id) {
      console.log("Iguales", { current, prev });
      const updatedItems = [...items];
      updatedItems[current].stat = "correct";
      updatedItems[prev].stat = "correct";
      setItems(updatedItems);
      setCorrectCount(correctCount + 1); // Incrementar contador de aciertos
      setPrev(-1);
    } else {
      console.log("Diferentes", { current, prev });
      const updatedItems = [...items];
      updatedItems[current].stat = "wrong";
      updatedItems[prev].stat = "wrong";
      setItems(updatedItems);
      setTimeout(() => {
        const resetItems = [...updatedItems];
        resetItems[current].stat = "";
        resetItems[prev].stat = "";
        setItems(resetItems);
        setPrev(-1);
      }, 1000);
    }
    setTotalAttempts(totalAttempts + 1); // Incrementar contador de intentos totales
  };

  const handleClick = (id) => {
    if (prev === -1) {
      // Si no se ha seleccionado ninguna carta previamente
      console.log("ninguna carta previamente");
      const updatedItems = [...items];
      updatedItems[id].stat = "active";
      setItems(updatedItems);
      setPrev(id);
    } else if (prev === id) {
      console.log("misma carta previamente");
      // Si el usuario hizo clic en la misma carta nuevamente
      const updatedItems = [...items];
      updatedItems[id].stat = "";
      setItems(updatedItems);
      setPrev(-1);
    } else {
      console.log("carta previamente");
      // Si el usuario hizo clic en una carta diferente
      check(id);
    }
  };

  console.log({ items, prev, correctCount, totalAttempts });

  return (
    <>
      <h2>Aciertos: {correctCount}</h2>
      <h2>Total de intentos: {totalAttempts}</h2>
      <div className="container">
        {items.map((item, index) => (
          <Card key={index} item={item} id={index} handleClick={handleClick} />
        ))}
      </div>
    </>
  );
};

export default Cards;
