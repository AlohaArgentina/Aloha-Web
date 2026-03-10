"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  tag?: string;
  titleClassName?: string;
  bullets?: string[];
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards = [] }: DisplayCardsProps) {
  const [expanded, setExpanded] = useState<number | null>(null);

  // Desktop: usa índice normal (último = al frente)
  // Mobile: carrusel invertido, arranca en el último (ISPs) que se muestra como "posición 0"
  const lastIndex = cards.length - 1;
  const [mobilePos, setMobilePos] = useState(0); // 0 = ISPs, 1 = Retail, 2 = Tecnología, 3 = Crecimiento
  const [direction, setDirection] = useState(0);

  // Convierte posición mobile (0=ISPs) a índice real del array (invertido)
  const mobileIndexToReal = (pos: number) => lastIndex - pos;
  const activeReal = mobileIndexToReal(mobilePos);

  const goTo = (pos: number) => {
    setDirection(pos > mobilePos ? 1 : -1);
    setMobilePos(pos);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number } }) => {
    if (info.offset.x < -50) {
      goTo((mobilePos + 1) % cards.length);
    } else if (info.offset.x > 50) {
      goTo((mobilePos - 1 + cards.length) % cards.length);
    }
  };

  return (
    <div className="w-full">

      {/* ═══════════════════════════
          MOBILE — swipe carrusel
          ═══════════════════════════ */}
      <div className="md:hidden w-full">
        <div
          className="relative flex items-center justify-center overflow-hidden"
          style={{ minHeight: "180px" }}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={mobilePos}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 60 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -60 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              onClick={() => setExpanded(activeReal)}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex flex-col justify-between cursor-grab active:cursor-grabbing select-none",
                "w-[min(20rem,82vw)] h-40 -skew-y-[8deg]",
                "rounded-xl border-2 bg-card/90 backdrop-blur-sm px-5 py-4",
                "shadow-md ring-1 ring-primary/20",
                mobilePos === 0 ? "border-primary/40" : "border-border",
              )}
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="inline-block rounded-full bg-primary/10 p-1.5 flex-shrink-0">
                  {cards[activeReal].icon}
                </span>
                <p className={cn("text-base font-display font-semibold truncate", cards[activeReal].titleClassName)}>
                  {cards[activeReal].title}
                </p>
              </div>
              <p className="text-sm text-foreground/70 line-clamp-2">
                {cards[activeReal].description}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                {cards[activeReal].tag}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots — posición 0 es ISPs */}
        <div className="flex justify-center gap-1.5 mt-4">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                "rounded-full transition-all duration-300",
                i === mobilePos
                  ? "w-4 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-border"
              )}
            />
          ))}
        </div>

        {/* Modal mobile */}
        <AnimatePresence>
          {expanded !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm px-4 pb-6"
              onClick={() => setExpanded(null)}
            >
              <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 60, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted flex items-center justify-center"
                >
                  <X size={13} className="text-muted-foreground" />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {cards[expanded].icon}
                  </span>
                  <h3 className={cn("text-base font-display font-bold leading-tight", cards[expanded].titleClassName)}>
                    {cards[expanded].title}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  {cards[expanded].tag}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                  {cards[expanded].description}
                </p>
                {(cards[expanded].bullets ?? []).length > 0 && (
                  <ul className="space-y-2">
                    {cards[expanded].bullets!.map(b => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════
          DESKTOP — stack diagonal
          ═══════════════════════════ */}
      <div
        className="hidden md:flex relative items-center justify-center"
        style={{ minHeight: "320px", minWidth: "420px" }}
      >
        <motion.div
          animate={{
            opacity: expanded !== null ? 0.12 : 1,
            scale:   expanded !== null ? 0.97  : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ pointerEvents: expanded !== null ? "none" : "auto" }}
          className="grid [grid-template-areas:'stack'] place-items-center"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => setExpanded(index)}
              className={cn(
                "relative flex h-40 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between",
                "rounded-xl border-2 border-border bg-card/80 backdrop-blur-sm px-5 py-4",
                "cursor-pointer overflow-hidden",
                "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[8rem]",
                "after:bg-gradient-to-l after:from-card after:to-transparent after:content-[''] after:pointer-events-none",
                "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
                card.className,
              )}
            >
              <div className="overflow-hidden">
                <span className="relative inline-block rounded-full bg-primary/10 p-1.5 flex-shrink-0">
                  {card.icon}
                </span>
                <p className={cn("text-base font-display font-semibold truncate", card.titleClassName)}>
                  {card.title}
                </p>
              </div>
              <p className="text-sm text-foreground/70 line-clamp-2 block w-full">
                {card.description}
              </p>
              <p className="text-xs text-muted-foreground truncate block w-full">
                {card.tag}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Card expandida desktop */}
        <AnimatePresence>
          {expanded !== null && (
            <motion.div
              key="expanded-desktop"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ zIndex: 10 }}
            >
              <div className="relative bg-card border border-border rounded-2xl p-7 w-[22rem] shadow-2xl shadow-primary/15">
                <button
                  onClick={() => setExpanded(null)}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors"
                >
                  <X size={13} className="text-muted-foreground" />
                </button>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {cards[expanded].icon}
                  </span>
                  <h3 className={cn("text-lg font-display font-bold leading-tight", cards[expanded].titleClassName)}>
                    {cards[expanded].title}
                  </h3>
                </div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {cards[expanded].tag}
                </p>
                <p className="text-sm text-foreground/75 leading-relaxed mb-4">
                  {cards[expanded].description}
                </p>
                {(cards[expanded].bullets ?? []).length > 0 && (
                  <ul className="space-y-2">
                    {cards[expanded].bullets!.map((b, i) => (
                      <motion.li
                        key={b}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                        {b}
                      </motion.li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}