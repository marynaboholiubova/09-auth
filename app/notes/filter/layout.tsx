// app/notes/filter/layout.tsx

type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <>
      {sidebar}
      {children}
    </>
  );
}



