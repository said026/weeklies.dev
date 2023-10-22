import { defineCollection } from "astro:content"
import { z } from "zod"

export const IntegrationCategories = new Map<string, string>([
	["featured", "Featured"],
	["recent", "Recently Added"],
	["official", "Official"],
	["frameworks", "Frameworks"],
	["adapters", "Adapters"],
	["css+ui", "CSS + UI"],
	["performance+seo", "Performance + SEO"],
	["analytics", "Analytics"],
	["accessibility", "Accessibility"],
])

export const WeeklyCategories = new Map<string, string>([
	["featured", "Featured"],
	["recent", "Recently Added"],
	["official", "Official"],
	["blog", "Blog"],
	["landing-page", "Landing Page"],
	["portfolio", "Portfolio"],
	["ecommerce", "E-commerce"],
	["docs", "Docs"],
	["minimal", "Minimal"],
	["other", "Other"],
])

export const WeeklyTools = new Map<string, string>([
	["alpinejs", "Alpine.js"],
	["graphql", "GraphQL"],
	["java", "Java"],
	["javascript", "Javascript"],
	["lit", "Lit"],
	["llvm", "LLVM"],
	["mdx", "MDX"],
	["postcss", "PostCSS"],
	["preact", "Preact"],
	["react", "React"],
	["rust", "Rust"],
	["sass", "SASS"],
	["solidjs", "SolidJS"],
	["springboot", "Spring boot"],
	["svelte", "Svelte"],
	["tailwind", "Tailwind"],
	["typescript", "TypeScript"],
	["vue", "Vue"],
])

export const weeklySchema = z
	.object({
		title: z.string().min(1),
		description: z.string().min(1),
		fullDescription: z.string().optional(),
		image: z.string(),
		images: z.array(z.string()).default([]),
		author: z.object({
			url: z.string(),
			name: z.string(),
			avatar: z.string(),
		}),
		categories: z.array(z.enum(Array.from(WeeklyCategories.keys()) as [string, ...string[]])),
		repoUrl: z.string().url().optional(),
		demoUrl: z.string().url().optional(),
		buyUrl: z.string().url().optional(),
		links: z
			.array(
				z.object({
					href: z.string().url(),
					text: z.string(),
				}),
			)
			.default([]),
		stars: z.number().min(0).default(0),
		featured: z.number().min(1).optional(),
		tools: z.array(z.enum(Array.from(WeeklyTools.keys()) as [string, ...string[]])).default([]),
		related: z.array(z.string()).max(3).default([]),
		publishDate: z.date({ coerce: true }).optional(),
		badge: z.string().optional(),
	})
	.transform((weekly) => {
		// computed properties
		return {
			...weekly,
			official: weekly.categories.includes("official"),
			paid: !!weekly.buyUrl,
		}
	})

const seoSchema = z.object({
	title: z.string().min(5).max(120),
	description: z.string().min(15).max(160),
	image: z
		.object({
			src: z.string().default("/og/social.jpg"),
			alt: z.string().default("Build the web you want"),
		})
		.default({}),
	pageType: z.enum(["website", "article"]).default("website"),
	robots: z
		.object({
			index: z.boolean().default(true),
			follow: z.boolean().default(true),
		})
		.default({}),
})

export const collections = {
	authors: defineCollection({
		schema: z.object({
			image: z.string().optional(),
			name: z.string(),
			title: z.string().optional(),
			twitter: z.string().optional(),
			mastodon: z.string().optional(),
		}),
	}),
	blog: defineCollection({
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			authors: z.array(z.string()),
			socialImage: z.string().optional(),
			coverImage: z.string().optional(),
			lang: z.enum(["en"]).default("en"),
		}),
	}),
	careers: defineCollection({
		schema: z.object({
			title: z.string().min(1).describe("Title of the job position"),
			published: z.date().describe("Date the job listing was posted"),
			location: z
				.string()
				.min(1)
				.describe("Location of the job position (eg: 'Remote' or 'San Fransisco, CA'"),
			team: z.enum(["Engineering", "UI", "DX"]),
			type: z.enum(["Full Time", "Part Time", "Contract", "Internship"]),
			image: z
				.object({
					src: z.string().default("/og/social.jpg"),
					alt: z.string().default("Astro | Build the web you want"),
				})
				.default({}),
		}),
	}),
	integrations: {
		schema: z.object({
			name: z.string().describe("Name of the package as it is published to NPM"),
			title: z
				.string()
				.describe("Title of the integration as it should be shown in the Integrations catalog"),
			description: z.string().optional(),
			image: z.string().optional(),
			categories: z.array(
				z.enum(Array.from(IntegrationCategories.keys()) as [string, ...string[]]),
			),
			repoUrl: z.string().url().optional(),
			npmUrl: z.string().url(),
			homepageUrl: z.string().url().optional(),
			official: z.boolean().default(false),
			featured: z.number().min(1).optional(),
			downloads: z.number().min(0).default(0),
			badge: z.string().optional(),
		}),
	},
	pages: {
		schema: z.object({
			seo: seoSchema,
			updated_date: z.date().describe("The date this content was last updated."),
			locale: z.enum(["en"]).default("en"),
		}),
	},
	partials: {
		schema: z.object({}),
	},
	weeklies: {
		schema: weeklySchema,
	},
}
