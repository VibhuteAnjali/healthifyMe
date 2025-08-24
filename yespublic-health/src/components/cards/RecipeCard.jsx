import { useState } from 'react'

export default function RecipeCard({ item }) {
  const [open, setOpen] = useState(false)

  return (
    <article className="card recipe">
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">
            <img className="recipe-thumb" src={item.image} alt={item.title} />
            {item.title}
          </h3>
          <button
            className="btn small"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
          >
            {open ? 'Hide details' : 'View details'}
          </button>
        </div>

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
