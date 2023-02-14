const shuffle = () => {
  const assets = [
    { image: "/assets/ts.png" },
    { image: "/assets/html5.png" },
    { image: "/assets/js.png" },
    { image: "/assets/react.png" },
    { image: "/assets/firebase.png" },
    { image: "/assets/react.png" },
    { image: "/assets/sql.png" },
    { image: "/assets/html5.png" },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;
