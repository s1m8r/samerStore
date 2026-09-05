interface Props {
  title: string;
  dataInformation: string;
}

export function ProComponent({ title, dataInformation }: Props) {
  return (
    <div className="mb-3 flex w-full justify-between border-b border-border py-2">
      <span className="text-sm text-muted-foreground">{title}: </span>
      <span className="text-sm font-medium">{dataInformation}</span>
    </div>
  );
}
