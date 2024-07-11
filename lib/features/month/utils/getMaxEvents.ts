/* 
    Returns number of events that can fit within a cell (dependent on screen size)
*/
export const getMaxEvents = (ROW_HEIGHT: number, isCompact: boolean) => {
  if (ROW_HEIGHT === 0) return 0;

  // Constants
  const PADDING = 2;
  const CELL_BOTTOM = 8;
  const CELL_HEADER = 26;
  const ENTRY_HEIGHT = isCompact ? 18 : 20;

  return Math.max(
    Math.floor((ROW_HEIGHT - CELL_HEADER - CELL_BOTTOM) / (ENTRY_HEIGHT + PADDING)),
    0
  );
};
