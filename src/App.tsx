import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridItem } from "./components/GridItem";
import { GridItemType } from "./types/GridItemType";
import { items } from "./data/items";
import { formatTimeElapsed } from "./helpers/formatTimeElapsed";

const App = () => {
  // Primeiro eu preciso saber se o jogos esta rodando
  const [playing, setPlaying] = useState<boolean>(false);
  // Tempo que passou
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  //Quantidade de movimento
  const [moveCount, setMoveCount] = useState<number>(0);
  // Quantas cartas estão exibindo
  const [shownCount, setShownCount] = useState<number>(0);
  // GRID
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (playing) setTimeElapsed(timeElapsed + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed]);

  // Criar e resetar os cards
  const resetAndCreateGrid = () => {
    // Passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // Passo 2 - Criar o grid e começar o jogo
    // Passo 2.1 - criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    let itemsCard = items.length * 2;

    for (let i = 0; i < itemsCard; i++) {
      tmpGrid.push({
        item: null,
        show: false,
        permanentShow: false,
      });
    }
    // Passo 2.2 Preencher o grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * itemsCard);
        }

        tmpGrid[pos].item = i;
      }
    }

    // Passo 2.3 Jogar no state
    setGridItems(tmpGrid);

    // Passo 3 - começçar o jogo
    setPlaying(true);
  };

  const handleItemClick = (index: number) => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimento" value="0" />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid>
          {gridItems.map((item, index) => (
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
