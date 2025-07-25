import { atom, useAtom } from "jotai";
import { useEffect, useState } from "react";

// ------------------ DATA ------------------ //
const pictures = [
  "DSC02013",  "DSC01112", "DSC00681", "DSC01111","DSC00933", "DSC01103", 
  "DSC01123", "DSC01971",
];

// ------------------ ATOMS ------------------ //
export const pageAtom = atom(1);
export const showFrontAtom = atom(true);

// ------------------ PAGE CONSTRUCTION ------------------ //
export const pages = [
  {
    front: "book-cover",
    back: pictures[0],
  },
];

const productPictures = pictures.slice(1);
for (let i = 0; i < productPictures.length; i += 2) {
  pages.push({
    front: productPictures[i],
    back: productPictures[i + 1] || "book-back",
  });
}

// ------------------ AUDIO PLAYER ------------------ //
const AudioPlayer = ({ muted, toggleMute }) => {
  return (
    <div className="pointer-events-auto mr-4 -mt-3">
      <img
        src={muted ? "/images/muted.png" : "/images/volume.png"}
        alt="Volume Control"
        onClick={toggleMute}
        className="w-4 h-4 cursor-pointer hover:opacity-60"
      />
    </div>
  );
};

// ------------------ MAIN UI COMPONENT ------------------ //
export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [showFront, setShowFront] = useAtom(showFrontAtom);
  const [muted, setMuted] = useState(false);
  const [audio] = useState(() => new Audio("/audios/le_mans.mp3"));
  const [showTutorial, setShowTutorial] = useState(true);

  // Play audio immediately when the component mounts or when music is unmuted
  useEffect(() => {
    audio.loop = true;
    audio.muted = muted;
    audio.play()
      .then(() => {
        console.log("Audio is playing and should loop.");
      })
      .catch((err) => {
        console.error("Audio play error:", err);
      });

    return () => {
      audio.pause();
      console.log("Audio stopped.");
    };
  }, [audio, muted]);

  useEffect(() => {
    audio.muted = muted;
  }, [muted]);

  const toggleMute = () => setMuted((prev) => !prev);

  // Play audio when an arrow key is pressed or when a button is clicked
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Play audio on first key press
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (audio.paused) {
          audio.play(); // Start audio on key press
        }
        if (e.key === "ArrowLeft") {
          setPage((prev) => Math.max(prev - 1, 0));
        } else if (e.key === "ArrowRight") {
          setPage((prev) => Math.min(prev + 1, pages.length));
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [audio, setPage]);

  // Trigger audio on button click (whether mouse or keyboard)
  const handleButtonClick = (index) => {
    if (audio.paused) {
      audio.play(); // Start audio on button click
    }
    setPage(index); // Update page when button is clicked
  };

  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000); // show for 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <main className="pointer-events-none select-none z-10 fixed inset-0 flex flex-col justify-between w-full h-full">

        {/* Top Navigation Bar */}
        <div className="
          flex flex-row items-center justify-between flex-nowrap w-full px-2 md:px-10 py-3 gap-4 pointer-events-auto text-[#000000]
          "
        >

          {/* Left: Nav Links */}
          <div className="
            flex items-center gap-6 text-xs font-sackers font-semibold flex-1
            justify-center md:justify-start
          ">
            <div className="cursor-pointer opacity-90 hover:opacity-100 uppercase transition">explore</div>
            <div className="cursor-pointer opacity-90 hover:opacity-100 uppercase transition">collections</div>
            <div className="cursor-pointer opacity-90 hover:opacity-100 uppercase transition">about</div>
          </div>

          {/* Center: Brand Symbol with passive tooltip */}
          <div className="relative flex-1 text-center hidden md:block">
            <div className="text-4xl tracking-widest select-none font-['Times_New_Roman',serif] font-medium">
              ❋
            </div>
          </div>

          {/* Right: Icons */}
          {/* Hide volume icon on top right on mobile */}
          <div className="hidden md:flex items-center justify-end gap-4 font-sackers font-semibold tracking-wide uppercase flex-1">
            <div className="text-xs tracking-normal opacity-90 hover:opacity-100 cursor-pointer w-[90px] text-left">
              <p onClick={toggleMute}>{muted ? "[vol : off]" : "[vol : on]"}</p>
            </div>
          </div>

        </div>
      </main>

      {/* Volume toggle bottom right on mobile */}
      <div className="fixed bottom-4 right-4 md:hidden z-20 pointer-events-auto">
        <p 
          onClick={toggleMute} 
          className="text-xs font-sackers font-semibold uppercase tracking-wide cursor-pointer opacity-90 hover:opacity-100 select-none"
        >
          {muted ? "[vol : off]" : "[vol : on]"}
        </p>
      </div>

      {/* Scrolling text background */}
      <div className="fixed inset-0 flex items-center -rotate-2 select-none overflow-hidden z-0">
        <div className="w-full relative">
          <div className="flex w-max gap-8 animate-scroll whitespace-nowrap px-8">
            {Array(12).fill("NEW IN -").map((text, i) => (
              <h2
                key={i}
                className="shrink-0 text-[#000000] text-8xl font-thin font-sackers"
              >
                {text}
              </h2>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
