import { useState } from "react";
import data from "../data/content.json";

const AccordionItem = ({ question, answers }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <p
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-left font-medium text-lg"
      >
        {question}
        <span>{open ? "−" : "+"}</span>
      </p>
      {open && (
        <div className="pb-4 text-gray-700 space-y-2">
          {answers.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Privacy Policy</h1>
      {data.privacy.map((item, idx) => (
        <AccordionItem
          key={idx}
          question={item.question}
          answers={item.answers}
        />
      ))}
    </div>
  );
}
