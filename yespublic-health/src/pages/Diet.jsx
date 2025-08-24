import content from '../data/content.json'
import SectionGrid from '../components/SectionGrid'

export default function Diet() {
	const { recipes, wellnessPosts } = content.home
	return (
		<>
			<SectionGrid title={recipes.title} variant="recipes" items={recipes.items} />
			<SectionGrid title={wellnessPosts.title} variant="list" bullets={wellnessPosts.bullets} />
		</>
	)
}