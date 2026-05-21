export default function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <>
      <span>{label}</span>
      <strong>{value}</strong>
    </>
  );
}
