import type { LucideIcon } from "lucide-react";
import { Award, Medal, Star, Trophy } from "lucide-react";

export type Achievement = {
  id: string;
  name: string;
  event: string;
  result: string;
  icon: LucideIcon;
};

export const achievements: Achievement[] = [
  {
    id: "code-apex",
    name: "Code Apex 2.0",
    event: "National Coding Competition",
    result: "Winning Agentic AI Track",
    icon: Trophy
  },
  {
    id: "sih",
    name: "Smart India Hackathon",
    event: "Government of India Hackathon",
    result: "Winning Team",
    icon: Medal
  },
  {
    id: "cavista",
    name: "Cavista Technologies Hackathon",
    event: "Healthcare Tech Hackathon",
    result: "Second Runners Up — EMR 2.0",
    icon: Award
  },
  {
    id: "impetus",
    name: "PICT IMPETUS Project Expo",
    event: "Project Exhibition",
    result: "Runners Up",
    icon: Star
  },
  {
    id: "samayvidya",
    name: "SamayVidya",
    event: "VIT Pune CSE-AI Department",
    result: "Official Department Tool",
    icon: Medal
  },
  {
    id: "devforge",
    name: "DevForge npm Publish",
    event: "Open Source",
    result: "Published Package",
    icon: Star
  },
  {
    id: "project-competition",
    name: "ADYPSOEP Project Competition",
    event: "National Polytechnic Level Project Competition",
    result: "Runners Up",
    icon: Trophy
  }
];
