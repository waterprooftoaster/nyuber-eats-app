import { supabase } from '@/utils/supabase'

export type NearbyRestaurant = Readonly<{
  id: string
  school_id: string
  name: string
  image_url: string | null
  address: string
  delivery_time_label: string | null
  is_active: boolean
  latitude: number | null
  longitude: number | null
  created_at: string
  updated_at: string
}>

const MAX_RADIUS_KM = 50

/**
 * Returns active restaurants within `radiusKm` of the given coordinates,
 * ordered by distance (closest first).
 */
export async function getNearbyRestaurants(
  lat: number,
  lng: number,
  radiusKm: number
): Promise<readonly NearbyRestaurant[]> {
  if (lat < -90 || lat > 90) {
    throw new Error('lat must be between -90 and 90')
  }
  if (lng < -180 || lng > 180) {
    throw new Error('lng must be between -180 and 180')
  }
  if (radiusKm <= 0 || radiusKm > MAX_RADIUS_KM) {
    throw new Error(`radiusKm must be between 0 and ${MAX_RADIUS_KM}`)
  }

  const { data, error } = await supabase.rpc('find_nearby_restaurants', {
    user_lat: lat,
    user_lng: lng,
    radius_km: radiusKm,
  })

  if (error) {
    throw new Error(`find_nearby_restaurants failed: ${error.message}`)
  }

  return (data ?? []) as readonly NearbyRestaurant[]
}
