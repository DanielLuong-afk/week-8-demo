import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
 
export default function FAQPage() {
  return (
    <div className="max-w-xl mx-auto py-10">
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is this?</AccordionTrigger>
          <AccordionContent>This is a shadcn accordion.</AccordionContent>
        </AccordionItem>
 
        <AccordionItem value="item-2">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>It uses Radix UI under the hood.</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}