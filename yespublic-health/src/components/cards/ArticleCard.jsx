export default function ArticleCard({ item }) {
	return (
		<article className="card">
			<div className="card-media" aria-hidden>
				<div className="media-placeholder">{item.category || 'Article'}</div>
			</div>
			<div className="card-body">
				<h3 className="card-title">{item.title}</h3>
				<p className="card-text">{item.excerpt}</p>
			</div>
		</article>
	)
}