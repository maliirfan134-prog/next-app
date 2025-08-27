

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Sirf login ka content, no header/footer */}
      {children}
    </div>
  );
}
