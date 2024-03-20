import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setError } from "../../store/todosSlice";
import Text from "../Text";

interface ErrorModalProps {
  error: string;
}
const ErrorModal = ({ error }: ErrorModalProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className="absolute top-1/2 left-1/2 w-96 bg-red-500 rounded-2xl p-4 text-center break-all"
      style={{ transform: "translateX(-50%) translateY(-50%)" }}
      onClick={() => dispatch(setError(null))}
    >
      <Text type="title">{error}</Text>
      <Text type="text">Click to close</Text>
    </div>
  );
};

export default ErrorModal;
