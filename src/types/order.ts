import { Product } from './product'

export type Order = {
  id: number
  user_id: number
  user_code: string
  user_name: string
  created_at: string
  pickup_date: string
  pickup_hour: string
  active: boolean
  products: Product[]
}
