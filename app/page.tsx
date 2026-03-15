"use client";

import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

type Theme = "dark" | "light";

type CardItem = {
  title: string;
  hint: string;
  visual: ReactNode;
  xFactor: number;
  yFactor: number;
};

const container = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const teaserCards: CardItem[] = [
  {
    title: "Private Alpha Concepts",
    hint: "UI directions currently in exploration.",
    xFactor: 0.35,
    yFactor: 0.6,
    visual: (
      <div className="relative rounded-xl border border-current/10 p-4">
        <div className="grid grid-cols-6 gap-1.5 opacity-80 blur-[0.6px]">
          {Array.from({ length: 18 }).map((_, index) => (
            <span key={index} className="h-5 rounded-sm bg-current/20" />
          ))}
        </div>
        <div className="absolute inset-x-5 bottom-5 h-8 rounded-lg bg-current/20 blur-lg" />
      </div>
    )
  },
  {
    title: "Systems in Motion",
    hint: "Interaction prototypes under active iteration.",
    xFactor: 0.6,
    yFactor: 0.35,
    visual: (
      <div className="space-y-3 rounded-xl border border-current/10 p-4">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-current/50">
          <span>Build Signal</span>
          <span>Live</span>
        </div>
        <div className="space-y-2 blur-[0.8px]">
          <div className="h-2 w-full rounded-full bg-current/20" />
          <div className="h-2 w-5/6 rounded-full bg-current/25" />
          <div className="h-2 w-2/3 rounded-full bg-current/30" />
        </div>
        <div className="h-px w-full bg-current/15" />
        <div className="h-9 rounded-md bg-current/15 blur-[0.8px]" />
      </div>
    )
  },
  {
    title: "Performance Blueprint",
    hint: "Launch architecture is being refined.",
    xFactor: -0.35,
    yFactor: 0.6,
    visual: (
      <div className="space-y-3 rounded-xl border border-current/10 p-4">
        <div className="flex gap-1.5">
          {[35, 50, 65, 80, 92].map((height) => (
            <div key={height} className="w-4 rounded bg-current/30 blur-[0.4px]" style={{ height: `${height}px` }} />
          ))}
        </div>
        <div className="h-px w-full bg-current/20" />
        <div className="grid grid-cols-4 gap-1.5 opacity-80 blur-[0.8px]">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="h-4 rounded-sm bg-current/15" />
          ))}
        </div>
      </div>
    )
  }
];

function TeaserCard({
  card,
  index,
  isDark,
  springX,
  springY
}: {
  card: CardItem;
  index: number;
  isDark: boolean;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
}) {
  const x = useTransform(springX, (value) => value * card.xFactor);
  const y = useTransform(springY, (value) => value * card.yFactor);

  return (
    <motion.article
      style={{ x, y }}
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border p-4 backdrop-blur-sm transition-colors duration-300 sm:p-5 ${
        isDark
          ? "border-white/10 bg-white/5 shadow-[0_12px_30px_rgba(0,0,0,0.3)]"
          : "border-black/10 bg-black/[0.03] shadow-[0_12px_28px_rgba(0,0,0,0.1)]"
      }`}
    >
      <motion.div
        initial={{ opacity: 0.65, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 * index }}
        className="min-h-36"
      >
        {card.visual}
      </motion.div>
      <p className={`mt-4 text-sm font-semibold ${isDark ? "text-white/90" : "text-black/85"}`}>{card.title}</p>
      <p className={`mt-1 text-xs ${isDark ? "text-white/55" : "text-black/55"}`}>{card.hint}</p>
    </motion.article>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<Theme>("dark");
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, { stiffness: 40, damping: 18, mass: 0.4 });
  const springY = useSpring(parallaxY, { stiffness: 40, damping: 18, mass: 0.4 });

  useEffect(() => {
    const saved = window.localStorage.getItem("theme");
    const nextTheme: Theme = saved === "light" ? "light" : "dark";
    setTheme(nextTheme);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <main
      className={`relative min-h-screen overflow-hidden px-6 py-8 transition-colors duration-500 sm:px-8 ${
        isDark ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 32, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          opacity: isDark ? 0.06 : 0.08,
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(circle at center, black 5%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 5%, transparent 70%)"
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 35%, rgba(0,82,255,0.18), transparent 34%), radial-gradient(circle at 20% 90%, rgba(0,82,255,0.08), transparent 38%)"
        }}
      />

      <div className="noise-overlay pointer-events-none absolute inset-0" />

      <motion.button
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
        className={`absolute right-6 top-6 z-20 rounded-full border p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent sm:right-8 sm:top-8 ${
          isDark ? "border-white/20 bg-white/5" : "border-black/20 bg-black/5"
        }`}
        aria-label="Toggle color theme"
      >
        <span className="text-base leading-none">{isDark ? "☀" : "☾"}</span>
      </motion.button>

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center pt-16 text-center sm:pt-20"
      >
        <motion.h1
          variants={item}
          initial={{ letterSpacing: "-0.02em" }}
          animate={{ letterSpacing: ["-0.02em", "-0.05em", "-0.04em"], y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="text-[19vw] font-extrabold uppercase leading-[0.82] sm:text-[15vw] md:text-[8.4rem] lg:text-[10.4rem]"
        >
          DEV STUDIO
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-2xl text-sm sm:text-base md:text-lg">
          We build the web. You build the business.
        </motion.p>

        <motion.p
          variants={item}
          className={`mt-4 text-xs uppercase tracking-[0.4em] sm:text-sm ${isDark ? "text-gray" : "text-black/60"}`}
        >
          Launching Soon
        </motion.p>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onMouseMove={(event) => {
          const { currentTarget, clientX, clientY } = event;
          const rect = currentTarget.getBoundingClientRect();
          const offsetX = ((clientX - rect.left) / rect.width - 0.5) * 20;
          const offsetY = ((clientY - rect.top) / rect.height - 0.5) * 20;
          parallaxX.set(offsetX);
          parallaxY.set(offsetY);
        }}
        onMouseLeave={() => {
          parallaxX.set(0);
          parallaxY.set(0);
        }}
        className="relative z-10 mx-auto mt-14 grid w-full max-w-6xl gap-5 pb-28 sm:grid-cols-3 sm:gap-6"
      >
        {teaserCards.map((card, index) => (
          <TeaserCard
            key={card.title}
            card={card}
            index={index}
            isDark={isDark}
            springX={springX}
            springY={springY}
          />
        ))}
      </motion.section>

      <footer
        className={`absolute bottom-8 left-6 z-10 text-xs uppercase tracking-[0.24em] sm:left-8 sm:text-sm ${
          isDark ? "text-gray" : "text-black/60"
        }`}
      >
        <p>Dev Studio</p>
        <p className="mt-1">Pune, India</p>
      </footer>
    </main>
  );
}
