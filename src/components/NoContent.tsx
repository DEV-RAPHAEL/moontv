export default function NoContent({ message = 'No content yet' }: { message?: string }) {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: '12px',
        padding: '3rem 2rem',
        textAlign: 'center',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
      }}
    >
      <p style={{ fontWeight: 'bold' }}>{message}</p>
      <p style={{ fontSize: '0.9rem' }}>Check back soon.</p>
    </div>
  );
}
