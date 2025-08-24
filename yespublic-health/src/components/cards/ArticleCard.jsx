import { useState } from 'react'

export default function ArticleCard({ item }) {
	const [imageError, setImageError] = useState(false)
	const hasImage = !!item.image && !imageError
	return (
		<a className="card" href={item.url || '#'} target="_blank" rel="noopener noreferrer">
			<div className="card-media" aria-hidden>
				{hasImage ? (
					<img src={item.image} alt={item.title} onError={() => setImageError(true)} />
				) : (
					<div className="media-placeholder">{item.category || 'Article'}</div>
				)}
			</div>
			<div className="card-body">
				<h3 className="card-title">{item.title}</h3>
				<p className="card-text">{item.excerpt}</p>
			</div>
		</a>
	)
}