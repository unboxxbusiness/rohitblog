import type { Step } from "@/lib/types";

export default function StepGuide({ steps }: { steps: Step[] }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Step-by-Step Guide</h2>
      {steps.map((step) => (
        <div key={step.step_number} className="step-card">
          <h3>
            <span className="step-number">{step.step_number}</span>
            {step.title}
          </h3>
          <p>{step.description}</p>
          
          {(step.antigravity_prompt || step.claude_code_command) && (
            <div className="code-block">
              {step.antigravity_prompt && (
                <div style={{ color: '#888', marginBottom: '0.5rem', fontStyle: 'italic' }}>
                  // {step.antigravity_prompt}
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
