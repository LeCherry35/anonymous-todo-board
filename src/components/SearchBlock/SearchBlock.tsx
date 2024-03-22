import React, { useState } from "react";
import Button from "../Button";
import { useAppDispatch } from "../../hooks/redux";
import { setBoardId } from "../../store/todosSlice";
import { getTodosAsync } from "../../store/actionCreators";

const SearchBlock = () => {
  const [boardIdToFind, setBoardIdToFind] = useState<string>("");

  const dispatch = useAppDispatch();

  return (
    <div className="flex">
      <input
        placeholder="Enter board id"
        value={boardIdToFind}
        onChange={(e) => setBoardIdToFind(e.target.value)}
        maxLength={13}
        className="p-2 border-2 border-solid border-zinc-300 outline-none rounded-md mb-2 focus-visible:border-zinc-700 duration-500 grow m-2"
      />
      <Button
        className="m-2"
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
