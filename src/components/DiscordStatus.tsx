"use client";

import { useEffect, useState, useRef } from "react";

interface DiscordStatusData {
	discord_status: string;
	status_color: string;
	status_text: string;
	discord_avatar: string;
	avatar_decoration: string | null;
	discord_username: string;
	custom_status: string | null;
	current_application: string | null;
}

const placeholderData: DiscordStatusData = {
	discord_status: "offline",
	status_color: "bg-gray-500",
	status_text: "offline",
	discord_avatar: "",
	avatar_decoration: null,
	discord_username: "jcvy",
	custom_status: null,
	current_application: null,
};

export default function DiscordStatus() {
	const [status, setStatus] = useState<DiscordStatusData>(placeholderData);
	const [, setIsLoaded] = useState(false);
	const mountedRef = useRef(false);

	useEffect(() => {
		mountedRef.current = true;

		const fetchDiscordStatus = async () => {
			try {
				const response = await fetch("/lanyard/discord");
				if (!response.ok) {
					throw new Error("Failed to fetch Discord status");
				}
				const data = await response.json();

				console.log("Discord status data:", data);

				if (mountedRef.current) {
					setStatus(data);
					setIsLoaded(true);
				}
			} catch (err) {
				console.error("Error fetching Discord status:", err);
				if (mountedRef.current) {
					setIsLoaded(true);
				}
			}
		};

		fetchDiscordStatus();

		const interval = setInterval(fetchDiscordStatus, 30000);

		return () => {
			mountedRef.current = false;
			clearInterval(interval);
		};
	}, []);

	useEffect(() => {
		console.log(
			"Current status:",
			status.discord_status,
			"Text status:",
			status.status_text,
		);
	}, [status]);

	const renderStatusIcon = () => {
		const statusValue = status.status_text.toLowerCase();
		console.log("Rendering status icon for:", statusValue);

		switch (statusValue) {
			case "online":
				return (
					<div className="relative group">
						<div className="w-4 h-4 rounded-full bg-[#3ba55c] transition-all duration-300 ease-in-out hover:scale-110 animate-pulse-slow shadow-md shadow-[#3ba55c]/30"></div>
						<span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
							Online
						</span>
					</div>
				);
			case "idle":
				return (
					<div className="relative group">
						<div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110">
							<div className="absolute w-4 h-4 rounded-full bg-[#faa61a] shadow-md shadow-[#faa61a]/30"></div>
							<div className="absolute w-2 h-2 bg-[#2b2b2b] rounded-full top-0 right-0"></div>
						</div>
						<span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
							Idle
						</span>
					</div>
				);
			case "dnd":
				return (
					<div className="relative group">
						<div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110">
							<div className="absolute w-4 h-4 rounded-full bg-[#ed4245] shadow-md shadow-[#ed4245]/30"></div>
							<div className="absolute w-2.5 h-[2px] bg-[#2b2b2b] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
						</div>
						<span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
							Do Not Disturb
						</span>
					</div>
				);
			case "streaming":
				return (
					<div className="relative group">
						<div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110">
							<div className="absolute w-4 h-4 rounded-full bg-[#5865f2] animate-pulse-gentle shadow-md shadow-[#5865f2]/30"></div>
							<output className="sr-only">Streaming</output>
							<div className="absolute w-0 h-0 border-solid border-[3px] border-transparent border-l-white top-1/2 left-[9px] transform -translate-x-1/2 -translate-y-1/2"></div>
						</div>
						<span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
							Streaming
						</span>
					</div>
				);
			default:
				return (
					<div className="relative group">
						<div className="relative w-4 h-4 transition-all duration-300 ease-in-out hover:scale-110">
							<div className="absolute w-4 h-4 rounded-full bg-[#747f8d] shadow-md shadow-[#747f8d]/20"></div>
							<div className="absolute w-2 h-2 rounded-full bg-[#2b2b2b] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
						</div>
						<span className="absolute -top-8 left-1/2 -translate-x-1/2 p-1 px-2 bg-black/80 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 whitespace-nowrap">
							Offline
						</span>
					</div>
				);
		}
	};

	return (
		<div className="inline-flex items-center gap-3 min-w-[60px] min-h-[28px] transition-opacity duration-300">
			{renderStatusIcon()}
			<span className="text-lg opacity-70 transition-opacity duration-300 hover:opacity-100">
				{status.status_text}
			</span>
			{status.custom_status && (
				<span className="text-lg opacity-70 transition-opacity duration-300 hover:opacity-100">
					- {status.custom_status}
				</span>
			)}
		</div>
	);
}
