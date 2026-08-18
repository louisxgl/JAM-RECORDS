import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  ArrowRight,
  Play,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'

import {
  FaInstagram as Instagram,
  FaFacebookF as Facebook
} from 'react-icons/fa6'

// --- DATA: SOURCE OF TRUTH ---

const SALAS_DATA = {
  'riff': {
    id: 'riff',
    name: 'Sala Riff',
    price: '$200 MXN / Hora',
    intro: '¿Harto de salas de ensayo que no le hacen justicia a tu música? ¡Llegaste al lugar correcto! La Sala "Riff" es el paraíso para proyectos de rock, metal, punk y cualquier banda que quiera sonar macizo.',
    desc: 'Aquí, cada detalle está pensado para que te sientas como en un concierto privado, ¡Y suenes como una leyenda! Desde que entras, te recibe una atmósfera que te pone en modo "rockstar". La iluminación rojiza crea un ambiente increíble, ¡Perfecta para rockear!',
    equipment: [
      'Microfonía: Shure SM58',
      'PA: JBL PRX815',
      'Mixer: Behringer XENYX 2442FX',
      'Batería: TAMA Stagestar Series C/Platillos Sabian B8 Series y doble pedal de bombo',
      'Amplificador de guitarra: Marshall JVM 215C',
      'Amplificador de guitarra: Laney LX120RT',
      'Amplificador de bajo: Boss Katana 210 Bass'
    ],
    reasons: [
      'Ambiente perfecto para proyectos de Rock, Metal, Punk, etc.',
      'Equipo de alta calidad.',
      'Espacio cómodo para hasta 5 integrantes.',
      'Iluminación y decoración inmersiva.'
    ]
  },
  'fusion': {
    id: 'fusion',
    name: 'Sala Fusion',
    price: '$200 MXN / Hora',
    intro: 'Sala "Fusion": Donde la experimentación sonora no tiene límites. La iluminación psicodélica y cada detalle de esta sala te transportarán a un viaje astral creativo, listo para fusionar cualquier género que imagines.',
    desc: '¿Rap con pop? ¿Jazz con electrónica? ¿Groove con synthwave? ¡Aquí, tu música es el experimento! Olvídate de las etiquetas y desata tu lado más innovador.',
    equipment: [
      'Microfonía: Shure SM58',
      'PA: 2 Bose F1 812 y 2 F1 Subwoofer',
      'Batería: Gretsch Energy Series C/Platillos Meinl HCS',
      'Amplificador de guitarra: Roland Jazz Chorus 120',
      'Amplificador de guitarra: Fender Champion 100',
      'Amplificador de bajo: Orange Crush 100',
      'Teclado: Casio CDP 130',
      'Mixer: Mackie Pro FX12 V3'
    ],
    reasons: [
      'Ambiente perfecto para proyectos Pop, Fusion, Groove, Jazz, Experimentales, etc.',
      'Equipo de primera calidad al mejor precio.',
      'Espacio cómodo para hasta 5 integrantes.',
      'Iluminación y decoración inmersiva.'
    ]
  },
  'alternative': {
    id: 'alternative',
    name: 'Sala Alternative',
    price: '$300 MXN / Hora',
    intro: '¿Tu música merece algo más que una sala aburrida y sin alma? ¡Esto es para ti! Bienvenido a “Alternative”, el lugar donde el ruido se vuelve tu esencia.',
    desc: 'Deleita tus ojos y oídos con este paraíso del Rock Alternativo, una sala experimental, independiente y rebelde. Al primer instante, iluminación led, vibe underground y un sonido increíble. Aquí no vienes a ensayar, vienes a explotar. ¡Todo para un verdadero rockstar!',
    equipment: [
      'Microfonía: Shure SM58',
      'PA: 2 JBL Subwoofer Dual Activo SRX828S & 2 RCF HDL20A',
      'Mixer: Allen & Heath QU 24',
      'Batería: DW Performance Series C/ Platillos Zildjian K Dark Series y doble pedal de bombo',
      'Amplificador de guitarra: Blackstar HT Stage 60',
      'Amplificador de guitarra: Vox AC30',
      'Amplificador de bajo: Ampeg Rocket Bass 115 200W',
      'Congas: Toca Synergy Series',
      'Timbales: LP Prestige Series',
      'Monitores De Piso: Behringer Eurolive F1320D'
    ],
    reasons: [
      'Paraíso del Rock Alternativo.',
      'Vibe underground.',
      'Sonido increíble para explotar tu talento.'
    ]
  },
  'auditorium': {
    id: 'auditorium',
    name: 'Sala Auditorium',
    price: '$300 MXN / Hora',
    intro: '¿Cansado de ensayar en espacios pequeños y mal equipados? ¡La Sala "Auditorium" es tu solución!',
    desc: 'Aquí, no solo tienes espacio para toda tu banda (¡Hasta 15 músicos!), sino también un ambiente de lujo y un equipo de primera que hará que tus ensayos sean más productivos y cómodos que nunca. Imagina: un espacio enorme con un diseño minimalista moderno, iluminación neutra que se adapta a cualquier mood, y un equipo que te hará sentir como si estuvieras en un concierto privado.',
    equipment: [
      'Microfonía: Shure SM58',
      'PA: 2 JBL Subwoofer Dual Activo SRX828S & 2 RCF HDL20A',
      'Mixer: Allen & Heath Qu-7d',
      'Batería: DW Performance Series C/ Platillos Zildjian K Dark Series y doble pedal de bombo',
      'Amplificador de guitarra: Blackstar HT Stage 60',
      'Amplificador de guitarra: Vox AC30',
      'Amplificador de bajo: Ampeg Rocket Bass 115 200W',
      'Congas: Toca Synergy Series',
      'Timbales: LP Prestige Series',
      'Monitores De Piso: Behringer Eurolive F1320D'
    ],
    reasons: [
      'Ambiente exclusivo y de lujo.',
      'Equipo de primera calidad al mejor precio.',
      'Espacio enorme para bandas grandes.',
      'Iluminación neutra y adaptable.'
    ]
  }
};

