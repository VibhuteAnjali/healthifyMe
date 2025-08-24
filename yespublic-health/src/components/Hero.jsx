import { useState, useEffect } from 'react'

export default function Hero({ options = [] }) {
	const [selectedIndex, setSelectedIndex] = useState(0)
	const option = options[selectedIndex] || { headline: '', subline: '' }

	useEffect(() => {
		if (!options || options.length === 0) return
		const intervalId = setInterval(() => {
			setSelectedIndex((prev) => (prev + 1) % options.length)
		}, 10000)
		return () => clearInterval(intervalId)
	}, [options])

	return (
		<header className="hero">
			<div className="container">
				<h1 className="hero-title">{option.headline}</h1>
				<p className="hero-subtitle">{option.subline}</p>
			</div>
		</header>
	)
}