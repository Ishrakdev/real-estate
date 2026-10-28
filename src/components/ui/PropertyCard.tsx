import type { Property } from '../../types'

type PropertyCardProps = {
  property: Property
  index: number
  featured?: boolean
}

export function PropertyCard({ property, index, featured = false }: PropertyCardProps) {
  return (
    <article className={`property-card ${featured ? 'property-card--featured' : ''}`}>
      <a className="property-card-image" href="#contact" data-cursor="view">
        <img src={property.image} alt={property.imageAlt} loading={featured && index === 0 ? 'eager' : 'lazy'} />
        <span className="property-card-index mono">{String(index + 1).padStart(2, '0')} / 06</span>
        <span className="property-card-view">View residence <span aria-hidden="true">↗</span></span>
      </a>
      <div className="property-card-copy">
        <div className="property-card-heading">
          <div>
            <h3>{property.title}</h3>
            <p>{property.neighborhood}</p>
          </div>
          <span className="property-price mono">${(property.price / 1_000_000).toFixed(2)}M</span>
        </div>
        <div className="property-specs mono">
          <span>{property.beds} BEDROOMS</span>
          <span>{property.baths} BATHS</span>
          <span>{property.area.toLocaleString()} SQ FT</span>
        </div>
      </div>
    </article>
  )
}
