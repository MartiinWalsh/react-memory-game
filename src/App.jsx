import { useState, useEffect } from "react";
import Card from "./components/Card";
import Header from "./components/Header";
import shuffle from "./util/shuffle";

function App() {
  const [cards, setCards] = useState(shuffle); // Shuffle cards
  const [firstPick, setFirstPick] = useState(null); // First card picked
  const [secondPick, setSecondPick] = useState(null); // Second card picked
  const [disabled, setDisabled] = useState(false); // Disable clicks
  const [wins, setWins] = useState(0); // Win streak

  // Handle card clicks
  const handleClick = (card) => {
    if (!disabled) {
      firstPick ? setSecondPick(card) : setFirstPick(card);
    }
  };

  const handleTurn = () => {
    setFirstPick(null);
    setSecondPick(null);
    setDisabled(false);
  };

  // Reset game
  const handleNewGame = () => {
    setWins(0);
    handleClick();
    setCards(shuffle);
  };

  // Selection and match handling
  useEffect(() => {
    let pickTimer;

    // Two cards have been clicked
    if (firstPick && secondPick) {
      // Check if the cards the same
      if (firstPick.image === secondPick.image) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.image === firstPick.image) {
              // Update card property to reflect match
              return { ...card, matched: true };
            } else {
              // No match
              return card;
            }
          });
        });
        handleTurn();
      } else {
        // Prevent new selections until after delay
        setDisabled(true);
        // Add delay between selections
        pickTimer = setTimeout(() => {
          handleTurn();
        }, 1000);
      }
    }

    return () => {
      clearTimeout(pickTimer);
    };
  }, [cards, firstPick, secondPick, wins]);

  // Win handling
  useEffect(() => {
    // check if all cards are matched
    const checkWin = cards.filter((card) => !card.matched);

    // If all cards are matched, increment wins and reset game
    if (cards.length && checkWin.length < 1) {
      setWins(wins + 1);
      handleClick();
      setCards(shuffle);
    }
  }, [cards, wins]);

  return (
    <>
      <Header handleNewGame={handleNewGame} wins={wins} />
      <div className="grid">
        {cards.map((card) => {
          const { image, id, matched } = card;
          return (
            <Card
              key={id}
              image={image}
              selected={card === firstPick || card === secondPick || matched}
              onClick={() => {
                handleClick(card);
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
