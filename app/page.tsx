"use client";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
  }
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-8 text-white">
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ repeat: Infinity, repeatType: "mirror", duration: 28, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at center, black 10%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(circle at center, black 10%, transparent 72%)"
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(0,82,255,0.12),transparent_45%)]" />

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center"
      >
        <motion.h1
          variants={item}
          animate={{ y: [0, -4, 0] }}
          transition={{ y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
          className="text-[18vw] font-black uppercase tracking-[-0.08em] leading-[0.85] sm:text-[14vw] md:text-[11rem]"
        >
          DEV STUDIO
        </motion.h1>

        <motion.p variants={item} className="mt-8 max-w-2xl text-sm text-white/90 sm:text-base md:text-lg">
          We build the web. You build the business.
        </motion.p>

        <motion.p variants={item} className="mt-4 text-xs uppercase tracking-[0.4em] text-gray sm:text-sm">
          Launching Soon
        </motion.p>

        <motion.a
          variants={item}
          whileHover={{ y: -2, scale: 1.02, boxShadow: "0 0 0 1px rgba(255,255,255,0.2), 0 20px 50px rgba(0,82,255,0.42)" }}
          whileTap={{ scale: 0.98 }}
          href="mailto:hello@devstudio.com"
          className="mt-10 rounded-full bg-accent px-7 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-300 hover:bg-[#1D66FF]"
        >
          Contact Us
        </motion.a>
      </motion.section>

      <footer className="absolute bottom-8 left-8 z-10 text-xs uppercase tracking-[0.24em] text-gray sm:text-sm">
        <p>Dev Studio</p>
        <p className="mt-1">Pune, India</p>
      </footer>
    </main>
  );
}
