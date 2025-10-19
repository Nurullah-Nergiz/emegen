"use client";

import { useCallback, useRef, useState } from "react";

export default function PostSlider({ items = [], aspectRatio = "16/9", baseUrl = "http://cdn.emegen.com.tr" }) {
   const [active, setActive] = useState(0);
   const touchStartX = useRef(0);
   const touchDeltaX = useRef(0);

   const resolveSrc = (url) => (url?.startsWith("http") ? url : `${baseUrl}${url?.startsWith("/") ? "" : "/"}${url}`);
   const slides = items.filter((it) => it?.type?.startsWith("image"));
   const len = slides.length;

   const next = useCallback(() => {
      if (!len) return;
      setActive((i) => (i + 1) % len);
   }, [len]);

   const prev = useCallback(() => {
      if (!len) return;
      setActive((i) => (i - 1 + len) % len);
   }, [len]);

   if (!len) {
      return null;
   }

   return (
      <div
         className="relative overflow-hidden rounded-xl bg-slate-900"
         onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
            touchDeltaX.current = 0;
         }}
         onTouchMove={(e) => {
            touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
         }}
         onTouchEnd={() => {
            const dx = touchDeltaX.current;
            if (dx > 50) prev();
            else if (dx < -50) next();
            touchStartX.current = 0;
            touchDeltaX.current = 0;
         }}>
         <div
            className="flex w-full transition-transform duration-[400ms] ease-out"
            style={{
               transform: `translateX(-${active * 100}%)`,
               willChange: "transform",
            }}>
            {slides.map((item, idx) => (
               <div
                  key={item?._id ?? item?.url ?? idx}
                  className="relative min-w-full bg-slate-950"
                  style={{ aspectRatio }}>
                  {item.href ? (
                     <a
                        href={item.href}
                        className="block h-full w-full"
                        aria-label={item.title ?? `Slide ${idx + 1}`}>
                        <img
                           className="h-full w-full object-cover"
                           src={resolveSrc(item.url)}
                           alt={item.title ?? `Slide ${idx + 1}`}
                        />
                     </a>
                  ) : (
                     <div className="block h-full w-full">
                        <img
                           className="h-full w-full object-cover"
                           src={resolveSrc(item.url)}
                           alt={item.title ?? `Slide ${idx + 1}`}
                        />
                     </div>
                  )}
                  {(item.title || item.subtitle) && (
                     <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white">
                        {item.title && (
                           <h3 className="m-0 text-[1.1rem] font-bold">
                              {item.title}
                           </h3>
                        )}
                        {item.subtitle && (
                           <p className="mt-1 opacity-90">
                              {item.subtitle}
                           </p>
                        )}
                     </div>
                  )}
               </div>
            ))}
         </div>

         {len > 1 && (
            <>
               <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-slate-900/35 text-white backdrop-blur hover:border-white/60 hover:bg-slate-900/60"
                  onClick={prev}
                  aria-label="Previous slide">
                  ‹
               </button>
               <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-slate-900/35 text-white backdrop-blur hover:border-white/60 hover:bg-slate-900/60"
                  onClick={next}
                  aria-label="Next slide">
                  ›
               </button>

               <div
                  className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5 px-2"
                  role="tablist"
                  aria-label="Slider pagination">
                  {slides.map((_, i) => (
                     <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-2 rounded-full transition-[width] duration-200 ${
                           i === active ? "w-[18px] bg-white" : "w-2 bg-white/45"
                        }`}
                        aria-label={`Go to slide ${i + 1}`}
                        aria-current={i === active}
                     />
                  ))}
               </div>
            </>
         )}
      </div>
   );
}
