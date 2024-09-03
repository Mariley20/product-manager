export interface IProductCategory {
  id: string
  name: string
  position: number
}
export interface IProduct {
  id: string
  name: string
  description: string
  price: number
  discounted_price: number | null
  code: string
  photo_url: string
  position: number
  category_id: string
  category: IProductCategory
}