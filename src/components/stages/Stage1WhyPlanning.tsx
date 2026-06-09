import { useApp } from "../../hooks/useApp";
import { Button } from "../ui/Button";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const content = `
Software engineers spend up to **70%** of their time planning, reading, and reviewing code — and only **30%** actually typing it. In the era of AI, your ability to plan logic is your most valuable skill, and the AI is just your typing assistant.


As the **Lead Architect**, your job is to define the logical steps of the program. Let's start!
`;

export default function Stage1WhyPlanning() {
  const { dispatch } = useApp();

  return (
    <div>
      <div className="card p-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="font-display font-semibold text-xl text-text-primary mb-4">
            Why Planning?
          </h3>
          <div className="font-body text-text-secondary leading-relaxed text-left prose-headings:font-display prose-a:text-accent">
            <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-6 border-t border-black/5 mt-6">
        <Button
          variant="primary"
          onClick={() => dispatch({ type: "COMPLETE_STAGE", stage: 1 })}
        >
          Got it! Let's start →
        </Button>
      </div>
    </div>
  );
}
