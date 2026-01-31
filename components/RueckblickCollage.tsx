import React from "react";

const images = [
  // Beispielhafte Auswahl, du kannst beliebig viele Bilder ergänzen oder sortieren
  "rueckblick_content/pictures/3J7A7976-Verbessert-RR.jpg",
  "rueckblick_content/pictures/3J7A8005-Verbessert-RR.jpg",
  "rueckblick_content/pictures/3J7A8032-Verbessert-RR.jpg",
  "rueckblick_content/pictures/3J7A8133-Verbessert-RR.jpg",
  "rueckblick_content/pictures/3J7A8320-Verbessert-RR.jpg",
  "rueckblick_content/pictures/I&C-4697.jpg",
  "rueckblick_content/pictures/I&C-4726.jpg",
  "rueckblick_content/pictures/I&C-4758.jpg",
  "rueckblick_content/pictures/Werkschauabend_AndreasStephan-01.jpg",
  "rueckblick_content/pictures/Werkschauabend_AndreasStephan-10.jpg"
];

const video = "rueckblick_content/videos/video-output-F6994C4C-29EF-4334-B941-73F965C2365B-1.mov";

export default function RueckblickCollage() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold font-[Rajdhani] uppercase text-center mb-10 bg-gradient-to-r from-fuchsia-400 via-yellow-400 to-fuchsia-500 bg-clip-text text-transparent tracking-wider">
        Rückblick Illuminate & Connect
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <div className="md:col-span-2 row-span-2 flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-black/60">
          <video src={video} controls className="w-full h-full object-cover max-h-96" poster={images[0]} />
        </div>
        {images.slice(0, 5).map((img, i) => (
          <div key={img} className="rounded-2xl overflow-hidden shadow-lg bg-black/60">
            <img src={img} alt={`Rückblick ${i + 1}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
          </div>
        ))}
        {images.slice(5, 10).map((img, i) => (
          <div key={img} className="rounded-2xl overflow-hidden shadow-lg bg-black/60">
            <img src={img} alt={`Rückblick ${i + 6}`} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  );
}
