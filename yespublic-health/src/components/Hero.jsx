import { useState } from 'react'

export default function Hero({ options = [] }) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const option = options[selectedIndex] || { headline: '', subline: '' }

	return (
		<header className="hero">
			<div className="container">
				<div className="hero-tabs">
					{options.map((opt, idx) => (
						<button
							key={idx}
							className={idx === selectedIndex ? 'tab active' : 'tab'}
							onClick={() => setSelectedIndex(idx)}
						>
							Option {idx + 1}
						</button>
					))}
				</div>
				<h1 className="hero-title">{option.headline}</h1>
				<p className="hero-subtitle">{option.subline}</p>
			</div>
		</header>
	)
}