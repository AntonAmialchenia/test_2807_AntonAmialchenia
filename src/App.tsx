import { FC, useState } from "react";

import styles from "./App.module.css";

type Segment = {
  id: number;
  body: string;
  active: boolean;
  delete: boolean;
};

const App: FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [block, setBlock] = useState<Segment[]>([]);
  const [index, setIndex] = useState(1);

  const handelClick = () => {
    const newSegment: Segment = {
      id: Date.now(),
      body: String(index).repeat(Number(inputValue)),
      active: false,
      delete: false,
    };

    const lengthDeleteBlock = block.find((item) => item.delete)?.body.length;

    console.log(newSegment);

    if (lengthDeleteBlock) {
      const newArr = block.map((item) => ({
        ...item,
        body: item.delete ? String(index).repeat(lengthDeleteBlock) : item.body,
        delete: false,
      }));
      if (Number(inputValue) >= lengthDeleteBlock) {
        newSegment.body = String(index).repeat(
          Number(inputValue) - lengthDeleteBlock,
        );

        newArr.push(newSegment);
      }

      setBlock([...newArr]);
    } else {
      setBlock([...block, newSegment]);
    }

    setIndex((prev) => prev + 1);
    setInputValue("");
  };

  const handleDoubleClick = (id: number) => {
    const deleteArr = block.find((el) => el.delete);
    console.log(deleteArr);

    const newArr = block.map((el) => ({
      ...el,
      body: el.id === id ? "_".repeat(el.body.length) : el.body,
      delete: el.id === id,
    }));
    console.log(newArr);

    setBlock([...newArr]);
  };

  return (
    <div>
      <h1>Test</h1>
      <div className={styles.block}>
        {block?.map((el) =>
          el.body ? (
            <span
              className={
                el.active ? [styles.span, styles.active].join(" ") : styles.span
              }
              onClick={() =>
                setBlock((prev) =>
                  prev.map((item) => ({ ...item, active: item.id === el.id })),
                )
              }
              onDoubleClick={() => handleDoubleClick(el.id)}
              key={el.id}>
              {el.body ? el.body : null}
            </span>
          ) : (
            <></>
          ),
        )}
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
