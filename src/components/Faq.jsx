import { useState } from "react";
const questions = [
  {
    id: 0,
    q: "Is it a subscription?",
    a: "No, you pay once and can use it forever.",
  },
  {
    id: 1,
    q: "How does your service help me kickstart my lead generation efforts?",
    a: "Our service provides a comprehensive roadmap tailored to your business needs, guiding you through the intricacies of lead generation. From identifying your target audience to implementing effective strategies, we equip you with the tools and knowledge needed to generate quality leads efficiently.",
  },
  {
    id: 2,
    q: "How long does it typically take to see results from your lead generation service?",
    a: "The timeline for seeing results can vary depending on various factors such as industry, target audience, and the complexity of your offerings. However, our streamlined processes and proven methodologies are designed to deliver measurable results within a reasonable timeframe.",
  },
  {
    id: 3,
    q: "Can your service accommodate businesses of different sizes and industries?",
    a: "Yes, our service is designed to cater to businesses of all sizes and industries. Whether you're a small startup or a large enterprise, our flexible approach and customizable solutions can be tailored to suit your unique requirements and objectives.",
  },
  {
    id: 4,
    q: "What kind of support is available if I encounter any issues?",
    a: "We provide dedicated customer support channels, including email and live chat, to address any issues or concerns you may have. Our support team is available to assist you during business hours and strives to provide prompt and helpful responses to ensure a smooth and positive experience with our service.",
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
            className="flex items-center py-4 md:py-5 w-full gap-2"
            onClick={() => handleActive(q.id)}
          >
            <span className="flex-1 text-left text-base md:text-xl">{q.q}</span>
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
            <div className="pb-5 text-sm md:text-base text-white">{q.a}</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Faq;
