import TestimonialCard from "@/components/sections/home/TestimonialCard";
import TestimonialParallax from "@/components/ui/TestimonialParallax";
import { testimonials } from "@/data/work";

export default function Testimonials() {
  return (
    <>
      {/* Testimonials — four cards that overlap in a fixed row */}
      <div className="h-item h-span-3">
        <TestimonialParallax>
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} item={t} index={i} />
          ))}
        </TestimonialParallax>
      </div>
    </>
  );
}
