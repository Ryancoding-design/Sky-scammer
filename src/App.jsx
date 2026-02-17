import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://sehjjmbgurintnhvzkcp.supabase.co',
  'sb_publishable_EzBLeDUBFJtnE80hPuoXzA_sbzD1Kl7' 
)

function App() {
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)
  const [numLapor, setNumLapor] = useState('')
  const [descLapor, setDescLapor] = useState('')

  const handleSearch = async () => {
    const { data } = await supabase.from('REPORT').select('*').eq('phone_number', search)
    setResult(data)
  }

  const handleLapor = async () => {
    if (!numLapor || !descLapor) return alert("Isi semua dulu!")
    const { error } = await supabase.from('REPORT').insert([{ phone_number: numLapor, description: descLapor }])
    if (error) alert("Gagal: " + error.message)
    else { alert("Laporan terkirim! 🚀"); setNumLapor(''); setDescLapor('') }
  }

  // --- STYLE TEMA HITAM KEBIRUAN ---
  const theme = {
    bg: '#0f172a', // Hitam Kebiruan (Slate 900)
    card: '#1e293b', // Biru gelap (Slate 800)
    text: '#f8fafc',
    accent: '#2dd4bf', // Teal/Tosca
    danger: '#f43f5e', // Pink-Red
    input: '#334155'
  }

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: `1px solid ${theme.input}`,
    backgroundColor: theme.input,
    color: '#fff',
    boxSizing: 'border-box',
    fontSize: '16px'
  }

  const cardStyle = {
    backgroundColor: theme.card,
    padding: '20px',
    borderRadius: '15px',
    marginBottom: '20px',
    border: '1px solid #334155'
  }

  return (
    <div style={{ padding: '15px', fontFamily: 'sans-serif', backgroundColor: theme.bg, color: theme.text, minHeight: '100vh', boxSizing: 'border-box' }}>
      
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
          <img 
    src="/logo.png" 
    alt="Sky Warm Logo" 
    style={{ 
      width: '80px', 
      height: 'auto', 
      marginBottom: '15px', 
      filter: 'drop-shadow(0 0 10px #2dd4bf)' // Efek cahaya tosca biar sangar 🗿
    }} 
  />
        <h1 style={{ margin: 0, color: theme.accent, fontSize: '28px' }}>Sky Warm</h1>
        <p style={{ color: '#94a3b8', marginTop: '5px' }}>Scammer Detection</p>
      </header>
      
      <div style={{ maxWidth: '450px', margin: 'auto' }}>
        
        {/* CARI */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>Cek Nomor</h3>
          <input placeholder="Cari nomor penipu..." style={inputStyle} onChange={(e) => setSearch(e.target.value)} />
          <button onClick={handleSearch} style={{ width: '100%', padding: '12px', backgroundColor: theme.accent, color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Cari Nomor
          </button>
          
          {result && result.length > 0 && (
            <div style={{ marginTop: '15px', padding: '12px', backgroundColor: '#450a0a', border: `1px solid ${theme.danger}`, borderRadius: '8px' }}>
              <strong style={{ color: theme.danger }}>⚠️ TERDETEKSI:</strong>
              <p style={{ margin: '5px 0 0', color: '#fca5a5' }}>{result[0].description}</p>
            </div>
          )}
        </div>

        {/* LAPOR */}
        <div style={cardStyle}>
          <h3 style={{ marginTop: 0 }}>Laporkan Penipu</h3>
          <input placeholder="Nomor Penipu..." value={numLapor} style={inputStyle} onChange={(e) => setNumLapor(e.target.value)} />
          <textarea placeholder="Kronologi..." value={descLapor} style={{ ...inputStyle, minHeight: '80px' }} onChange={(e) => setDescLapor(e.target.value)} />
          <button onClick={handleLapor} style={{ width: '100%', padding: '12px', backgroundColor: theme.danger, color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
            Kirim Laporan
          </button>
        </div>

      </div>
      <p style={{ textAlign: 'center', color: '#475569', fontSize: '12px' }}>Web Scammer Detection By:Yanz Sky Warm</p>
    </div>
  )
}

export default App

