"use client";

import SkillsScroll from "./SkillsScroll";
import TechStackGrid from "./TechStackGrid";

export default function Skills(): JSX.Element {
  return (
    <div id="skills" className="space-y-0">
      <TechStackGrid />
      <SkillsScroll />
    </div>
  );
}

