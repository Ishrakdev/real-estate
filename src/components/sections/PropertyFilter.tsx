import { useEffect, useMemo, useRef, useState } from 'react'
import { properties } from '../../lib/data/properties'
import type { PropertyType } from '../../types'
import { gsap } from '../../lib/gsap'
import { PropertyCard } from '../ui/PropertyCard'

type Filter = 'All' | PropertyType
const filters: Filter[] = ['All', 'Estate', 'Penthouse', 'Townhouse', 'Condominium']

export function PropertyFilter() {
  const [active, setActive] = useState<Filter>('All')
  const grid = useRef<HTMLDivElement>(null)
  const visible = useMemo(
    () => active === 'All' ? properties : properties.filter((property) => property.type === active),
    [active],
  )

  useEffect(() => {
    if (!grid.current) return
    const items = grid.current.querySelectorAll('.property-card')
    gsap.fromTo(items, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' })
  }, [active])

  return (
    <section className="filter-section" id="collection">
      <div className="filter-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" />FIND YOUR PARTICULAR</p>
          <h2>The collection,<br /><em>at a glance.</em></h2>
        </div>
        <p className="section-aside">Every home tells a different story. Begin with the details that matter to you.</p>
      </div>
      <div className="filter-toolbar">
        <div className="filter-chips" role="group" aria-label="Filter residences">
          {filters.map((filter) => (
            <button
              aria-pressed={active === filter}
              className={`filter-chip ${active === filter ? 'filter-chip--active' : ''}`}
              key={filter}
              onClick={() => setActive(filter)}
              type="button"
            >
              {filter === 'All' ? 'All homes' : `${filter}s`}
            </button>
          ))}
        </div>
        <span className="result-count mono">{String(visible.length).padStart(2, '0')} RESIDENCES</span>
      </div>
      <div className="filter-grid" ref={grid}>
        {visible.map((property) => (
          <PropertyCard key={property.id} property={property} index={properties.findIndex((item) => item.id === property.id)} />
        ))}
      </div>
      <a href="#contact" className="text-link filter-all-link">Arrange a private introduction <span aria-hidden="true">↗</span></a>
    </section>
  )
}
