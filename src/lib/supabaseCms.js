const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '')
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const cmsConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

const SESSION_KEY = 'davidel_admin_session'

function headers(token, extra = {}) {
  return {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${token || SUPABASE_ANON_KEY}`,
    ...extra,
  }
}

async function parse(res) {
  if (res.ok) {
    const text = await res.text()
    return text ? JSON.parse(text) : null
  }
  let message = `Erreur ${res.status}`
  try {
    const body = await res.json()
    message = body?.msg || body?.message || body?.error_description || body?.error || message
  } catch {}
  throw new Error(message)
}

export function getAdminSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

export function clearAdminSession() {
  localStorage.removeItem(SESSION_KEY)
}

export async function signInAdmin(email, password) {
  if (!cmsConfigured) throw new Error('Supabase n’est pas encore configuré.')
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: headers(null, { 'Content-Type': 'application/json' }),
    body: JSON.stringify({ email, password }),
  })
  const session = await parse(res)
  const token = session?.access_token
  if (!token) throw new Error('Connexion impossible.')

  const check = await fetch(`${SUPABASE_URL}/rest/v1/admin_users?user_id=eq.${encodeURIComponent(session.user.id)}&select=user_id`, {
    headers: headers(token),
  })
  const rows = await parse(check)
  if (!rows?.length) throw new Error('Ce compte n’a pas les droits administrateur DAVIDEL.')

  const safe = {
    access_token: session.access_token,
    refresh_token: session.refresh_token,
    expires_at: session.expires_at,
    user: { id: session.user.id, email: session.user.email },
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe))
  return safe
}

export async function signOutAdmin() {
  const session = getAdminSession()
  try {
    if (session?.access_token) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: headers(session.access_token),
      })
    }
  } catch {}
  clearAdminSession()
}

async function rest(path, { method = 'GET', token, body, prefer } = {}) {
  if (!cmsConfigured) throw new Error('Supabase n’est pas encore configuré.')
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: headers(token, {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(prefer ? { Prefer: prefer } : {}),
    }),
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
  return parse(res)
}

export function publicProducts() {
  return rest('products?active=eq.true&select=*&order=position.asc', {})
}

export function adminProducts(token) {
  return rest('products?select=*&order=position.asc', { token })
}

export function saveProduct(token, product) {
  const payload = {
    name_fr: product.name_fr,
    name_he: product.name_he,
    description_fr: product.description_fr || '',
    description_he: product.description_he || '',
    price: Number(product.price || 0),
    image_url: product.image_url || '',
    active: Boolean(product.active),
    unavailable_label: Boolean(product.unavailable_label),
    position: Number(product.position || 0),
    tags: Array.isArray(product.tags) ? product.tags : [],
  }
  if (product.id) {
    return rest(`products?id=eq.${encodeURIComponent(product.id)}`, {
      method: 'PATCH', token, body: payload, prefer: 'return=representation',
    })
  }
  return rest('products', {
    method: 'POST', token, body: payload, prefer: 'return=representation',
  })
}

export function deleteProduct(token, id) {
  return rest(`products?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE', token })
}

export function adminCategories(token) {
  return rest('categories?select=*&order=position.asc', { token })
}

export function saveCategory(token, category) {
  const payload = {
    name_fr: category.name_fr,
    name_he: category.name_he,
    slug: category.slug,
    position: Number(category.position || 0),
    active: Boolean(category.active),
  }
  if (category.id) return rest(`categories?id=eq.${category.id}`, { method: 'PATCH', token, body: payload, prefer: 'return=representation' })
  return rest('categories', { method: 'POST', token, body: payload, prefer: 'return=representation' })
}

export function adminOccasions(token) {
  return rest('occasions?select=*&order=position.asc', { token })
}

export function saveOccasion(token, occasion) {
  const payload = {
    name_fr: occasion.name_fr,
    name_he: occasion.name_he,
    description_fr: occasion.description_fr || '',
    description_he: occasion.description_he || '',
    image_url: occasion.image_url || '',
    active: Boolean(occasion.active),
    position: Number(occasion.position || 0),
  }
  if (occasion.id) return rest(`occasions?id=eq.${occasion.id}`, { method: 'PATCH', token, body: payload, prefer: 'return=representation' })
  return rest('occasions', { method: 'POST', token, body: payload, prefer: 'return=representation' })
}

export async function getSettings(token) {
  const rows = await rest('settings?id=eq.1&select=*', { token })
  return rows?.[0] || null
}

export function saveSettings(token, settings) {
  return rest('settings?id=eq.1', { method: 'PATCH', token, body: settings, prefer: 'return=representation' })
}

export async function uploadCmsImage(token, file, folder = 'products') {
  if (!file) throw new Error('Aucune image sélectionnée.')
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Format accepté : JPG, PNG ou WEBP.')
  const clean = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, '-')
  const objectPath = `${folder}/${Date.now()}-${clean}`
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/davidel-media/${objectPath}`, {
    method: 'POST',
    headers: headers(token, { 'Content-Type': file.type, 'x-upsert': 'true' }),
    body: file,
  })
  await parse(res)
  return `${SUPABASE_URL}/storage/v1/object/public/davidel-media/${objectPath}`
}
