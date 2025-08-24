import content from '../data/content.json'

export function Subscribe() {
	return (
		<section className="section">
			<div className="container narrow">
				<h2>{content.subscribe.header}</h2>
				<ul>
					{content.subscribe.benefits.map((b, idx) => (
						<li key={idx}>✅ {b}</li>
					))}
				</ul>
				<form className="subscribe-form" onSubmit={(e) => e.preventDefault()}>
					<input type="email" placeholder="Enter your email" required />
					<button className="btn" type="submit">Subscribe</button>
				</form>
			</div>
		</section>
	)
}

export function Unsubscribe() {
	return (
		<section className="section">
			<div className="container narrow">
				<h2>Unsubscribe</h2>
				<p>{content.subscribe.unsubscribe.message}</p>
				<a className="btn" href="/subscribe">{content.subscribe.unsubscribe.cta}</a>
			</div>
		</section>
	)
}