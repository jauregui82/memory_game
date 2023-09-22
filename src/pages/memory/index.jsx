import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Cards from "../../components/Cards";
import Confetti from "../../components/Confetti";
import Modal from "../../components/Modal";
import Loading from "../../components/Loading";
import Header from "../../components/Header";
import { useCards } from "../../hooks/useCards";
import useSuccesses from "../../hooks/useSuccesses";
import useErrors from "../../hooks/useErrors";
import useUserNames from "../../hooks/useUserNames";
import useResetData from "../../hooks/useResetData";

const Memory = () => {
  const params = useParams();
  const userName = params?.userName.toUpperCase() ?? "";
  const { isLoading, data } = useCards();
  const queryClient = useQueryClient();
  const [items, setItems] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [correctCount, setCorrectCount] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [initialScore, setInitialScore] = useState(false);
  const [nameForSave, setNameForSave] = useState("");
  const clearData = useResetData(initialScore);
  const addName = useUserNames(nameForSave);

  useSuccesses(correctCount, initialScore);
  useErrors(errorCount, initialScore);
  const shuffleArray = () => {
    if (!data) return;
    const newArray = [...data];
    return newArray.map((_, index, arr) => {
      const randomIndex =
        Math.floor(Math.random() * (arr.length - index)) + index;
      [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]];
      return arr[index];
    });
  };
  const initializeStatValue = (oldData) => {
    if (!oldData) return;
    return oldData?.cards?.map((item) => ({
      id: item.id,
      title: item.title,
      img: item.img,
      stat: "",
      updated: true,
    }));
  };

  useEffect(() => {
    if (initialScore) {
      clearData;
      addName;
      if (data) {
        initializeStatValue(data);
        queryClient.setQueryData(["itemsCards"], {
          cards: initializeStatValue(data),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScore]);

  useEffect(() => {
    setInitialScore(true);
    setNameForSave(userName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setItems(shuffleArray());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  const check = (current) => {
    if (!data) return;
    if (items[current].id === items[prev].id) {
      const updatedItems = [...items];
      updatedItems[current].stat = "correct";
      updatedItems[prev].stat = "correct";
      setItems(updatedItems);
      setCorrectCount(correctCount + 1); // Incrementar contador de aciertos
      setPrev(-1);
    } else {
      setErrorCount(errorCount + 1);
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
  };

  const handleClick = (id) => {
    setInitialScore(false);
    if (prev === -1) {
      const updatedItems = [...items];
      updatedItems[id].stat = "active";
      setItems(updatedItems);
      setPrev(id);
    } else if (prev === id) {
      const updatedItems = [...items];
      updatedItems[id].stat = "";
      setItems(updatedItems);
      setPrev(-1);
    } else {
      check(id);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Header userName={userName} />
          <Cards items={items} handleClick={handleClick} />
          {correctCount == 8 && (
            <>
              <Confetti />
              <Modal />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Memory;
