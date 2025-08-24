import content from '../data/content.json'

export default function Footer() {
	return (
		<footer className="footer">
			<div className="container">
				<div className="cta">
					<h3>Let's get started on something great</h3>
					<p>Join over 4,000+ readers already growing with Yespublic.</p>
					<div className="actions">
						<a className="btn" href="/subscribe">Subscribe</a>
					</div>
				</div>
				<div className="footer-links">
					<a href="/privacy">Privacy Policy</a>
					<a href={content.subscribe.social.instagram} target="_blank" rel="noreferrer">Instagram</a>
				</div>
				<div className="copyright">© 2024 Yespublic Health and Fitness</div>
			</div>
		</footer>
	)
}
