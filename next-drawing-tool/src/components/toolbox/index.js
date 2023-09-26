import { useSelector } from "react-redux";
import styles from "./index.module.css";

import { COLORS, MENU_ITEMS } from "@/constants";

export const ToolBox = () => {
  const activeMenuItem = useSelector((state) => state.menu.activeMenuItem);
  const showStrokeToolOption = activeMenuItem === MENU_ITEMS.PENCIL;
  const showBrushToolOption = activeMenuItem === MENU_ITEMS.ERASER;
  const updateBrushSize = () => {};
  return (
    <div className={styles.toolBoxContainer}>
      {showStrokeToolOption && (
        <div className={styles.toolItem}>
          <h4 className={styles.toolText}>Stroke Color</h4>
          <div className={styles.itemContainer}>
            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLACK }}
            ></div>

            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.RED }}
            ></div>

            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.GREEN }}
            ></div>

            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.BLUE }}
            ></div>

            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.ORANGE }}
            ></div>

            <div
              className={styles.colorBox}
              style={{ backgroundColor: COLORS.YELLOW }}
            ></div>
          </div>
          <div className={styles.toolItem}>
            <h4>Brush Size {activeMenuItem}</h4>
            <div className={styles.toolText}>
              <input type="range" min="1" max="10" onChange={updateBrushSize} />
            </div>
          </div>
        </div>
      )}

      {showBrushToolOption && (
        <div className={styles.toolItem}>
          <h4>Brush Size {activeMenuItem}</h4>
          <div className={styles.toolText}>
            <input type="range" min="1" max="10" onChange={updateBrushSize} />
          </div>
        </div>
      )}
    </div>
  );
};
