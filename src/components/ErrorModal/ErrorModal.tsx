import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { setError } from "../../store/todosSlice";

interface ErrorModalProps {
  error: string;
}
const ErrorModal = ({ error }: ErrorModalProps) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className="absolute top-1/2 left-1/2 w-96 bg-red-500 rounded-2xl p-4 text-center break-all"
      style={{ transform: "translateX(-50%) translateY(-50%)" }}
      onClick={() =>dispatch(setError(null))}
    >
      <p>{error}</p>
      <p>Click to close</p>
    </div>
  );
};

export default ErrorModal;
