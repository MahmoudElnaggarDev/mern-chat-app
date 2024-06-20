import { IoSend } from "react-icons/io5";
import { useMessagesContext } from "../hooks/useMessagesContext";
import { useEffect, useState } from "react";

const MessageForm = () => {
  const [message, setMessage] = useState("");
  const { dispatch } = useMessagesContext();

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [message]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (message) {
      const messageContent = { message };

      const response = await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({ messageContent }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.log(json.error);
      }
      if (response.ok) {
        setMessage("");
        dispatch({ type: "CREATE_MESSAGE", payload: json });
      }
    }
  };

  return (
    <form className="w-full shadow-2xl fixed bottom-0 left-0 py-3 px-4 md:py-6 md:px-24 lg:px-52 bg-white flex justify-between items-center gap-2 md:gap-4">
      <input
        type="text"
        placeholder="Message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="w-full bg-[#eeeeee] rounded-md py-2 px-4 md:py-4 md:px-8 font-bold text-gray-600 outline-none focus:ring focus:ring-blue-500 duration-150"
      />
      <button
        type="submit"
        onClick={sendMessage}
        className="flex justify-between items-center bg-blue-600 text-white gap-2 px-3 py-2 md:py-4 rounded-md hover:bg-blue-700 active:bg-blue-900 font-bold active:ring active:ring-blue-500 duration-150"
      >
        Send <IoSend />
      </button>
    </form>
  );
};

export default MessageForm;
