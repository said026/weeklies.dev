export type SocialLink = {
	platform: string
	href: string
	me?: string
	text: string
	icon: string
	footerOnly?: boolean
}

export type SiteInfo = {
	name: string
	title: string
	description: string
	image: {
		src: string
		alt: string
	}
	socialLinks: SocialLink[]
}

const siteInfo: SiteInfo = {
	name: "weeklies.dev | your go-to hub for developer weeklies",
	title: "Your go-to hub for developer weeklies",
	description:
		"Dive into a curated collection of weeklies covering a wide spectrum of developer languages, frameworks, and technologies.",
	image: {
		src: "/og/social.jpg",
		alt: "Build the web you want",
	},
	socialLinks: [
		// {
		// 	platform: "github",
		// 	href: "https://github.com/withastro/astro",
		// 	me: "https://github.com/withastro/",
		// 	text: "Go to Astro's GitHub repo",
		// 	icon: "social/github",
		// },
		{
			platform: "discord",
			href: "https://discord.gg/5jZ6zEap",
			text: "Join the weeklies.dev community on Discord",
			icon: "social/discord",
		},
		{
			platform: "twitter",
			href: "https://twitter.com/weekliesdev",
			me: "https://twitter.com/weekliesdev",
			text: "Follow weeklies.dev on Twitter",
			icon: "social/twitter",
		},
		// {
		// 	platform: "mastodon",
		// 	href: "https://m.webtoo.ls/@astro",
		// 	me: "https://m.webtoo.ls/@astro",
		// 	text: "Follow Astro on Mastodon",
		// 	footerOnly: true,
		// 	icon: "social/mastodon",
		// },
	],
}

export default siteInfo
