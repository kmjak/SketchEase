"use client";

import useCookie from "@/hooks/cookie/useCookie";
import useProject from "@/hooks/project/useProject";
import { useState } from "react";
import ExitModal from "./components/ExitModal";
import ShowCanvas from "./components/ShowCanvas";
import OptionButtons from "./components/OptionButtons";

export default function Page() {
  const [ModalState, setModalState] = useState<boolean>(false);
  const { setCookie } = useCookie();
  const { project, handleSave, color, setColor, handleMouseUp, mode, setMode, handleMouseDown, handleMouseEnter } = useProject();

  const handleExit = async () => {
    setModalState(true);
  }

  return (
    <main>
      <section
        className="flex flex-col items-start space-y-4 justify-end"
        onMouseUp={handleMouseUp}
      >
        <ShowCanvas
          project={project!}
          handleMouseDown={handleMouseDown}
          handleMouseEnter={handleMouseEnter}
        />
        <OptionButtons
          mode={mode}
          setMode={setMode}
          color={color}
          setColor={setColor}
          handleSave={handleSave}
          handleExit={handleExit}
        />
      </section>
      {ModalState && (
        <ExitModal
          save={handleSave}
          setModalState={setModalState}
          setCookie={setCookie}
        />
      )}
    </main>
  );
}