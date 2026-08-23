import confetti from "canvas-confetti";
import { soundFx } from "./soundFx";

export const triggerRakhiConfetti = () => {
  soundFx.playConfettiPop();

  // Vibrant festive Rakhi colors: gold, crimson, saffron, emerald, royal pink
  const festiveColors = ["#D32F2F", "#D4AF37", "#F59E0B", "#10B981", "#EC4899", "#8B5CF6"];

  // Side cannons
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.7 },
    colors: festiveColors,
    scalar: 1.2,
  });

  confetti({
    particleCount: 80,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.7 },
    colors: festiveColors,
    scalar: 1.2,
  });

  // Center star explosion after short delay
  setTimeout(() => {
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#FFE600", "#FF4081"],
      shapes: ["star", "circle"],
      scalar: 1.4,
    });
  }, 250);
};

export const triggerSmallCelebration = (x: number = 0.5, y: number = 0.5) => {
  confetti({
    particleCount: 35,
    spread: 50,
    origin: { x, y },
    colors: ["#D32F2F", "#F59E0B", "#10B981", "#EC4899"],
    scalar: 0.9,
    disableForReducedMotion: true,
  });
};
