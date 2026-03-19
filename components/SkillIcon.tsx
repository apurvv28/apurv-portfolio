import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiPostgresql,
  SiMongodb,
  SiLangchain,
  SiTailwindcss,
  SiGithub,
  SiTensorflow,
  SiPytorch,
  SiPandas,
  SiCplusplus,
  SiSpringboot,
  SiFastapi,
  SiMysql,
} from "react-icons/si";
import { FaFire, FaUsers, FaAws, FaBrain, FaRegHandshake, FaLightbulb, FaComments, FaSync, FaGoogle, FaJava } from "react-icons/fa";

interface SkillIconProps {
  iconType: string;
  size?: number;
  className?: string;
}

export default function SkillIcon({ iconType, size = 32, className = "" }: SkillIconProps) {
  const iconMap: { [key: string]: JSX.Element } = {
    react: <SiReact size={size} className={className} />,
    nextjs: <SiNextdotjs size={size} className={className} />,
    typescript: <SiTypescript size={size} className={className} />,
    nodejs: <SiNodedotjs size={size} className={className} />,
    python: <SiPython size={size} className={className} />,
    langgraph: <SiLangchain size={size} className={className} />,
    crewai: <FaUsers size={size} className={className} />,
    docker: <SiDocker size={size} className={className} />,
    aws: <FaAws size={size} className={className} />,
    gcp: <FaGoogle size={size} className={className} />,
    postgresql: <SiPostgresql size={size} className={className} />,
    mongodb: <SiMongodb size={size} className={className} />,
    github: <SiGithub size={size} className={className} />,
    tailwind: <SiTailwindcss size={size} className={className} />,
    genai: <FaLightbulb size={size} className={className} />,
    sklearn: <FaBrain size={size} className={className} />,
    pandas: <SiPandas size={size} className={className} />,
    tensorflow: <SiTensorflow size={size} className={className} />,
    pytorch: <SiPytorch size={size} className={className} />,
    cpp: <SiCplusplus size={size} className={className} />,
    java: <FaJava size={size} className={className} />,
    springboot: <SiSpringboot size={size} className={className} />,
    fastapi: <SiFastapi size={size} className={className} />,
    mysql: <SiMysql size={size} className={className} />,
    // Soft Skills
    leadership: <FaUsers size={size} className={className} />,
    thinking: <FaBrain size={size} className={className} />,
    teamwork: <FaRegHandshake size={size} className={className} />,
    solving: <FaLightbulb size={size} className={className} />,
    comm: <FaComments size={size} className={className} />,
    adapt: <FaSync size={size} className={className} />,
  };

  return iconMap[iconType] || <FaFire size={size} className={className} />;
}

