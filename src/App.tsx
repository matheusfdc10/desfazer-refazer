import React, { useState } from "react";
import "./App.css";

interface ClickedProps {
  pageX: number;
  pageY: number;
}

function App() {
  const [clickedPoints, setClickedPoints] = useState<ClickedProps[]>([]);
  const [undoPoints, setUndoPoints] = useState<ClickedProps[]>([]);

  const getCoordinates = (e: React.MouseEvent<HTMLElement>) => {
    const { pageX, pageY } = e;

    setClickedPoints([...clickedPoints, { pageX, pageY }]);
  };

  const handleUndo = () => {
    const newclickedPoints = [...clickedPoints];
    const undoPoint = newclickedPoints.pop();
    if (undoPoint) {
      setClickedPoints(newclickedPoints);
      setUndoPoints([...undoPoints, undoPoint]);
    }
  }

  const handleRedo = () => {
    const newUndoPoints = [...undoPoints];
    const redoPoint = newUndoPoints.pop();
    if (redoPoint) {
      setUndoPoints(newUndoPoints);
      setClickedPoints([...clickedPoints, redoPoint]);
    }
  }

  return (
    <>
      <div className="actions">
        <button disabled={!clickedPoints.length} onClick={handleUndo}>Desfazer {clickedPoints.length}</button>
        <button disabled={!undoPoints.length} onClick={handleRedo}>Refazer {undoPoints.length}</button>
      </div>
      <div className="app" onClick={(e) => getCoordinates(e)}>
        {clickedPoints.map((clickedPoint, i) => {
          return (
            <div
              key={i}
              className="circle"
              style={{
                left: clickedPoint.pageX - 4,
                top: clickedPoint.pageY - 4,
              }}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
