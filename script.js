document.addEventListener('DOMContentLoaded', () => {
    console.log('EMPRENDEX: Interacciones cargadas.');

    const mainContentArea = document.getElementById('main-content-area');
    const uploadFormSection = document.getElementById('upload-form-section');
    const uploadForm = document.getElementById('upload-form');
    const uploadMessage = document.getElementById('upload-message');
    
    // Referencias a las secciones de contenido predeterminado
    const defaultSections = document.querySelectorAll('.left-sidebar, .post-feed-area, .right-sidebar');
    
    // Inicializar un div para el contenido simulado temporal
    let simulatedContentDiv = null;
    
    // **********************************************************
    // * MODELO: POSTS GUARDADOS Y CONTADOR DE POSTS SUBIDOS *
    // **********************************************************
    let uploadedPostCounter = 1; 
    const savedPostsData = {}; // Store para posts guardados por el usuario
    let projectCount = 3; // Contador simulado de proyectos del usuario (para la nueva interacción)
    
    // **********************************************************
    // * MODELO: DATOS Y ESTADO DE ADMINISTRACIÓN *
    // **********************************************************
    let adminState = {
        filter: 'all' // 'all', 'active', 'suspended', 'pending'
    };
    const userData = {
        'U001': { name: 'Elena M.', email: 'elena@mentor.com', status: 'active', lastLogin: '2 days ago', posts: 42 },
        'U002': { name: 'Ricardo R.', email: 'ricardo@innovatech.com', status: 'pending', lastLogin: '1 hour ago', posts: 15 },
        'U003': { name: 'Global Ventures', email: 'global@ventures.com', status: 'suspended', lastLogin: '1 month ago', posts: 8 },
        'U004': { name: 'Academia Datos', email: 'academia@datos.com', status: 'active', lastLogin: '5 minutes ago', posts: 70 },
        'U005': { name: 'Startup Growth S.A.', email: 'startup@growth.com', status: 'active', lastLogin: '1 week ago', posts: 10 }
    };

    // --- BASE DE DATOS ESTRUCTURADA DE CURSOS (DINÁMICO) ---
    const courseData = {
        'C-ACR': {
            name: 'Retoque Creativo Avanzado (ACR)',
            creator: 'Estudio Creativo Pixel',
            details: 'Un curso avanzado de 20 lecciones enfocado en técnicas de retoque fotográfico profesional para material de marketing. Aprende a darle vida a tus productos y servicios visualmente.',
            duration: '20 Lecciones',
            tag: 'Diseño',
            color: '#FF9800', // Naranja
            enrollments: 1250,
            rating: 4.8
        },
        'C-Neumo': {
            name: 'Neumo Fitness para Emprendedores',
            creator: 'Neumo Health',
            details: 'Curso de 10 lecciones sobre optimización de la respiración y técnicas de fitness para aumentar la productividad diaria del emprendedor. ¡Mejora tu enfoque y energía!',
            duration: '10 Lecciones',
            tag: 'Salud y Productividad',
            color: '#4CAF50', // Verde
            enrollments: 890,
            rating: 4.5
        },
        'C-DataSci': {
            name: 'Introducción a Data Science y Mercados',
            creator: 'Academia de Datos',
            details: 'Este curso de 40 horas introduce el currículo de Ciencia de Datos para emprendedores, cubriendo análisis de mercado y predicción de tendencias para la toma de decisiones estratégicas.',
            duration: '40 Horas',
            tag: 'Tecnología',
            color: '#2196F3', // Azul
            enrollments: 2100,
            rating: 4.9
        }
    };


    // --- Diccionario de mapeo de búsqueda EXHAUSTIVO ---
    const searchMap = {
        'inicio': 'home', 'home': 'home', 'cursos': 'Pimg-04', 'subir': 'upload', 'upload': 'upload', 'precios': 'pricing', 'pricing': 'pricing',
        'mi perfil': 'my-profile', 'perfil': 'my-profile', 'guardados': 'saved-posts', 'posts guardados': 'saved-posts', 
        'area admin': 'admin-area', 'administracion': 'admin-area', 'suspender usuarios': 'admin-area', 
        'listen hour': 'P4270', 'lover four': 'P126K', 'emprendimiento': 'Pimg-03', 'post de emprendimiento': 'Pimg-03', 
        'post cursos': 'Pimg-04', 'post de cursos': 'Pimg-04', 
        'data science': 'C-DataSci', 'acr': 'C-ACR', 'retoque creativo avanzado': 'C-ACR', 'neumo fitness': 'C-Neumo', 'fitness': 'C-Neumo',
        'mensajes': 'messages-inbox', 'bandeja de entrada': 'messages-inbox', 'notificaciones': 'alerts-list', 'lista de notificaciones': 'alerts-list', 
        'chat startupx': 'M-StartupX', 'mensaje ceo': 'M-CEO', 'chat elena': 'C-Elena',
    };

    // --- BASE DE DATOS SIMULADA (DATA STORE) ---
    const dataStore = {
        'home': { 
            title: 'Página Principal (Inicio) - Menú Central', 
            details: 'Bienvenido al menú principal de EMPRENDEX. Aquí se cargan todas las últimas interacciones de la comunidad y el feed de contenido general.' 
        },
        'upload': { 
            title: 'Subir Emprendimiento/Archivos', 
            details: 'Utiliza esta sección para subir tu proyecto o emprendimiento, archivos relacionados y tutoriales para compartir con la comunidad.' 
        },
        // INICIO DE LA SECCIÓN DE PRECIOS DINÁMICA CON COP Y PLAN BÁSICO GRATIS
        'pricing': { 
            title: '🚀 Planes de Precios y Suscripción (Pesos Colombianos)', 
            details: `
                <div class="pricing-container" style="max-width: 1000px; margin: 0 auto; padding: 20px; background-color: var(--background-color); border-radius: 12px;">
                    <h2 style="text-align: center; color: var(--primary-color); margin-bottom: 30px;">Elige tu Plan de Crecimiento</h2>
                    
                    <div class="pricing-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px;">

                        <div class="price-card basic-card" style="padding: 30px; border-radius: 10px; background-color: #e8f5e9; border: 2px solid var(--secondary-color); text-align: center; transition: transform 0.3s; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                            <h3 style="color: var(--secondary-color); margin-bottom: 15px;">Emprendedor Básico</h3>
                            <div style="font-size: 3rem; font-weight: bold; color: var(--secondary-color); margin-bottom: 10px;">
                                $0 <span style="font-size: 1rem; color: #666;">COP/mes</span>
                            </div>
                            <p style="margin-bottom: 25px; color: var(--light-text);">Ideal para empezar a explorar y compartir tu primer proyecto.</p>
                            <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 30px;">
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Acceso al Feed de la Comunidad</li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ <strong>1 Subida de Emprendimiento</strong></li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">❌ Mentoría Mensual</li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">❌ Plantillas Premium</li>
                            </ul>
                            <button class="submit-btn" style="background-color: var(--secondary-color); color: white; padding: 12px 25px; border: none; border-radius: 25px; font-weight: bold; width: 100%;">Seleccionado (Gratis)</button>
                        </div>

                        <div class="price-card pro-card" style="padding: 30px; border-radius: 10px; background-color: var(--card-background); border: 3px solid var(--primary-color); text-align: center; transition: transform 0.3s; box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); transform: scale(1.05);">
                            <div style="background-color: var(--primary-color); color: white; padding: 5px 15px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; margin-bottom: 15px; display: inline-block;">MÁS POPULAR</div>
                            <h3 style="color: var(--primary-color); margin-bottom: 15px;">Emprendedor Pro</h3>
                            <div style="font-size: 3rem; font-weight: bold; color: var(--primary-color); margin-bottom: 10px;">
                                $49.900 <span style="font-size: 1rem; color: #666;">COP/mes</span>
                            </div>
                            <p style="margin-bottom: 25px; color: var(--light-text);">Potencia tu proyecto con recursos exclusivos y soporte.</p>
                            <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 30px;">
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Acceso Ilimitado</li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ <strong>Subidas de Emprendimiento Ilimitadas</strong></li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Mentoría Mensual (1h)</li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Plantillas Premium (Pitch Deck, Finanzas)</li>
                            </ul>
                            <button class="submit-btn" style="background-color: var(--primary-color); color: white; padding: 12px 25px; border: none; border-radius: 25px; font-weight: bold; width: 100%;">Suscribirse Ahora</button>
                        </div>

                        <div class="price-card business-card" style="padding: 30px; border-radius: 10px; background-color: var(--card-background); border: 2px solid #FF9800; text-align: center; transition: transform 0.3s; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                            <h3 style="color: #FF9800; margin-bottom: 15px;">Empresarial</h3>
                            <div style="font-size: 3rem; font-weight: bold; color: #FF9800; margin-bottom: 10px;">
                                $149.900 <span style="font-size: 1rem; color: #666;">COP/mes</span>
                            </div>
                            <p style="margin-bottom: 25px; color: var(--light-text);">Solución completa para equipos y crecimiento acelerado.</p>
                            <ul style="list-style: none; padding: 0; text-align: left; margin-bottom: 30px;">
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Todo el plan Pro</li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Acceso al <strong>Área de Administración</strong></li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ Soporte Prioritario 24/7</li>
                                <li style="margin-bottom: 10px; color: var(--text-color);">✅ 5 Cuentas de Equipo</li>
                            </ul>
                            <button class="submit-btn" style="background-color: #FF9800; color: white; padding: 12px 25px; border: none; border-radius: 25px; font-weight: bold; width: 100%;">Contactar Ventas</button>
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
                        <p style="font-style: italic; color: #333; font-size: 0.95rem;">
                            **Nota Importante:** El **Reto de Financiamiento** (la sección de "Reto") es una funcionalidad separada de los planes de suscripción y permanece activo para todos los usuarios.
                        </p>
                    </div>
                </div>
            ` 
        },
        // FIN DE LA SECCIÓN DE PRECIOS DINÁMICA
        'my-profile': { 
            title: 'Mi Perfil de Usuario', 
            details: `
                <div class="profile-container" style="max-width: 900px; margin: 0 auto; padding: 30px; background-color: var(--card-background); border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
                    <div class="profile-header" style="display: flex; align-items: center; padding-bottom: 20px; margin-bottom: 20px; border-bottom: 2px solid var(--border-color);">
                        <img src="avatar-placeholder.png" alt="Avatar" class="avatar large-avatar" style="width: 100px; height: 100px; margin-right: 20px; border: 3px solid var(--primary-color);">
                        <div class="profile-info">
                            <h2 id="profile-name" style="font-size: 2rem; margin-bottom: 5px;">Nowisfero</h2>
                            <p id="profile-bio" style="font-style: italic; color: var(--secondary-color); margin-bottom: 10px;">Emprendedor Tecnológico | Fundador de InnovaCorp | Buscando la Ronda A. 🚀</p>
                            <p class="profile-stats" style="font-size: 0.9rem; color: var(--light-text);">📍 Global | ⭐ 560 Seguidores | 💡 12 Proyectos Publicados</p>
                        </div>
                    </div>
                    <div class="profile-actions" style="display: flex; gap: 15px; margin-bottom: 30px;">
                        <button class="submit-btn" style="background-color: var(--primary-color); padding: 10px 20px;" onclick="simulateEditProfile()">📝 Editar Biografía</button>
                        <button class="submit-btn" style="background-color: #6c757d; padding: 10px 20px;">⚙️ Configuración de Cuenta</button>
                    </div>
                    <h3 style="margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">Actividad y Proyectos Recientes</h3>
                    <div class="profile-content-feed" style="display: grid; gap: 15px;">
                        <div class="post-item-mini" onclick="simulateRedirection('Post Detalle', 'Pimg-03')" style="padding: 15px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9; cursor: pointer;">
                            <h4 style="margin: 0 0 5px 0; color: var(--text-color);">Post: Estrategias de Retención B2B</h4>
                            <p style="font-size: 0.85rem; color: var(--light-text);">Última actividad: Hace 3 horas.</p>
                        </div>
                        <div class="post-item-mini" onclick="simulateRedirection('Post Detalle', 'P4270')" style="padding: 15px; border: 1px solid #eee; border-radius: 8px; background-color: #f9f9f9; cursor: pointer;">
                            <h4 style="margin: 0 0 5px 0; color: var(--text-color);">Proyecto: NextGen AI Assistant</h4>
                            <p style="font-size: 0.85rem; color: var(--light-text);">Estado: Buscando Beta Testers.</p>
                        </div>
                    </div>
                    <button onclick="resetViewToDefault()" class="submit-btn" style="margin-top: 30px; background-color: var(--secondary-color); width: 100%;">Volver al Feed Principal</button>
                </div>
            ` 
        },
        'saved-posts': { title: 'Publicaciones Guardadas', details: 'Tu colección personal de contenido para revisar más tarde.' },
        'admin-area': { title: 'Área de Administración', details: 'Contenido dinámico generado por renderAdminArea().' },
        'alerts-list': { 
             title: 'Historial de alertas sobre interacciones y novedades', 
            details: `
                <div class="alerts-container" style="max-width: 800px; margin: 0 auto;">
                    <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">🔔 Historial de alertas sobre interacciones y novedades</h2>
                    <p style="font-style: italic; color: var(--light-text); margin-bottom: 20px;">**Historial de alertas sobre interacciones y novedades**</p>
                    <div class="alert-item alert-like" data-alert-id="A005" onclick="simulateRedirection('Detalle de Interacción', 'A-Like-P4270')">
                        <span class="alert-icon">👍</span>
                        <div class="alert-content"><strong>A Ricardo R. le gustó tu post.</strong><span>"Listen Hour" recibió un nuevo me gusta.</span></div>
                        <span class="alert-time">Hace 5 min</span>
                    </div>
                    <div class="alert-item alert-comment" data-alert-id="A004" onclick="simulateRedirection('Detalle de Interacción', 'A-Comment-Pimg03')">
                        <span class="alert-icon">💬</span>
                        <div class="alert-content"><strong>Nuevo comentario en tu emprendimiento.</strong><span>"Inversión inicial" tiene 3 comentarios más.</span></div>
                        <span class="alert-time">Hace 1 hora</span>
                    </div>
                    <div class="alert-item alert-mention" data-alert-id="A003" onclick="simulateRedirection('Detalle de Interacción', 'A-Mention-P126K')">
                        <span class="alert-icon">@</span>
                        <div class="alert-content"><strong>Te mencionaron en una publicación.</strong><span>@Global_Biz te mencionó en "Lover Four".</span></div>
                        <span class="alert-time">Hace 3 horas</span>
                    </div>
                    <div class="alert-item alert-system" data-alert-id="A001" onclick="simulateRedirection('Detalle de Novedad', 'A-System-New-Feature')">
                        <span class="alert-icon">✨</span>
                        <div class="alert-content"><strong>¡Novedad del sistema!</strong><span>Nueva funcionalidad de chat de grupo activada. (Haz clic para ver más)</span></div>
                        <span class="alert-time">Ayer</span>
                    </div>
                    <button onclick="resetViewToDefault()" style="margin-top: 30px; padding: 10px 20px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Volver al Feed Principal</button>
                </div>
            ` 
        },
        'A-Like-P4270': {
            title: 'Detalles de Interacción: Nuevo Me Gusta',
            details: `<div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #ffebee;"><h3 style="color: #FF5722; margin-bottom: 15px;">👍 **Nuevo Like de Ricardo R.**</h3><p style="margin-bottom: 10px;">¡Felicidades! **Ricardo R.** ha reaccionado a tu publicación con un **Me Gusta**.</p><p style="font-weight: bold; margin-bottom: 15px;">**Post Afectado:** "Listen Hour" (ID: P4270)</p><p>Las interacciones positivas aumentan la visibilidad de tu contenido en el feed. ¡Sigue compartiendo!</p><button onclick="simulateRedirection('Post Detalle', 'P4270')" style="margin-top: 20px; padding: 10px 15px; background-color: #FF9800; color: white; border: none; border-radius: 5px; cursor: pointer;">Ver Publicación</button></div>`
        },

        // **********************************************************
        // * POST P4270: LISTEN HOUR (OPTIMIZADO) *
        // **********************************************************
        'P4270': { 
            title: 'Análisis Detallado: Listen Hour - Estrategia de Escucha Activa', 
            details: `
                <div style="padding: 20px; border: 1px solid var(--primary-color); border-radius: 8px; background-color: #e3f2fd; max-width: 900px; margin: 0 auto;">
                    <h2 style="color: var(--primary-color); margin-bottom: 10px;">🎧 Listen Hour: Estrategia de Marketing de Escucha Activa</h2>
                    <p style="font-style: italic; color: var(--light-text); margin-bottom: 20px;">**Empresa/Usuario:** InnovaTech Solutions | **Categoría:** Marketing Digital, Tendencias.</p>
                    
                    <h3 style="border-bottom: 1px solid #bbdefb; padding-bottom: 5px; margin-bottom: 15px;">🔍 Resumen del Caso de Estudio</h3>
                    <p style="margin-bottom: 25px; line-height: 1.6;">Este post detalla nuestra estrategia de marketing en redes sociales que nos llevó a **4,270 interacciones (me gusta + compartidos + comentarios)** en solo una semana. El núcleo de la estrategia se basó en la **Escucha Activa del Mercado (Social Listening)**, identificando micro-tendencias y creando contenido hiper-relevante en tiempo real.</p>

                    <div style="display: flex; justify-content: space-around; margin-bottom: 30px; text-align: center; background-color: white; padding: 15px; border-radius: 6px;">
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #4CAF50;">4,270</strong>
                            <span style="font-size: 0.9rem; color: #666;">Interacciones Totales</span>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #FF9800;">7 días</strong>
                            <span style="font-size: 0.9rem; color: #666;">Duración de la Campaña</span>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #2196F3;">92%</strong>
                            <span style="font-size: 0.9rem; color: #666;">Tasa de Retención Media</span>
                        </div>
                    </div>

                    <h3 style="border-bottom: 1px solid #bbdefb; padding-bottom: 5px; margin-bottom: 15px;">🛠️ Aplica esta Estrategia a tu Proyecto</h3>
                    <button onclick="simulateAddToProject('Listen Hour')" id="btn-p4270" class="submit-btn" style="background-color: var(--secondary-color); color: white; padding: 12px 20px; border: none; border-radius: 5px; font-weight: bold; width: 100%;">
                        ➕ Añadir Estrategia a Mis Proyectos (Teoría de Escucha Activa)
                    </button>
                    <p id="message-p4270" style="margin-top: 10px; color: var(--secondary-color); font-weight: bold; display: none; text-align: center;"></p>
                    
                    <button onclick="resetViewToDefault()" style="margin-top: 20px; padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Volver al Feed Principal</button>
                </div>
            ` 
        },

        // **********************************************************
        // * POST P126K: LOVER FOUR (OPTIMIZADO) *
        // **********************************************************
        'P126K': { 
            title: 'Caso de Éxito: Lover Four - Inversión Mínima, Impacto Máximo', 
            details: `
                <div style="padding: 20px; border: 1px solid var(--secondary-color); border-radius: 8px; background-color: #e8f5e9; max-width: 900px; margin: 0 auto;">
                    <h2 style="color: var(--secondary-color); margin-bottom: 10px;">🌟 Lover Four: Estrategia de Retención para 126K de Impacto</h2>
                    <p style="font-style: italic; color: var(--light-text); margin-bottom: 20px;">**Empresa/Usuario:** Global Ventures | **Categoría:** Finanzas, Retención de Clientes.</p>
                    
                    <h3 style="border-bottom: 1px solid #c8e6c9; padding-bottom: 5px; margin-bottom: 15px;">💰 Resumen Financiero y de Crecimiento</h3>
                    <p style="margin-bottom: 25px; line-height: 1.6;">Un resumen de cómo una pequeña inversión inicial puede generar **126K de interacción y valor retenido**. Este caso de éxito se basa en la optimización de los **primeros cuatro puntos de contacto (Lover Four)** del cliente. Al mejorar estos puntos, la tasa de abandono se redujo en un 40%.</p>

                    <div style="display: flex; justify-content: space-around; margin-bottom: 30px; text-align: center; background-color: white; padding: 15px; border-radius: 6px;">
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #FF9800;">$5,000</strong>
                            <span style="font-size: 0.9rem; color: #666;">Inversión Inicial de Marketing</span>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #2196F3;">126K</strong>
                            <span style="font-size: 0.9rem; color: #666;">Valor de Retención Anual (ARV)</span>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #EF5350;">-40%</strong>
                            <span style="font-size: 0.9rem; color: #666;">Reducción de Abandono (Churn)</span>
                        </div>
                    </div>

                    <h3 style="border-bottom: 1px solid #c8e6c9; padding-bottom: 5px; margin-bottom: 15px;">🛠️ Aplica esta Estrategia a tu Proyecto</h3>
                    <button onclick="simulateAddToProject('Lover Four')" id="btn-p126k" class="submit-btn" style="background-color: var(--secondary-color); color: white; padding: 12px 20px; border: none; border-radius: 5px; font-weight: bold; width: 100%;">
                        ➕ Añadir Estrategia a Mis Proyectos (Optimización de Contacto)
                    </button>
                    <p id="message-p126k" style="margin-top: 10px; color: var(--secondary-color); font-weight: bold; display: none; text-align: center;"></p>
                    
                    <button onclick="resetViewToDefault()" style="margin-top: 20px; padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Volver al Feed Principal</button>
                </div>
            ` 
        },

        // **********************************************************
        // * POST Pimg-03: POST DE EMPRENDIMIENTO (NUEVO OPTIMIZADO) *
        // **********************************************************
        'Pimg-03': { 
            title: 'Análisis Detallado: Estrategias de Financiamiento Inicial', 
            details: `
                <div style="padding: 25px; border: 1px solid var(--primary-color); border-radius: 10px; background-color: #fff3e0; max-width: 900px; margin: 0 auto;">
                    <h2 style="color: #FF9800; margin-bottom: 10px;">💸 Financiamiento Inicial: Asegurando tu Primera Ronda de Capital</h2>
                    <p style="font-style: italic; color: var(--light-text); margin-bottom: 20px;">**Empresa/Usuario:** Startup Growth S.A. | **Categoría:** Inversión, Finanzas.</p>
                    
                    <h3 style="border-bottom: 1px solid #ffcc80; padding-bottom: 5px; margin-bottom: 15px;">📊 Métricas Clave para Inversores</h3>
                    <p style="margin-bottom: 25px; line-height: 1.6;">Este post presenta un esquema de los **factores críticos** que los fondos de capital de riesgo evalúan en las etapas iniciales. La clave es mostrar **Tracción Temprana** y una **Valoración (Valuation)** realista.</p>

                    <div style="display: flex; justify-content: space-around; margin-bottom: 30px; text-align: center; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #E91E63;">$500K</strong>
                            <span style="font-size: 0.9rem; color: #666;">Meta de Financiación (Seed)</span>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #2196F3;">15%</strong>
                            <span style="font-size: 0.9rem; color: #666;">Equity Ofrecido a Inversores</span>
                        </div>
                        <div>
                            <strong style="display: block; font-size: 2rem; color: #4CAF50;">10K+</strong>
                            <span style="font-size: 0.9rem; color: #666;">Usuarios Activos Mensuales (Traction)</span>
                        </div>
                    </div>

                    <h3 style="border-bottom: 1px solid #ffcc80; padding-bottom: 5px; margin-bottom: 15px;">🛠️ Herramienta Interactiva: Plantilla de Pitch Deck</h3>
                    <button onclick="simulateDownloadPitch()" id="btn-pimg03" class="submit-btn" style="background-color: var(--primary-color); color: white; padding: 12px 20px; border: none; border-radius: 5px; font-weight: bold; width: 100%;">
                        📥 Descargar Plantilla Pitch Deck
                    </button>
                    <p id="message-pimg03" style="margin-top: 10px; color: #E91E63; font-weight: bold; display: none; text-align: center;"></p>
                    
                    <button onclick="resetViewToDefault()" style="margin-top: 25px; padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer; width: 100%;">Volver al Feed Principal</button>
                </div>
            ` 
        },

        'Pimg-04': { 
            title: 'Lista de Cursos Disponibles', 
            details: '<div id="dynamic-course-list-container">Cargando lista de cursos...</div>' 
        },
        'messages-inbox': {
            title: 'Bandeja de Entrada - Mensajes Directos (Simulado)',
            details: `
                <div style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: var(--card-background); border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: var(--secondary-color); margin-bottom: 20px;">💬 Mensajes Directos</h2>
                    <p style="font-style: italic; color: var(--light-text); margin-bottom: 15px;">Selecciona una conversación para ver el historial y responder:</p>
                    
                    <ul style="list-style: none; padding: 0;">
                        <li onclick="simulateRedirection('Chat', 'M-StartupX')" class="message-item" style="padding: 15px; margin-bottom: 10px; border-left: 5px solid #2196F3; background-color: #f0f8ff; border-radius: 5px; cursor: pointer;">
                            <strong>StartupX Funders</strong> <span style="float: right; color: #2196F3;">(1 Nuevo)</span>
                            <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">*Tu proyecto [Fintech] nos parece prometedor.*</p>
                        </li>
                        <li onclick="simulateRedirection('Chat', 'C-Elena')" class="message-item" style="padding: 15px; margin-bottom: 10px; border-left: 5px solid #4CAF50; background-color: #f0fff0; border-radius: 5px; cursor: pointer;">
                            <strong>Elena M. (Mentor)</strong>
                            <p style="font-size: 0.9rem; color: #666; margin-top: 5px;">*Me parece excelente. Te envío el último reporte de tendencias.*</p>
                        </li>
                    </ul>
                    <button onclick="resetViewToDefault()" class="submit-btn" style="margin-top: 30px; background-color: var(--primary-color); width: 100%;">Volver al Feed Principal</button>
                </div>
            `
        },
        'default': { title: 'Contenido No Especificado', details: 'No hay información detallada disponible para este identificador.' },
        'M-StartupX': {
            title: 'Conversación con StartupX Funders',
            details: (
                `<h2 style="color: var(--primary-color); margin-bottom: 1rem;">Conversación con StartupX Funders</h2>
                <div class="chat-log" data-chat-id="M-StartupX" style="height: 300px; overflow-y: auto; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #fafafa; margin-bottom: 15px;">
                    <p class="chat-message received" style="padding: 8px 12px; border-radius: 18px; margin-bottom: 10px; max-width: 70%; line-height: 1.4; font-size: 0.95rem; background-color: #e0e0e0; color: #333; margin-right: auto;">**StartupX Funders:** Hola, tu proyecto [Fintech] nos parece prometedor.</p>
                </div>
                <div class="chat-input-area" style="display: flex; gap: 10px; margin-top: 15px;">
                    <input type="text" id="input-M-StartupX" placeholder="Escribe un mensaje..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; background-color: #f5f5f5;"> 
                    <button onclick="sendMessageSimulated('M-StartupX')" style="padding: 10px 20px; background-color: var(--secondary-color); color: white; border: none; border-radius: 20px; cursor: pointer;">Enviar</button> 
                </div>
                <button onclick="simulateRedirection('Bandeja de Entrada', 'messages-inbox')" style="margin-top: 20px; padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Volver a la Bandeja</button>`
            )
        },
        'C-Elena': {
            title: 'Chat con Elena M. (Mentor)',
            details: (
                `<h2 style="color: var(--primary-color); margin-bottom: 1rem;">Chat con Elena M. (Mentor)</h2>
                <div class="chat-log" data-chat-id="C-Elena" style="height: 300px; overflow-y: auto; padding: 10px; border: 1px solid #ddd; border-radius: 8px; background-color: #fafafa; margin-bottom: 15px;">
                    <p class="chat-message received" style="padding: 8px 12px; border-radius: 18px; margin-bottom: 10px; max-width: 70%; line-height: 1.4; font-size: 0.95rem; background-color: #e0e0e0; color: #333; margin-right: auto;">**Elena M.:** Me parece excelente. Te envío el último reporte de tendencias.</p>
                </div>
                <div class="chat-input-area" style="display: flex; gap: 10px; margin-top: 15px;">
                    <input type="text" id="input-C-Elena" placeholder="Escribe un mensaje..." style="flex-grow: 1; padding: 10px; border: 1px solid #ddd; border-radius: 20px; background-color: #f5f5f5;">
                    <button onclick="sendMessageSimulated('C-Elena')" style="padding: 10px 20px; background-color: var(--secondary-color); color: white; border: none; border-radius: 20px; cursor: pointer;">Enviar</button>
                </div>
                <button onclick="simulateRedirection('Bandeja de Entrada', 'messages-inbox')" style="margin-top: 20px; padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Volver a la Bandeja</button>`
            )
        }
    };


    // **********************************************************
    // * FUNCIONES DINÁMICAS INTERACTIVAS *
    // **********************************************************

    // --- 1. FUNCIÓN: AÑADIR A PROYECTOS (para P4270 y P126K) ---
    window.simulateAddToProject = function(strategyName) {
        const postId = strategyName === 'Listen Hour' ? 'p4270' : 'p126k';
        const button = document.getElementById(`btn-${postId}`);
        const messageElement = document.getElementById(`message-${postId}`);
        
        if (button.disabled) return; 

        projectCount++;

        button.disabled = true;
        button.style.backgroundColor = '#6c757d';
        button.textContent = `✅ Añadido (Proyecto #${projectCount})`;
        
        messageElement.textContent = `Estrategia de "${strategyName}" guardada en tus Proyectos (${projectCount} proyectos activos). ¡A implementarla!`;
        messageElement.style.display = 'block';

        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
        
        console.log(`Estrategia "${strategyName}" añadida a proyectos.`);
    }

    // --- 2. FUNCIÓN: DESCARGAR PLANTILLA (para Pimg-03) ---
    window.simulateDownloadPitch = function() {
        const button = document.getElementById('btn-pimg03');
        const messageElement = document.getElementById('message-pimg03');
        
        if (button.disabled) return; 

        button.disabled = true;
        button.style.backgroundColor = '#4CAF50';
        button.textContent = `⬇️ Plantilla Descargada (¡Revisa tus archivos!)`;
        
        messageElement.textContent = `¡Plantilla de Pitch Deck descargada con éxito! Revisa la sección 'Archivos' para empezar a trabajar en tu ronda de capital.`;
        messageElement.style.display = 'block';

        setTimeout(() => {
            messageElement.style.display = 'none';
            // Restablecer el botón después de la descarga
            button.disabled = false;
            button.style.backgroundColor = 'var(--primary-color)';
            button.textContent = '📥 Descargar Plantilla Pitch Deck';
        }, 5000);
        
        console.log(`Plantilla de Pitch Deck descargada simuladamente.`);
    }


    // **********************************************************
    // * FUNCIONES DINÁMICAS PARA GUARDADOS *
    // **********************************************************

    function renderSavedPosts() {
        const postKeys = Object.keys(savedPostsData);
        let listHTML = `<h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">⭐ Mis Publicaciones Guardadas</h2>`;
        
        if (postKeys.length === 0) {
            listHTML += `
                <div style="padding: 20px; border: 1px dashed #ddd; border-radius: 8px; background-color: #fff;">
                    <p style="text-align: center; color: var(--light-text);">Aún no has guardado ninguna publicación. Sube tu primer emprendimiento para verlo aquí.</p>
                    <button onclick="simulateRedirection('Subir Contenido', 'upload')" style="margin-top: 15px; padding: 10px 15px; background-color: var(--secondary-color); color: white; border: none; border-radius: 5px; cursor: pointer; display: block; width: 50%; margin: 15px auto 0;">
                        Ir a Subir Contenido
                    </button>
                </div>
            `;
        } else {
            listHTML += `<ul style="list-style-type: none; padding: 0;">`;
            
            postKeys.forEach(id => {
                const post = savedPostsData[id];
                listHTML += `
                    <li onclick="simulateRedirection('Post Guardado Detalle', '${id}')" style="padding: 15px; margin-bottom: 12px; background-color: #f0f8ff; border-left: 5px solid var(--primary-color); border-radius: 5px; cursor: pointer; transition: background 0.2s;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="display: block; font-size: 1.1rem; color: var(--text-color);">📑 ${post.title}</strong>
                                <span style="font-size: 0.9rem; color: var(--light-text);">Tipo: Emprendimiento | Archivos: ${post.fileCount}</span>
                            </div>
                            <button onclick="event.stopPropagation(); removeSavedPost('${id}')" style="background-color: #e57373; color: white; border: none; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                                Quitar
                            </button>
                        </div>
                    </li>
                `;
            });

            listHTML += `</ul>`;
        }

        listHTML += `
            <button onclick="resetViewToDefault()" style="margin-top: 30px; padding: 10px 20px; background-color: var(--secondary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">
                Volver al Feed Principal
            </button>
        `;
        return listHTML;
    }

    window.removeSavedPost = function(id) {
        if (confirm(`¿Estás seguro de que quieres quitar "${dataStore[id].title}" de tus Guardados?`)) {
            delete savedPostsData[id];
            simulateRedirection('Lista de Guardados', 'saved-posts');
            alert(`✅ Post quitado de la lista de guardados.`);
        }
    }
    
    // **********************************************************
    // * FUNCIONES DINÁMICAS PARA ÁREA DE ADMINISTRACIÓN *
    // **********************************************************

    function generateUserListHtml(filter) {
        let usersArray = Object.keys(userData).map(key => ({ id: key, ...userData[key] }));

        if (filter !== 'all') {
            usersArray = usersArray.filter(user => user.status === filter);
        }

        const userListHtml = usersArray.map(user => `
            <li style="padding: 15px; margin-bottom: 10px; background-color: #f7f7f7; border-left: 5px solid ${user.status === 'suspended' ? '#EF5350' : user.status === 'pending' ? '#FFC107' : '#4CAF50'}; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                <div style="flex-grow: 1;">
                    <strong style="display: block; font-size: 1.1rem; color: var(--text-color);">${user.name}</strong>
                    <span style="font-size: 0.9rem; color: #555;">Email: ${user.email} | Posts: ${user.posts}</span>
                    <span style="display: block; font-size: 0.85rem; color: var(--light-text); margin-top: 5px;">Última Conexión: ${user.lastLogin}</span>
                </div>
                <div style="text-align: right;">
                    <span style="font-weight: bold; padding: 5px 10px; border-radius: 15px; background-color: ${user.status === 'suspended' ? '#EF5350' : user.status === 'pending' ? '#FFC107' : '#4CAF50'}20; color: ${user.status === 'suspended' ? '#EF5350' : user.status === 'pending' ? '#FFC107' : '#4CAF50'};">
                        ${user.status.charAt(0).toUpperCase() + user.status.slice(1).replace('pending', 'Pendiente')}
                    </span>
                    <button onclick="toggleUserStatus('${user.id}')" 
                            style="margin-left: 10px; padding: 8px 15px; border: none; border-radius: 4px; cursor: pointer; background-color: ${user.status === 'active' || user.status === 'pending' ? '#d32f2f' : '#4CAF50'}; color: white; font-weight: bold; transition: background-color 0.2s;">
                        ${user.status === 'active' || user.status === 'pending' ? 'Suspender' : 'Activar'}
                    </button>
                </div>
            </li>
        `).join('');
        
        return usersArray.length > 0 ? userListHtml : '<li style="padding: 15px; background-color: #ffebee; border-left: 5px solid #d32f2f; border-radius: 4px;">No hay usuarios que coincidan con el filtro actual.</li>';
    }


    window.updateUserList = function(filter) {
        adminState.filter = filter;
        const userListElement = document.getElementById('admin-user-list');
        const filterButtons = document.querySelectorAll('.admin-filter-btn');
        
        if (userListElement) {
            userListElement.innerHTML = generateUserListHtml(filter);

            filterButtons.forEach(btn => {
                const match = btn.getAttribute('onclick').match(/'(.*?)'/);
                const btnFilter = match ? match[1] : null; 
                
                if (btnFilter === filter) {
                    btn.style.backgroundColor = 'var(--primary-color)';
                    btn.style.color = 'white';
                } else {
                    btn.style.backgroundColor = 'white';
                    btn.style.color = 'var(--text-color)';
                }
            });
            console.log(`Filtro de Área Admin cambiado a: ${filter}`);
        } else {
            simulateRedirection('Área de Administración', 'admin-area');
        }
    }

    window.renderAdminArea = function(filter = 'all') {
        const totalUsers = Object.keys(userData).length;
        
        const htmlContent = `
            <div id="admin-main-container" style="max-width: 900px; margin: 0 auto; padding: 30px; background-color: var(--card-background); border-radius: 10px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
                <h2 style="color: var(--primary-color); margin-bottom: 15px;">⚙️ Panel de Control - Administración de Usuarios</h2>
                <p style="font-style: italic; color: var(--light-text); margin-bottom: 20px;">Gestión de suspensiones, activaciones y revisión de cuentas (Total de usuarios: ${totalUsers}).</p>

                <div style="margin-bottom: 25px; display: flex; gap: 10px; align-items: center; padding: 10px; background-color: #e9eef5; border-radius: 4px;">
                    <strong style="color: var(--light-text);">Filtrar por estado:</strong>
                    <button onclick="updateUserList('all')" class="admin-filter-btn" style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${filter === 'all' ? 'var(--primary-color)' : 'white'}; color: ${filter === 'all' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer;">Todos</button>
                    <button onclick="updateUserList('active')" class="admin-filter-btn" style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${filter === 'active' ? 'var(--primary-color)' : 'white'}; color: ${filter === 'active' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer;">Activos</button>
                    <button onclick="updateUserList('pending')" class="admin-filter-btn" style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${filter === 'pending' ? 'var(--primary-color)' : 'white'}; color: ${filter === 'pending' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer;">Pendientes</button>
                    <button onclick="updateUserList('suspended')" class="admin-filter-btn" style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${filter === 'suspended' ? 'var(--primary-color)' : 'white'}; color: ${filter === 'suspended' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer;">Suspendidos</button>
                </div>

                <ul id="admin-user-list" style="list-style-type: none; padding: 0;">
                    ${generateUserListHtml(filter)}
                </ul>

                <button onclick="resetViewToDefault()" style="margin-top: 30px; padding: 12px 20px; background-color: var(--secondary-color); color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%;">Volver al Feed Principal</button>
            </div>
        `;
        
        return htmlContent;
    }

    window.toggleUserStatus = function(userId) {
        const user = userData[userId];
        if (!user) return;

        let action, newStatus;

        if (user.status === 'active' || user.status === 'pending') {
            action = 'suspender';
            newStatus = 'suspended';
        } else {
            action = 'activar';
            newStatus = 'active';
        }
        
        if (confirm(`¿Estás seguro de que quieres ${action} la cuenta de ${user.name}?`)) {
            user.status = newStatus;
            alert(`✅ Cuenta de ${user.name} ${newStatus === 'suspended' ? 'suspendida' : 'activada'} con éxito.`);
            updateUserList(adminState.filter); 
        }
    }
    
    // **********************************************************
    // * FUNCIONES DINÁMICAS DE MENSAJES Y CURSOS (Mantenido) *
    // **********************************************************

    window.sendMessageSimulated = function(chatType) {
        const inputId = `input-${chatType}`;
        const chatInput = document.getElementById(inputId);
        const messageText = chatInput.value.trim(); 
        if (messageText === "") {
            alert("No puedes enviar un mensaje vacío.");
            return;
        }
        const chatLog = document.querySelector(`.chat-log[data-chat-id="${chatType}"]`);
        if (chatLog) {
            const newMessage = document.createElement('p');
            newMessage.className = 'chat-message sent';
            newMessage.style.cssText = 'padding: 8px 12px; border-radius: 18px; margin-bottom: 10px; max-width: 70%; line-height: 1.4; font-size: 0.95rem; background-color: #2196F3; color: white; margin-left: auto; text-align: right;';
            newMessage.innerHTML = `**Tú:** ${messageText}`;
            chatLog.appendChild(newMessage);
            chatInput.value = '';
            chatLog.scrollTop = chatLog.scrollHeight; 
            console.log(`Mensaje enviado en chat ${chatType}: "${messageText}"`);
            
            // Respuesta automática simulada
            setTimeout(() => {
                const autoResponse = document.createElement('p');
                autoResponse.className = 'chat-message received';
                autoResponse.style.cssText = 'padding: 8px 12px; border-radius: 18px; margin-bottom: 10px; max-width: 70%; line-height: 1.4; font-size: 0.95rem; background-color: #e0e0e0; color: #333; margin-right: auto;';
                let senderName = chatType === 'M-StartupX' ? 'StartupX Funders' : 'Elena M.';
                autoResponse.innerHTML = `**${senderName} (Automático):** Recibido. Analizando tu último comentario.`;
                chatLog.appendChild(autoResponse);
                chatLog.scrollTop = chatLog.scrollHeight;
            }, 1500);
        }
    }

    // --- FUNCIÓN: RENDERING DINÁMICO DE LA LISTA DE CURSOS (Pimg-04) ---
    window.renderCourseList = function(sortBy = 'enrollments') {
        let coursesArray = Object.keys(courseData).map(key => ({ id: key, ...courseData[key] }));

        if (sortBy === 'rating') {
            coursesArray.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'enrollments') {
            coursesArray.sort((a, b) => b.enrollments - a.enrollments);
        } else if (sortBy === 'name') {
            coursesArray.sort((a, b) => a.name.localeCompare(b.name));
        }

        const courseListHtml = coursesArray.map(course => `
            <li onclick="simulateRedirection('Curso Detalle', '${course.id}')" 
                style="padding: 15px; margin-bottom: 12px; background-color: white; border-left: 5px solid ${course.color}; cursor: pointer; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <strong style="display: block; font-size: 1.1rem; color: var(--text-color);">${course.name}</strong>
                        <span style="display: block; font-size: 0.85rem; color: var(--light-text); margin-top: 5px;">
                            ${course.duration} | ${course.tag} | ⭐ ${course.rating} | Inscritos: ${course.enrollments.toLocaleString()}
                        </span>
                    </div>
                    <span style="font-size: 1.2rem; color: var(--primary-color);">▶️</span>
                </div>
            </li>
        `).join('');

        const htmlContent = `
            <div style="max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f0f0f5; border-radius: 8px;">
                <h3 style="color: var(--primary-color); margin-bottom: 15px;">Cursos Disponibles para Emprendedores</h3>
                
                <div style="margin-bottom: 20px; display: flex; gap: 10px; align-items: center; padding: 10px; background-color: #e9eef5; border-radius: 4px;">
                    <strong style="color: var(--light-text);">Ordenar por:</strong>
                    <button onclick="renderCourseList('enrollments')" 
                            style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${sortBy === 'enrollments' ? 'var(--primary-color)' : 'white'}; color: ${sortBy === 'enrollments' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        Más Populares
                    </button>
                    <button onclick="renderCourseList('rating')" 
                            style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${sortBy === 'rating' ? 'var(--primary-color)' : 'white'}; color: ${sortBy === 'rating' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        Mejor Calificados
                    </button>
                    <button onclick="renderCourseList('name')" 
                            style="padding: 8px 12px; border: none; border-radius: 20px; background-color: ${sortBy === 'name' ? 'var(--primary-color)' : 'white'}; color: ${sortBy === 'name' ? 'white' : 'var(--text-color)'}; font-weight: bold; cursor: pointer; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        Alfabético
                    </button>
                </div>

                <ul id="course-list-dynamic" style="list-style-type: none; padding: 0;">
                    ${courseListHtml}
                </ul>
                <p style="margin-top: 20px; font-size: 0.9rem; color: var(--light-text);">Haz clic en cualquier curso para ver los detalles y contactar al creador.</p>
            </div>
        `;
        
        if (simulatedContentDiv) {
            simulatedContentDiv.innerHTML = htmlContent;
        } 
    }

    // --- FUNCIÓN: CREACIÓN DINÁMICA DE DETALLES DE CURSO (C-XXX) ---
    function renderCourseDetails(courseId) {
        const course = courseData[courseId];
        
        if (!course) return dataStore['default'].details;

        return `
            <div style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9; max-width: 800px; margin: 0 auto;">
                <h2 style="color: ${course.color}; margin-bottom: 10px;">${course.name}</h2>
                <div style="margin-bottom: 15px; font-size: 0.95rem; color: var(--light-text);">
                    <strong>Creador:</strong> ${course.creator} | 
                    <strong>Duración:</strong> ${course.duration} | 
                    <strong>Rating:</strong> ⭐ ${course.rating} (${course.enrollments.toLocaleString()} inscritos)
                </div>
                
                <p style="margin-bottom: 25px; line-height: 1.6;">${course.details}</p>
                
                <div id="inquiry-area-${courseId}" style="margin-top: 20px; padding: 15px; border: 1px dashed ${course.color}; border-radius: 6px; background-color: ${courseId === 'C-ACR' ? '#fff8e1' : courseId === 'C-Neumo' ? '#e8f5e9' : '#e3f2fd'};">
                    <h4 style="color: ${course.color}; margin-bottom: 10px;">💬 Haz una Pregunta al Creador (Empresario)</h4>
                    <textarea id="inquiry-input-${courseId}" placeholder="Escribe tu consulta sobre el curso (Ej: ¿El curso cubre la última versión de software?)" rows="3" style="width: 100%; padding: 10px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 4px; resize: vertical;"></textarea>
                    <button onclick="simulateCreatorInquiry('${courseId}', '${course.creator}')" class="submit-btn" style="background-color: ${course.color}; color: white; padding: 8px 15px; border: none; border-radius: 4px; font-weight: bold;">
                        Enviar Consulta Ahora
                    </button>
                    <p id="inquiry-message-${courseId}" style="margin-top: 10px; color: var(--primary-color); font-weight: bold; display: none;"></p>
                </div>
                
                <button onclick="simulateRedirection('Lista de Cursos', 'Pimg-04')" style="margin-top: 25px; padding: 10px 20px; background-color: #6c757d; color: white; border: none; border-radius: 5px; cursor: pointer;">Volver al Catálogo</button>
            </div>
        `;
    }

    // --- FUNCIÓN: INTERACCIÓN IN-SITU CON EL EMPRESARIO ---
    window.simulateCreatorInquiry = function(courseId, creatorName) {
        const inputElement = document.getElementById(`inquiry-input-${courseId}`);
        const messageElement = document.getElementById(`inquiry-message-${courseId}`);
        const button = messageElement.previousElementSibling;
        const inquiryText = inputElement.value.trim();

        if (inquiryText.length < 10) {
            alert("Por favor, escribe una consulta más detallada (mínimo 10 caracteres).");
            return;
        }

        messageElement.textContent = `✅ ¡Consulta enviada a ${creatorName}! Recibirás una respuesta en tu bandeja de entrada (mensajes) en breve.`;
        messageElement.style.display = 'block';
        inputElement.value = '';

        button.disabled = true;
        button.textContent = 'Enviando...';
        
        setTimeout(() => {
            button.disabled = false;
            button.textContent = 'Enviar Consulta Ahora';
            messageElement.style.display = 'none'; 
        }, 4000);
        
        console.log(`Consulta de curso enviada a ${creatorName} desde la misma página: "${inquiryText}"`);
    }

    // **********************************************************
    // * RESTO DE FUNCIONES (Navegación, Búsqueda, etc.) *
    // **********************************************************
    
    // --- FUNCIÓN DE LIMPIEZA GENERAL Y VISTA PREDETERMINADA ---
    window.resetViewToDefault = function() {
        if (simulatedContentDiv) {
            simulatedContentDiv.remove();
            simulatedContentDiv = null;
        }

        mainContentArea.classList.remove('hide-default');
        uploadFormSection.classList.add('hidden-section');
        uploadFormSection.style.display = 'none';

        defaultSections.forEach(section => section.style.display = '');
        
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[data-section="home"]').classList.add('active');
    }
    
    // --- FUNCIÓN DE REDIRECCIÓN SIMULADA (CENTRAL) ---
    window.simulateRedirection = function(type, identifier) {
        
        defaultSections.forEach(section => section.style.display = 'none');
        uploadFormSection.classList.add('hidden-section');
        uploadFormSection.style.display = 'none';
        mainContentArea.classList.add('hide-default');
        
        if (identifier === 'upload') {
            uploadFormSection.classList.remove('hidden-section');
            uploadFormSection.style.display = 'flex';
            if (simulatedContentDiv) {
                simulatedContentDiv.remove();
                simulatedContentDiv = null;
            }
            return;
        }
        
        if (!simulatedContentDiv) {
            simulatedContentDiv = document.createElement('div');
            simulatedContentDiv.style.cssText = 'grid-column: 1 / 4; padding: 2rem; width: 100%;';
            mainContentArea.appendChild(simulatedContentDiv);
        }
        
        const contentData = dataStore[identifier] || dataStore['default'];
        let contentHTML;

        // CASOS ESPECIALES Y DINÁMICOS
        if (identifier === 'Pimg-04') {
            simulatedContentDiv.innerHTML = contentData.details;
            renderCourseList('enrollments'); 
            return;
        } else if (identifier.startsWith('C-')) {
            contentHTML = renderCourseDetails(identifier);
        } else if (identifier === 'saved-posts') { 
            contentHTML = renderSavedPosts();
        } else if (identifier === 'admin-area') {
            contentHTML = renderAdminArea(adminState.filter); // Usar el filtro actual
        } else if (contentData.details && (typeof contentData.details === 'string' && contentData.details.includes('<div'))) {
            contentHTML = contentData.details;
        } else {
            const removeBtn = savedPostsData[identifier] ? 
                `<button onclick="event.stopPropagation(); removeSavedPost('${identifier}')" style="margin-top: 10px; padding: 10px 20px; background-color: #d32f2f; color: white; border: none; border-radius: 5px; cursor: pointer; display: block; width: 100%;">
                    Quitar de Guardados
                </button>` : '';

            contentHTML = `
                <h2 class="js-title" style="color: var(--primary-color);">¡${contentData.title}!</h2>
                <p class="js-content"><strong>Tipo de Contenido:</strong> ${type}<br><strong>Identificador:</strong> ${identifier}<br><br>${contentData.details}</p>
                ${removeBtn}
                <button onclick="resetViewToDefault()" style="margin-top: 20px; padding: 10px 20px; background-color: var(--primary-color); color: white; border: none; border-radius: 5px; cursor: pointer;">Volver al Feed Principal</button>
            `;
        }

        simulatedContentDiv.innerHTML = contentHTML;
        
        console.log(`Acceso simulado a: ${type} - ${identifier}`);
    }


    // --- 2. NAVEGACIÓN PRINCIPAL y QUICK LINKS ---
    document.addEventListener('click', (e) => {
        let target = e.target;
        
        if (target.closest('.nav-item')) {
            e.preventDefault();
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            target.closest('.nav-item').classList.add('active');
            target = target.closest('.nav-item');
        } else if (target.closest('.quick-links a')) {
             e.preventDefault();
             target = target.closest('.quick-links a');
        } else if (target.closest('.post-card')) {
             target = target.closest('.post-card');
        } else if (target.closest('.explore-item')) {
             target = target.closest('.explore-item');
        }

        let sectionName = target.getAttribute('data-section') || target.getAttribute('data-course-id') || target.getAttribute('data-post-id');
        
        if (!sectionName) {
            if (target.id === 'notifications-btn') sectionName = 'alerts-list';
            else if (target.id === 'messages-btn') sectionName = 'messages-inbox';
            else if (target.id === 'user-profile-btn' || target.closest('#user-profile-btn')) sectionName = 'my-profile';
        }

        if (sectionName) {
            if (sectionName === 'home') {
                resetViewToDefault(); 
                return; 
            }
            
            let targetId = sectionName;
            let targetType = 'Sección Principal';
            
            if (sectionName === 'courses') {
                targetId = 'Pimg-04'; 
            }

            if (targetId === 'Pimg-04') targetType = 'Lista de Cursos'; 
            else if (targetId.startsWith('P') || targetId.startsWith('P-USR')) targetType = 'Post Detalle';
            else if (targetId.startsWith('C')) targetType = 'Curso Detalle';
            else if (targetId === 'alerts-list') targetType = 'Notificaciones';
            else if (targetId === 'messages-inbox') targetType = 'Bandeja de Entrada';
            else if (targetId === 'my-profile') targetType = 'Perfil de Usuario'; 
            else if (targetId === 'saved-posts') targetType = 'Lista de Guardados'; 
            else if (targetId === 'admin-area') targetType = 'Área de Administración'; 
            
            simulateRedirection(targetType, targetId);
        }
    });

    // --- 3. LÓGICA DEL FORMULARIO DE SUBIDA ---
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('title').value.trim();
        const description = document.getElementById('description').value.trim() || 'Sin descripción.';
        const files = document.getElementById('files').files;

        if (files.length === 0) {
            uploadMessage.textContent = 'ERROR: Debes adjuntar al menos un archivo.';
            uploadMessage.style.color = 'red';
            uploadMessage.classList.remove('upload-message-hidden');
            return;
        }
        
        const newPostId = `P-USR-${uploadedPostCounter++}`;
        const uploadDate = new Date().toLocaleDateString('es-ES');

        const newPost = {
            title: `Post Subido: ${title}`,
            details: `<strong>Empresa/Usuario:</strong> Nowisfero (Tú)<br>
                      <strong>Descripción:</strong> ${description}<br>
                      <strong>Archivos Adjuntos:</strong> ${files.length}<br>
                      <strong>Fecha de Subida:</strong> ${uploadDate}<br>
                      Este contenido ha sido guardado automáticamente en tu sección "Guardados".`
        };

        dataStore[newPostId] = newPost;
        
        savedPostsData[newPostId] = {
            title: title,
            fileCount: files.length,
            date: uploadDate
        };

        uploadMessage.textContent = `¡Emprendimiento "${title}" enviado y guardado con ${files.length} archivos! Será revisado pronto.`;
        uploadMessage.style.color = 'green';
        uploadMessage.classList.remove('upload-message-hidden');
        
        uploadForm.reset();
        
        console.log(`Subida simulada: ${title} con ${files.length} archivos. ID generado: ${newPostId}. Agregado a Guardados.`);
    });


    // --- 4. FUNCIONALIDAD DEL BUSCADOR ---
    const searchInput = document.getElementById('feed-search-input');
    const searchBtn = document.getElementById('search-icon-btn');

    function handleSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase(); 
        
        if (!searchTerm) {
            alert('Por favor, ingresa un término de búsqueda.');
            return;
        }

        if (searchMap[searchTerm]) {
            const targetId = searchMap[searchTerm];
            
            if (targetId === 'home') {
                resetViewToDefault(); 
            } else {
                let targetType = 'Búsqueda Rápida';
                
                if (targetId === 'Pimg-04') targetType = 'Lista de Cursos'; 
                else if (targetId === 'my-profile') targetType = 'Perfil de Usuario'; 
                else if (targetId === 'messages-inbox') targetType = 'Bandeja de Entrada';
                else if (targetId === 'alerts-list') targetType = 'Notificaciones';
                else if (targetId.startsWith('P') || targetId.startsWith('P-USR')) targetType = 'Post Detalle';
                else if (targetId.startsWith('C')) targetType = 'Curso Detalle';
                else if (targetId === 'saved-posts') targetType = 'Lista de Guardados';
                else if (targetId === 'admin-area') targetType = 'Área de Administración'; 
                
                simulateRedirection(targetType, targetId);
            }
        } else {
            resetViewToDefault();
            alert(`Búsqueda simulada para: "${searchTerm}". No se encontró coincidencia directa.`);
        }
        
        searchInput.value = ''; 
    }

    searchBtn.addEventListener('click', handleSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });
    
    uploadFormSection.classList.add('hidden-section');
    uploadFormSection.style.display = 'none';

    // --- FUNCIÓN DINÁMICA DE PERFIL (Edición) ---
    window.simulateEditProfile = function() {
        const profileBioElement = document.getElementById('profile-bio');
        const currentBio = profileBioElement ? profileBioElement.textContent.trim() : '';
        const newBio = prompt(`Edita tu biografía actual:\n"${currentBio}"`, currentBio);
        if (newBio !== null && newBio.trim() !== "" && newBio.trim() !== currentBio) {
            profileBioElement.textContent = newBio.trim();
            alert('✅ ¡Perfil actualizado simulado con éxito!');
        } else if (newBio !== null) {
            alert('❌ Edición cancelada o biografía sin cambios.');
        }
    }

});