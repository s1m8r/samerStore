import { useGetColors } from "@/API/colors";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
interface Prop {
  setColor: React.Dispatch<React.SetStateAction<string>>;
  maxPrice?: number;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

function hexToHue(hex: string) {
  const value = hex.replace("#", "");
  if (value.length !== 6) return 0;

  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  if (delta === 0) return 0;

  let hue;
  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  return hue < 0 ? hue + 360 : hue;
}

function SizeFilter() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSize = (size: string) => {
    setSelected((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };
  return (
    <div className="flex flex-wrap gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          type="button"
          onClick={() => toggleSize(size)}
          className={`flex h-8 min-w-8 items-center justify-center rounded-lg border px-2 text-xs font-medium ${
            selected.includes(size)
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-foreground"
          }`}
        >
          {size}
        </button>
      ))}
    </div>
  );
}

function PriceFilter({ max = 0 }: { max?: number }) {
  const [range, setRange] = useState([0, max]);

  return (
    <div className="space-y-3 px-1">
      <Slider
        min={0}
        max={max || 1}
        step={1}
        value={range}
        onValueChange={setRange}
      />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>${range[0]}</span>
        <span>${range[1]}</span>
      </div>
    </div>
  );
}

export default function AccordionStore({ setColor, maxPrice = 0 }: Prop) {
  const { data: colors } = useGetColors();
  const sortedColors = useMemo(
    () =>
      [...(colors?.data ?? [])].sort(
        (a, b) => hexToHue(a.color) - hexToHue(b.color),
      ),
    [colors],
  );
  const [selectedColor, setSelectedColor] = useState("");
  const checkColor = (color: string) => {
    const newColor = selectedColor === color ? "" : color;
    setSelectedColor(newColor);
    setColor(newColor);
  };
  return (
    <Accordion type="multiple" className="">
      <AccordionItem value="Colors">
        <AccordionTrigger>Colors</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-6 gap-2">
            {sortedColors.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => checkColor(item.color)}
                style={{ backgroundColor: item.color }}
                className={`flex aspect-square w-full items-center justify-center rounded-full border-[3px] ${
                  selectedColor === item.color
                    ? "border-primary"
                    : "border-border"
                }`}
              >
                {selectedColor === item.color && (
                  <span className="text-white">
                    <Check size={16} />
                  </span>
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Hoodie">
        <AccordionTrigger>Hoodie</AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Jeans">
        <AccordionTrigger>Jeans</AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Pants">
        <AccordionTrigger>Pants</AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Price">
        <AccordionTrigger>Price</AccordionTrigger>
        <AccordionContent>
          <PriceFilter key={maxPrice} max={maxPrice} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Shirts">
        <AccordionTrigger>Shirts</AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Shorts">
        <AccordionTrigger>Shorts</AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="T-shirts">
        <AccordionTrigger>T-shirts</AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
