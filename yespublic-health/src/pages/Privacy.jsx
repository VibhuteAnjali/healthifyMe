import content from '../data/content.json'

export default function Privacy() {
	const { effectiveDate, content: lines } = content.legal.privacyPolicy
	return (
		<section className="section">
			<div className="container">
				<h2>Privacy Policy</h2>
				<p className="muted">Effective Date: {effectiveDate}</p>
				{lines.map((p, idx) => (
					<p key={idx}>{p}</p>
				))}
			</div>
		</section>
	)
}