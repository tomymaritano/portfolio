export const shell = "mx-auto w-full max-w-[680px] px-5";

export function PageFrame({
  children,
  className = "py-16",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main id="main" className={`${shell} flex-1 ${className}`}>
      {children}
    </main>
  );
}