const SERVICIOS_DATA = {
  'produccion-musical': {
    id: 'produccion-musical',
    name: 'Producción Musical',
    desc: 'En Jam Records, te ofrecemos un viaje creativo completo. Trabajamos codo a codo contigo, desde la concepción hasta la masterización, asegurándonos de que cada nota refleje tu esencia artística y conecte con tu audiencia. ¡Tu visión musical, hecha realidad!'
  },
  'lockout': {
    id: 'lockout',
    name: 'Lockout',
    desc: '¿Necesitas un espacio de grabación profesional para dar forma a tus ideas, grabar demos o avanzar en la producción de tu música a tu propio ritmo? Nuestro servicio de Lockout te ofrece la flexibilidad de reservar horas de grabación, con acceso a nuestro equipo de alta calidad y con la experiencia de uno de nuestros ingenieros de audio para optimizar tu sesión de grabación. Desde la colocación estratégica de micrófonos hasta el monitoreo preciso, nuestro ingeniero te brindará el soporte técnico necesario para que te concentres en tu interpretación. Ideal para grabar pistas específicas, experimentar con sonidos o simplemente tener un profesional a tu lado durante el proceso.'
  },
  'mezcla': {
    id: 'mezcla',
    name: 'Mezcla',
    desc: 'Tus canciones tienen una historia que contar y una emoción que transmitir. Nuestro ingeniero de mezcla se dedica a realzar cada matiz de tu grabación, encontrando el balance perfecto y la claridad que permiten que tu mensaje llegue directo al corazón del oyente. Trabajamos contigo para asegurar que la mezcla final respete tu visión artística y potencie la emoción de cada nota.'
  },
  'masterizacion': {
    id: 'masterizacion',
    name: 'Masterización',
    desc: 'Nuestro servicio de masterización profesional es el paso final esencial para optimizar tus mezclas. Nuestro ingeniero asegura que tu música alcance el volumen adecuado, tenga una ecualización precisa y una coherencia sonora que cautive a tus oyentes, sin importar cómo la escuchen, transformamos tus buenas mezclas en canciones profesionales listas para su lanzamiento. ¡Prepara tu música para el mundo!'
  },
  'musicos-de-sesion': {
    id: 'musicos-de-sesion',
    name: 'Músicos De Sesión',
    desc: '¿Necesitas un baterista con groove impecable, un guitarrista con solos melódicos o cualquier otro instrumento para enriquecer tus grabaciones? Jam Records te ofrece acceso a músicos de sesión profesionales, listos para colaborar en tu proyecto. encuentra el músico perfecto para darle a tu música ese toque profesional que la hará destacar.'
  },
  'fotografia': {
    id: 'fotografia',
    name: 'Fotografía',
    desc: '¿Listo para mostrarle al mundo la identidad visual de tu proyecto musical? Contáctanos para conocer nuestros servicios de fotografía profesional para músicos. Ya sea una sesión individual o de una banda, tenemos el lente perfecto para capturar tu esencia. Obtén imágenes profesionales y de alta calidad que te ayudarán a destacar en un mundo visual.'
  },
  'renta-backline-pa': {
    id: 'renta-backline-pa',
    name: 'Renta Backline y PA',
    desc: '¿Concierto en puerta? Olvídate de cargar equipo. En Jam Records, te ofrecemos un servicio de renta de backline y PA con todo lo esencial para que te concentres en tu música. ¡Escríbenos para solicitar una cotización o reservar el equipo que necesitas y enfócate en la música!'
  },
  'arreglo-composicion': {
    id: 'arreglo-composicion',
    name: 'Arreglo y Composición',
    desc: '¿Tienes una melodía pero no sabes cómo desarrollarla? ¿Necesitas arreglos para tu banda o proyecto? En Jam Records, nuestro equipo de compositores y arreglistas está listo para colaborar contigo. Ya sea una canción pop, una pieza instrumental o cualquier otro estilo, te brindamos el apoyo profesional para llevar tu música al siguiente nivel.'
  }
};

const FAQ_DATA = [
  { q: '¿Cómo puedo reservar una sala de ensayo?', a: 'Puedes reservar fácilmente a través de nuestra página web en la sección de "Salas de Ensayo". Simplemente elige la sala, la fecha y la hora deseada, y sigue los pasos para confirmar tu reserva. También puedes contactarnos directamente por WhatsApp para ayudarte con tu reserva.' },
  { q: '¿Cuál es la duración mínima de una reserva de ensayo?', a: 'La duración mínima estándar para una reserva es de 1 hora.' },
  { q: '¿Qué pasa si llego tarde a mi reserva?', a: 'La sala estará reservada para ti durante el tiempo que hayas programado. Si llegas tarde, tu tiempo de ensayo se reducirá proporcionalmente.' },
  { q: '¿Puedo llevar mi propio equipo?', a: '¡Por supuesto! Eres bienvenido a traer tu propio equipo adicional. Te pedimos que nos informes si necesitas espacio adicional o alguna consideración especial al momento de hacer tu reserva.' },
  { q: '¿Cómo me registro para obtener Jam Points?', a: 'Durante tu visita a nuestras instalaciones, nuestro equipo te solicitará tu nombre, número y correo electrónico para realizar tu registro.' },
  { q: '¿Cómo puedo consultar mi saldo de Jam Points?', a: 'Tu saldo de Jam Points se incluirá en el recibo que recibirás por correo electrónico después de cada compra. También puedes preguntar a nuestro personal en Jam Records o Jam Coffee sobre tu saldo actual.' },
  { q: '¿Puedo usar mis Jam Points para pagar una reserva completa?', a: 'Sí, puedes utilizar tus Jam Points para obtener descuentos en tus compras, incluyendo reservas de salas y servicios. El monto del descuento dependerá de la cantidad de Jam Points que tengas disponibles (recuerda que 1 Jam Point = 1 MXN).' }
];

