export default function ProTips({ tips }: { tips: string[] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div className="mt-12">
      <h2 className="text-[2rem] mb-8 font-bold">Pro Tips</h2>
      {tips.map((tip, index) => (
        <div key={index} className="flex gap-4 bg-bg-surface p-6 mb-4 border border-border-subtle">
          <div className="text-2xl flex-shrink-0">💡</div>
          <div>{tip}</div>
        </div>
      ))}
    </div>
  );
}
