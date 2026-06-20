'use client';

import Link from 'next/link';
import { 
  SiGithub, 
  SiDiscord, 
  SiX, 
  SiInstagram,
} from '@icons-pack/react-simple-icons';
import { Globe } from 'lucide-react';

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
      className={`relative group flex items-center justify-center text-black dark:text-white transition-transform duration-300 hover:scale-110 ${className}`}
    >
      <span className="transition-opacity duration-300 group-hover:opacity-75 flex items-center justify-center">
        {icon}
      </span>
      <span className="sr-only">{label}</span>
      <span className="absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900/90 backdrop-blur-md text-[11px] font-medium text-white rounded-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg translate-y-1 group-hover:translate-y-0">
        {label}
      </span>
    </Link>
  );
}

export function GitHubIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiGithub size={props.className?.includes('w-6') ? 24 : 25} title="GitHub" className="transition-colors duration-300 group-hover:text-[#181717] dark:group-hover:text-white" {...props} />;
}

export function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiDiscord size={props.className?.includes('w-6') ? 24 : 25} title="Discord" className="transition-colors duration-300 group-hover:text-[#5865F2]" {...props} />;
}

export function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiInstagram size={props.className?.includes('w-6') ? 24 : 25} title="Instagram" className="transition-colors duration-300 group-hover:text-[#e1306c]" {...props} />;
}

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return <SiX size={props.className?.includes('w-6') ? 24 : 25} title="X" className="transition-colors duration-300 group-hover:text-black dark:group-hover:text-white" {...props} />;
}

export function PortofolioIcon(props: React.SVGProps<SVGSVGElement>) {
  return <Globe size={props.className?.includes('w-6') ? 24 : 25} title="Portofolio" className="transition-colors duration-300 group-hover:text-blue-500" {...(props as any)} />;
} 