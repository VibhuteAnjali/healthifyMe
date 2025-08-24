import { useState } from 'react'

export default function RecipeCard({ item }) {
	const [open, setOpen] = useState(false)
	return (
		<article className="card recipe">
			<div className="card-body">
				<h3 className="card-title"><img className="recipe-thumb" src="" alt="recipe" aria-hidden />{item.title}</h3>
				<p className="card-meta">Servings: {item.servings}</p>
				<button className="btn small" onClick={() => setOpen((v) => !v)}>
					{open ? 'Hide details' : 'View details'}
				</button>
				{open && (
					<div className="recipe-details">
						<h4>Ingredients</h4>
						<ul>
							{item.ingredients?.map((ing, idx) => (
								<li key={idx}>{ing}</li>
							))}
						</ul>
						{item.dressing && (
							<>
								<h4>{item.dressing.name}</h4>
								<ul>
									{item.dressing.ingredients.map((ing, idx) => (
										<li key={idx}>{ing}</li>
									))}
								</ul>
							</>
						)}
						<h4>Instructions</h4>
						<ol>
							{item.instructions?.map((step, idx) => (
								<li key={idx}>{step}</li>
							))}
						</ol>
						{item.optional && item.optional.length > 0 && (
							<>
								<h4>Optional Add-ons</h4>
								<ul>
									{item.optional.map((opt, idx) => (
										<li key={idx}>{opt}</li>
									))}
								</ul>
							</>
						)}
					</div>
				)}
			</div>
		</article>
	)
}
