import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faqs() {
  const items = [
    {
      value: "item-1",
      trigger: "How do I reset my password?",
      content:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. The link will expire in 24 hours.",
    },

    {
      value: "item-2",
      trigger: "Can I change my subscription plan?",
      content:
        "Yes, you can upgrade or downgrade your plan at any time from your account settings. Changes will be reflected in your next billing cycle.",
    },
    {
      value: "item-3",
      trigger: "Why did you make these fixed instead of making them dynamic?",
      content:
        "I don't want to add FAQs for every product because it would be tedious. This is just a demo project.",
    },
  ];

  return (
    <Accordion type="multiple" className="w-full">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger className="text-base font-medium py-4">
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="text-base text-muted-foreground">
            {item.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
