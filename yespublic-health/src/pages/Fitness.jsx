import content from '../data/content.json'
import SectionGrid from '../components/SectionGrid'

export default function Fitness() {
	const { fitnessPosts } = content.home
	return <SectionGrid title={fitnessPosts.title} variant="bullets" items={fitnessPosts.items} />
}