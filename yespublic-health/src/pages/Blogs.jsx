import content from '../data/content.json'
import SectionGrid from '../components/SectionGrid'

export default function Blogs() {
	const { recentBlogs } = content.home
	return <SectionGrid title={recentBlogs.title} variant="articles" items={recentBlogs.items} />
}