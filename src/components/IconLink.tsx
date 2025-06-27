'use client';

import Link from 'next/link';
import { 
  SiGithub, 
  SiDiscord, 
  SiX, 
  SiGmail,
  SiSteam
} from '@icons-pack/react-simple-icons';

interface IconLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export default function IconLink({ href, icon, label, className = '' }: IconLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`text-black dark:text-white hover:opacity-70 transition-opacity duration-300 hover:scale-110 ${className}`}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </Link>
  );
}

export function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiGithub size={props.className?.includes('w-6') ? 24 : 25} title="GitHub" className="hover:text-[#181717] dark:hover:text-white" {...props} />;
}

export function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiDiscord size={props.className?.includes('w-6') ? 24 : 25} title="Discord" className="hover:text-[#5865F2]" {...props} />;
}

export function SteamIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiSteam size={props.className?.includes('w-6') ? 24 : 25} title="Steam" className="hover:text-[#1b2838]" {...props} />;
}

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiX size={props.className?.includes('w-6') ? 24 : 25} title="X" className="hover:text-[#181717] dark:hover:text-white" {...props} />;
}

export function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiGmail size={props.className?.includes('w-6') ? 24 : 25} title="Email" className="hover:text-[#EA4335]" {...props} />;
} 