import { useEffect, useState } from "react";
import * as C from "./App.styles";
import logoImage from "./assets/devmemory_logo.png";
import RestartIcon from "./svgs/restart.svg";
import { Button } from "./components/Button";
import { InfoItem } from "./components/InfoItem";
import { GridItemType } from "./types/GridItemType";

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

  // Criar e resetar os cards
  const resetAndCreateGrid = () => {};

  return (
    <C.Container>
      <C.Info>
        <C.LogoLink>
          <img src={logoImage} width="200" alt="" />
        </C.LogoLink>
        <C.InfoArea>
          <InfoItem label="Tempo" value="00:00" />
          <InfoItem label="Movimento" value="0" />
        </C.InfoArea>

        <Button
          label="Reiniciar"
          icon={RestartIcon}
          onClick={resetAndCreateGrid}
        />
      </C.Info>
      <C.GridArea>
        <C.Grid></C.Grid>
      </C.GridArea>
    </C.Container>
  );
};

export default App;
