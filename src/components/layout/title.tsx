import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface Props {
  title: string;
  isRegister?: boolean;
}

export default function TitleContent({ title, isRegister = false }: Props) {
  const router = useRouter();
  return (
    <div className="flex items-center mb-4">
      {!isRegister && (
        <ArrowLeft
          onClick={() => router.history.back()}
          className="cursor-pointer"
        />
      )}
      <h1 className="text-lg font-semibold ml-2 capitalize">{title}</h1>
    </div>
  );
}
