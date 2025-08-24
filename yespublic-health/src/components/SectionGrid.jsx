import ArticleCard from './cards/ArticleCard'
import BulletedCard from './cards/BulletedCard'
import RecipeCard from './cards/RecipeCard'

export default function SectionGrid({ title, variant = 'articles', items = [], bullets = [] }) {
	return (
		<section className="section">
			<div className="container">
				<h2 className="section-title">{title}</h2>
				{variant === 'articles' && (
					<div className="grid grid-3">
						{items.map((item) => (
							<ArticleCard key={item.id} item={item} />
						))}
					</div>
				)}
				{variant === 'bullets' && (
					<div className="grid grid-3">
						{items.map((item) => (
							<BulletedCard key={item.id} item={item} />
						))}
					</div>
				)}
				{variant === 'list' && (
					<ul className="bullet-list">
						{bullets.map((line, idx) => (
							<li key={idx}>{line}</li>
						))}
					</ul>
				)}
				{variant === 'recipes' && (
					<div className="grid grid-3">
						{items.map((item) => (
							<RecipeCard key={item.id} item={item} />
						))}
					</div>
				)}
			</div>
		</section>
	)
}