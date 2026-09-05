import { useGetColors } from "@/API/colors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";
import { useState } from "react";
interface Prop {
  setColor: React.Dispatch<React.SetStateAction<string>>;
}
export default function AccordionStore({ setColor }: Prop) {
  const { data: colors } = useGetColors();
  const [selectedColor, setSelectedColor] = useState("");
  const checkColor = (color: string) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    setColor(newColor);
  };
  return (
    <Accordion type="multiple" className="">
      <AccordionItem value="T-shirts">
        <AccordionTrigger>T-shirts</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Shorts">
        <AccordionTrigger>Shorts</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Shirts">
        <AccordionTrigger>Shirts</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Shirts">
        <AccordionTrigger>Shirts</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Hoodie">
        <AccordionTrigger>Hoodie</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Jeans">
        <AccordionTrigger>Jeans</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Price">
        <AccordionTrigger>Price</AccordionTrigger>
      </AccordionItem>
      <AccordionItem value="Colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-6 gap-2">
            {colors?.data.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => checkColor(item.color)}
                style={{ backgroundColor: item.color }}
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                  selectedColor === item.color
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {selectedColor === item.color && (
                  <span className="text-sm font-bold text-white">
                    <Check />
                  </span>
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
