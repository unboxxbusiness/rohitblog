export default function ProTips({ tips }: { tips: string[] }) {
  if (!tips || tips.length === 0) return null;

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Pro Tips</h2>
      {tips.map((tip, index) => (
        <div key={index} className="pro-tip">
          <div style={{ fontSize: '1.5rem' }}>💡</div>
          <div>{tip}</div>
        </div>
      ))}
    </div>
  );
}
