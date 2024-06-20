import MessageForm from "./components/MessageForm";
import MessagesList from "./components/MessagesList";

const App = () => {
  return (
    <div className="w-full min-h-screen bg-[#eeeeee]">
      <MessagesList />
      <MessageForm />
    </div>
  );
};

export default App;
