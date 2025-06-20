"use client";

import IconLink, {
	GitHubIcon,
	DiscordIcon,
	XIcon,
	InstagramIcon,
	MailIcon,
} from "@/components/IconLink";
import ProfileAvatar from "@/components/ProfileAvatar";
import DiscordStatus from "@/components/DiscordStatus";
import DiscordAvatar from "@/components/DiscordAvatar";
import { useEffect, useState } from "react";
import { personInfo } from "@/app/info";

const CONFIG = {
	useDiscordAvatar: true,
	decorationInFront: true,
	showStatus: false,
	avatarSize: 190,
	mobileAvatarSize: 150,
};

export default function Home() {
	const [avatarSize, setAvatarSize] = useState(CONFIG.avatarSize);

	useEffect(() => {
		const handleResize = () => {
			setAvatarSize(
				window.innerWidth < 640 ? CONFIG.mobileAvatarSize : CONFIG.avatarSize,
			);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<main className="flex min-h-screen flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-20 bg-white dark:bg-black text-black dark:text-white">
			<div className="w-full max-w-md mx-auto flex flex-col items-center">
				<div className="w-full flex flex-col items-center content-visibility-auto">
					<div
						className="mb-6 sm:mb-10 relative flex items-center justify-center"
						style={{
							height: avatarSize,
							minHeight: avatarSize,
						}}
					>
						{CONFIG.useDiscordAvatar ? (
							<DiscordAvatar
								size={avatarSize}
								showStatus={CONFIG.showStatus}
								decorationInFront={CONFIG.decorationInFront}
								className="mx-auto"
							/>
						) : (
							<ProfileAvatar
								fallbackInitials={personInfo.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
								size={avatarSize}
							/>
						)}
					</div>

					<h1 className="text-4xl sm:text-6xl font-bold mb-2 sm:mb-4 text-center">
						Hey, I&#39;m{" "}
						<span className="text-blue-500">{personInfo.name}</span>!
					</h1>

					<h2 className="text-xl sm:text-3xl mb-4 sm:mb-6 text-white/50 text-center">
						{personInfo.profession}
					</h2>

					<div className="mb-8 sm:mb-16 h-[28px] flex items-center justify-center">
						<DiscordStatus />
					</div>

					<div className="flex flex-wrap gap-6 sm:gap-12 justify-center">
						<IconLink
							href={personInfo.socialLinks.mail}
							icon={<MailIcon />}
							label="Email"
						/>
						<IconLink
							href={personInfo.socialLinks.github}
							icon={<GitHubIcon />}
							label="GitHub"
						/>
						<IconLink
							href={personInfo.socialLinks.discord}
							icon={<DiscordIcon />}
							label="Discord"
						/>
						<IconLink
							href={personInfo.socialLinks.twitter}
							icon={<XIcon />}
							label="X"
						/>
						<IconLink
							href={personInfo.socialLinks.instagram}
							icon={<InstagramIcon />}
							label="Instagram"
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
