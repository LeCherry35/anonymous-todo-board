import React, { useEffect, useState } from "react";
import { setBoardId } from "./store/todosSlice";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { changeTodoStatusAsync, getTodosAsync } from "./store/actionCreators";
import Input from "./components/Input";
import Button from "./components/Button";
import Text from "./components/Text";
import ErrorModal from "./components/ErrorModal";
import Loader from "./components/Loader";

function App() {
  const [currentBoardId, setCurrentBoardId] = useState<string>(Date.now().toString());
  const [boardIdToFind, setBoardIdToFind] = useState<string>("");

  const todos = useAppSelector((state) => state.todosReducer);
  const { isLoading, error} = todos
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setBoardId(currentBoardId));
  })

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return false;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return false;
    const sourceId = source.index;
    const destinationId = destination.index;
    dispatch(
      changeTodoStatusAsync({
        id: result.draggableId,
        newStatus: result.destination.droppableId,
        currentStatus: result.source.droppableId,
        sourceId,
        destinationId,
      })
    );
  };
  return (
    <div>
      {isLoading && <Loader/>}
      {error && <ErrorModal error={error} />}
      <div className="flex">
        <Input
          placeholder="Enter board id"
          value={boardIdToFind}
          onChange={(e) => setBoardIdToFind(e.target.value)}
          styleAdd="grow m-2"
        />
        <Button
          styleAdd="m-2"
          onClick={() => {
            dispatch(getTodosAsync(boardIdToFind));
            setCurrentBoardId(boardIdToFind);
          }}
          type="main"
          disabled={!boardIdToFind || isLoading}
        >
          Find board
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <Text type="heading">Current board Id</Text>
        <Input
          placeholder={currentBoardId}
          value={currentBoardId}
          onChange={(e) => setCurrentBoardId(e.target.value)}
          disabled={Boolean(
            todos["todo"].length ||
              todos["in-progress"].length ||
              todos["done"].length
          )}
        />
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3">
          <Column todos={todos["todo"]} title="todo" />
          <Column todos={todos["in-progress"]} title="in-progress" />
          <Column todos={todos["done"]} title="done" />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
