import { DeckShell } from "@/components/layout/DeckShell";
import { MagneticCursor } from "@/components/primitives/MagneticCursor";
import { Slide01Cover } from "@/components/slides/Slide01Cover";
import { Slide02Stack } from "@/components/slides/Slide02Stack";
import { Slide03Folders } from "@/components/slides/Slide03Folders";
import { Slide04Flow } from "@/components/slides/Slide04Flow";
import { Slide05Gpu } from "@/components/slides/Slide05Gpu";
import { Slide06Web } from "@/components/slides/Slide06Web";
import { Slide07Gdpr } from "@/components/slides/Slide07Gdpr";
import { Slide08Dictionary } from "@/components/slides/Slide08Dictionary";
import { Slide09Compare } from "@/components/slides/Slide09Compare";
import { Slide10Timeline } from "@/components/slides/Slide10Timeline";
import { Slide11Features } from "@/components/slides/Slide11Features";
import { Slide12Future } from "@/components/slides/Slide12Future";

export default function Home() {
  return (
    <>
      <MagneticCursor />
      <DeckShell>
        <Slide01Cover />
        <Slide02Stack />
        <Slide03Folders />
        <Slide04Flow />
        <Slide05Gpu />
        <Slide06Web />
        <Slide07Gdpr />
        <Slide08Dictionary />
        <Slide09Compare />
        <Slide10Timeline />
        <Slide11Features />
        <Slide12Future />
      </DeckShell>
    </>
  );
}
