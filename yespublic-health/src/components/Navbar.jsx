import { NavLink } from 'react-router-dom'
import content from '../data/content.json'

const routeMap = {
	'Home': '/',
	'Blogs': '/blogs',
	'Diet': '/diet',
	'Fitness': '/fitness',
	'About Us': '/about'
}

export default function Navbar() {
	return (
		<nav className="nav">
			<div className="nav-inner container">
				<div className="brand">Yespublic</div>
				<ul className="nav-links">
					{content.nav.map((label) => (
						<li key={label}>
							<NavLink to={routeMap[label]} className={({ isActive }) => isActive ? 'active' : undefined}>
								{label}
							</NavLink>
						</li>
					))}
				</ul>
				<div className="nav-actions">
					<a className="btn" href="/subscribe">Subscribe</a>
				</div>
			</div>
		</nav>
	)
}