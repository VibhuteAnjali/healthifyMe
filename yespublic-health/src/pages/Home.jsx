import content from '../data/content.json'
import Hero from '../components/Hero'
import SectionGrid from '../components/SectionGrid'

export default function Home() {
	const { home } = content
	return (
		<>
			<Hero options={home.heroOptions} />
			<SectionGrid title={home.recentBlogs.title} variant="articles" items={home.recentBlogs.items} />
			<SectionGrid title={home.fitnessPosts.title} variant="articles" items={home.fitnessPosts.items} />
			<SectionGrid title={home.wellnessPosts.title} variant="articles" items={home.wellnessPosts.items} />
			<SectionGrid title={home.recipes.title} variant="recipes" items={home.recipes.items} />
		</>
	)
}