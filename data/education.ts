export type EducationEntry = {
  id: string;
  degree: string;
  institute: string;
  score: string;
  duration: string;
  active?: boolean;
};

export const education: EducationEntry[] = [
  {
    id: "btech",
    degree: "B.Tech — Computer Science & Engineering (AI)",
    institute: "Vishwakarma Institute of Technology, Pune",
    score: "CGPA 9.52",
    duration: "2023 — Present",
    active: true
  },
  {
    id: "diploma",
    degree: "Diploma — Computer Engineering",
    institute: "Government Polytechnic, Pune",
    score: "93.27%",
    duration: "2020 — 2023"
  }
];
