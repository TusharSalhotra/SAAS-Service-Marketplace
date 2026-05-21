export default function ProgressComponent({ value }: { value: number }) {
  return (
    <div className="progress-track" aria-label={`Registration form progress ${value}%`}>
      <span style={{ width: `${value}%` }} />
    </div>
  );
}
