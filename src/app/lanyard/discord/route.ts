import { NextResponse } from "next/server";
import { personInfo } from "@/app/info";

// Define interface for Discord API response
interface LanyardData {
	success: boolean;
	data: {
		discord_status: string;
		active_on_discord_web: boolean;
		active_on_discord_desktop: boolean;
		active_on_discord_mobile: boolean;
		discord_user: {
			avatar: string;
			id: string;
			avatar_decoration_data?: {
				asset: string;
			};
			global_name?: string;
			username: string;
			clan?: {
				identity_guild_id: string;
				badge: string;
				tag: string;
			};
		};
		activities?: Array<{
			type: number;
			name?: string;
			state?: string;
		}>;
		spotify?: {
			timestamps: {
				start: number;
				end: number;
			};
			album: string;
			album_art_url: string;
			artist: string;
			song: string;
			track_id: string;
		};
		listening_to_spotify?: boolean;
	};
}

export async function GET() {
	try {
		const response = await fetch(
			`https://api.lanyard.rest/v1/users/${personInfo.discordId}`,
		);
		const data = (await response.json()) as LanyardData;

		if (data.success === false) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		const getDiscordStatus = (status: string): string => {
			switch (status) {
				case "dnd":
					return "Do Not Disturb";
				case "idle":
					return "Idle";
				case "online":
					return "Online";
				case "offline":
					return "Offline";
				default:
					return status;
			}
		};

		const getStatusColor = (status: string): string => {
			switch (status) {
				case "online":
					return "bg-[#3ba55c]";
				case "idle":
					return "bg-[#faa61a]";
				case "dnd":
					return "bg-[#ed4245]";
				case "streaming":
					return "bg-[#5865f2]";
				default:
					return "bg-[#747f8d]";
			}
		};

		const getStatusText = (status: string): string => {
			return status;
		};

		const isStreaming = data.data.activities?.some(
			(activity) => activity.type === 1,
		);

		let statusForIcon = data.data.discord_status;
		if (isStreaming) {
			statusForIcon = "streaming";
		}

		const status = {
			discord_status: getDiscordStatus(data.data.discord_status),
			status_color: getStatusColor(statusForIcon),
			status_text: getStatusText(statusForIcon),
			active_on_discord_web: Boolean(data.data.active_on_discord_web),
			active_on_discord_desktop: Boolean(data.data.active_on_discord_desktop),
			active_on_discord_mobile: Boolean(data.data.active_on_discord_mobile),
			discord_avatar: `https://cdn.discordapp.com/avatars/${data.data.discord_user.id}/${data.data.discord_user.avatar}.webp?size=512`,
			avatar_decoration: data.data.discord_user.avatar_decoration_data
				? `https://cdn.discordapp.com/avatar-decoration-presets/${data.data.discord_user.avatar_decoration_data.asset}.png`
				: null,
			discord_username:
				data.data.discord_user.global_name || data.data.discord_user.username,
			clan: data.data.discord_user.clan
				? {
						identity_guild_id: data.data.discord_user.clan.identity_guild_id,
						badge: data.data.discord_user.clan.badge,
						tag: data.data.discord_user.clan.tag,
					}
				: null,
			clan_badge: data.data.discord_user.clan?.badge || null,
			clan_tag: data.data.discord_user.clan?.tag || null,
			activities: data.data.activities || [],
			spotify: data.data.spotify || null,
			listening_to_spotify: Boolean(data.data.listening_to_spotify),
			custom_status:
				data.data.activities?.find((activity) => activity.type === 4)?.state ||
				null,
			current_application:
				data.data.activities?.find((activity) => activity.type === 0)?.name ||
				null,
		};

		return NextResponse.json(status);
	} catch (error) {
		console.error("Error fetching Discord status:", error);
		return NextResponse.json(
			{ error: "Failed to fetch Discord status" },
			{ status: 500 },
		);
	}
}