// --- GEMINI API INTEGRATION ---
const apiKey = ""; // API key is provided by the execution environment

const fetchGeminiWithBackoff = async (prompt, systemPrompt, retries = 5, delay = 1000) => {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemPrompt }] }
  };

  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || "Hubo un error al procesar tu solicitud.";
    } catch (error) {
      if (i === retries - 1) return "Lo sentimos, el asistente está saturado en este momento. Intenta de nuevo más tarde.";
      await new Promise(res => setTimeout(res, delay));
      delay *= 2;
    }
  }
};

// --- ROUTER COMPONENT ---
export default function App() {
  const [currentPath, setCurrentPath] = useState('/');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (path) => {
    setCurrentPath(path);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  // Custom Link Component
  const Link = ({ to, children, className }) => (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
      }}
      className={`cursor-pointer transition-colors duration-300 hover:text-[#F4911A] ${className || ''}`}
    >
      {children}
    </a>
  );

  // --- LAYOUT COMPONENTS ---

  const Header = () => (
    <header className="fixed top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#2A2A2A]">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-widest uppercase text-white">JAM RECORDS</Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wider text-[#B3B3B3]">
          <Link to="/salas">SALAS</Link>
          <Link to="/servicios">SERVICIOS</Link>
          <Link to="/jam-sessions">JAM SESSIONS</Link>
          <Link to="/jam-points">JAM POINTS</Link>
          <Link to="/nosotros">NOSOTROS</Link>
          <Link to="/contacto" className="px-6 py-2 bg-[#F4911A] text-[#050505] rounded-none hover:bg-white transition-colors duration-300">
            CONTACTO
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#050505] border-b border-[#2A2A2A] flex flex-col px-6 py-8 space-y-6 text-lg text-[#B3B3B3]">
          <Link to="/salas">SALAS</Link>
          <Link to="/servicios">SERVICIOS</Link>
          <Link to="/jam-sessions">JAM SESSIONS</Link>
          <Link to="/jam-points">JAM POINTS</Link>
          <Link to="/nosotros">NOSOTROS</Link>
          <Link to="/contacto" className="text-[#F4911A]">CONTACTO</Link>
        </div>
      )}
    </header>
  );

  const Footer = () => (
    <footer className="bg-[#050505] border-t border-[#2A2A2A] pt-20 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-[#B3B3B3]">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-widest uppercase text-white block mb-6">JAM RECORDS</Link>
          <p className="text-sm">El lugar donde tus ideas nacen, crecen y se convierten en el soundtrack del mañana.</p>
        </div>
        <div>
          <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Explorar</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/salas">Salas de Ensayo</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/jam-sessions">Jam Sessions</Link></li>
            <li><Link to="/jam-points">Jam Points</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Empresa</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/faq">Preguntas Frecuentes</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-6 uppercase tracking-widest text-sm">Legal & Redes</h4>
          <ul className="space-y-3 text-sm mb-6">
            <li><Link to="/politicas">Políticas de Cancelación</Link></li>
            <li><Link to="/aviso-de-privacidad">Aviso de Privacidad</Link></li>
          </ul>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/JamSessionsStudio/?locale=es_LA" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/jamrecordsmx/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="https://www.youtube.com/channel/UC78yzXPWLgju3DZXjSscrzw" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Play size={20} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16 text-xs text-[#808080] flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} JAM RECORDS. Todos los derechos reservados.</p>
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 bg-[#F4911A] rounded-full"></span>
          <span>CDMX, México</span>
        </div>
      </div>
    </footer>
  );

  // --- PAGE COMPONENTS ---

  const HomePage = () => (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/80 to-[#050505]"></div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <p className="text-[#F4911A] tracking-[0.3em] uppercase text-sm mb-6 font-medium">Las Primeras Salas de Ensayo Conceptuales de CDMX</p>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            ROMPEMOS LOS ESQUEMAS. <br/>
            <span className="text-[#808080]">CREAMOS EXPERIENCIAS.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#B3B3B3] mb-12 max-w-2xl mx-auto leading-relaxed">
            En Jam Records, te ofrecemos más que un espacio: un ambiente que impulsa tus creaciones con una relación precio-beneficio insuperable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/salas" className="w-full sm:w-auto px-8 py-4 bg-[#F4911A] text-[#050505] font-bold tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center group">
              Descubre Nuestras Salas <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20}/>
            </Link>
            <Link to="/servicios" className="w-full sm:w-auto px-8 py-4 border border-[#2A2A2A] text-white tracking-widest uppercase hover:border-[#F4911A] hover:text-[#F4911A] transition-all text-center">
              Ver Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Spaces */}
      <section className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16 border-b border-[#2A2A2A] pb-8">
            <div>
              <h2 className="text-3xl md:text-4xl text-white font-bold uppercase tracking-wide">Salas de Ensayo</h2>
              <p className="text-[#808080] mt-4 max-w-lg">Cada una de nuestras salas ha sido diseñada con una identidad única para desatar tu creatividad.</p>
            </div>
            <Link to="/salas" className="hidden md:flex text-[#F4911A] items-center uppercase tracking-widest text-sm hover:text-white transition-colors">
              Ver Todas <ArrowRight className="ml-2" size={16}/>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.values(SALAS_DATA).slice(0, 2).map(sala => (
              <div key={sala.id} className="group bg-[#111111] border border-[#2A2A2A] p-8 hover:border-[#F4911A] transition-colors cursor-pointer" onClick={() => navigate(`/salas/${sala.id}`)}>
                <div className="h-64 bg-[#181818] mb-6 flex items-center justify-center overflow-hidden">
                  <span className="text-[#2A2A2A] tracking-widest text-sm uppercase">[ VISUAL CONCEPTUAL: {sala.name} ]</span>
                </div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl text-white font-bold">{sala.name}</h3>
                  <span className="text-[#F4911A] font-medium">{sala.price}</span>
                </div>
                <p className="text-[#808080] line-clamp-2">{sala.intro}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const SalasOverviewPage = () => {
    const [genre, setGenre] = useState('');
    const [hours, setHours] = useState('2');
    const [plan, setPlan] = useState('');
    const [loadingPlan, setLoadingPlan] = useState(false);

    const generateRehearsalPlan = async () => {
      if (!genre) return;
      setLoadingPlan(true);
      const prompt = `Un artista/banda del género "${genre}" va a ensayar por ${hours} horas en un estudio profesional de Jam Records. Crea un plan de ensayo estructurado por bloques de tiempo (ej. calentamiento, ensamble, pausas, etc.) para aprovechar al máximo la sesión. Sé conciso, inspirador y profesional.`;
      const systemPrompt = "Eres el 'Stage Manager' experto de Jam Records. Ayudas a las bandas a optimizar su tiempo en la sala de ensayo. Tu tono es profesional, rockero y directo. Usa formato Markdown básico para listas o negritas.";
      
      const result = await fetchGeminiWithBackoff(prompt, systemPrompt);
      setPlan(result);
      setLoadingPlan(false);
    };

    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-6">Salas De Ensayo</h1>
        <p className="text-xl text-[#B3B3B3] max-w-3xl mb-16 leading-relaxed">
          Cada una de nuestras salas ha sido diseñada con una identidad única para desatar tu creatividad. Siente la energía electrizante de “Riff”, sumérgete en la atmósfera cósmica de “Fusion” o experimenta la amplitud inspiradora de “Auditorium”.
        </p>

        {/* Gemini Integration: Rehearsal Planner */}
        <div className="bg-[#111111] border border-[#F4911A]/30 p-8 lg:p-12 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
             <Play size={120} />
          </div>
          <h2 className="text-3xl text-white font-bold mb-4 relative z-10">Asistente de Ensayo con IA</h2>
          <p className="text-[#B3B3B3] mb-8 relative z-10 max-w-2xl">¿No sabes cómo estructurar tu ensayo para aprovechar cada minuto? Cuéntanos qué tocas y cuánto tiempo reservaste, y nuestro Stage Manager de Inteligencia Artificial te armará un plan a medida.</p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8 relative z-10">
            <input 
              type="text" 
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Ej. Indie Rock, Metalcore, Jazz Trío..." 
              className="flex-grow bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors"
            />
            <select 
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              className="bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors w-full md:w-48"
            >
              <option value="1">1 Hora</option>
              <option value="2">2 Horas</option>
              <option value="3">3 Horas</option>
              <option value="4">4 Horas</option>
            </select>
            <button 
              onClick={generateRehearsalPlan}
              disabled={loadingPlan || !genre}
              className="px-8 py-4 bg-[#F4911A] text-[#050505] font-bold tracking-widest uppercase hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loadingPlan ? 'Generando...' : '✨ Planear Ensayo'}
            </button>
          </div>

          {plan && (
            <div className="bg-[#050505] border border-[#2A2A2A] p-6 text-[#B3B3B3] relative z-10">
              <div className="prose prose-invert max-w-none prose-p:mb-4 prose-ul:mb-4" dangerouslySetInnerHTML={{ __html: plan.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong className="text-white">$1</strong>') }} />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {Object.values(SALAS_DATA).map(sala => (
            <div key={sala.id} className="bg-[#111111] border border-[#2A2A2A] p-8 lg:p-12 flex flex-col">
              <div className="h-64 bg-[#181818] mb-8 flex items-center justify-center">
                 <span className="text-[#2A2A2A] tracking-widest text-sm uppercase">[ FOTO: {sala.name} ]</span>
              </div>
              <h2 className="text-3xl text-white font-bold mb-4">{sala.name}</h2>
              <p className="text-[#F4911A] text-lg mb-6">{sala.price}</p>
              <p className="text-[#B3B3B3] mb-8 flex-grow">{sala.intro}</p>
              <Link to={`/salas/${sala.id}`} className="inline-flex items-center text-white tracking-widest uppercase hover:text-[#F4911A] transition-colors border-b border-[#2A2A2A] hover:border-[#F4911A] pb-2 w-max">
                Explorar Sala <ArrowRight size={16} className="ml-2"/>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const SalaDetailPage = ({ id }) => {
    const sala = SALAS_DATA[id];
    if(!sala) return <div className="pt-32 text-center text-white">Sala no encontrada</div>;

    return (
      <div className="pt-32 pb-24 animate-fade-in">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <Link to="/salas" className="text-[#808080] hover:text-white transition-colors uppercase tracking-widest text-sm flex items-center">
              <ArrowRight size={16} className="mr-2 rotate-180" /> Volver a Salas
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-6">{sala.name}</h1>
              <p className="text-2xl text-[#F4911A] mb-8">{sala.price}</p>
              
              <div className="prose prose-invert max-w-none mb-12">
                <p className="text-xl text-white font-medium mb-6">{sala.intro}</p>
                <p className="text-[#B3B3B3] leading-relaxed">{sala.desc}</p>
              </div>

              {sala.reasons && (
                <div className="mb-12 bg-[#111111] p-8 border border-[#2A2A2A]">
                  <h3 className="text-white font-bold uppercase tracking-widest mb-6">¿Por qué elegir {sala.name}?</h3>
                  <ul className="space-y-4">
                    {sala.reasons.map((reason, idx) => (
                      <li key={idx} className="flex items-start text-[#B3B3B3]">
                        <span className="text-[#F4911A] mr-3 mt-1">■</span> {reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <Link to="/contacto" className="inline-block px-8 py-4 bg-[#F4911A] text-[#050505] font-bold tracking-widest uppercase hover:bg-white transition-all">
                Reservar Ahora
              </Link>
            </div>

            <div>
              <div className="h-[400px] bg-[#181818] border border-[#2A2A2A] mb-12 flex items-center justify-center">
                 <span className="text-[#2A2A2A] tracking-widest uppercase">[ GALERÍA VISUAL: {sala.name} ]</span>
              </div>

              <h3 className="text-2xl text-white font-bold uppercase tracking-widest mb-8 border-b border-[#2A2A2A] pb-4">Equipamiento</h3>
              <ul className="space-y-4 text-[#B3B3B3]">
                {sala.equipment.map((item, idx) => {
                  const [category, detail] = item.split(': ');
                  return (
                    <li key={idx} className="flex flex-col sm:flex-row sm:items-baseline border-b border-[#181818] pb-3">
                      <span className="text-white font-medium min-w-[200px] uppercase text-sm tracking-wider">{category}</span>
                      <span className="mt-1 sm:mt-0">{detail || ''}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ServiciosOverviewPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-6">Servicios</h1>
      <p className="text-xl text-[#B3B3B3] max-w-3xl mb-16 leading-relaxed">
        ¿Listo para llevar tu música al siguiente nivel? Desde la producción musical completa hasta la renta de equipo especializado y músicos de sesión, te brindamos el apoyo integral para que tu visión artística se haga realidad.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(SERVICIOS_DATA).map(servicio => (
          <div key={servicio.id} className="bg-[#111111] border border-[#2A2A2A] p-8 flex flex-col group hover:border-[#F4911A] transition-colors cursor-pointer" onClick={() => navigate(`/servicios/${servicio.id}`)}>
            <h2 className="text-2xl text-white font-bold mb-4">{servicio.name}</h2>
            <p className="text-[#808080] mb-8 flex-grow line-clamp-3">{servicio.desc}</p>
            <span className="text-[#F4911A] uppercase tracking-widest text-sm flex items-center">
              Leer Más <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all"/>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const ServicioDetailPage = ({ id }) => {
    const servicio = SERVICIOS_DATA[id];
    const [idea, setIdea] = useState('');
    const [feedback, setFeedback] = useState('');
    const [loadingFeedback, setLoadingFeedback] = useState(false);

    if(!servicio) return <div className="pt-32 text-center text-white">Servicio no encontrado</div>;

    const generateFeedback = async () => {
      if (!idea) return;
      setLoadingFeedback(true);
      const prompt = `Un artista me comparte la siguiente idea musical: "${idea}". Como productor de Jam Records, dame una sugerencia creativa rápida (2-3 párrafos máximo) sobre instrumentación, texturas o estructura para esta idea. Al final, invítalo a usar nuestro servicio de ${servicio.name} para hacerlo realidad.`;
      const systemPrompt = "Eres el Productor Principal de Jam Records. Eres visionario, inspirador y tienes un profundo conocimiento musical. Hablas directamente al artista para motivarlo a grabar y producir su música. Usa formato básico.";
      
      const result = await fetchGeminiWithBackoff(prompt, systemPrompt);
      setFeedback(result);
      setLoadingFeedback(false);
    };

    return (
      <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 animate-fade-in">
        <Link to="/servicios" className="text-[#808080] hover:text-white transition-colors uppercase tracking-widest text-sm flex items-center mb-12">
          <ArrowRight size={16} className="mr-2 rotate-180" /> Volver a Servicios
        </Link>
        <div className="h-64 md:h-96 bg-[#181818] border border-[#2A2A2A] mb-12 flex items-center justify-center">
            <span className="text-[#2A2A2A] tracking-widest uppercase">[ IMAGEN: {servicio.name} ]</span>
        </div>
        <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-8">{servicio.name}</h1>
        <p className="text-xl text-[#B3B3B3] leading-relaxed mb-12">{servicio.desc}</p>
        
        {/* Gemini Integration: AI Producer Feedback for specific services */}
        {(id === 'produccion-musical' || id === 'arreglo-composicion' || id === 'mezcla') && (
          <div className="bg-[#111111] border border-[#2A2A2A] p-8 md:p-12 mb-12">
            <h3 className="text-2xl text-white font-bold uppercase tracking-widest mb-4">Productor Virtual IA</h3>
            <p className="text-[#B3B3B3] mb-6">¿Tienes una idea en mente pero no sabes por dónde empezar? Cuéntale a nuestro Productor Virtual de qué trata tu canción o qué sonido buscas, y te dará una visión creativa instantánea.</p>
            
            <div className="space-y-4 mb-6">
              <textarea 
                rows="3" 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="w-full bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors" 
                placeholder="Ej. Tengo una balada acústica muy triste, pero quiero que explote al final al estilo rock de los 90s..."
              ></textarea>
              <button 
                onClick={generateFeedback}
                disabled={loadingFeedback || !idea}
                className="w-full sm:w-auto px-8 py-4 bg-[#2A2A2A] text-white font-bold tracking-widest uppercase hover:bg-[#F4911A] hover:text-[#050505] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingFeedback ? 'Analizando Idea...' : '✨ Obtener Visión Creativa'}
              </button>
            </div>

            {feedback && (
              <div className="bg-[#050505] border-l-4 border-[#F4911A] p-6 text-[#B3B3B3]">
                <div className="prose prose-invert max-w-none prose-p:mb-4" dangerouslySetInnerHTML={{ __html: feedback.replace(/\n/g, '<br />').replace(/\*\*(.*?)\*\*/g, '<strong className="text-white">$1</strong>') }} />
              </div>
            )}
          </div>
        )}

        <Link to="/contacto" className="inline-block px-8 py-4 bg-[#F4911A] text-[#050505] font-bold tracking-widest uppercase hover:bg-white transition-all">
          Contactar por WhatsApp
        </Link>
      </div>
    );
  };

  const JamSessionsPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-5xl md:text-6xl font-bold text-white uppercase tracking-tight mb-6">Jam Sessions</h1>
      <p className="text-2xl text-[#F4911A] mb-12 font-medium">¿Buscas una "Live Session"? ¡Lo que necesitas es una Jam Session!</p>
      
      <div className="prose prose-invert max-w-none text-[#B3B3B3] text-lg leading-relaxed mb-16">
        <p>
          Nuestras Jam Sessions son mucho más que una simple grabación en vivo; son una experiencia inmersiva diseñada para capturar la esencia pura de tu música con la calidad que mereces. Desde el primer acorde hasta el último eco, te brindamos el escenario perfecto para que tu arte brille. ¿Y lo mejor? ¡Con el mejor precio - beneficio del mercado!
        </p>
      </div>

      <div className="bg-[#111111] border border-[#2A2A2A] p-8 md:p-12 mb-16">
        <h3 className="text-2xl text-white font-bold uppercase tracking-widest mb-8 border-b border-[#2A2A2A] pb-4">¿Qué incluye tu Jam Session?</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#B3B3B3]">
          <li className="flex items-start"><span className="text-[#F4911A] mr-3">■</span> Seteo e iluminación.</li>
          <li className="flex items-start"><span className="text-[#F4911A] mr-3">■</span> Grabación a 2 cámaras en 4K (Sony FX3 y Sony A7).</li>
          <li className="flex items-start"><span className="text-[#F4911A] mr-3">■</span> Edición de video.</li>
          <li className="flex items-start"><span className="text-[#F4911A] mr-3">■</span> Foto grupal con retoque.</li>
          <li className="flex items-start"><span className="text-[#F4911A] mr-3">■</span> Mezcla y masterización profesional de audio.</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <a href="https://www.youtube.com/playlist?list=PLMhRz7gp2lNyXtcs56FYuopT3tJaveZg8" target="_blank" rel="noreferrer" className="px-8 py-4 border border-[#F4911A] text-[#F4911A] font-bold tracking-widest uppercase hover:bg-[#F4911A] hover:text-[#050505] transition-all text-center flex items-center justify-center">
          <Play size={20} className="mr-3"/> Ver Playlist
        </a>
        <Link to="/contacto" className="px-8 py-4 bg-[#F4911A] text-[#050505] font-bold tracking-widest uppercase hover:bg-white transition-all text-center">
          Agenda tu Session
        </Link>
      </div>
    </div>
  );

  const JamPointsPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-8">Jam Points</h1>
      <div className="bg-[#111111] border border-[#2A2A2A] p-8 md:p-12 mb-12">
        <h2 className="text-3xl text-white font-bold mb-6">¿Qué son los Jam Points?</h2>
        <p className="text-[#B3B3B3] text-lg leading-relaxed mb-6">
          Es nuestra forma de agradecer tu lealtad a la familia Jam. Por cada compra que realices en Jam Records y/o Jam Coffee, ganas un <strong>5% de cashback</strong> sin importar si estás creando tu próxima canción o disfrutando de tu bebida favorita. ¡Y tus puntos nunca caducan!
        </p>
        <p className="text-[#F4911A] font-bold tracking-widest uppercase text-xl">1 Jam Point = 1 MXN</p>
      </div>

      <h3 className="text-2xl text-white font-bold uppercase tracking-widest mb-8 border-b border-[#2A2A2A] pb-4">¿Cómo funciona?</h3>
      <div className="space-y-8 text-[#B3B3B3]">
        <div className="flex">
          <div className="text-[#F4911A] font-bold text-2xl mr-6 mt-1">01</div>
          <div>
            <h4 className="text-white font-bold mb-2">Acumulación Automática</h4>
            <p>Solo necesitas registrarte en Jam Records o Jam Coffee con tu nombre, número de teléfono y correo electrónico. Cada vez que realices una compra, tus Jam Points se sumarán automáticamente a tu saldo.</p>
          </div>
        </div>
        <div className="flex">
          <div className="text-[#F4911A] font-bold text-2xl mr-6 mt-1">02</div>
          <div>
            <h4 className="text-white font-bold mb-2">Recibos Detallados</h4>
            <p>Después de cada compra, recibirás un correo con tu recibo. En él, encontrarás el detalle de tu compra y la actualización de tus Jam Points disponibles.</p>
          </div>
        </div>
        <div className="flex">
          <div className="text-[#F4911A] font-bold text-2xl mr-6 mt-1">03</div>
          <div>
            <h4 className="text-white font-bold mb-2">Tú Decides Cuándo Usarlos</h4>
            <p>En cada compra que realices, nuestro equipo te informará de tus Jam Points disponibles. Puedes usarlos al momento o acumularlos para un descuento mayor en el futuro.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const NosotrosPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-16">Nosotros</h1>
      
      <div className="mb-20">
        <h2 className="text-2xl text-[#F4911A] font-bold uppercase tracking-widest mb-6">¿Quiénes Somos?</h2>
        <p className="text-xl text-[#B3B3B3] leading-relaxed">
          Jam Records surgió de una pasión compartida por la música y la visión de crear un espacio único para la comunidad artística de la CDMX. Desde nuestras innovadoras salas de ensayo conceptuales hasta nuestro equipo de alta gama y nuestro compromiso con la comodidad y la accesibilidad, cada detalle está diseñado para que te concentres en lo esencial: tu música. Con una energía renovada, estamos listos para ser el lugar donde tus ideas nacen, crecen y se convierten en el soundtrack del mañana.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#111111] border border-[#2A2A2A] p-8 md:p-12">
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Misión</h2>
          <p className="text-[#B3B3B3] leading-relaxed">
            La misión de Jam Records es que la producción musical de alta calidad deje de ser inalcanzable, poniéndola al alcance de cada artista. Ser la plataforma donde la magia del talento independiente despegue, ofreciéndoles un espacio único, herramientas de otro nivel y una comunidad lista para hacer ruido juntos.
          </p>
        </div>
        <div className="bg-[#111111] border border-[#2A2A2A] p-8 md:p-12">
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Visión</h2>
          <p className="text-[#B3B3B3] leading-relaxed">
            Visualizamos un futuro donde Jam Records sea el referente vanguardista del talento independiente, marcando la pauta en calidad e innovación. Queremos ser el semillero de nuevas leyendas, impulsando a los artistas a trascender con su sonido y dejar una huella imborrable en la historia de la música.
          </p>
        </div>
      </div>
    </div>
  );

  const ClientesPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-12">Clientes</h1>
      <div className="h-64 border border-dashed border-[#2A2A2A] flex flex-col items-center justify-center text-[#808080]">
        <span className="tracking-widest uppercase mb-4">[ TESTIMONIALS PENDING ]</span>
        <p className="max-w-md text-center text-sm">La estructura está lista para incrustar los testimonios, artistas y proyectos destacados una vez el material esté disponible.</p>
      </div>
    </div>
  );

  const FAQPage = () => {
    const [openIdx, setOpenIdx] = useState(null);
    return (
      <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-16">Preguntas Frecuentes</h1>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, idx) => (
            <div key={idx} className="border border-[#2A2A2A] bg-[#111111]">
              <button 
                className="w-full text-left p-6 flex justify-between items-center text-white font-medium focus:outline-none"
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              >
                <span>{faq.q}</span>
                <span className={`text-[#F4911A] transition-transform duration-300 ${openIdx === idx ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-6 text-[#B3B3B3] leading-relaxed border-t border-[#181818] pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const ContactoPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto animate-fade-in">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-16">Contacto</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-xl text-[#B3B3B3] mb-12">Estamos listos para responder tus preguntas, ayudarte con tus reservas y charlar sobre tus proyectos musicales. ¡Elige la forma que te sea más cómoda!</p>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center text-white">
              <MapPin className="text-[#F4911A] mr-6" size={28}/>
              <div>
                <p className="font-bold tracking-widest uppercase text-sm mb-1">Ubicación</p>
                <p className="text-[#B3B3B3]">Ciudad de México, México</p>
              </div>
            </div>
            <div className="flex items-center text-white">
              <Phone className="text-[#F4911A] mr-6" size={28}/>
              <div>
                <p className="font-bold tracking-widest uppercase text-sm mb-1">WhatsApp</p>
                <p className="text-[#B3B3B3]">[ +52 Número pendiente ]</p>
              </div>
            </div>
            <div className="flex items-center text-white">
              <Mail className="text-[#F4911A] mr-6" size={28}/>
              <div>
                <p className="font-bold tracking-widest uppercase text-sm mb-1">Correo</p>
                <p className="text-[#B3B3B3]">contacto@jamrecords.mx</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111111] border border-[#2A2A2A] p-8">
            <h3 className="text-white font-bold uppercase tracking-widest mb-4">Horario de Atención</h3>
            <p className="text-[#B3B3B3] flex justify-between border-b border-[#181818] pb-2 mb-2"><span>Lunes a Viernes</span> <span>11:00 AM - 11:00 PM</span></p>
            <p className="text-[#B3B3B3] flex justify-between"><span>Sábado y Domingo</span> <span>11:00 AM - 11:00 PM</span></p>
          </div>
        </div>

        <div className="bg-[#111111] border border-[#2A2A2A] p-8 md:p-12">
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-8">Envíanos un mensaje</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#808080] mb-2">Nombre</label>
              <input type="text" className="w-full bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors" placeholder="Tu nombre" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#808080] mb-2">Correo</label>
              <input type="email" className="w-full bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors" placeholder="tu@correo.com" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#808080] mb-2">Número</label>
              <input type="tel" className="w-full bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors" placeholder="Tu teléfono" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#808080] mb-2">¿Cómo podemos ayudarte?</label>
              <textarea rows="4" className="w-full bg-[#050505] border border-[#2A2A2A] p-4 text-white focus:border-[#F4911A] focus:outline-none transition-colors" placeholder="Mensaje..."></textarea>
            </div>
            <button type="submit" className="w-full px-8 py-4 bg-[#F4911A] text-[#050505] font-bold tracking-widest uppercase hover:bg-white transition-all">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const PoliticasPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto animate-fade-in text-[#B3B3B3]">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-16">Políticas de Cancelación</h1>
      
      <div className="prose prose-invert max-w-none space-y-12">
        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Reservas de salas de ensayo</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cancelaciones con más de 12 horas de anticipación:</strong> No se aplicará ningún cargo.</li>
            <li><strong>Cancelaciones con menos de 12 horas de anticipación:</strong> El pago inicial no será reembolsable.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Proyectos de producción musical</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cancelaciones con más de 24 horas de anticipación:</strong> No se aplicará ningún cargo.</li>
            <li><strong>Cancelaciones con menos de 24 horas de anticipación:</strong> Se aplicará una penalización del 30% del precio total del proyecto.</li>
            <li><strong>Cancelación durante el proyecto:</strong> Si el cliente cancela el proyecto durante su desarrollo, se cobrará el porcentaje de trabajo realizado hasta el momento de la cancelación.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Cambios en la reserva</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Modificaciones:</strong> Se permitirán modificaciones en la reserva con un aviso previo de al menos 12 horas, sujeto a disponibilidad.</li>
            <li><strong>Cambios en el proyecto:</strong> Cualquier cambio en el alcance del proyecto original podrá generar costos adicionales y modificar los plazos de entrega.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">Causas de Fuerza Mayor</h2>
          <p className="mb-4">En caso de fuerza mayor, ambas partes se eximirán de sus obligaciones contractuales. Se consideran causas de fuerza mayor, entre otras:</p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Desastres naturales: Terremotos, inundaciones, incendios, etc.</li>
            <li>Pandemias: Brotes de enfermedades infecciosas que impidan el cumplimiento del contrato.</li>
            <li>Huelgas o conflictos laborales: Que afecten directamente la prestación del servicio.</li>
            <li>Fallecimiento o enfermedad grave: Del cliente o de un familiar directo del cliente que impida el cumplimiento del contrato.</li>
          </ul>
          <p className="italic bg-[#111111] p-6 border-l-4 border-[#F4911A]">"En caso de fallecimiento o enfermedad grave del cliente o de un familiar directo, el cliente podrá cancelar la reserva sin penalización alguna, previa presentación de la documentación correspondiente."</p>
        </section>
      </div>
    </div>
  );

  const PrivacidadPage = () => (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto animate-fade-in text-[#B3B3B3]">
      <h1 className="text-5xl font-bold text-white uppercase tracking-tight mb-16">Aviso de Privacidad</h1>
      
      <div className="prose prose-invert max-w-none space-y-12">
        <p className="text-lg">
          En Jam Records, valoramos tu privacidad y nos comprometemos a proteger tus datos personales de acuerdo con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP). Esta política de privacidad describe cómo recopilamos, utilizamos y protegemos la información que nos proporcionas.
        </p>

        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">1. Información que recopilamos:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Datos de identificación:</strong> Nombre completo, dirección, número de teléfono, correo electrónico.</li>
            <li><strong>Datos fiscales:</strong> RFC, dirección fiscal.</li>
            <li><strong>Datos de pago:</strong> Información de tarjetas de crédito o débito, datos bancarios.</li>
            <li><strong>Información de reservas:</strong> Historial de reservas, servicios contratados, fechas y horarios.</li>
            <li><strong>Material:</strong> Imagen, voz y/o música.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">2. Finalidades del tratamiento:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Prestación de servicios:</strong> Para brindarte los servicios que solicites en Jam Records, como por ejemplo el alquiler de salas de ensayo, servicios de grabación y producción musical.</li>
            <li><strong>Facturación y cobro:</strong> Para emitir facturas y realizar el cobro de nuestros servicios.</li>
            <li><strong>Comunicación:</strong> Para enviarte información relevante sobre nuestros servicios, promociones y eventos.</li>
            <li><strong>Marketing:</strong> Para realizar actividades de marketing y publicidad, siempre respetando tus preferencias.</li>
            <li><strong>Cumplimiento legal:</strong> Para cumplir con las obligaciones legales y fiscales aplicables.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl text-white font-bold uppercase tracking-widest mb-6">3. Tus derechos:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Acceso:</strong> Tienes derecho a conocer qué información tenemos sobre ti y cómo la utilizamos.</li>
            <li><strong>Rectificación:</strong> Puedes solicitar la corrección de cualquier dato inexacto o incompleto.</li>
            <li><strong>Cancelación:</strong> Puedes solicitar la cancelación de tus datos, excepto cuando la ley lo prohíba o sea necesario para cumplir con una obligación legal.</li>
            <li><strong>Oposición:</strong> Puedes oponerte al tratamiento de tus datos para fines de mercadotecnia.</li>
            <li><strong>Limitación:</strong> Puedes solicitar la limitación del tratamiento de tus datos.</li>
          </ul>
        </section>
      </div>
    </div>
  );

  // --- ROUTER DISPATCHER ---

  const renderPage = () => {
    window.scrollTo(0, 0); // Ensure scroll is reset on manual re-render if needed
    
    // Explicit Routing Map
    if (currentPath === '/') return <HomePage />;
    if (currentPath === '/salas') return <SalasOverviewPage />;
    if (currentPath.startsWith('/salas/')) {
      const id = currentPath.replace('/salas/', '');
      return <SalaDetailPage id={id} />;
    }
    if (currentPath === '/servicios') return <ServiciosOverviewPage />;
    if (currentPath.startsWith('/servicios/')) {
      const id = currentPath.replace('/servicios/', '');
      return <ServicioDetailPage id={id} />;
    }
    if (currentPath === '/jam-sessions') return <JamSessionsPage />;
    if (currentPath === '/jam-points') return <JamPointsPage />;
    if (currentPath === '/nosotros') return <NosotrosPage />;
    if (currentPath === '/clientes') return <ClientesPage />;
    if (currentPath === '/faq') return <FAQPage />;
    if (currentPath === '/contacto') return <ContactoPage />;
    if (currentPath === '/politicas') return <PoliticasPage />;
    if (currentPath === '/aviso-de-privacidad') return <PrivacidadPage />;
    
    return <div className="pt-32 text-center text-white h-screen">Página no encontrada: {currentPath}</div>;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FFFFFF] font-sans selection:bg-[#F4911A] selection:text-[#050505]">
      <style dangerouslySetInnerHTML={{__html: `
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
      <Header />
      <main className="min-h-[70vh]">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}