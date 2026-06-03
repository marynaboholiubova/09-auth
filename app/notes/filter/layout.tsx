type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({
  children,
  sidebar,
}: Props) {
  return (
    <>
      {sidebar}
      {children}
    </>
  );
}