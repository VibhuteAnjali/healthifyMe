export default function BulletedCard({ item }) {
	return (
		<article className="card">
			<div className="card-body">
				<h3 className="card-title">{item.title}</h3>
				<ul className="bullets">
					{(item.bullets || []).map((line, idx) => (
						<li key={idx}>{line}</li>
					))}
				</ul>
			</div>
		</article>
	)
}