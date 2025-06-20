'use client';

import { useEffect, useRef } from 'react';

export default function SoundEffect() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/audio/click.ogg');

    const playSound = () => {
      if (audioRef.current && !isPlayingRef.current) {
        isPlayingRef.current = true;

        audioRef.current.currentTime = 0;
        audioRef.current.play()
          .catch(err => {
            console.error('Error playing sound:', err);
          })
          .finally(() => {
            setTimeout(() => {
              isPlayingRef.current = false;
            }, 50);
          });
      }
    };

    const clickableSelectors = 'a, button, [role="button"], input[type="submit"], input[type="button"], input[type="checkbox"], input[type="radio"], .clickable, [data-clickable="true"], div[onClick], span[onClick]';
    
    const handleClick = (e: Event) => {
      playSound();
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return null;
}

export function useSoundEffect() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isPlayingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio('/audio/click.ogg');
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = () => {
    if (audioRef.current && !isPlayingRef.current) {
      isPlayingRef.current = true;
      audioRef.current.currentTime = 0;
      audioRef.current.play()
        .catch(err => {
          console.error('Error playing sound:', err);
        })
        .finally(() => {
          setTimeout(() => {
            isPlayingRef.current = false;
          }, 50);
        });
    }
  };

  return { playSound };
}

interface ClickableProps {
  onClick?: (event: React.MouseEvent) => void;
}

export function withSoundEffect<P extends ClickableProps>(Component: React.ComponentType<P>) {
  return function WithSoundEffect(props: P) {
    const { playSound } = useSoundEffect();
    
    return (
      <Component 
        {...props} 
        onClick={(e: React.MouseEvent) => {
          playSound();
          
          if (props.onClick) {
            props.onClick(e);
          }
        }} 
      />
    );
  };
} 