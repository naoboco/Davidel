import { useEffect, useMemo, useState } from 'react'
import {
  Eye, EyeOff, LogOut, Package, Image as ImageIcon, Tags, Settings,
  ExternalLink, Plus, Pencil, Trash2, Copy, Upload, Save, X, Menu as MenuIcon,
  LayoutDashboard, Search, CheckCircle2, AlertTriangle, GripVertical
} from 'lucide-react'
import { PRODUCTS as LOCAL_PRODUCTS, FILTERS as LOCAL_FILTERS } from '../data/menuData'
import { OCCASIONS as LOCAL_OCCASIONS, CONTACT, img } from '../data/siteData'
import {
  cmsConfigured, signInAdmin, signOutAdmin, getAdminSession,
  adminProducts, saveProduct, deleteProduct, adminCategories, saveCategory,
  adminOccasions, saveOccasion, getSettings, saveSettings, uploadCmsImage
} from '../lib/supabaseCms'
import '../styles/admin.css'

const TAGS = [
  ['individuel', 'Individuel'], ['grand', 'Grand format'], ['sale', 'Salé'],
  ['sucre', 'Sucré'], ['evenement', 'Événement']
]

const navItems = [
  ['dashboard', 'Tableau de bord', LayoutDashboard],
  ['products', 'Menu / Produits', Package],
  ['images', 'Images', ImageIcon],
  ['categories', 'Catégories', Tags],
  ['occasions', 'Occasions', LayoutDashboard],
  ['settings', 'Informations DAVIDEL', Settings],
]

function localProducts() {
  return LOCAL_PRODUCTS.map((p, i) => ({
    id: p.id,
    name_fr: p.fr,
    name_he: p.he,
    description_fr: p.descFr,
    description_he: p.descHe,
    price: p.price,
    image_url: img(p.img),
    active: true,
    unavailable_label: false,
    position: i + 1,
    tags: p.tags,
  }))
}

function localCategories() {
  return LOCAL_FILTERS.filter(x => x.id !== 'tout').map((c, i) => ({
    id: c.id, name_fr: c.fr, name_he: c.he, slug: c.id, active: true, position: i + 1,
  }))
}

