import { useContext } from "react";
import { MessagesContext } from "../context/MessagesContext";

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw Error(
      "useMessagesContext must be used inside a MessagesContextProvider"
    );
  }

  return context;
};
