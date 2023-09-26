import { Board } from "@/components/board";
import { Menu } from "@/components/menus";
import { ToolBox } from "@/components/toolbox";

export default function Home() {
  return (
    <>
      <Menu />
      <ToolBox />
      <Board />
    </>
  );
}
