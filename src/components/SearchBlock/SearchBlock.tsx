import React, { useState } from "react";
import Input from "../Input";
import Button from "../Button";
import { useAppDispatch } from "../../hooks/redux";
import { setBoardId } from "../../store/todosSlice";
import { getTodosAsync } from "../../store/actionCreators";

const SearchBlock = () => {
  const [boardIdToFind, setBoardIdToFind] = useState<string>("");

  const dispatch = useAppDispatch();

  return (
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
          dispatch(setBoardId(boardIdToFind));
        }}
        type="main"
        disabled={!boardIdToFind}
      >
        Find board
      </Button>
    </div>
  );
};

export default SearchBlock;
