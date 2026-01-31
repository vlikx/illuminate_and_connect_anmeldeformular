import React, { useEffect, useRef } from "react";
import useEmblaCarousel from 'embla-carousel-react';

const slides = [
  { type: 'video', src: "rueckblick_content/videos/video-output-F6994C4C-29EF-4334-B941-73F965C2365B-1.mov", poster: "rueckblick_content/pictures/3J7A7976-Verbessert-RR.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/3J7A7976-Verbessert-RR.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/3J7A8005-Verbessert-RR.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/3J7A8032-Verbessert-RR.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/3J7A8133-Verbessert-RR.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/I&C-4697.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/I&C-4726.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/I&C-4758.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/Werkschauabend_AndreasStephan-01.jpg" },
  { type: 'image', src: "rueckblick_content/pictures/Werkschauabend_AndreasStephan-10.jpg" }
];

export default function RueckblickCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, speed: 4 });
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!emblaApi) return;
    autoplayRef.current && clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 3500);
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [emblaApi]);

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold font-[Rajdhani] uppercase text-center mb-10 bg-gradient-to-r from-fuchsia-400 via-yellow-400 to-fuchsia-500 bg-clip-text text-transparent tracking-wider">
        Rückblick Illuminate & Connect
      </h2>
      <div className="overflow-hidden rounded-3xl shadow-2xl border-2 border-fuchsia-500/20 bg-black/70">
        <div className="embla flex" ref={emblaRef}>
          {slides.map((slide, i) => (
            <div className="min-w-0 flex-[0_0_100%] flex items-center justify-center" key={i}>
              {slide.type === 'video' ? (
                <video src={slide.src} poster={slide.poster} controls className="w-full h-[400px] object-cover rounded-3xl" />
              ) : (
                <img src={slide.src} alt={`Rückblick ${i + 1}`} className="w-full h-[400px] object-cover rounded-3xl" loading="lazy" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
