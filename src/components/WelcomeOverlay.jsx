import { useRef } from "react";

export const WelcomeOverlay = ({ onFinish }) => {
  const overlayRef = useRef();

  const handleClick = () => {
    const tl = gsap.timeline({ onComplete: onFinish });

    tl.set([".split-panel-left", ".split-panel-right"], { x: 0, zIndex: 100 });

    tl.to(".split-panel-left", {
      x: "-100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, 0);

    tl.to(".split-panel-right", {
      x: "100%",
      duration: 1.2,
      ease: "power4.inOut",
    }, 0);

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 0.6);
  };

  return (
    <>
      {/* Split exit panels */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div className="fixed top-0 left-0 w-1/2 h-full bg-[#e5f0ff] split-panel-left" />
        <div className="fixed top-0 right-0 w-1/2 h-full bg-[#e5f0ff] split-panel-right" />
      </div>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center text-center px-6 backdrop-blur-xl bg-[#e5f0ff]/70 text-black"
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl sm:text-5xl font-semibold font-sackers tracking-wide">
            S❋léa's New Arrivals
          </h1>

          <p className="text-sm sm:text-base text-[#555] max-w-sm leading-relaxed">
            See what’s new in our curated lookbook — eyewear that turns heads.<br />
            Use your mouse or arrow keys to flip through the styles.
          </p>

          <button
            onClick={handleClick}
            className="mt-2 px-6 py-2 text-sm font-semibold uppercase tracking-wider bg-black text-white hover:bg-[#2d2d2d] transition-all duration-300 rounded-full shadow-md"
          >
            Take a peek
          </button>
        </div>
      </div>
    </>
  );
};
