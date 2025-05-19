'use client';

import { useEffect, useState, useRef } from 'react';

interface DiscordAvatarProps {
  size?: number;
  className?: string;
  showStatus?: boolean;
  decorationInFront?: boolean;
}

interface DiscordStatusData {
  discord_status: string;
  status_color: string;
  status_text: string;
  discord_avatar: string;
  avatar_decoration: string | null;
  discord_username: string;
}

const placeholderData: DiscordStatusData = {
  discord_status: 'offline',
  status_color: 'bg-gray-500',
  status_text: 'offline',
  discord_avatar: 'https://cdn.discordapp.com/embed/avatars/0.png',
  avatar_decoration: null,
  discord_username: 'jcvy'
};

export default function DiscordAvatar({
  size = 120,
  className = '',
  showStatus = false,
  decorationInFront = true,
}: DiscordAvatarProps) {
  const [data, setData] = useState<DiscordStatusData>(placeholderData);
  const [loading, setLoading] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch('/lanyard/discord');
        if (!response.ok) {
          throw new Error('Failed to fetch Discord status');
        }
        
        const discordData = await response.json();
        
        if (mountedRef.current) {
          setData(discordData);
        }
      } catch (err) {
        console.error('Error fetching Discord avatar:', err);
      }
    };

    fetchDiscordStatus();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const statusDotSize = Math.max(4, size * 0.15);
  const borderSize = Math.max(2, size * 0.015);
  
  const decorationConfig = decorationInFront
    ? {
        padding: Math.max(2, size * 0.02),
        scale: 1.0,
        insetTopBottom: `-${size * 0.02}px`,
        insetLeftRight: `-${size * 0.02}px`,
        filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.12))',
        animationClass: 'float-animation'
      }
    : {
        padding: Math.max(10, size * 0.1),
        scale: 1.20,
        insetTopBottom: `-${size * 0.08}px`,
        insetLeftRight: `-${size * 0.08}px`,
        filter: 'none',
        animationClass: 'pulse-animation'
      };

  return (
    <div 
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 overflow-hidden rounded-full"
          style={{ 
            zIndex: decorationInFront ? 10 : 20,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={data.discord_avatar}
            alt={`Discord avatar`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        
        {data.avatar_decoration && (
          <div 
            className="absolute flex items-center justify-center overflow-visible"
            style={{ 
              zIndex: decorationInFront ? 20 : 10,
              top: decorationConfig.insetTopBottom,
              right: decorationConfig.insetLeftRight,
              bottom: decorationConfig.insetTopBottom,
              left: decorationConfig.insetLeftRight,
              transform: `scale(${decorationConfig.scale})`,
              filter: decorationConfig.filter,
              pointerEvents: 'none',
            }}
          >
            <img
              src={data.avatar_decoration}
              alt="Avatar decoration"
              className={`w-full h-full object-contain ${decorationConfig.animationClass}`}
            />
          </div>
        )}
        
        {showStatus && (
          <span
            className={`absolute bottom-[2%] right-[2%] rounded-full border-solid ${data.status_color}`}
            aria-label={data.discord_status}
            style={{
              width: statusDotSize,
              height: statusDotSize,
              borderWidth: borderSize,
              borderColor: 'white',
              zIndex: 30,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            }}
          ></span>
        )}
      </div>
    </div>
  );
} 