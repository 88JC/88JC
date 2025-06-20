"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ProfileAvatarProps {
	imageUrl?: string;
	fallbackInitials?: string;
	size?: number;
	className?: string;
	priority?: boolean;
}

export default function ProfileAvatar({
	imageUrl,
	fallbackInitials = "kydo",
	size = 120,
	className = "",
	priority = true,
}: ProfileAvatarProps) {
	const [imgError, setImgError] = useState(!imageUrl);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		if (!imageUrl) {
			setIsLoaded(true);
		}
	}, [imageUrl]);

	const handleImgError = () => {
		setImgError(true);
		setIsLoaded(true);
	};

	const handleImgLoad = () => {
		setIsLoaded(true);
	};

	return (
		<div
			className={`relative rounded-full overflow-hidden flex items-center justify-center ${className}`}
			style={{ width: size, height: size }}
		>
			{!imgError ? (
				<>
					{!isLoaded && (
						<div className="absolute inset-0 w-full h-full bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
					)}
					{imageUrl && (
						<Image
							src={imageUrl}
							alt="Profile Avatar"
							width={size}
							height={size}
							className={`object-cover ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
							onError={handleImgError}
							onLoad={handleImgLoad}
							priority={priority}
						/>
					)}
				</>
			) : (
				<div
					className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium"
					style={{ fontSize: size * 0.4 }}
				>
					{fallbackInitials}
				</div>
			)}
		</div>
	);
}
