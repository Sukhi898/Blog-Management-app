import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../store/toastSlice";

const ToastManager = () => {
  const dispatch = useDispatch();
  const { message, type, isVisible } = useSelector((state) => state.toast);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, dispatch]);

  if (!isVisible) return null;

  const bgColor =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500";

  return (
    <div
      className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 w-80 p-4 rounded-md shadow-lg ${bgColor} text-white text-center transition-all duration-300`}
    >
      <p className="font-medium">{message}</p>

      <button
        className="absolute top-1 right-2 text-white text-xl font-bold"
        onClick={() => dispatch(hideToast())}
      >
        &times;
      </button>
    </div>
  );
};

export default ToastManager;
