export type PropertyType = 'Estate' | 'Penthouse' | 'Townhouse' | 'Condominium'

export type Property = {
  id: string
  title: string
  neighborhood: string
  address: string
  price: number
  beds: number
  baths: number
  area: number
  type: PropertyType
  image: string
  imageAlt: string
  featured?: boolean
}

export type Neighborhood = {
  name: string
  number: string
  blurb: string
  averagePrice: string
  image: string
  imageAlt: string
}

export type Stat = {
  value: number
  suffix: string
  label: string
}

export type Testimonial = {
  quote: string
  name: string
  detail: string
}
