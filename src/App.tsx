import { FC, useState } from "react";

import styles from "./App.module.css";

const App: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [block, setBlok] = useState<string[]>([]);
  const [click, setClick] = useState(false);

  const handelClick = () => {
    const result = [];
    for (let i = 0; i < Number(inputValue); i++) {
      result.push(inputValue);
    }

    const newArr = [...block, result.join("")];

    setBlok(newArr);

    setInputValue("");
  };

  const handleDoubleClick = (index: number) => {
    const result = block[index].split("").fill("_").join("");

    setBlok((prev) => prev.map((el, i) => (index === i ? result : el)));
  };

  return (
    <div>
      <h1>Test</h1>
      <div className={styles.block}>
        {block?.map((el, index) => (
          <span
            className={
              click ? [styles.span, styles.active].join(" ") : styles.span
            }
            onClick={() => setClick((prev) => !prev)}
            onDoubleClick={() => handleDoubleClick(index)}
            key={index}>
            {el}
          </span>
        ))}
      </div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="длина блока"
      />
      <button onClick={() => handelClick()}>Сохранить</button>
    </div>
  );
};

export default App;
