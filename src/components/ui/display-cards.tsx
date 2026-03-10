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

  return (
    <div className="relative flex items-center justify-center"
      style={{ minHeight: "320px", minWidth: "min(420px, 90vw)" }}
    >

      {/* ── STACK — siempre montado, se opaca al expandir ── */}
      <motion.div
        animate={{
          opacity: expanded !== null ? 0.12 : 1,
          scale:   expanded !== null ? 0.97  : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: expanded !== null ? "none" : "auto" }}
        // grid-area:stack es lo que apila todas las cards en el mismo lugar
        className="grid [grid-template-areas:'stack'] place-items-center"
      >
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => setExpanded(index)}
            className={cn(
              // base — igual al componente original
              "relative flex h-40 w-[22rem] -skew-y-[8deg] select-none flex-col justify-between",
              "rounded-xl border-2 border-border bg-card/80 backdrop-blur-sm px-5 py-4",
              "cursor-pointer overflow-hidden",
              "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
              // fade lateral
              "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[8rem]",
              "after:bg-gradient-to-l after:from-card after:to-transparent after:content-[''] after:pointer-events-none",
              "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
              // mobile: ancho responsivo
              "w-[min(22rem,80vw)]",
              // className de cada card (translate, grayscale, hover, before overlay)
              card.className,
            )}
          >
            {/* Fila 1: ícono + título */}
            <div className="overflow-hidden">
              <span className="relative inline-block rounded-full bg-primary/10 p-1.5 flex-shrink-0">
                {card.icon}
              </span>
              <p className={cn("text-base font-display font-semibold truncate", card.titleClassName)}>
                {card.title}
              </p>
            </div>

            {/* Fila 2: descripción */}
            <p className="text-sm text-foreground/70 line-clamp-2 block w-full">
              {card.description}
            </p>

            {/* Fila 3: tag */}
            <p className="text-xs text-muted-foreground truncate block w-full">
              {card.tag}
            </p>
          </div>
        ))}
      </motion.div>

      {/* ── EXPANDIDA desktop: flota encima del stack ── */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            key="expanded-desktop"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 hidden md:flex items-center justify-center"
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

      {/* ── EXPANDIDA mobile: sube desde abajo ── */}
      <AnimatePresence>
        {expanded !== null && (
          <motion.div
            key="expanded-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm px-4 pb-6 md:hidden"
            onClick={() => setExpanded(null)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
              onClick={(e) => e.stopPropagation()}
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
                  {cards[expanded].bullets!.map((b) => (
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
  );
}