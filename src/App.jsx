import { useState } from "react";
import Card from "./components/Card";
import shuffle from "./util/shuffle";

function App() {
  const [cards, setCards] = useState(shuffle);

  return (
    <div className="grid">
      {cards.map((card) => {
        const { image, id, matched } = card;
        return (
          <Card key={id} image={image} selected={false} onClick={() => {}} />
        );
      })}
    </div>
  );
}

export default App;
