import type { Step } from "@/lib/types";

export default function StepGuide({ steps }: { steps: Step[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-[2rem] mb-8 font-bold">Step-by-Step Guide</h2>
      {steps.map((step) => (
        <div key={step.step_number} className="bg-bg-primary border border-border-subtle p-8 mb-8">
          <h3 className="text-xl mb-4 text-gold flex items-center gap-3 font-bold">
            <span className="bg-gold text-bg-primary w-7 h-7 flex items-center justify-center rounded-full text-sm font-black flex-shrink-0">
              {step.step_number}
            </span>
            {step.title}
          </h3>
          <p>{step.description}</p>
          
          {(step.antigravity_prompt || step.claude_code_command) && (
            <div className="code-block">
              {step.antigravity_prompt && (
                <div className="text-[#888] mb-2 italic">
                  {"// "}{step.antigravity_prompt}
                </div>
              )}
              {step.claude_code_command && (
                <div>$ {step.claude_code_command}</div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
