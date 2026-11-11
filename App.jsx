import React, { useState, useEffect } from 'react';

export default function App() {
  // Módulo 1: Autenticación y Estado de Sesión (Persistente)
  const [currentView, setCurrentView] = useState(() => {
    return localStorage.getItem('formacraft_view') || 'login';
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('formacraft_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [plan, setPlan] = useState('free');
  
  // Módulo 2: Dashboard, Proyectos y Workspace (Equipos)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [activeTab, setActiveTab] = useState('projects'); // 'projects' o 'team'
  const [projects, setProjects] = useState(() => {
    const savedProjects = localStorage.getItem('formacraft_projects');
    return savedProjects ? JSON.parse(savedProjects) : [
      { id: 1, title: 'Post para TikTok - Viral', category: 'Redes Sociales', date: 'Hace 2 horas', color: 'from-orange-400 to-rose-400' },
      { id: 2, title: 'Banner para YouTube - Gaming', category: 'Video', date: 'Ayer', color: 'from-purple-500 to-indigo-500' },
      { id: 3, title: 'Presentación de Negocio', category: 'Presentaciones', date: 'Hace 3 días', color: 'from-pink-500 to-rose-500' },
    ];
  });

  // Miembros del Equipo (Workspace)
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: 'Sofía Designer', role: 'Administrador', avatar: '🎨' },
    { id: 2, name: 'Carlos Dev', role: 'Editor', avatar: '💻' }
  ]);
  const [newMemberEmail, setNewMemberEmail] = useState('');

  // Módulo 3: Editor Visual / Canvas con Animaciones TikTok
  const [currentProject, setCurrentProject] = useState(null);
  const [canvasElements, setCanvasElements] = useState([
    { id: 1, type: 'text', content: '🚀 ¡Contenido Viral!', x: 50, y: 50, color: '#1F2937', size: '28px', animation: 'animate-bounce' },
    { id: 2, type: 'box', content: 'Bloque Animado', x: 100, y: 160, color: '#F97316', width: '220px', height: '130px', animation: 'animate-pulse' }
  ]);
  const [selectedTool, setSelectedTool] = useState('templates'); // 'templates', 'text', 'elements', 'unsplash', 'danniex'

  // Banco de Imágenes (Unsplash Mock)
  const stockImages = [
    { id: 1, url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60', title: 'Abstracto Neón' },
    { id: 2, url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60', title: 'Cyberpunk Gaming' },
    { id: 3, url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=500&auto=format&fit=crop&q=60', title: 'Arte Creativo' }
  ];

  // Módulo 4: DANNIEX AI (Asistente Multiuso Avanzado)
  const [danniexMessages, setDanniexMessages] = useState([
    { sender: 'danniex', text: '¡Hola! Soy Danniex, tu inteligencia artificial personal en FormaCraft. ¿En qué te ayudo hoy con tu diseño, copy o código?' }
  ]);
  const [danniexInput, setDanniexInput] = useState('');
  const [isDanniexThinking, setIsDanniexThinking] = useState(false);

  // Módulo 5: Modal de Exportación
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('png');

  // Módulo 6: Guardado automático en la Nube (LocalStorage)
  useEffect(() => {
    localStorage.setItem('formacraft_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('formacraft_user', JSON.stringify(user));
      localStorage.setItem('formacraft_view', currentView);
    } else {
      localStorage.removeItem('formacraft_user');
      localStorage.setItem('formacraft_view', currentView);
    }
  }, [user, currentView]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Por favor completa todos los campos');
    const loggedUser = { name: email.split('@')[0], email: email, plan: 'Pro' };
    setUser(loggedUser);
    setCurrentView('dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert('Por favor completa todos los campos');
    const newUser = { name: name, email: email, plan: plan === 'pro' ? 'Pro' : 'Gratis' };
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setEmail('');
    setPassword('');
    setName('');
    setCurrentView('login');
    localStorage.removeItem('formacraft_user');
  };

  const createNewProject = () => {
    const titleName = prompt('Nombre de tu nuevo diseño:');
    if (!titleName) return;
    const newProj = {
      id: Date.now(),
      title: titleName,
      category: 'Redes Sociales',
      date: 'Justo ahora',
      color: 'from-orange-500 to-pink-500'
    };
    setProjects([newProj, ...projects]);
    openEditor(newProj);
  };

  const openEditor = (proj) => {
    setCurrentProject(proj);
    setCurrentView('editor');
  };

  const addTeamMember = (e) => {
    e.preventDefault();
    if (!newMemberEmail) return;
    setTeamMembers([...teamMembers, { id: Date.now(), name: newMemberEmail.split('@')[0], role: 'Editor', avatar: '✨' }]);
    setNewMemberEmail('');
    alert('¡Invitación enviada con éxito al equipo!');
  };

  const categories = ['Todos', 'Redes Sociales', 'Video', 'Presentaciones', 'Marketing'];

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const addTextElement = (textContent = '✨ Texto Dinámico', anim = 'animate-bounce') => {
    setCanvasElements([...canvasElements, {
      id: Date.now(),
      type: 'text',
      content: textContent,
      x: 80,
      y: 220,
      color: '#FB7185',
      size: '24px',
      animation: anim
    }]);
  };

  const addBoxElement = (anim = 'animate-pulse') => {
    setCanvasElements([...canvasElements, {
      id: Date.now(),
      type: 'box',
      content: 'Elemento Pro',
      x: 120,
      y: 190,
      color: '#F97316',
      width: '160px',
      height: '100px',
      animation: anim
    }]);
  };

  const addImageElement = (imgUrl) => {
    setCanvasElements([...canvasElements, {
      id: Date.now(),
      type: 'image',
      url: imgUrl,
      x: 100,
      y: 100,
      width: '200px',
      height: '150px',
      animation: 'animate-fade'
    }]);
  };

  // Interactuar con DANNIEX AI
  const handleDanniexSend = (e) => {
    e.preventDefault();
    if (!danniexInput.trim()) return;

    const userMsg = danniexInput;
    setDanniexMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setDanniexInput('');
    setIsDanniexThinking(true);

    setTimeout(() => {
      let reply = `¡Claro! Analicé tu solicitud sobre "${userMsg}". He generado sugerencias de diseño y copywriting optimizadas para redes sociales.`;
      if (userMsg.toLowerCase().includes('titulo') || userMsg.toLowerCase().includes('copy')) {
        reply = 'Aquí tienes un título viral para TikTok: "🔥 ¡El secreto que nadie te cuenta para romper el algoritmo este 2026!"';
        addTextElement('🔥 ¡Rompe el algoritmo!', 'animate-bounce');
      } else if (userMsg.toLowerCase().includes('color')) {
        reply = 'Te sugiero usar la paleta creativa con fondo degradado de Naranja (#F97316) y Rosa (#FB7185) para máxima retención visual.';
      }

      setDanniexMessages(prev => [...prev, { sender: 'danniex', text: reply }]);
      setIsDanniexThinking(false);
    }, 1000);
  };

  const handleExportSubmit = () => {
    alert(`¡Diseño exportado y renderizado con éxito en formato .${exportFormat.toUpperCase()}!`);
    setShowExportModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1F2937] font-sans flex flex-col justify-between">
      {/* VISTA 1: LOGIN */}
      {currentView === 'login' && (
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#F97316] to-[#FB7185] bg-clip-text text-transparent">
                FormaCraft
              </h1>
              <p className="text-sm text-gray-500 mt-2">Plataforma Creativa con Danniex AI ✨</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white font-bold shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all"
              >
                Iniciar Sesión
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              ¿No tienes cuenta?{' '}
              <button 
                onClick={() => setCurrentView('register')}
                className="text-[#F97316] font-semibold hover:underline"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>
      )}

      {/* VISTA 2: REGISTRO */}
      {currentView === 'register' && (
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-[#F97316] to-[#FB7185] bg-clip-text text-transparent">
                Crea tu cuenta
              </h1>
              <p className="text-sm text-gray-500 mt-1">Diseña con animaciones fluidas y Danniex AI</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Nombre completo</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu Nombre"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Correo electrónico</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tucorreo@ejemplo.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Contraseña</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">Selecciona tu Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPlan('free')}
                    className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${plan === 'free' ? 'border-[#F97316] bg-orange-50 text-[#F97316]' : 'border-gray-200 text-gray-600'}`}
                  >
                    Gratis
                  </button>
                  <button
                    type="button"
                    onClick={() => setPlan('pro')}
                    className={`py-2 px-4 rounded-xl border text-sm font-medium transition-all ${plan === 'pro' ? 'border-[#FB7185] bg-rose-50 text-[#FB7185]' : 'border-gray-200 text-gray-600'}`}
                  >
                    Pro 🚀
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white font-bold shadow-lg shadow-orange-500/25 hover:opacity-95 transition-all mt-2"
              >
                Comenzar ahora
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-4">
              ¿Ya tienes cuenta?{' '}
              <button 
                onClick={() => setCurrentView('login')}
                className="text-[#F97316] font-semibold hover:underline"
              >
                Inicia sesión
              </button>
            </p>
          </div>
        </div>
      )}

      {/* VISTA 3: DASHBOARD Y WORKSPACE DE EQUIPO */}
      {currentView === 'dashboard' && (
        <div className="flex flex-1 flex-col">
          <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-black bg-gradient-to-r from-[#F97316] to-[#FB7185] bg-clip-text text-transparent">
                FormaCraft
              </span>
              <span className="text-xs bg-orange-100 text-[#F97316] font-bold px-2.5 py-1 rounded-full uppercase">
                Plan {user?.plan}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-bold text-[#1F2937]">{user?.name}</p>
                <p className="text-xs text-gray-400">{user?.email}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-all"
              >
                Cerrar Sesión
              </button>
            </div>
          </header>

          <main className="flex-1 p-8 max-w-6xl mx-auto w-full">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div>
                <h2 className="text-2xl font-bold text-[#1F2937]">¡Hola, {user?.name}! 👋</h2>
                <p className="text-gray-500 text-sm">Gestiona tus proyectos y colabora con tu equipo en tiempo real.</p>
              </div>
              <button 
                onClick={createNewProject}
                className="bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white font-bold px-6 py-3 rounded-2xl shadow-lg shadow-orange-500/20 hover:opacity-95 transition-all flex items-center space-x-2"
              >
                <span>+ Crear Nuevo Diseño</span>
              </button>
            </div>

            {/* Pestañas de Navegación del Dashboard (Proyectos vs Workspace) */}
            <div className="flex space-x-4 mb-6 border-b border-gray-200 pb-3">
              <button 
                onClick={() => setActiveTab('projects')}
                className={`font-bold text-sm pb-2 border-b-2 transition-all ${activeTab === 'projects' ? 'border-[#F97316] text-[#F97316]' : 'border-transparent text-gray-400'}`}
              >
                Mis Diseños
              </button>
              <button 
                onClick={() => setActiveTab('team')}
                className={`font-bold text-sm pb-2 border-b-2 transition-all ${activeTab === 'team' ? 'border-[#FB7185] text-[#FB7185]' : 'border-transparent text-gray-400'}`}
              >
                👥 Workspace de Equipo
              </button>
            </div>

            {activeTab === 'projects' ? (
              <>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                  <input 
                    type="text"
                    placeholder="Busca tus proyectos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-80 px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316] text-sm"
                  />

                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${selectedCategory === cat ? 'bg-[#1F2937] text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredProjects.map((proj) => (
                    <div 
                      key={proj.id} 
                      className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col group cursor-pointer"
                      onClick={() => openEditor(proj)}
                    >
                      <div className={`h-40 bg-gradient-to-br ${proj.color} p-4 flex items-end justify-between text-white group-hover:scale-[1.02] transition-transform`}>
                        <span className="text-xs bg-black/20 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">{proj.category}</span>
                      </div>
                      <div className="p-5 flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-[#1F2937] text-sm">{proj.title}</h4>
                          <p className="text-xs text-gray-400 mt-0.5">Modificado {proj.date}</p>
                        </div>
                        <span className="text-[#F97316] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">Editar ➔</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm max-w-2xl">
                <h3 className="text-lg font-extrabold text-[#1F2937] mb-2">Colaboradores del Workspace</h3>
                <p className="text-xs text-gray-500 mb-6">Invita a miembros de tu equipo para editar proyectos de forma conjunta.</p>

                <form onSubmit={addTeamMember} className="flex gap-3 mb-6">
                  <input 
                    type="email"
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="correo@colega.com"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#FB7185]"
                  />
                  <button type="submit" className="bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white px-5 py-3 rounded-xl text-xs font-bold shadow-md">
                    Invitar Colaborador
                  </button>
                </form>

                <div className="space-y-3">
                  {teamMembers.map(member => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div>
                          <p className="text-xs font-bold text-[#1F2937]">{member.name}</p>
                          <p className="text-[10px] text-gray-400">{member.role}</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Activo</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* VISTA 4: EDITOR VISUAL + UNSPLASH + DANNIEX AI + ANIMACIONES TIKTOK */}
      {currentView === 'editor' && (
        <div className="flex flex-1 flex-col h-screen relative">
          <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-10">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="text-gray-500 hover:text-[#1F2937] font-semibold text-sm flex items-center space-x-1"
              >
                <span>← Volver al Dashboard</span>
              </button>
              <span className="text-gray-300">|</span>
              <h2 className="font-bold text-[#1F2937] text-sm">{currentProject?.title || 'Sin título'}</h2>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                onClick={() => alert('¡Proyecto sincronizado con la nube!')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl text-xs transition-all"
              >
                Guardar Nube ☁️
              </button>
              <button 
                onClick={() => setShowExportModal(true)}
                className="bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white font-bold px-5 py-2 rounded-xl text-xs shadow-md hover:opacity-95 transition-all"
              >
                Exportar / Compartir 🚀
              </button>
            </div>
          </header>

          <div className="flex flex-1 overflow-hidden">
            {/* Barra lateral de herramientas extendida */}
            <aside className="w-80 bg-white border-r border-gray-200 flex flex-col p-4 space-y-4">
              <div className="grid grid-cols-5 gap-1 bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setSelectedTool('templates')}
                  className={`py-2 text-[10px] font-semibold rounded-lg transition-all ${selectedTool === 'templates' ? 'bg-white text-[#F97316] shadow-sm' : 'text-gray-500'}`}
                >
                  Estilos
                </button>
                <button 
                  onClick={() => setSelectedTool('text')}
                  className={`py-2 text-[10px] font-semibold rounded-lg transition-all ${selectedTool === 'text' ? 'bg-white text-[#F97316] shadow-sm' : 'text-gray-500'}`}
                >
                  Texto
                </button>
                <button 
                  onClick={() => setSelectedTool('elements')}
                  className={`py-2 text-[10px] font-semibold rounded-lg transition-all ${selectedTool === 'elements' ? 'bg-white text-[#F97316] shadow-sm' : 'text-gray-500'}`}
                >
                  Formas
                </button>
                <button 
                  onClick={() => setSelectedTool('unsplash')}
                  className={`py-2 text-[10px] font-semibold rounded-lg transition-all ${selectedTool === 'unsplash' ? 'bg-white text-[#F97316] shadow-sm' : 'text-gray-500'}`}
                >
                  Fotos 📷
                </button>
                <button 
                  onClick={() => setSelectedTool('danniex')}
                  className={`py-2 text-[10px] font-semibold rounded-lg transition-all ${selectedTool === 'danniex' ? 'bg-white text-[#FB7185] shadow-sm' : 'text-gray-500'}`}
                >
                  Danniex ✨
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pt-2">
                {selectedTool === 'templates' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Animaciones TikTok</p>
                    <div onClick={() => addTextElement('🔥 ¡Tendencia Viral!', 'animate-bounce')} className="p-3 rounded-xl border border-gray-100 bg-orange-50/50 hover:border-[#F97316] cursor-pointer transition-all">
                      <p className="font-bold text-xs text-[#F97316]">Texto con Salto (Bounce)</p>
                      <p className="text-xs text-gray-500 mt-1">Haz clic para añadir</p>
                    </div>
                  </div>
                )}

                {selectedTool === 'text' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tipografía</p>
                    <button onClick={() => addTextElement('Nuevo Titular', 'animate-pulse')} className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-700 border border-gray-200 transition-all">
                      + Agregar Cuadro de Texto
                    </button>
                  </div>
                )}

                {selectedTool === 'elements' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Formas</p>
                    <button onClick={() => addBoxElement('animate-pulse')} className="w-full py-3 bg-orange-50 hover:bg-orange-100 text-[#F97316] rounded-xl text-xs font-bold border border-orange-200 transition-all">
                      + Agregar Bloque de Color
                    </button>
                  </div>
                )}

                {/* BANCO DE IMÁGENES (UNSPLASH) */}
                {selectedTool === 'unsplash' && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Banco de Fotos (Unsplash)</p>
                    <div className="grid grid-cols-1 gap-2">
                      {stockImages.map(img => (
                        <div key={img.id} onClick={() => addImageElement(img.url)} className="cursor-pointer group relative rounded-xl overflow-hidden border border-gray-200 hover:border-[#F97316]">
                          <img src={img.url} alt={img.title} className="h-24 w-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-x-0 bottom-0 bg-black/50 p-1 text-[10px] text-white font-bold text-center">{img.title}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* DANNIEX AI (ASISTENTE MULTIUSO) */}
                {selectedTool === 'danniex' && (
                  <div className="flex flex-col h-[400px] bg-rose-50/40 p-3 rounded-2xl border border-rose-100">
                    <div className="flex items-center space-x-2 mb-2 pb-2 border-b border-rose-200">
                      <span className="text-lg">🤖</span>
                      <div>
                        <p className="text-xs font-extrabold text-[#FB7185]">Danniex AI</p>
                        <p className="text-[9px] text-gray-400">Asistente Creativo & Código</p>
                      </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-1 mb-2">
                      {danniexMessages.map((msg, idx) => (
                        <div key={idx} className={`p-2 rounded-xl text-[11px] ${msg.sender === 'danniex' ? 'bg-white text-gray-700 shadow-sm border border-rose-100' : 'bg-[#FB7185] text-white ml-4'}`}>
                          {msg.text}
                        </div>
                      ))}
                      {isDanniexThinking && <p className="text-[10px] text-rose-400 italic">Danniex está pensando...</p>}
                    </div>

                    <form onSubmit={handleDanniexSend} className="flex gap-1">
                      <input 
                        type="text"
                        value={danniexInput}
                        onChange={(e) => setDanniexInput(e.target.value)}
                        placeholder="Pide ideas, copys, colores..."
                        className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-[11px] bg-white focus:outline-none focus:ring-1 focus:ring-[#FB7185]"
                      />
                      <button type="submit" className="bg-[#FB7185] text-white px-3 py-2 rounded-xl text-[11px] font-bold shadow">
                        Enviar
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </aside>

            {/* Lienzo Central (Canvas) */}
            <main className="flex-1 bg-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
              <div className="w-[650px] h-[450px] bg-white rounded-3xl shadow-2xl relative border border-gray-200 overflow-hidden">
                {canvasElements.map((el) => (
                  <div 
                    key={el.id}
                    className={`absolute cursor-move p-2 border border-dashed border-transparent hover:border-[#F97316] transition-all ${el.animation || ''}`}
                    style={{ left: `${el.x}px`, top: `${el.y}px` }}
                  >
                    {el.type === 'text' && (
                      <span className="font-extrabold" style={{ color: el.color, fontSize: el.size }}>
                        {el.content}
                      </span>
                    )}
                    {el.type === 'box' && (
                      <div 
                        className="rounded-2xl shadow-lg flex items-center justify-center text-white font-bold text-xs" 
                        style={{ backgroundColor: el.color, width: el.width, height: el.height }}
                      >
                        {el.content}
                      </div>
                    )}
                    {el.type === 'image' && (
                      <img 
                        src={el.url} 
                        alt="Asset" 
                        className="rounded-2xl shadow-lg object-cover" 
                        style={{ width: el.width, height: el.height }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </main>
          </div>

          {/* MÓDULO 5: MODAL DE EXPORTACIÓN */}
          {showExportModal && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white w-full max-w-md p-6 rounded-3xl shadow-2xl border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-extrabold text-[#1F2937]">Exportar Diseño</h3>
                  <button onClick={() => setShowExportModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
                </div>

                <p className="text-xs text-gray-500 mb-4">Selecciona el formato de salida para descargar tu proyecto:</p>

                <div className="space-y-3 mb-6">
                  {['png', 'jpg', 'pdf', 'mp4'].map((fmt) => (
                    <label key={fmt} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${exportFormat === fmt ? 'border-[#F97316] bg-orange-50/50 text-[#F97316]' : 'border-gray-200 text-gray-700'}`}>
                      <div className="flex items-center space-x-3">
                        <input type="radio" name="exportFormat" checked={exportFormat === fmt} onChange={() => setExportFormat(fmt)} className="accent-[#F97316]" />
                        <span className="text-xs font-bold uppercase">Formato .{fmt}</span>
                      </div>
                      <span className="text-xs text-gray-400">{fmt === 'mp4' ? 'Video Animado TikTok' : 'Alta calidad'}</span>
                    </label>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <button onClick={() => setShowExportModal(false)} className="w-1/2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all">
                    Cancelar
                  </button>
                  <button onClick={handleExportSubmit} className="w-1/2 py-3 bg-gradient-to-r from-[#F97316] to-[#FB7185] text-white rounded-xl text-xs font-bold shadow-md hover:opacity-95 transition-all">
                    Descargar 🚀
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}  