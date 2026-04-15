export default function DropCap({ children, dropText }: { children: React.ReactNode; dropText: string }) {
  return (
    <p style={{ marginTop: 0 }}>
      {dropText && <span className="drop-cap">{dropText}</span>}
      {children}
    </p>
  );
}
