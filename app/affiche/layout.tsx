import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Афиша кино',
  description: 'Афиша кино',
};

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}