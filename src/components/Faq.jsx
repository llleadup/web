import { useState } from "react";
const questions = [
  {
    id: 0,
    q: "Is it a subscription?",
    a: "No, you pay once and can use it forever.",
  },
  {
    id: 1,
    q: "How to get refund?",
    a: "There is no possible way to get refund, so think if you really need it before purchasing.",
  },
  {
    id: 2,
    q: "How many leads can i generate after using this app?",
    a: "As much as you want. Our tools will help you to do it in much more effective way.",
  },
  {
    id: 3,
    q: "What is going on here guys pls help me?",
    a: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque quisquam perspiciatis accusantium distinctio hic nesciunt! Assumenda placeat soluta commodi consectetur!",
  },
  {
    id: 4,
    q: "When you walk through a storm?",
    a: "You never walk alone bro.",
  },
];
const Faq = () => {
  const [active, setActive] = useState(null);

  const handleActive = (id) => {
    if (id === active) {
      setActive(null);
    } else {
      setActive(id);
    }
  };

  return (
    <ul className="basis-1/2">
      {questions.map((q) => (
        <li key={q.id} className="border-t border-white">
          <button
            className="flex items-center py-5 w-full gap-2"
            onClick={() => handleActive(q.id)}
          >
            <span className="flex-1 text-left text-xl">{q.q}</span>
            <div
              className="relative w-6 h-6 transition-all duration-300 ease-in-out"
              style={{ transform: `rotateZ(${active === q.id ? "90deg" : 0}` }}
            >
              <span
                className="absolute w-5 h-1 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white transition-all duration-300 ease-in-out"
                style={{
                  opacity: active === q.id ? 0 : 1,
                }}
              ></span>
              <span className="absolute w-1 h-5 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-white"></span>
            </div>
          </button>
          <div
            className="transition-all duration-300 ease-in-out overflow-hidden"
            style={{
              maxHeight: active === q.id ? "150px" : "0px",
              opacity: active === q.id ? 1 : 0,
            }}
          >
            <div className="pb-5 text-white">{q.a}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Faq;
