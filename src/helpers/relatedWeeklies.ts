import { getCollection, type CollectionEntry } from "astro:content"

export async function getRelatedWeeklies(weekly: CollectionEntry<"weeklies">, count = 3) {
	// removing the current weekly here makes sure a weekly never recommends itself
	const otherWeeklies = await getCollection("weeklies", (w) => w.slug !== weekly.slug)

	const related: CollectionEntry<"weeklies">[] = []
	const relatedSlugs = new Set<string>()
	
	// check the markdown first, we can hard-code related weeklies
	for (const slug of weekly.data.related) {
		const entry = otherWeeklies.find((w) => w.slug === slug)

		if (entry) {
			related.push(entry)
			relatedSlugs.add(slug)
		}
	}

	// if necessary, grab more by the same author
	if (related.length < count) {
		for (const entry of otherWeeklies) {
			// check for duplicates
			if (relatedSlugs.has(entry.slug)) {
				continue
			}

			if (entry.data.author.url === weekly.data.author.url) {
				related.push(entry)
				relatedSlugs.add(entry.slug)
			}
		}
	}

	// finally, grab weeklies from the same category
	if (related.length < count) {
		for (const entry of otherWeeklies) {
			// check for duplicates
			if (relatedSlugs.has(entry.slug)) {
				continue
			}

			if (entry.data.categories.some((c) => weekly.data.categories.includes(c))) {
				related.push(entry)
				relatedSlugs.add(entry.slug)
			}
		}
	}

	return related.slice(0, count)
}