function localOccasions() {
  return LOCAL_OCCASIONS.map((o, i) => ({
    id: o.id, name_fr: o.fr, name_he: o.he,
    description_fr: o.lineFr, description_he: o.lineHe,
    image_url: img(o.img), active: true, position: i + 1,
  }))
}

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const session = await signInAdmin(email.trim(), password)
      onLogin(session)
    } catch (err) {
      setError(err.message || 'Connexion impossible.')
    } finally {
      setLoading(false)
    }
  }

  return <div className="admin-login-shell">
    <div className="admin-login-card">
      <div className="admin-brandmark">DAVIDEL</div>
      <div className="admin-kicker">ADMINISTRATION</div>
      <h1>La maison, côté coulisses.</h1>
      <p className="admin-muted">Modifiez le menu, les images et les prix sans toucher au code.</p>

      {!cmsConfigured && <div className="admin-setup-note">
        <AlertTriangle size={18}/>
        <div><strong>Supabase doit encore être connecté.</strong><br/>
        Ajoutez <code>VITE_SUPABASE_URL</code> et <code>VITE_SUPABASE_ANON_KEY</code> dans les secrets de déploiement.</div>
      </div>}

      <form onSubmit={submit} className="admin-login-form">
        <label>Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@davidel.co.il" autoComplete="username" required />
        </label>
        <label>Mot de passe
          <div className="admin-password-wrap">
            <input type={show ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password" required />
            <button type="button" onClick={() => setShow(v => !v)} aria-label={show ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}>{show ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
        </label>
        {error && <div className="admin-error">{error}</div>}
        <button className="admin-primary" disabled={!cmsConfigured || loading}>{loading ? 'Connexion…' : 'Se connecter'}</button>
      </form>
      <a className="admin-back" href="./">← Retour au site DAVIDEL</a>
    </div>
  </div>
}

function Stat({ value, label }) {
  return <div className="admin-stat"><strong>{value}</strong><span>{label}</span></div>
}

function Dashboard({ products, occasions, onGo }) {
  const active = products.filter(p => p.active).length
  return <>
    <div className="admin-page-head">
      <div><span className="admin-kicker">AUJOURD’HUI</span><h2>Tableau de bord</h2><p>Tout ce qui compte, sans jargon.</p></div>
      <a className="admin-outline" href="./" target="_blank" rel="noreferrer"><ExternalLink size={16}/> Voir le site</a>
    </div>
    <div className="admin-stats">
      <Stat value={products.length} label="produits" />
      <Stat value={active} label="visibles" />
      <Stat value={products.filter(p => !p.active).length} label="masqués" />
      <Stat value={occasions.length} label="occasions" />
    </div>
    <div className="admin-quick-grid">
      <button onClick={() => onGo('products')}><Package/><span><strong>Modifier le menu</strong><small>Prix, photos, disponibilité</small></span></button>
      <button onClick={() => onGo('images')}><ImageIcon/><span><strong>Changer les images</strong><small>Depuis le téléphone ou l’ordinateur</small></span></button>
      <button onClick={() => onGo('occasions')}><LayoutDashboard/><span><strong>Gérer les occasions</strong><small>Shabbat, anniversaire, réception…</small></span></button>
      <button onClick={() => onGo('settings')}><Settings/><span><strong>Informations DAVIDEL</strong><small>WhatsApp, horaires et contact</small></span></button>
    </div>
  </>
}

function ProductModal({ initial, onClose, onSaved, token }) {
  const blank = { name_fr:'', name_he:'', description_fr:'', description_he:'', price:0, image_url:'', active:true, unavailable_label:false, tags:[], position:999 }
  const [p, setP] = useState(initial ? {...initial} : blank)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')
  const [dirty, setDirty] = useState(false)

  function patch(k,v){ setP(x => ({...x,[k]:v})); setDirty(true) }
  function toggleTag(tag){ patch('tags', p.tags.includes(tag) ? p.tags.filter(x=>x!==tag) : [...p.tags,tag]) }

  async function upload(e){
    const file = e.target.files?.[0]
    if (!file) return
    setBusy(true); setMessage('')
    try { patch('image_url', await uploadCmsImage(token, file, 'products')) }
    catch(err){ setMessage(err.message) }
    finally { setBusy(false) }
  }

  async function submit(e){
    e.preventDefault(); setBusy(true); setMessage('')
    try {
      const rows = await saveProduct(token, p)
      onSaved(rows?.[0] || p)
    } catch(err){ setMessage(err.message) }
    finally { setBusy(false) }
  }

  function tryClose(){ if(!dirty || confirm('Vous avez des modifications non enregistrées. Voulez-vous vraiment quitter ?')) onClose() }

  return <div className="admin-modal-backdrop" onMouseDown={e => { if(e.target===e.currentTarget) tryClose() }}>
    <form className="admin-modal" onSubmit={submit}>
      <div className="admin-modal-head"><div><span className="admin-kicker">PRODUIT</span><h3>{initial ? 'Modifier le produit' : 'Ajouter un produit'}</h3></div><button type="button" className="admin-icon-btn" onClick={tryClose}><X/></button></div>
      <div className="admin-edit-grid">
        <div className="admin-image-editor">
          <div className="admin-preview-img">{p.image_url ? <img src={p.image_url} alt=""/> : <ImageIcon size={38}/>}</div>
          <label className="admin-upload-btn"><Upload size={16}/> Changer l’image<input type="file" accept="image/jpeg,image/png,image/webp" onChange={upload}/></label>
          <small>JPG, PNG ou WEBP</small>
        </div>
        <div className="admin-fields">
          <label>Nom français<input value={p.name_fr} onChange={e=>patch('name_fr',e.target.value)} required/></label>
          <label>Nom hébreu<input dir="rtl" value={p.name_he} onChange={e=>patch('name_he',e.target.value)} required/></label>
          <label>Description française<textarea value={p.description_fr||''} onChange={e=>patch('description_fr',e.target.value)}/></label>
          <label>Description hébraïque<textarea dir="rtl" value={p.description_he||''} onChange={e=>patch('description_he',e.target.value)}/></label>
          <label className="admin-price-field">Prix <div><input type="number" inputMode="decimal" min="0" step="1" value={p.price} onChange={e=>patch('price',e.target.value)}/><span>₪</span></div></label>
          <fieldset><legend>Catégories</legend><div className="admin-tag-list">{TAGS.map(([id,label]) => <button type="button" key={id} className={p.tags.includes(id)?'is-on':''} onClick={()=>toggleTag(id)}>{label}</button>)}</div></fieldset>
          <div className="admin-switch-line"><span><strong>Disponible</strong><small>Le produit est visible sur le site.</small></span><button type="button" className={`admin-switch ${p.active?'is-on':''}`} onClick={()=>patch('active',!p.active)}><i/></button></div>
          {!p.active && <label className="admin-checkbox"><input type="checkbox" checked={p.unavailable_label} onChange={e=>patch('unavailable_label',e.target.checked)}/> Afficher « Indisponible aujourd’hui » au lieu de masquer</label>}
        </div>
      </div>
      {message && <div className="admin-error">{message}</div>}
      <div className="admin-modal-actions"><button type="button" className="admin-outline" onClick={tryClose}>Annuler</button><button className="admin-primary" disabled={busy}><Save size={16}/>{busy?'Enregistrement…':'Enregistrer'}</button></div>
    </form>
  </div>
}

function Products({ products, setProducts, token }) {
  const [query,setQuery]=useState('')
  const [edit,setEdit]=useState(null)
  const [adding,setAdding]=useState(false)
  const [toast,setToast]=useState('')
  const shown = products.filter(p => `${p.name_fr} ${p.name_he}`.toLowerCase().includes(query.toLowerCase()))

  function saved(next){
    setProducts(list => {
      const exists = list.some(x=>x.id===next.id)
      return exists ? list.map(x=>x.id===next.id?{...x,...next}:x) : [...list,next]
    })
    setEdit(null); setAdding(false); setToast('✓ Modifications enregistrées'); setTimeout(()=>setToast(''),2200)
  }

  async function remove(p){
    if(!confirm(`Supprimer « ${p.name_fr} » ?`)) return
    try { await deleteProduct(token,p.id); setProducts(list=>list.filter(x=>x.id!==p.id)); setToast('Produit supprimé'); setTimeout(()=>setToast(''),1800) }
    catch(err){ alert(err.message) }
  }

  function duplicate(p){ setAdding(true); setEdit({...p,id:null,name_fr:`${p.name_fr} — copie`,position:products.length+1}) }

  return <>
    <div className="admin-page-head"><div><span className="admin-kicker">CARTE DAVIDEL</span><h2>Menu / Produits</h2><p>Un prix ou une photo se change en quelques secondes.</p></div><button className="admin-primary" onClick={()=>{setEdit(null);setAdding(true)}}><Plus size={17}/> Ajouter un produit</button></div>
    <div className="admin-toolbar"><div className="admin-search"><Search size={17}/><input placeholder="Rechercher un produit…" value={query} onChange={e=>setQuery(e.target.value)}/></div><span>{shown.length} produit{shown.length>1?'s':''}</span></div>
    <div className="admin-product-list">{shown.map(p => <article className="admin-product-card" key={p.id}>
      <GripVertical className="admin-grip" size={20}/><img src={p.image_url || img(1)} alt=""/><div className="admin-product-copy"><div className="admin-product-title"><strong>{p.name_fr}</strong><span dir="rtl">{p.name_he}</span></div><p>{p.description_fr}</p><div className="admin-pills">{p.tags?.map(t=><span key={t}>{TAGS.find(x=>x[0]===t)?.[1]||t}</span>)}</div></div>
      <div className="admin-product-price"><strong>{p.price} ₪</strong><span className={p.active?'available':'hidden'}>{p.active?'Disponible':'Masqué'}</span></div>
      <div className="admin-card-actions"><button onClick={()=>setEdit(p)}><Pencil size={16}/> Modifier</button><button onClick={()=>duplicate(p)}><Copy size={16}/><span>Dupliquer</span></button><button className="danger" onClick={()=>remove(p)}><Trash2 size={16}/></button></div>
    </article>)}</div>
    {(edit || adding) && <ProductModal initial={edit} onClose={()=>{setEdit(null);setAdding(false)}} onSaved={saved} token={token}/>} 
    {toast && <div className="admin-toast"><CheckCircle2 size={17}/>{toast}</div>}
  </>
}

function ImagesPage({ products, token, setProducts }) {
  const [busy,setBusy]=useState('')
  async function replace(product,file){
    if(!file) return
    setBusy(product.id)
    try {
      const image_url = await uploadCmsImage(token,file,'products')
      const rows = await saveProduct(token,{...product,image_url})
      const next = rows?.[0] || {...product,image_url}
      setProducts(list=>list.map(x=>x.id===product.id?next:x))
    } catch(err){ alert(err.message) }
    finally { setBusy('') }
  }
  return <><div className="admin-page-head"><div><span className="admin-kicker">MÉDIATHÈQUE</span><h2>Images</h2><p>Remplacez une photo depuis votre galerie sans ouvrir GitHub.</p></div></div>
    <div className="admin-media-grid">{products.map(p=><article key={p.id}><div className="admin-media-img"><img src={p.image_url||img(1)} alt=""/></div><strong>{p.name_fr}</strong><small>Menu / Produit</small><label className="admin-upload-btn"><Upload size={15}/>{busy===p.id?'Envoi…':'Remplacer'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>replace(p,e.target.files?.[0])}/></label></article>)}</div>
  </>
}

function Categories({ categories, setCategories, token }) {
  async function update(c, patch){
    const next={...c,...patch}
    setCategories(list=>list.map(x=>x.id===c.id?next:x))
    try { await saveCategory(token,next) } catch(err){ alert(err.message) }
  }
  return <><div className="admin-page-head"><div><span className="admin-kicker">NAVIGATION</span><h2>Catégories</h2><p>Renommez, réordonnez ou masquez les filtres du menu.</p></div></div>
    <div className="admin-simple-list">{categories.map((c,i)=><div className="admin-simple-row" key={c.id}><GripVertical/><div><strong>{c.name_fr}</strong><span dir="rtl">{c.name_he}</span></div><input value={c.name_fr} onChange={e=>update(c,{name_fr:e.target.value})}/><input dir="rtl" value={c.name_he} onChange={e=>update(c,{name_he:e.target.value})}/><button className={`admin-switch ${c.active?'is-on':''}`} onClick={()=>update(c,{active:!c.active})}><i/></button><span>#{i+1}</span></div>)}</div>
  </>
}

function Occasions({ occasions, setOccasions, token }) {
  const [busy,setBusy]=useState('')
  async function update(o, patch){
    const next={...o,...patch}; setOccasions(list=>list.map(x=>x.id===o.id?next:x))
    try { const rows=await saveOccasion(token,next); if(rows?.[0]) setOccasions(list=>list.map(x=>x.id===o.id?rows[0]:x)) } catch(err){ alert(err.message) }
  }
  async function imageUpload(o,file){ if(!file)return; setBusy(o.id); try{ await update(o,{image_url:await uploadCmsImage(token,file,'occasions')}) } finally{setBusy('')} }
  return <><div className="admin-page-head"><div><span className="admin-kicker">OCCASIONS</span><h2>Moments DAVIDEL</h2><p>Shabbat, anniversaire, réception privée…</p></div></div>
    <div className="admin-occasion-grid">{occasions.map(o=><article key={o.id}><div className="admin-media-img"><img src={o.image_url||img(1)} alt=""/></div><input value={o.name_fr} onChange={e=>setOccasions(list=>list.map(x=>x.id===o.id?{...x,name_fr:e.target.value}:x))} onBlur={()=>update(o,{name_fr:o.name_fr})}/><input dir="rtl" value={o.name_he} onChange={e=>setOccasions(list=>list.map(x=>x.id===o.id?{...x,name_he:e.target.value}:x))}/><textarea value={o.description_fr||''} onChange={e=>setOccasions(list=>list.map(x=>x.id===o.id?{...x,description_fr:e.target.value}:x))}/><div className="admin-row-between"><label className="admin-upload-btn"><Upload size={15}/>{busy===o.id?'Envoi…':'Changer l’image'}<input type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>imageUpload(o,e.target.files?.[0])}/></label><button className={`admin-switch ${o.active?'is-on':''}`} onClick={()=>update(o,{active:!o.active})}><i/></button></div><button className="admin-outline admin-full" onClick={()=>update(o,o)}><Save size={15}/> Enregistrer</button></article>)}</div>
  </>
}

function SettingsPage({ settings, setSettings, token }) {
  const [busy,setBusy]=useState(false), [toast,setToast]=useState('')
  const days=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','shabbat']
  function patch(k,v){setSettings(s=>({...s,[k]:v}))}
  async function submit(e){e.preventDefault();setBusy(true);try{await saveSettings(token,settings);setToast('✓ Modifications enregistrées');setTimeout(()=>setToast(''),2000)}catch(err){alert(err.message)}finally{setBusy(false)}}
  return <form onSubmit={submit}><div className="admin-page-head"><div><span className="admin-kicker">COORDONNÉES</span><h2>Informations DAVIDEL</h2><p>Un seul endroit pour les contacts et les horaires.</p></div><button className="admin-primary" disabled={busy}><Save size={16}/>{busy?'Enregistrement…':'Enregistrer'}</button></div>
    <div className="admin-settings-grid"><section><h3>Contact</h3><label>Téléphone<input value={settings.phone||''} onChange={e=>patch('phone',e.target.value)}/></label><label>WhatsApp<input value={settings.whatsapp||''} onChange={e=>patch('whatsapp',e.target.value)}/></label><label>Email<input type="email" value={settings.email||''} onChange={e=>patch('email',e.target.value)}/></label><label>Adresse FR<input value={settings.address_fr||''} onChange={e=>patch('address_fr',e.target.value)}/></label><label>Adresse HE<input dir="rtl" value={settings.address_he||''} onChange={e=>patch('address_he',e.target.value)}/></label><label>Instagram<input value={settings.instagram||''} onChange={e=>patch('instagram',e.target.value)}/></label></section>
    <section><h3>Horaires</h3>{days.map(day=><label key={day}>{day[0].toUpperCase()+day.slice(1)}<input placeholder="07:00 – 19:00" value={settings.opening_hours?.[day]||''} onChange={e=>patch('opening_hours',{...(settings.opening_hours||{}),[day]:e.target.value})}/></label>)}</section></div>{toast&&<div className="admin-toast"><CheckCircle2 size={17}/>{toast}</div>}</form>
}

export default function AdminApp() {
  const [session,setSession]=useState(()=>getAdminSession())
  const [page,setPage]=useState('dashboard')
  const [menuOpen,setMenuOpen]=useState(false)
  const [products,setProducts]=useState(localProducts)
  const [categories,setCategories]=useState(localCategories)
  const [occasions,setOccasions]=useState(localOccasions)
  const [settings,setSettings]=useState({phone:CONTACT.phoneDisplay,whatsapp:CONTACT.whatsapp,email:CONTACT.email,address_fr:CONTACT.addressFr,address_he:CONTACT.addressHe,instagram:CONTACT.instagram,opening_hours:{}})
  const [loading,setLoading]=useState(false)

  const token=session?.access_token
  useEffect(()=>{
    if(!token||!cmsConfigured)return
    let alive=true;setLoading(true)
    Promise.all([adminProducts(token),adminCategories(token),adminOccasions(token),getSettings(token)])
      .then(([p,c,o,s])=>{if(!alive)return;if(p?.length)setProducts(p);if(c?.length)setCategories(c);if(o?.length)setOccasions(o);if(s)setSettings(s)})
      .catch(err=>{ if(/JWT|token|401/i.test(err.message)){ signOutAdmin();setSession(null) } else console.error(err) })
      .finally(()=>alive&&setLoading(false))
    return()=>{alive=false}
  },[token])

  async function logout(){await signOutAdmin();setSession(null)}
  if(!session) return <Login onLogin={setSession}/>

  const body = page==='dashboard' ? <Dashboard products={products} occasions={occasions} onGo={setPage}/>
    : page==='products' ? <Products products={products} setProducts={setProducts} token={token}/>
    : page==='images' ? <ImagesPage products={products} setProducts={setProducts} token={token}/>
    : page==='categories' ? <Categories categories={categories} setCategories={setCategories} token={token}/>
    : page==='occasions' ? <Occasions occasions={occasions} setOccasions={setOccasions} token={token}/>
    : <SettingsPage settings={settings} setSettings={setSettings} token={token}/>

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${menuOpen?'is-open':''}`}>
      <div className="admin-side-brand"><strong>DAVIDEL</strong><span>ADMINISTRATION</span></div>
      <nav>{navItems.map(([id,label,Icon])=><button key={id} className={page===id?'is-on':''} onClick={()=>{setPage(id);setMenuOpen(false)}}><Icon size={18}/>{label}</button>)}</nav>
      <div className="admin-side-bottom"><a href="./" target="_blank" rel="noreferrer"><ExternalLink size={17}/>Voir le site</a><button onClick={logout}><LogOut size={17}/>Déconnexion</button></div>
    </aside>
    {menuOpen&&<button className="admin-sidebar-scrim" onClick={()=>setMenuOpen(false)} aria-label="Fermer le menu"/>}
    <main className="admin-main">
      <header className="admin-topbar"><button className="admin-mobile-menu" onClick={()=>setMenuOpen(true)}><MenuIcon/></button><div><strong>{navItems.find(x=>x[0]===page)?.[1]}</strong><span>{session.user?.email}</span></div><a href="./" target="_blank" rel="noreferrer"><ExternalLink size={16}/>Aperçu</a></header>
      <div className="admin-content">{loading?<div className="admin-loading">Chargement de DAVIDEL…</div>:body}</div>
    </main>
  </div>
}
