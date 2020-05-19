import { toast, Slide } from "react-toastify";

export const toastError = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 3500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    transition: Slide,
  });
