import { useState } from "react";
import content from "../data/content.json";

const AccordionItem = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-3 text-left font-medium text-lg"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="pb-4 text-gray-700 space-y-2">
          {content.map((line, i) => (
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
      {content.map((item, idx) => (
        <AccordionItem
          key={idx}
          title={item.title}
          content={item.content}
        />
      ))}
    </div>
  );
}
