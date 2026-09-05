interface Props {
  children: React.ReactNode;
}

export default function Design({ children }: Props) {
  return <div className="px-4 pt-4 sm:px-8">{children}</div>;
}
