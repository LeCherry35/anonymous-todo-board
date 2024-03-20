import React, { useEffect } from "react";
import { setBoardId } from "./store/todosSlice";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./components/Column";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { changeTodoStatusAsync } from "./store/actionCreators";
import Text from "./components/Text";
import ErrorModal from "./components/ErrorModal";
import Loader from "./components/Loader";
import SearchBlock from "./components/SearchBlock";

function App() {
  const todos = useAppSelector((state) => state.todosReducer);
  const {
    isLoading,
    error,
    todo,
    done,
    "in-progress": inProgress,
    boardId,
  } = todos;
  const dispatch = useAppDispatch();

  const currentBoardId = boardId || Date.now().toString();

  useEffect(() => {
    dispatch(setBoardId(currentBoardId));
  });

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
        newStatus: destination.droppableId,
        currentStatus: source.droppableId,
        sourceId,
        destinationId,
      }),
    );
  };

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorModal error={error} />}
      <SearchBlock />
      <Text type="heading">Current board Id {currentBoardId}</Text>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3">
          <Column todos={todo} title="todo" />
          <Column todos={inProgress} title="in-progress" />
          <Column todos={done} title="done" />
        </div>
      </DragDropContext>
    </div>
  );
}

export default App;
