
import React from "react";

const video = "/videos/video-output-F6994C4C-29EF-4334-B941-73F965C2365B-1.mp4";

export default function RueckblickVideo() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h2 className="text-3xl md:text-4xl font-bold font-[Rajdhani] uppercase text-center mb-10 bg-gradient-to-r from-fuchsia-400 via-yellow-400 to-fuchsia-500 bg-clip-text text-transparent tracking-wider">
        Rückblick Illuminate & Connect
      </h2>
      <div className="flex items-center justify-center rounded-2xl overflow-hidden shadow-lg bg-black/60">
        <video src={video} controls className="w-full h-full object-cover max-h-96" />
      </div>
    </section>
  );
}
