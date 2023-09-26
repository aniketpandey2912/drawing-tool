import styles from "./index.module.css";

import { COLORS } from "@/constants";

export const ToolBox = () => {
  const updateBrushSize = () => {};
  return (
    <div className={styles.toolBoxContainer}>
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
      </div>
      <div className={styles.toolItem}>
        <h4>Brush Size</h4>
        <div className={styles.toolText}>
          <input type="range" min="1" max="10" onChange={updateBrushSize} />
        </div>
      </div>
    </div>
  );
};
