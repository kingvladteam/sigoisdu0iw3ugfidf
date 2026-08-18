import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "article" | "header" | "h1" | "h2" | "h3" | "p" | "span" | "li";
};

export function Reveal({ children, className, delay = 0, y = 24, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = Tag as any;
  return (
    <Component
      ref={ref as any}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: "500ms",
        transform: visible ? "translateY(0)" : `translateY(${y}px)`,
        opacity: visible ? 1 : 0,
      }}
      className={cn(
        "transition-all ease-out will-change-transform",
        className,
      )}
    >
      {children}
    </Component>
  );
}
