import { useEffect } from "react";
import { useMessagesContext } from "../hooks/useMessagesContext";
import { formatDistanceToNow } from "date-fns";
import { HiTrash } from "react-icons/hi2";
import AOS from "aos";
import "aos/dist/aos.css";

const MessagesList = () => {
  const { messages, dispatch } = useMessagesContext();

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch("/api/messages");
      const json = await response.json();

      if (response.ok) {
        window.scrollTo(0, document.body.scrollHeight);
        dispatch({ type: "SET_MESSAGES", payload: json });
      }
    };

    fetchMessages();
  }, [dispatch]);

  const deleteMessage = async (id) => {
    const respone = await fetch(`/api/messages/${id}`, {
      method: "DELETE",
    });
    const json = await respone.json();
    if (respone.ok) {
      dispatch({ type: "DELETE_MESSAGE", payload: json });
    }
  };

  return (
    <div className="pt-6 pb-24 md:pb-36 px-6 md:px-24 lg:px-52">
      {messages &&
        messages.map((message) => (
          <div
            data-aos="fade-right"
            className="w-fit pt-1 p-4 rounded-lg shadow bg-white font-bold mt-4"
            key={message._id}
          >
            <p className="mt-3">{message.messageContent.message}</p>
            <div className="flex justify-between items-center mt-3 gap-6">
              <p className="text-right text-sm text-gray-400">
                {formatDistanceToNow(new Date(message.createdAt), {
                  addSuffix: true,
                })}
              </p>
              <HiTrash
                className="text-gray-400 hover:text-gray-600 duration-150 cursor-pointer"
                onClick={() => deleteMessage(message._id)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default MessagesList;
