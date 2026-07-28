import { useState, useContext, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Tags, 
  History, 
  BarChart3, 
  PieChart,
  ArrowRightLeft, 
  Users, 
  LogOut,
  Menu,
  X,
  TrendingUp,
  FolderKanban,
  FileText,
  Info,
  CheckCircle,
  Sparkles,
  BarChart,
  Receipt,
  Building2,
  ShoppingBag,
  PackageX,
  Globe
} from 'lucide-react';

const UPDATES = [
  {
    version: '2.1.0',
    title: 'Catálogo Público',
    icon: Globe,
    items: [
      'Nueva página /catalogo accesible sin iniciar sesión',
      'Landing moderna con todos los productos, precios y stock',
      'Buscador y filtro por categoría',
      'Compartí el enlace con tus clientes para que vean el catálogo online'
    ]
  },
  {
    version: '2.0.0',
    title: 'Nuevo Módulo: Gestión',
    icon: Building2,
    items: [
      'Proveedores: registro con contacto, teléfono, email y CBU',
      'Órdenes de Compra: creación con productos, cantidades y precios. Al recibirlas se actualiza el stock automáticamente',
      'Gastos Operativos: registro de gastos diarios categorizados (alquiler, servicios, insumos, etc.)',
      'Clientes: base de datos de clientes con teléfono y dirección'
    ]
  },
  {
    version: '2.0.0',
    title: 'Presupuestos',
    icon: FileText,
    items: [
      'Botón "Presupuestar" en el Punto de Venta para crear cotizaciones sin efectuar la venta',
      'Sección "Presupuestos" en el menú con listado completo',
      'Envía el presupuesto al cliente por WhatsApp con el detalle de productos y total',
      'Posibilidad de convertir un presupuesto en venta directamente'
    ]
  },
  {
    version: '1.4.0',
    title: 'R - Ventas (Estadísticas de Ventas)',
    icon: BarChart,
    items: [
      'Ranking completo de productos más vendidos a menos vendidos',
      'Desglose por unidad/bolsa vs venta suelta por kilo',
      'Ganancia y margen por cada producto',
      'Filtro por categoría con botones interactivos',
      'Top 10 en gráfico de barras',
      'Exportación a CSV'
    ]
  },
  {
    version: '1.3.0',
    title: 'Productos sin Movimiento',
    icon: PackageX,
    items: [
      'Detecta productos que no se vendieron en los últimos 3 meses',
      'Badge en la cabecera de Productos con la cantidad',
      'Modal con listado completo para revisar inventario estancado'
    ]
  },
  {
    version: '1.2.0',
    title: 'Mejoras en Ventas',
    icon: ShoppingBag,
    items: [
      'Desglose de ventas por unidad y por kilo en todo el sistema',
      'Filtro de categorías como botones en R - Ventas',
      'Números formateados sin decimales innecesarios'
    ]
  }
];

const LS_KEY = 'mascotienda_changelog_dismissed';

const Layout = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    if (!user) return;
    const dismissed = localStorage.getItem(LS_KEY);
    if (!dismissed) {
      setShowChangelog(true);
    }
  }, [user]);

  const handleCloseChangelog = () => {
    if (dontShowAgain) {
      localStorage.setItem(LS_KEY, 'true');
    }
    setShowChangelog(false);
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Punto de Venta', path: '/pos', icon: ShoppingCart },
    { name: 'Productos', path: '/products', icon: Package },
    { name: 'Categorías', path: '/categories', icon: Tags },
    { name: 'Ventas', path: '/sales', icon: History },
    { name: 'R - Ventas', path: '/rventas', icon: TrendingUp },
    { name: 'Presupuestos', path: '/presupuestos', icon: FileText },
    { name: 'Gestión', path: '/gestion', icon: FolderKanban },
    { name: 'Stock', path: '/stock', icon: ArrowRightLeft },
    { name: 'Reportes', path: '/reports', icon: BarChart3 },
    { name: 'Estadísticas', path: '/statistics', icon: PieChart },
  ];

  if (user?.rol === 'admin') {
    menuItems.push({ name: 'Usuarios', path: '/users', icon: Users });
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Mobile sidebar toggle */}
      <button 
        className="md:hidden fixed z-50 top-4 right-4 bg-surface p-2 rounded-md border border-slate-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:relative z-40 w-64 h-full bg-surface border-r border-slate-800 transition-transform duration-300 flex flex-col`}
      >
        <div className="p-6 flex items-center justify-center border-b border-slate-800">
           <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">MASCOTIENDA</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors group ${
                  isActive 
                  ? 'bg-primary/10 text-primary' 
                  : 'text-textMuted hover:bg-slate-800 hover:text-textLight'
                }`}
              >
                <Icon size={20} className={`mr-3 ${isActive ? 'text-primary' : 'text-slate-500 group-hover:text-textLight'}`} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-slate-800">
          <div className="px-3 py-2 flex items-center gap-2.5 border-b border-slate-800/50">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center text-[11px] font-bold text-white">
              {user?.nombre?.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-textLight truncate leading-tight">{user?.nombre}</p>
              <p className="text-[10px] text-textMuted capitalize flex items-center gap-1">
                <span className={`w-1 h-1 rounded-full ${user?.rol === 'admin' ? 'bg-amber-400' : 'bg-blue-400'}`} />
                {user?.rol === 'admin' ? 'Admin' : 'Empleado'}
              </p>
            </div>
            <button onClick={() => setShowChangelog(true)} className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors relative" title="Novedades">
              <Info size={14} className="text-slate-400 hover:text-primary transition-colors" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-primary animate-pulse" />
            </button>
            <button onClick={logout} className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors" title="Cerrar Sesión">
              <LogOut size={14} className="text-danger/60 hover:text-danger transition-colors" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto w-full h-full p-4 md:p-8">
         <Outlet />
      </main>

      {/* Changelog Modal */}
      {showChangelog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => handleCloseChangelog()}>
          <div className="bg-surface w-full max-w-lg max-h-[85vh] rounded-2xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-800 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="text-primary" size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-textLight">Novedades</h2>
                  <p className="text-xs text-textMuted">Últimas actualizaciones del sistema</p>
                </div>
              </div>
              <button onClick={handleCloseChangelog} className="text-textMuted hover:text-textLight p-1">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {UPDATES.map((update, idx) => {
                const Icon = update.icon;
                const isFirst = idx === 0;
                return (
                  <div key={idx} className={`${!isFirst ? 'pt-6 border-t border-slate-800' : ''}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isFirst ? 'bg-primary/20 text-primary' : 'bg-slate-800 text-textMuted'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${
                          isFirst ? 'text-primary' : 'text-textMuted'
                        }`}>{update.version}</p>
                        <h3 className="font-bold text-textLight">{update.title}</h3>
                      </div>
                      {isFirst && (
                        <span className="ml-auto bg-primary/20 text-primary text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">Nuevo</span>
                      )}
                    </div>
                    <ul className="space-y-2 ml-1">
                      {update.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-textMuted">
                          <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className="p-6 border-t border-slate-800 shrink-0">
              <label className="flex items-center gap-3 cursor-pointer mb-4">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-background text-primary focus:ring-primary/30"
                />
                <span className="text-sm text-textMuted">No volver a mostrar al iniciar sesión</span>
              </label>
              <button
                onClick={handleCloseChangelog}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primaryDark text-white font-bold transition-colors shadow-lg shadow-primary/20"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
