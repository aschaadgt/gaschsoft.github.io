(function () {
      const elHtml = document.documentElement;

      const ASSETS = {
        brand: { light: "/newgaschsoft/Logos/Ico GaschSoft.png", dark: "/newgaschsoft/Logos/Ico GaschSoft - dark.png" },
        langIcon: { light: "/newgaschsoft/Logos/idiomas.png", dark: "/newgaschsoft/Logos/idiomas - dark.png" },
        demo: { light: "/newgaschsoft/Logos/agendar.png", dark: "/newgaschsoft/Logos/agendar - dark.png" },
        theme: {
          system: { light: "/newgaschsoft/Logos/sistema.png", dark: "/newgaschsoft/Logos/sistema - dark.png" },
          light:  { light: "/newgaschsoft/Logos/claro.png",   dark: "/newgaschsoft/Logos/claro - dark.png" },
          dark:   { light: "/newgaschsoft/Logos/obscuro.png", dark: "/newgaschsoft/Logos/obscuro - dark.png" }
        }
      };

      const I18N = {
        es: {
          brandSub: "",
          nav: { services: "Plataforma", portfolio: "Casos", contact: "Contacto", about: "Empresa" },
          services: { auto:"Automatizaciones", web:"Desarrollo Web", it:"Soporte IT", infra:"Infraestructura", invites:"Invitaciones Web" },
          cases: { sme: "PYMEs", corp: "Corporativo", startups: "Startups" },

          pillars: {
            title: "Pilares de impacto",
            desc: "Resultados medibles para empresas que ya facturan: más conversión, menos fricción operativa y una base lista para crecer.",
            forLabel: "Diseñado para",
            for: ["PYMEs","Corporativo","Startups"],
            bulletsLabel: "Beneficios",
            items: [
              { icon:"route", text:"Automatizaciones operativas", bullets:["Reduce trabajo manual y errores","Acelera ciclos en procesos clave"] },
              { icon:"layout", text:"Web orientada a conversión", bullets:["Mensaje claro + prueba + CTA","Leads consistentes sin fricción"] },
              { icon:"handoff", text:"Continuidad y soporte", bullets:["Menos incendios y retrabajo","Handoffs claros y respuesta ordenada"] },
              { icon:"analytics", text:"Integraciones y datos", bullets:["Sistemas conectados, datos centralizados","Mejores decisiones con visibilidad"] },
              { icon:"speed", text:"Infraestructura y performance", bullets:["Velocidad y estabilidad en móvil","Buenas prácticas desde el día uno"] },
              { icon:"settings", text:"Evolución con roadmap", bullets:["Mejoras por fases sin rehacer","Prioridades claras y ejecución continua"] }
            ]
          },

          whatuse: {
            title: "Capacidades en producción",
            desc: "Estándares de ejecución y calidad que convierten tu web en un sistema mantenible, medible y escalable.",
            top: [
              { icon:"time", text:"Ahorra 500+ horas de trabajo", sub:"Automatiza tareas repetitivas para que tu equipo se enfoque en vender y operar." },
              { icon:"layout", text:"Arquitectura de mensaje que convierte", sub:"Ordenamos tu narrativa (problema → valor → prueba → CTA) para generar leads." },
              { icon:"moon", text:"Diseño corporativo consistente", sub:"Sistema visual sobrio y uniforme en toda la experiencia, sin “parches”." },
              { icon:"mobile", text:"100% móvil responsivo", sub:"Tu sitio se ve y funciona perfecto donde realmente te visitan: en el teléfono." },
              { icon:"seo", text:"SEO optimizado", sub:"Te encuentran mejor en Google y tus páginas se indexan sin fricción." },
              { icon:"spark", text:"Interacciones que guían decisiones", sub:"Microseñales que orientan al usuario y aumentan claridad sin distraer." },
              { icon:"flow", text:"Visualización de flujos de trabajo", sub:"Explicas procesos complejos en simple: pasos claros para clientes y equipo." },
              { icon:"code", text:"Evolución sin re-trabajo", sub:"Base lista para crecer sin rehacer el sitio cada vez que cambie tu negocio." },
              { icon:"settings", text:"Configuración global para actualizar fácil", sub:"Cambios de marca/copy en un punto, sin “romper” secciones por accidente." },
              { icon:"palette", text:"Personalización simple (marca, colores, copy)", sub:"Adaptamos la identidad de tu empresa sin rehacer el sitio desde cero." }
            ],
            middle: [
              { icon:"download", text:"Experiencia tipo app (opcional)", sub:"Cuando aporta valor, habilitamos instalación y comportamiento tipo app." },
              { icon:"rocket", text:"Lanzamiento rápido y estable", sub:"Publicamos con control y sin fricción para pasar de idea a producción." },
              { icon:"spark", text:"Feedback UI/UX (toasts, estados, microcopy)", sub:"El usuario entiende qué pasó y qué sigue, reduciendo dudas y abandonos." },
              { icon:"flow", text:"Flujos guiados (pedidos, pasos y handoffs claros)", sub:"Menos fricción para comprar/solicitar, más claridad en cada paso." },
              { icon:"layout", text:"Storytelling por secciones (mensaje → prueba → CTA)", sub:"Convierte visitas en conversaciones con una narrativa lógica y persuasiva." },
              { icon:"forms", text:"Captura de leads con fricción mínima", sub:"Formularios y CTAs optimizados para que el usuario sí te contacte." },
              { icon:"shield", text:"Buenas prácticas de seguridad base", sub:"Evita configuraciones débiles y reduce superficie de errores comunes." },
              { icon:"speed", text:"Velocidad que mejora conversión", sub:"Carga rápida en móvil para reducir abandono y mejorar SEO." },
              { icon:"img", text:"Imágenes optimizadas y lazy loading", sub:"Mantienes calidad visual sin sacrificar velocidad ni consumo de datos." },
              { icon:"a11y", text:"Accesibilidad y UX consistente", sub:"Más personas pueden usar tu sitio sin barreras; experiencia uniforme en todo." }
            ],
            bottom: [
              { icon:"i18n", text:"I18N ES/EN sin dependencias", sub:"Tu web lista para clientes globales sin duplicar páginas ni complicarte." },
              { icon:"analytics", text:"Eventos de conversión medibles", sub:"Sabes qué funciona: clics, envíos, CTAs y puntos donde se cae la gente." },
              { icon:"wa", text:"Canales listos para cerrar ventas", sub:"WhatsApp y CTAs preparados para convertir conversaciones en clientes." },
              { icon:"version", text:"Versionado + rollback rápido", sub:"Cambios seguros: si algo falla, volvemos atrás sin drama ni downtime." },
              { icon:"shield", text:"Validación y anti-spam (honeypot)", sub:"Menos basura en formularios, más leads reales para tu equipo." },
              { icon:"settings", text:"Entrega por fases", sub:"Lanzamos por etapas sin romper lo ya publicado." },
              { icon:"handoff", text:"Documentación operativa para tu equipo", sub:"Tu equipo entiende cómo actualizar contenido sin depender siempre de nosotros." },
              { icon:"support", text:"Roadmap y soporte post-lanzamiento", sub:"No te dejamos “tirado”: mejoras continuas alineadas a negocio." },
              { icon:"spark", text:"Microfeedback e-commerce (carrito, confirmaciones)", sub:"Menos incertidumbre al comprar: confirmaciones claras, menos abandonos." },
              { icon:"code", text:"Sistema modular fácil de operar", sub:"Componentes claros para iterar rápido y mantener consistencia." }
            ]
          },
          hero: { badge1:"Entrega rápida", badge2:"Enfoque en conversión", badge3:"Soporte continuo", highlightsLabel:"Puntos clave", optionsLabel:"Opciones", titleA:"Tu empresa ya creció.", titleB:"Tu web debería hacerlo también.", desc:"Diseñamos presencia digital profesional para empresas establecidas que quieren proyectar autoridad, convertir mejor y escalar con una base técnica sólida.", ctaPrimary:"Agendar diagnóstico", ctaSecondary:"Ver casos", proof:"Planeamos, no improvisamos • Implementación limpia • Sin rehacer todo en un año • Preparada para crecer",heroVariants:[
  { titleA:"Tu empresa ya creció sólidamente.", titleB:"Tu web debería hacerlo también.", desc:"Diseñamos presencia digital profesional para empresas establecidas que quieren proyectar autoridad, convertir mejor y escalar con una base técnica sólida.", proof:"Planeamos, no improvisamos • Implementación limpia • Sin rehacer en un año • Preparada para crecer", dash:"growth" },
  { titleA:"Infraestructura web para empresas", titleB:"que ya facturan y quieren crecer más.", desc:"Diseño profesional respaldado por una arquitectura sólida, preparada para integraciones, estabilidad operativa y evolución sostenida.", proof:"Base mantenible • Integraciones listas • Seguridad estructural • Escalabilidad real", dash:"infra" },
  { titleA:"Modernizamos la presencia digital", titleB:"de empresas que ya operan en serio.", desc:"Sitios profesionales diseñados para convertir mejor, proyectar autoridad y escalar sobre una arquitectura técnica sólida y mantenible.", proof:"Diseño sobrio • Performance medible • SEO estructural • Mobile impecable", dash:"modern" },
  { titleA:"Tu empresa ya creció estratégicamente.", titleB:"Tu presencia digital aún no.", desc:"Construimos una base web alineada al nivel real de tu negocio, lista para proyectar autoridad, convertir mejor y sostener crecimiento continuo.", proof:"Mensaje claro • Diagnóstico estratégico • Implementación limpia • Entrega lista para producción", dash:"gap" },
  { titleA:"No necesitas otra página web.", titleB:"Necesitas presencia online a la altura.", desc:"Proyecta autoridad, convierte mejor y evoluciona sobre una base técnica preparada para crecer junto a tu empresa sin rehacer todo desde cero.", proof:"Arquitectura sólida • Implementación estratégica • Base estable • Lista para escalar", dash:"authority" }
], sections:{ casesTitle:"Casos", casesDesc:"Ejemplos y resultados (próximamente).", contactTitle:"Contacto", contactDesc:"Cuéntanos qué necesitas y te respondemos con una propuesta clara." } }
        },
        en: {
          brandSub: "",
          nav: { services: "Platform", portfolio: "Use cases", contact: "Contact", about: "Company" },
          services: { auto:"Automations", web:"Web Development", it:"IT Support", infra:"Infrastructure", invites:"Web Invitations" },
          cases: { sme: "SMEs", corp: "Enterprise", startups: "Startups" },

          pillars: {
            title: "Impact pillars",
            desc: "Measurable outcomes for companies already generating revenue: higher conversion, less operational friction, and a foundation built to grow.",
            forLabel: "Designed for",
            for: ["SMEs","Corporate","Startups"],
            bulletsLabel: "Key outcomes",
            items: [
              { icon:"route", text:"Operational automations", bullets:["Reduce manual work and errors","Shorten cycle time in key flows"] },
              { icon:"layout", text:"Conversion-first web", bullets:["Clear message + proof + CTA","Consistent leads with less friction"] },
              { icon:"handoff", text:"Continuity & support", bullets:["Fewer fires and rework","Clean handoffs and structured response"] },
              { icon:"analytics", text:"Integrations & data", bullets:["Connected systems, centralized signals","Faster decisions with visibility"] },
              { icon:"speed", text:"Infrastructure & performance", bullets:["Fast and stable on mobile","Best practices from day one"] },
              { icon:"settings", text:"Roadmap-driven evolution", bullets:["Phased delivery without rewrites","Clear priorities and continuous execution"] }
            ]
          },

          whatuse: {
            title: "Capabilities in production",
            desc: "Execution and quality standards that turn your website into a maintainable, measurable, scalable system.",
            top: [
              { icon:"time", text:"Save 500+ work hours", sub:"Automate repetitive work so your team can focus on selling and operating." },
              { icon:"layout", text:"Message architecture that converts", sub:"We shape your narrative (problem → value → proof → CTA) to generate leads." },
              { icon:"moon", text:"Consistent enterprise design", sub:"A sober, uniform visual system across the experience—no patchwork." },
              { icon:"mobile", text:"100% mobile responsive", sub:"Looks and works great where most visitors are: on mobile." },
              { icon:"seo", text:"SEO optimized", sub:"Improves discoverability and keeps indexing clean for search engines." },
              { icon:"spark", text:"Interactions that guide decisions", sub:"Micro-signals that steer users and improve clarity without distraction." },
              { icon:"flow", text:"Workflow visualization components", sub:"Explain complex processes simply with clear, visual steps." },
              { icon:"code", text:"Evolution without rework", sub:"A foundation that grows without rebuilding every time your business changes." },
              { icon:"settings", text:"Global config for easy updates", sub:"Update brand/copy in one place without breaking sections." },
              { icon:"palette", text:"Simple customization (brand, colors, copy)", sub:"Adapt your identity without rebuilding from scratch." }
            ],
            middle: [
              { icon:"download", text:"App-like experience (optional)", sub:"When it adds value, we enable installability and app-like behavior." },
              { icon:"rocket", text:"Fast, stable launch", sub:"Publish with control and minimal friction—from idea to production." },
              { icon:"spark", text:"UI/UX feedback (toasts, states, microcopy)", sub:"Users know what happened and what’s next—less doubt, less drop-off." },
              { icon:"flow", text:"Guided flows (orders, steps, clear handoffs)", sub:"Reduce friction to request/buy with clear handoffs at every step." },
              { icon:"layout", text:"Section storytelling (message → proof → CTA)", sub:"Turn visits into conversations through a logical narrative." },
              { icon:"forms", text:"Low-friction lead capture", sub:"Optimized CTAs and forms that make contacting you effortless." },
              { icon:"shield", text:"Baseline security best practices", sub:"Avoid weak setups and reduce common risk surfaces." },
              { icon:"speed", text:"Speed that improves conversion", sub:"Fast mobile loads to reduce drop-off and improve SEO." },
              { icon:"img", text:"Optimized images + lazy loading", sub:"High visual quality without sacrificing speed or data usage." },
              { icon:"a11y", text:"Accessibility and consistent UX", sub:"More people can use it; experience stays consistent across the site." }
            ],
            bottom: [
              { icon:"i18n", text:"ES/EN i18n with no dependencies", sub:"Bilingual-ready without duplicating pages or adding libraries." },
              { icon:"analytics", text:"Measurable conversion events", sub:"Track what works: clicks, submits, CTAs, and drop-off points." },
              { icon:"wa", text:"Channels ready to close sales", sub:"WhatsApp and CTAs designed to turn conversations into customers." },
              { icon:"version", text:"Versioning + quick rollback", sub:"Safe releases—roll back quickly if something breaks." },
              { icon:"shield", text:"Validation & anti-spam (honeypot)", sub:"Less spam, more real leads for your team." },
              { icon:"settings", text:"Phased delivery", sub:"Launch in stages without breaking what’s already live." },
              { icon:"handoff", text:"Operational docs for your team", sub:"Your team can update content without depending on us." },
              { icon:"support", text:"Roadmap + post-launch support", sub:"Ongoing improvements aligned to business outcomes." },
              { icon:"spark", text:"E-commerce microfeedback (cart, confirmations)", sub:"Clear confirmations reduce uncertainty and abandonment." },
              { icon:"code", text:"Modular system that’s easy to operate", sub:"Clear components for fast iteration and a consistent experience." }
            ]
          },
          hero: { badge1:"Fast delivery", badge2:"Conversion-focused", badge3:"Continuous support", highlightsLabel:"Highlights", optionsLabel:"Options", titleA:"Your business already grew.", titleB:"Your website should too.", desc:"We design professional digital presence for established companies that want to project authority, convert better, and scale on a solid technical foundation.", ctaPrimary:"Schedule a diagnostic", ctaSecondary:"View cases", proof:"We plan, we don’t improvise • Clean implementation • No rebuild in a year • Built to grow",heroVariants:[
  { titleA:"Your business already grew solidly.", titleB:"Your website should grow as well.", desc:"We design professional digital presence for established companies that want to project authority, convert better, and scale on a solid technical foundation.", proof:"Planned, not improvised • Clean implementation • No rebuild in a year • Built to grow", dash:"growth" },
  { titleA:"Web infrastructure for companies", titleB:"that already revenue and want more growth.", desc:"Professional design backed by solid architecture—ready for integrations, operational stability, and sustained evolution.", proof:"Maintainable base • Ready integrations • Structured security • Real scalability", dash:"infra" },
  { titleA:"We modernize the digital presence", titleB:"of companies that already operate seriously.", desc:"Professional sites designed to convert better, project authority, and scale on a solid, maintainable technical architecture.", proof:"Sober design • Measurable performance • Structured SEO • Mobile done right", dash:"modern" },
  { titleA:"Your business already grew strategically.", titleB:"Your digital presence still hasn’t.", desc:"We build a web foundation aligned to your real business level—ready to project authority, convert better, and support sustained growth.", proof:"Clear message • Strategic diagnosis • Clean implementation • Production-ready delivery", dash:"gap" },
  { titleA:"You don’t need another website.", titleB:"You need a presence that matches your company.", desc:"Project authority, convert better, and evolve on a technical foundation built to grow with your company—without rebuilding from scratch.", proof:"Solid architecture • Strategic implementation • Stable foundation • Ready to scale", dash:"authority" }
], sections:{ casesTitle:"Cases", casesDesc:"Examples and outcomes (coming soon).", contactTitle:"Contact", contactDesc:"Tell us what you need and we’ll reply with a clear proposal." } }
        }
      };

      const STORAGE = { themeMode: "gaschsoft_theme_mode", lang: "gaschsoft_lang" };

      const brandLogo = document.getElementById("brandLogo");
      const langIcon  = document.getElementById("langIcon");
      const themeIcon = document.getElementById("themeIcon");
      const demoIcon = document.getElementById("demoIcon");
      const drawerDemoIcon = document.getElementById("drawerDemoIcon");

      // Head icons/meta (favicon / share)
      const favicon32 = document.getElementById("favicon32");
      const favicon16 = document.getElementById("favicon16");
      const faviconShortcut = document.getElementById("faviconShortcut");
      const appleTouchIcon = document.getElementById("appleTouchIcon");
      const ogImage = document.getElementById("ogImage");
      const twitterImage = document.getElementById("twitterImage");
      const metaThemeColor = document.getElementById("metaThemeColor");

      const brandSub  = document.getElementById("brandSub");
      const navPortfolio = document.getElementById("navPortfolio");
      const navContact = document.getElementById("navContact");
      const navAbout = document.getElementById("navAbout");

      const svcWeb = document.getElementById("svcWeb");
      const svcIT = document.getElementById("svcIT");
      const svcInv = document.getElementById("svcInv");
      const svcInfra = document.getElementById("svcInfra");
      const svcAuto = document.getElementById("svcAuto");

      const heroTitle = document.getElementById("heroTitle");
      const heroTitleA = document.getElementById("heroTitleA");
      const heroTitleB = document.getElementById("heroTitleB");
      const heroDesc = document.getElementById("heroDesc");
      const heroBadge1 = document.getElementById("heroBadge1");
      const heroBadge2 = document.getElementById("heroBadge2");
      const heroBadge3 = document.getElementById("heroBadge3");
      const heroBadgesEl = document.getElementById("heroBadges");
      const heroDotsEl = document.getElementById("heroDots");
      const heroCtaPrimary = document.getElementById("heroCtaPrimary");
      const heroCtaSecondary = document.getElementById("heroCtaSecondary");
      const heroProof = document.getElementById("heroProof");
      const casesTitle = document.getElementById("casesTitle");
      const casesDesc = document.getElementById("casesDesc");
      const contactTitle = document.getElementById("contactTitle");
      const contactDesc = document.getElementById("contactDesc");

      const langBtn = document.getElementById("langBtn");
      const langMenu = document.getElementById("langMenu");
      const langItems = Array.from(langMenu.querySelectorAll("[data-lang]"));

      const themeBtn = document.getElementById("themeBtn");
      const themeMenu = document.getElementById("themeMenu");
      const themeItems = Array.from(themeMenu.querySelectorAll("[data-theme]"));


      const burgerBtn = document.getElementById("burgerBtn");
      const navLinks = document.getElementById("navLinks");

      const mediaDark = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

      function getSavedThemeMode(){
        const v = localStorage.getItem(STORAGE.themeMode);
        return (v === "system" || v === "dark" || v === "light") ? v : "system";
      }
      function getSavedLang(){
        const v = localStorage.getItem(STORAGE.lang);
        return (v === "es" || v === "en") ? v : "es";
      }

      let state = { themeMode: getSavedThemeMode(), lang: getSavedLang() };

      function systemTheme(){
        return (mediaDark && mediaDark.matches) ? "dark" : "light";
      }

      function resolvedTheme(){
        if (state.themeMode === "system") return systemTheme();
        return state.themeMode;
      }

      function applyTheme(){
        const theme = resolvedTheme();
        elHtml.setAttribute("data-theme", theme);

        // swap icons that depend on THEME (resolved)
        brandLogo.src = (theme === "dark") ? ASSETS.brand.dark : ASSETS.brand.light;
        langIcon.src  = (theme === "dark") ? ASSETS.langIcon.dark : ASSETS.langIcon.light;
        if (demoIcon) demoIcon.src = (theme === "dark") ? ASSETS.demo.dark : ASSETS.demo.light;
        if (drawerDemoIcon) drawerDemoIcon.src = (theme === "dark") ? ASSETS.demo.dark : ASSETS.demo.light;

        // Head: favicon / iOS icon / share image
        const headIcon = (theme === "dark") ? ASSETS.brand.dark : ASSETS.brand.light;
                // Force favicon refresh (Edge/Chrome cache aggressively)
        const v = Date.now();
        const iconSrc = (theme === "dark") ? ASSETS.brand.dark : ASSETS.brand.light;
        const icon32 = iconSrc + "?v=" + v;
        const icon16 = iconSrc + "?v=" + v;
        if (favicon32) favicon32.setAttribute("href", icon32);
        if (favicon16) favicon16.setAttribute("href", icon16);
        if (faviconShortcut) faviconShortcut.setAttribute("href", icon32);
        if (appleTouchIcon) appleTouchIcon.setAttribute("href", headIcon);
        if (ogImage) ogImage.setAttribute("content", headIcon);
        if (twitterImage) twitterImage.setAttribute("content", headIcon);
        if (metaThemeColor) metaThemeColor.setAttribute("content", theme === "dark" ? "#0B0F14" : "#F8FAFC");

        // theme button icon (refleja la opción seleccionada; variante depende del tema resuelto)
        const mode = state.themeMode; // system | light | dark
        if (mode === "system") {
          themeIcon.src = (theme === "dark") ? ASSETS.theme.system.dark : ASSETS.theme.system.light;
        } else if (mode === "light") {
          themeIcon.src = (theme === "dark") ? ASSETS.theme.light.dark : ASSETS.theme.light.light;
        } else {
          themeIcon.src = (theme === "dark") ? ASSETS.theme.dark.dark : ASSETS.theme.dark.light;
        }

        themeBtn.setAttribute("aria-label", "Tema: " + (mode === "system" ? "Sistema" : (mode === "light" ? "Claro" : "Oscuro")));

        // sync selección en menú de tema
        themeItems.forEach(item => {
          const isSelected = item.getAttribute("data-theme") === mode;
          item.setAttribute("aria-selected", isSelected ? "true" : "false");
        });
      }



      // Follow system changes ONLY if mode == system
      if (mediaDark) {
        mediaDark.addEventListener?.("change", () => {
          if (state.themeMode === "system") applyTheme();
        });
      }

      function applyLang(lang){
        state.lang = lang;
        localStorage.setItem(STORAGE.lang, lang);

        const t = I18N[lang];

        brandSub.textContent = t.brandSub;
        document.getElementById("navCasesLabel").textContent = t.nav.portfolio;
        // Casos (header)
        document.getElementById("caseSME").textContent = t.cases.sme;
        document.getElementById("caseCorp").textContent = t.cases.corp;
        document.getElementById("caseStartup").textContent = t.cases.startups;

        navContact.textContent = t.nav.contact;
        navAbout.textContent = t.nav.about;

        // Drawer (mobile)
        document.getElementById("drawerServicesLabel").textContent = t.nav.services;
        document.getElementById("drawerCasesLabel").textContent = t.nav.portfolio;
        document.getElementById("drawerAbout").textContent = t.nav.about;
        document.getElementById("drawerContact").textContent = t.nav.contact;
        // Servicios drawer
        document.getElementById("drawerSvcWeb").textContent = t.services.web;
        document.getElementById("drawerSvcIT").textContent = t.services.it;
        document.getElementById("drawerSvcInv").textContent = t.services.invites;
        document.getElementById("drawerSvcAuto").textContent = t.services.auto;
        if (document.getElementById("drawerSvcInfra")) document.getElementById("drawerSvcInfra").textContent = t.services.infra;
        // Casos drawer
        document.getElementById("drawerCaseSME").textContent = t.cases.sme;
        document.getElementById("drawerCaseCorp").textContent = t.cases.corp;
        document.getElementById("drawerCaseStartup").textContent = t.cases.startups;
        if (svcWeb) svcWeb.textContent = t.services.web;
        if (svcIT)  svcIT.textContent  = t.services.it;
        if (svcInv) svcInv.textContent = t.services.invites;
        if (svcAuto) svcAuto.textContent = t.services.auto;

        // Hero v60
        if (heroBadge1) heroBadge1.textContent = t.hero.badge1;
        if (heroBadge2) heroBadge2.textContent = t.hero.badge2;
        if (heroBadge3) heroBadge3.textContent = t.hero.badge3;



        // Labels (i18n)
        if (heroBadgesEl && t.hero.highlightsLabel) heroBadgesEl.setAttribute("aria-label", t.hero.highlightsLabel);
        if (heroDotsEl && t.hero.optionsLabel) heroDotsEl.setAttribute("aria-label", t.hero.optionsLabel);
if (heroTitleA && heroTitleB) {
          heroTitleA.textContent = t.hero.titleA;
          heroTitleB.textContent = t.hero.titleB;
        } else {
          heroTitle.textContent = (t.hero.titleA ? (t.hero.titleA + " " + t.hero.titleB) : (t.hero.title || ""));
        }
        heroDesc.textContent = t.hero.desc;

        if (heroCtaPrimary) heroCtaPrimary.textContent = t.hero.ctaPrimary;
        if (heroCtaSecondary) heroCtaSecondary.textContent = t.hero.ctaSecondary;
        if (heroProof) heroProof.textContent = t.hero.proof;

        if (casesTitle) casesTitle.textContent = t.hero.sections.casesTitle;
        if (casesDesc) casesDesc.textContent = t.hero.sections.casesDesc;
        if (contactTitle) contactTitle.textContent = t.hero.sections.contactTitle;
        if (contactDesc) contactDesc.textContent = t.hero.sections.contactDesc;


        // Qué utilizamos (v78)
        const whatuseTitle = document.getElementById("whatuseTitle");
        const whatuseDesc  = document.getElementById("whatuseDesc");
        if (whatuseTitle && t.whatuse?.title) whatuseTitle.textContent = t.whatuse.title;
        if (whatuseDesc && t.whatuse?.desc)   whatuseDesc.textContent  = t.whatuse.desc;
        // re-render marquees
        try { renderPillars(); } catch(_) {}
        try { renderWhatWeUse(); } catch(_) {}

        langItems.forEach(item => {
          const isSelected = item.getAttribute("data-lang") === lang;
          item.setAttribute("aria-selected", isSelected ? "true" : "false");
        });

        document.documentElement.lang = (lang === "en") ? "en" : "es";
        // notify other modules
  window.dispatchEvent(new Event("gs:langChanged"));
}


      // Theme menu
      function closeThemeMenu(){
        themeMenu.classList.remove("open");
        themeBtn.setAttribute("aria-expanded", "false");
      }
      function toggleThemeMenu(){
        const open = !themeMenu.classList.contains("open");
        if (open){
          // Exclusión mutua
          closeLangMenu();
        closeThemeMenu();
          themeMenu.classList.add("open");
          themeBtn.setAttribute("aria-expanded", "true");
          requestAnimationFrame(adjustThemeMenuPosition);
        } else {
          closeThemeMenu();
        }
      }


      function adjustThemeMenuPosition(){
        // Reset inline positioning first (default: centered)
        themeMenu.style.left = "";
        themeMenu.style.right = "";
        themeMenu.style.transform = "";

        const rect = themeMenu.getBoundingClientRect();
        const overflowRight = rect.right > window.innerWidth;
        const overflowLeft  = rect.left < 0;

        if (!overflowRight && !overflowLeft){
          // Normal: centrado debajo del botón
          themeMenu.style.left = "50%";
          themeMenu.style.transform = "translateX(-50%)";
          return;
        }

        if (overflowRight){
          // Pegado al borde derecho del viewport: alinear al borde derecho del botón
          themeMenu.style.left = "auto";
          themeMenu.style.right = "0";
          themeMenu.style.transform = "none";
        } else if (overflowLeft){
          // Pegado al borde izquierdo del viewport: alinear al borde izquierdo del botón
          themeMenu.style.left = "0";
          themeMenu.style.right = "auto";
          themeMenu.style.transform = "none";
        }
      }

      // Language menu
      function closeLangMenu(){
        langMenu.classList.remove("open");
        langBtn.setAttribute("aria-expanded", "false");
      }
      function toggleLangMenu(){
        const open = !langMenu.classList.contains("open");
        if (open){
          closeThemeMenu();
          langMenu.classList.add("open");
          langBtn.setAttribute("aria-expanded", "true");
        } else {
          closeLangMenu();
        }
      }

      langBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleLangMenu(); });

      themeBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleThemeMenu(); });

      // Theme menu interactions
      themeMenu.addEventListener("click", (e) => e.stopPropagation());

      themeItems.forEach(item => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();

          const next = item.getAttribute("data-theme"); // system | light | dark

          // Visual selection (aria-selected)
          themeItems.forEach(i => i.setAttribute("aria-selected", "false"));
          item.setAttribute("aria-selected", "true");

          // Persist + apply
          state.themeMode = next;
          localStorage.setItem(STORAGE.themeMode, state.themeMode);
          applyTheme();

          // Close immediately
          closeThemeMenu();
        });
      });


      langItems.forEach(item => {
        item.addEventListener("click", (e) => {
          e.stopPropagation();
          const next = item.getAttribute("data-lang");
          closeLangMenu();
          // Toggle visual selection immediately
          langItems.forEach(i => i.setAttribute("aria-selected", "false"));
          item.setAttribute("aria-selected", "true");
          applyLang(next);
          closeLangMenu();
        });
      });




      // ===== Mobile Drawer =====
      const drawer = document.getElementById("drawer");
      const drawerPanel = drawer.querySelector(".drawer-panel");
      const drawerBackdrop = document.getElementById("drawerBackdrop");

      const drawerServicesBtn = document.getElementById("drawerServicesBtn");
      const drawerServicesMenu = document.getElementById("drawerServicesMenu");

      // Drawer: Casos (fix undefined vars; keeps console clean)
      const drawerCasesBtn = document.getElementById("drawerCasesBtn");
      const drawerCasesMenu = document.getElementById("drawerCasesMenu");
      const drawerCasesChev = document.getElementById("drawerCasesChev");
      const drawerCaseSME = document.getElementById("drawerCaseSME");
      const drawerCaseCorp = document.getElementById("drawerCaseCorp");
      const drawerCaseStartup = document.getElementById("drawerCaseStartup");
      const drawerDemo = document.getElementById("drawerDemo");


      const drawerPortfolio = document.getElementById("drawerCasesLabel");
      const drawerAbout = document.getElementById("drawerAbout");
      const drawerContact = document.getElementById("drawerContact");
      const drawerMore = document.getElementById("drawerMore");

      let drawerScrollY = 0;

      function openDrawer(){
        // Close any header dropdowns to avoid layering glitches
        closeLangMenu();
        closeThemeMenu();

        // Lock page scroll (robust on iOS Safari)
        drawerScrollY = window.scrollY || window.pageYOffset || 0;
        document.body.style.top = `-${drawerScrollY}px`;
        document.body.classList.add("drawer-open");

        drawer.classList.add("open");
        // Servicios abierto por defecto
        drawerServicesMenu.classList.add("open");
        drawerServicesBtn.setAttribute("aria-expanded", "true");
        drawer.setAttribute("aria-hidden", "false");
        burgerBtn.setAttribute("aria-expanded", "true");
      }
      function closeDrawer(){
        burgerBtn.classList.remove("active");
        drawer.classList.remove("open");
        drawer.setAttribute("aria-hidden", "true");
        burgerBtn.setAttribute("aria-expanded", "false");

        // Unlock page scroll (restore previous position)
        document.body.classList.remove("drawer-open");
        const y = drawerScrollY;
        document.body.style.top = "";
        window.scrollTo(0, y);

        // Mantener Servicios abierto por defecto
        drawerServicesMenu.classList.add("open");
        drawerServicesBtn.setAttribute("aria-expanded", "true");
      }

      if (drawerPanel){
        drawerPanel.addEventListener("click", (e) => e.stopPropagation());
      }

      burgerBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = drawer.classList.contains("open");
        if (isOpen){
          closeDrawer();
        } else {
          burgerBtn.classList.add("active");
          openDrawer();
        }
      });

      drawerBackdrop.addEventListener("click", closeDrawer);

      drawerServicesBtn.addEventListener("click", () => {
        const open = drawerServicesMenu.classList.toggle("open");
        drawerServicesBtn.setAttribute("aria-expanded", open ? "true" : "false");
      });

      // cerrar drawer al navegar
      drawer.querySelectorAll("a").forEach(a => a.addEventListener("click", closeDrawer));

      document.addEventListener("click", (event) => {
        if (drawer.classList.contains("open")) {
          const panel = drawer.querySelector(".drawer-panel");
          const header = document.querySelector(".header");
          const clickedHeader = header && header.contains(event.target);
          if (panel && !panel.contains(event.target) && !clickedHeader) closeDrawer();
        }
        closeLangMenu();
        closeThemeMenu();
        navLinks.classList.remove("open");
        burgerBtn.setAttribute("aria-expanded", "false");
      });
      drawerCasesBtn?.addEventListener("click", () => {
        const isOpen = drawerCasesMenu.classList.contains("open");
        if (isOpen){
          drawerCasesMenu.classList.remove("open");
          drawerCasesChev.classList.remove("rot");
          drawerCasesBtn.setAttribute("aria-expanded", "false");
        } else {
          drawerCasesMenu.classList.add("open");
          drawerCasesChev.classList.add("rot");
          drawerCasesBtn.setAttribute("aria-expanded", "true");
        }
      });

      drawerCaseSME?.addEventListener("click", () => { closeDrawer(); });
      drawerCaseCorp?.addEventListener("click", () => { closeDrawer(); });
      drawerCaseStartup?.addEventListener("click", () => { closeDrawer(); });

      // Cerrar drawer al navegar
      drawerDemo?.addEventListener("click", () => { closeDrawer(); });
      drawerAbout?.addEventListener("click", () => { closeDrawer(); });
      drawerContact?.addEventListener("click", () => { closeDrawer(); });

      drawerSvcAuto?.addEventListener("click", () => { closeDrawer(); });
      drawerSvcWeb?.addEventListener("click", () => { closeDrawer(); });
      drawerSvcIT?.addEventListener("click", () => { closeDrawer(); });
      drawerSvcInfra?.addEventListener("click", () => { closeDrawer(); });
      drawerSvcInv?.addEventListener("click", () => { closeDrawer(); });




      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (drawer.classList.contains("open")) closeDrawer();
          closeLangMenu();
          closeThemeMenu();
        }
      });


      // Header height -> drawer starts below header (no tapa el header)
      const headerEl = document.querySelector(".header");
      function syncHeaderHeight(){
        if (!headerEl) return;
        const h = Math.round(headerEl.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--headerH", h + "px");
      }
      window.addEventListener("resize", syncHeaderHeight);
      syncHeaderHeight();

      // Init
      applyTheme();
      applyLang(state.lang);




      // === v62 Hero rotator (5 positioning options, synced with I18N) ===
      (function initHeroRotator(){
        const elTitleA = document.getElementById("heroTitleA");
        const elTitleB = document.getElementById("heroTitleB");
        const elDesc   = document.getElementById("heroDesc");
        const elProof  = document.getElementById("heroProof");
        const elDots   = document.getElementById("heroDots");
        const elPrev   = document.getElementById("heroPreview");
        if(!elTitleA || !elTitleB || !elDesc || !elProof || !elDots || !elPrev) return;

        [elTitleA, elTitleB, elDesc, elProof, elPrev].forEach(e => e.classList.add("hero-rotator-fade"));

        let idx = 0;
        let timer = null;

        function getLang(){ return (localStorage.getItem(STORAGE.lang) || "es"); }
        function getVariants(){
          const lang = getLang();
          const v = (I18N[lang] && I18N[lang].hero && I18N[lang].hero.heroVariants) ? I18N[lang].hero.heroVariants : null;
          return Array.isArray(v) && v.length ? v : null;
        }

        // ===== Hero dashboards (textless mock UI) =====
        // Rule from you: each option has its own mock dashboard.
        // 0 => original (v61). 1 => v62.1 style. 2-4 => new unique layouts.

        function mock_dashboard_0(){
          return `<div class="panel-top">
              <div class="pill"></div>
              <div class="pill"></div>
              <div class="pill"></div>
            </div>

            <div class="panel-body">
              <div class="panel-card">
                <div class="pc-title"></div>
                <div class="pc-line"></div>
                <div class="pc-line short"></div>
              </div>
              <div class="panel-card">
                <div class="pc-title"></div>
                <div class="pc-line"></div>
                <div class="pc-line short"></div>
              </div>

              <div class="panel-metrics">
                <div class="metric">
                  <div class="metric-k"></div>
                  <div class="metric-v"></div>
                </div>
                <div class="metric">
                  <div class="metric-k"></div>
                  <div class="metric-v"></div>
                </div>
                <div class="metric">
                  <div class="metric-k"></div>
                  <div class="metric-v"></div>
                </div>
              </div>
            </div>`;
        }

        function mock_dashboard_1(){
          // From v62.1 (cards + bar chart)
          return `
            <div class="panel-top" aria-hidden="true">
              <div class="pill"></div><div class="pill"></div><div class="pill"></div>
              <div class="panel-title"></div>
            </div>
            <div class="panel-body">
              <div class="dash-cards" aria-hidden="true">
                <div class="dash-card">
                  <div class="dash-line mid"></div>
                  <div class="dash-line thin short"></div>
                  <div class="dash-line thin mid"></div>
                </div>
                <div class="dash-card">
                  <div class="dash-line long"></div>
                  <div class="dash-line thin mid"></div>
                  <div class="dash-line thin short"></div>
                </div>
                <div class="dash-card">
                  <div class="dash-line short"></div>
                  <div class="dash-line thin short"></div>
                  <div class="dash-line thin mid"></div>
                </div>
              </div>

              <div class="dash-chart" aria-hidden="true">
                <div class="dash-bars">
                  <div class="dash-bar" style="height:28%"></div>
                  <div class="dash-bar" style="height:46%"></div>
                  <div class="dash-bar" style="height:62%"></div>
                  <div class="dash-bar" style="height:40%"></div>
                  <div class="dash-bar" style="height:76%"></div>
                </div>
              </div>
            </div>`;
        }

        function mock_dashboard_2(){
          // New: split layout (list/table skeleton + right mini KPIs)
          return `
            <div class="panel-top" aria-hidden="true">
              <div class="pill"></div><div class="pill"></div><div class="pill"></div>
              <div class="panel-title"></div>
            </div>
            <div class="panel-body dash-split" aria-hidden="true">
              <div class="dash-table">
                <div class="dash-row"><span class="dash-cell w-55"></span><span class="dash-cell w-35"></span><span class="dash-chip"></span></div>
                <div class="dash-row"><span class="dash-cell w-65"></span><span class="dash-cell w-25"></span><span class="dash-chip"></span></div>
                <div class="dash-row"><span class="dash-cell w-45"></span><span class="dash-cell w-40"></span><span class="dash-chip"></span></div>
                <div class="dash-row"><span class="dash-cell w-60"></span><span class="dash-cell w-30"></span><span class="dash-chip"></span></div>
              </div>
              <div class="dash-kpis">
                <div class="dash-kpi"><div class="kpi-k"></div><div class="kpi-v"></div></div>
                <div class="dash-kpi"><div class="kpi-k"></div><div class="kpi-v"></div></div>
                <div class="dash-kpi"><div class="kpi-k"></div><div class="kpi-v"></div></div>
              </div>
            </div>`;
        }

        function mock_dashboard_3(){
          // New: timeline + stacked bars (reads as "delivery pipeline", no text)
          return `
            <div class="panel-top" aria-hidden="true">
              <div class="pill"></div><div class="pill"></div><div class="pill"></div>
              <div class="panel-title"></div>
            </div>
            <div class="panel-body dash-flow" aria-hidden="true">
              <div class="dash-timeline">
                <div class="tl-dot"></div><div class="tl-line"></div>
                <div class="tl-dot"></div><div class="tl-line"></div>
                <div class="tl-dot"></div><div class="tl-line"></div>
                <div class="tl-dot"></div>
              </div>

              <div class="dash-stack">
                <div class="stack-card">
                  <div class="dash-line mid"></div>
                  <div class="stack-bars">
                    <span class="stack-bar" style="width:32%"></span>
                    <span class="stack-bar" style="width:54%"></span>
                    <span class="stack-bar" style="width:24%"></span>
                  </div>
                </div>
                <div class="stack-card">
                  <div class="dash-line long"></div>
                  <div class="stack-bars">
                    <span class="stack-bar" style="width:46%"></span>
                    <span class="stack-bar" style="width:62%"></span>
                    <span class="stack-bar" style="width:38%"></span>
                  </div>
                </div>
              </div>
            </div>`;
        }

        function mock_dashboard_4(){
          // New: authority/overview (donut + summary cards)
          return `
            <div class="panel-top" aria-hidden="true">
              <div class="pill"></div><div class="pill"></div><div class="pill"></div>
              <div class="panel-title"></div>
            </div>
            <div class="panel-body dash-authority" aria-hidden="true">
              <div class="dash-donut">
                <div class="donut"></div>
                <div class="donut-lines">
                  <div class="dash-line short"></div>
                  <div class="dash-line thin mid"></div>
                  <div class="dash-line thin long"></div>
                </div>
              </div>

              <div class="dash-cards two">
                <div class="dash-card">
                  <div class="dash-line mid"></div>
                  <div class="dash-line thin long"></div>
                  <div class="dash-line thin mid"></div>
                </div>
                <div class="dash-card">
                  <div class="dash-line short"></div>
                  <div class="dash-line thin mid"></div>
                  <div class="dash-line thin long"></div>
                </div>
              </div>
            </div>`;
        }

        function dashboardForIndex(i){
          if (i === 0) return mock_dashboard_0();
          if (i === 1) return mock_dashboard_1();
          if (i === 2) return mock_dashboard_2();
          if (i === 3) return mock_dashboard_3();
          return mock_dashboard_4();
        }


        function renderDots(count){
          elDots.innerHTML = "";
          for(let i=0;i<count;i++){
            const b = document.createElement("button");
            b.type = "button";
            b.className = "hero-dot";
            b.setAttribute("role","tab");
            b.setAttribute("aria-label", `${getLang()==="es" ? "Opción" : "Option"} ${i}`);
            b.setAttribute("aria-selected", i===idx ? "true":"false");
            b.addEventListener("click", () => setIndex(i, true));
            elDots.appendChild(b);
          }
        }

        function setSelectedDot(){
          elDots.querySelectorAll(".hero-dot").forEach((d,i)=> d.setAttribute("aria-selected", i===idx ? "true":"false"));
        }

        function fadeSet(v){
          const lang = getLang();
          const els = [elTitleA, elTitleB, elDesc, elProof, elPrev];
          els.forEach(e=> e.classList.add("is-fading"));
          window.setTimeout(()=>{
            elTitleA.textContent = v.titleA;
            elTitleB.textContent = v.titleB;
            elDesc.textContent   = v.desc;
            elProof.textContent  = v.proof;
            elPrev.innerHTML     = dashboardForIndex(idx);
setSelectedDot();
            els.forEach(e=> e.classList.remove("is-fading"));
          }, 170);
        }

        function setIndex(next, userAction=false){
          const variants = getVariants();
          if(!variants) return;
          idx = (next + variants.length) % variants.length;
          fadeSet(variants[idx]);
          if(userAction) restartTimer();
        }

        function restartTimer(){
          if(timer) clearInterval(timer);
          timer = setInterval(()=> setIndex(idx+1, false), 7000);
        }

        const variants = getVariants();
        if(!variants) return;
        renderDots(variants.length);
        fadeSet(variants[idx]);
        restartTimer();

        window.addEventListener("gs:langChanged", () => {
          const v2 = getVariants();
          if(!v2) return;
          idx = Math.min(idx, v2.length-1);
          renderDots(v2.length);
          fadeSet(v2[idx]);
          restartTimer();
        }, { passive:true });
      })();

// Deshabilitar click (focus pegajoso) en dropdown triggers: solo hover
      const platTrigger = document.getElementById("servicesTestBtn");
      const casesTrigger = document.getElementById("navPortfolio");

      [platTrigger, casesTrigger].forEach((el) => {
        if (!el) return;
        // Evita que el click deje foco (y por CSS abra/sticky)
        el.addEventListener("mousedown", (e) => {
          e.preventDefault();
        });
        el.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          try { el.blur(); } catch(_) {}
        });
      });

// Bloquear click derecho básico
      document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });


      /* ===== Qué utilizamos (v78): doble carrusel sin controles ===== */
      const whatuseSection = document.getElementById("whatuse");
      const topTrack = document.getElementById("marqueeTopTrack");
      const midTrack = document.getElementById("marqueeMidTrack");
      const botTrack = document.getElementById("marqueeBottomTrack");
      const topMarquee = document.getElementById("marqueeTop");
      const midMarquee = document.getElementById("marqueeMid");
      const botMarquee = document.getElementById("marqueeBottom");


      const pillarsTitleEl = document.getElementById("pillarsTitle");
      const pillarsDescEl  = document.getElementById("pillarsDesc");
      const pillarsGridEl  = document.getElementById("pillarsGrid");
      const pillarsForLabelEl = document.getElementById("pillarsForLabel");
      const pillarsFor1El = document.getElementById("pillarsFor1");
      const pillarsFor2El = document.getElementById("pillarsFor2");
      const pillarsFor3El = document.getElementById("pillarsFor3");

function miniIcon(name){
      const common = 'viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"';
      const svg = (p) => `<svg ${common}>${p}</svg>`;
      switch(name){
        case "time":      return svg('<path d="M12 7v5l3 2"/><path d="M12 22a10 10 0 1 1 0-20a10 10 0 0 1 0 20Z"/>');
        case "layout":    return svg('<rect class="ico" x="4.5" y="6" width="15" height="12" rx="2.2"/> <path class="ico" d="M7.5 9h9M7.5 12h6.5M7.5 15h4.5"/> <path class="ico" d="M16.8 16.8l2.2 2.2"/> <circle class="ico" cx="15.5" cy="15.5" r="2.2"/>');
        case "moon":      return svg('<path d="M21 13a7.5 7.5 0 0 1-10-10a8.5 8.5 0 1 0 10 10Z"/>');
        case "mobile":    return svg('<path d="M8 5h8v14H8Z"/><path d="M11 18h2"/>');
        case "seo":       return svg('<path d="M10 14l4-4"/><path d="M10 10h.01"/><path d="M14 14h.01"/><path d="M12 22a10 10 0 1 1 0-20a10 10 0 0 1 0 20Z"/>');
        case "spark":     return svg('<path d="M12 2l1.4 4.8L18 8.4l-4.6 1.6L12 15l-1.4-5L6 8.4l4.6-1.6Z"/><path d="M19 3l.7 2.3L22 6l-2.3.7L19 9l-.7-2.3L16 6l2.3-.7Z"/>');
        case "flow":      return svg('<path d="M7 7h4v4H7Z"/><path d="M13 13h4v4h-4Z"/><path d="M11 9h3a2 2 0 0 1 2 2v2"/><path d="M7 9H5a2 2 0 0 0-2 2v6"/>');

        case "route":     return svg('<path class="ico" d="M7 10.5a5.5 5.5 0 0 1 9.3-1.9"/> <path class="ico" d="M16.3 8.6H13.8"/> <path class="ico" d="M17 13.5a5.5 5.5 0 0 1-9.3 1.9"/> <path class="ico" d="M7.7 15.4v2.5"/> <circle class="ico" cx="12" cy="12" r="2.4"/>');case "code":      return svg('<path d="M9 8L6 12l3 4"/><path d="M15 8l3 4-3 4"/><path d="M12 6l-1.5 12"/>');
        case "settings":  return svg('<path class="ico" d="M6 16c3.1-4.7 6.7-7.5 12.2-9"/> <path class="ico" d="M18.2 7v3.3h-3.3"/> <circle class="ico" cx="9.4" cy="13.7" r="1.6"/> <circle class="ico" cx="12.8" cy="11.5" r="1.6"/> <circle class="ico" cx="16" cy="9.4" r="1.6"/> <path class="ico" d="M6 19h12"/>');
        case "palette":   return svg('<path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 2-2c0-1-.8-1.8-1.8-1.8H13"/><path d="M7.5 11h.01"/><path d="M9.8 7.8h.01"/><path d="M14.2 7.8h.01"/><path d="M16.5 11h.01"/>');
        case "download":  return svg('<path d="M12 3v10"/><path d="M8.5 10.5L12 14l3.5-3.5"/><path d="M4 20h16"/>');
        case "rocket":    return svg('<path d="M14 3c4.1.7 7 3.6 7 7-2 1.6-4.6 2.6-7.2 2.9-2.2 2.7-5.3 5.3-9.6 7.6.6-3.1 1.7-5.6 3-7.5-1.1-1.1-2.1-2.1-3.1-3.1C6.4 6.1 9.3 3.7 14 3Z"/><path d="M14.7 8.7h.01"/><path d="M9.8 14.2l-2.3 2.3"/><path d="M11.1 15.5l-1.5 3.5"/>');
        case "forms":     return svg('<path d="M7 4h10"/><path d="M7 8h7"/><path d="M7 12h10"/><path d="M7 16h7"/><path d="M18 7l2 2-4 4H14v-2Z"/>');
        case "handoff":   return svg('<path class="ico" d="M6.6 12.2V11a5.4 5.4 0 0 1 10.8 0v1.2"/> <path class="ico" d="M6.6 12.2c0 1.7-1 3-2.4 3v-3c1.4 0 2.4-.7 2.4 0z"/> <path class="ico" d="M17.4 12.2c0 1.7 1 3 2.4 3v-3c-1.4 0-2.4-.7-2.4 0z"/> <path class="ico" d="M9.2 17.5h3.8"/> <path class="ico" d="M13 17.5c1.7 0 3.1-1.2 3.4-2.8"/> <path class="ico" d="M8.8 18.9c0-1.1.9-2 2-2h2.2c.9 0 1.7.6 1.9 1.4"/> <path class="ico" d="M15.7 19.2h.01"/>');
        case "shield":    return svg('<path d="M12 3l8 4v6c0 5-3.5 9-8 11C7.5 22 4 18 4 13V7Z"/><path d="M9.5 12.5l1.7 1.7 3.6-3.6"/>');

        case "lock":     return svg('<rect x="7" y="11" width="10" height="9" rx="2"/><path d="M9 11V9a3 3 0 1 1 6 0v2"/>');case "speed":     return svg('<path class="ico" d="M12 20a8 8 0 1 0-8-8"/> <path class="ico" d="M12 4v4M20 12h-4"/> <path class="ico" d="M12 12l4.2-2.1"/> <path class="ico" d="M4.2 16.8l2.2-2.2"/> <path class="ico" d="M7.2 20.2l2.1-2.1"/> <path class="ico" d="M4 12h4"/>');
        case "img":       return svg('<path d="M5 6h14v12H5Z"/><path d="M8 10h.01"/><path d="M6.5 16l4-4 3 3 2-2 2.5 3"/>');
        case "a11y":      return svg('<circle cx="12" cy="4.7" r="1.2"/><path d="M6.5 7h11"/><path d="M10 21l2-9 2 9"/><path d="M9.3 10.2l2.7 2.2 2.7-2.2"/><path d="M8.2 13h7.6"/>');
        case "i18n":      return svg('<path d="M5 4h14"/><path d="M7 20h10"/><path d="M9 4v4"/><path d="M15 4v4"/><path d="M8 12h8"/><path d="M10 12l-2 6"/><path d="M14 12l2 6"/>');
        case "analytics": return svg('<circle class="ico" cx="6.5" cy="8" r="1.6"/> <circle class="ico" cx="17.5" cy="8" r="1.6"/> <circle class="ico" cx="12" cy="16.5" r="1.6"/> <path class="ico" d="M8 8h7.8"/> <path class="ico" d="M7.4 9.3l3.6 5.7"/> <path class="ico" d="M16.6 9.3L13 15"/> <path class="ico" d="M4.8 20.2h8.4"/> <path class="ico" d="M14.5 18.2c0-1.1 1.5-2 3.4-2s3.4.9 3.4 2"/> <path class="ico" d="M14.5 18.2v2.3c0 1.1 1.5 2 3.4 2s3.4-.9 3.4-2v-2.3"/>');
        case "wa":        return svg('<path d="M20 12a8 8 0 0 1-11.8 7L4 20l1-4A8 8 0 1 1 20 12Z"/><path d="M9.2 8.9c.3-.7.6-.7 1.1-.7h.5c.2 0 .5.1.7.6l.9 2.1c.1.3.1.6-.1.8l-.6.7c.6 1 1.7 2 2.8 2.6l.7-.6c.2-.2.5-.2.8-.1l2.1.9c.5.2.6.5.6.7v.5c0 .5 0 .8-.7 1.1-.8.3-2.6.6-5.3-.9-2.7-1.5-4.7-4-5.3-5.9-.6-1.9-.5-3.1-.2-3.8Z"/>');
        case "version":   return svg('<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 4v6h-6"/><path d="M12 7v5l3 2"/>');
        case "support":   return svg('<path d="M4 12a8 8 0 0 1 16 0"/><path d="M6 12v4a2 2 0 0 0 2 2h2"/><path d="M18 12v4a2 2 0 0 1-2 2h-2"/><path d="M12 18h.01"/>');
        default:          return svg('<path d="M12 3v18"/><path d="M3 12h18"/>');
      }
    }


      function renderPillars(){
        const cfg = (I18N[state.lang] && I18N[state.lang].pillars) ? I18N[state.lang].pillars : null;
        if(!cfg || !pillarsGridEl) return;

        if(pillarsTitleEl) pillarsTitleEl.textContent = cfg.title || "";
        if(pillarsDescEl) pillarsDescEl.textContent = cfg.desc || "";

        if(pillarsForLabelEl) pillarsForLabelEl.textContent = cfg.forLabel || "";
        const seg = cfg.for || [];
        if(pillarsFor1El) pillarsFor1El.textContent = seg[0] || "";
        if(pillarsFor2El) pillarsFor2El.textContent = seg[1] || "";
        if(pillarsFor3El) pillarsFor3El.textContent = seg[2] || "";

        pillarsGridEl.innerHTML = "";
        for(const it of (cfg.items || [])){
          const card = document.createElement("div");
          card.className = "pillar-card";
          card.innerHTML = `
            <span class="cap-ico" aria-hidden="true">${miniIcon(it.icon)}</span>
            <span class="pillar-body">
              <h3 class="pillar-title">${it.text}</h3>
              <ul class="pillar-bullets" aria-label="${cfg.bulletsLabel || 'Beneficios'}">
                <li>${(it.bullets && it.bullets[0]) ? it.bullets[0] : (it.sub || "")}</li>
                <li>${(it.bullets && it.bullets[1]) ? it.bullets[1] : ""}</li>
              </ul>
            </span>
          `;
          pillarsGridEl.appendChild(card);
        }
      }



      function buildCapCard(item){
        const el = document.createElement("div");
        el.className = "cap-card";
        el.setAttribute("role","listitem");
        el.innerHTML = `

          <span class="cap-ico">${miniIcon(item.icon)}</span>
          <span class="cap-body">
            <span class="cap-text">${item.text}</span>
            <span class="cap-sub">${item.sub || ""}</span>
          </span>

        `;
        return el;
      }

      function fillTrack(trackEl, items){
        if(!trackEl) return;
        trackEl.innerHTML = "";
        trackEl.setAttribute("role","list");
        const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // En reduce-motion, no duplicamos: se puede scrollear horizontal.
        const base = items.slice();
        const data = prefersReduced ? base : base.concat(base);

        for(const it of data){
          trackEl.appendChild(buildCapCard(it));
        }
        trackEl.dataset.baseCount = String(base.length);
        trackEl.dataset.reduced = prefersReduced ? "1" : "0";
      }

      function getWhatUse(){
        const lang = (state && state.lang) ? state.lang : (localStorage.getItem(STORAGE.lang) || "es");
        const t = I18N[lang] || I18N.es;
        return t.whatuse || null;
      }

      /* v78.5 – Marquee engine (rAF) to slow down without restarting position */
      const marqueeState = new Map(); // key: element id -> state

      function destroyMarquee(marqueeEl){
        if(!marqueeEl) return;
        const id = marqueeEl.id || marqueeEl;
        const st = marqueeState.get(id);
        if(!st) return;
        try{
          cancelAnimationFrame(st.raf);
          window.removeEventListener("resize", st.onResize);
          st.el.removeEventListener("pointerenter", st.onEnter);
          st.el.removeEventListener("pointerleave", st.onLeave);
          st.el.removeEventListener("focusin", st.onEnter);
          st.el.removeEventListener("focusout", st.onLeave);
        }catch(_){}
        marqueeState.delete(id);
      }

      function initMarquee(marqueeEl){
        if(!marqueeEl) return;
        const id = marqueeEl.id || ("m_" + Math.random().toString(16).slice(2));
        marqueeEl.id = marqueeEl.id || id;

        // Reset any previous instance
        destroyMarquee(marqueeEl);

        const track = marqueeEl.querySelector(".marquee-track");
        if(!track) return;

        const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        // In reduce-motion: no animation, allow manual scroll
        if(prefersReduced){
          marqueeEl.removeAttribute("data-js");
          marqueeEl.style.overflowX = "auto";
          marqueeEl.style.scrollbarWidth = "none";
          marqueeEl.style.webkitOverflowScrolling = "touch";
          track.style.transform = "";
          return;
        }

        marqueeEl.setAttribute("data-js","1");

        const dir = (marqueeEl.getAttribute("data-dir") || "left").toLowerCase();
        const baseSpeed = Number(marqueeEl.getAttribute("data-speed") || 44); // px/s
        const slowFactor = Number(marqueeEl.getAttribute("data-slow") || 0.35); // 0..1 (smaller = slower)
        const ease = Number(marqueeEl.getAttribute("data-ease") || 0.10); // smoothing

        const st = {
          el: marqueeEl,
          track,
          dir,
          baseSpeed,
          slowFactor,
          ease,
          hover: false,
          offset: 0,
          half: 0,
          lastT: 0,
          curSpeed: baseSpeed,
          targetSpeed: baseSpeed,
          raf: 0,
          onResize: null,
          onEnter: null,
          onLeave: null
        };

        function measure(){
          // We rely on 2 copies => half width is scrollWidth/2
          const w = track.scrollWidth;
          st.half = Math.max(1, Math.floor(w / 2));
          st.offset = st.offset % st.half;
        }

        st.onResize = () => {
          // Measure on next frame (layout stable)
          requestAnimationFrame(measure);
        };

        st.onEnter = () => { st.hover = true; st.targetSpeed = st.baseSpeed * st.slowFactor; };
        st.onLeave = () => { st.hover = false; st.targetSpeed = st.baseSpeed; };

        marqueeEl.addEventListener("pointerenter", st.onEnter, { passive:true });
        marqueeEl.addEventListener("pointerleave", st.onLeave, { passive:true });
        marqueeEl.addEventListener("focusin", st.onEnter, { passive:true });
        marqueeEl.addEventListener("focusout", st.onLeave, { passive:true });
        window.addEventListener("resize", st.onResize, { passive:true });

        measure();

        function tick(t){
          if(!st.lastT) st.lastT = t;
          const dt = Math.min(0.05, (t - st.lastT) / 1000); // clamp dt
          st.lastT = t;

          // Smooth speed changes to avoid "jump"
          st.curSpeed += (st.targetSpeed - st.curSpeed) * st.ease;

          // Advance
          st.offset += st.curSpeed * dt;
          if(st.offset >= st.half) st.offset -= st.half;

          let x;
          if(st.dir === "right"){
            // equivalent to moving from -half -> 0
            x = -(st.half - st.offset);
          }else{
            // left: 0 -> -half
            x = -st.offset;
          }
          track.style.transform = `translate3d(${x}px,0,0)`;

          st.raf = requestAnimationFrame(tick);
        }

        st.raf = requestAnimationFrame(tick);
        marqueeState.set(id, st);
      }

      function renderWhatWeUse(){
        const cfg = getWhatUse();
        if(!cfg) return;
        fillTrack(topTrack, cfg.top || []);
        fillTrack(midTrack, cfg.middle || []);
        fillTrack(botTrack, cfg.bottom || []);

        // Init marquees after DOM content paints (so widths are correct)
        requestAnimationFrame(() => {
          initMarquee(topMarquee);
          initMarquee(midMarquee);
          initMarquee(botMarquee);
        });
      }

      /* ===== Casos (v79): segmented control + contenido (I18N) ===== */
      function ensureCasesI18N(){
        // Attach without touching the big I18N literal (safer diff)
        if(!I18N.es.casesSection){
          I18N.es.casesSection = {
            title: "Casos",
            desc: "No son páginas. Son sistemas. Elige tu escenario y mira resultados en conversión, operación y continuidad.",
            segAria: "Segmento",
            segs: {
              sme: {
                label: "PYMEs",
                kpis: [
                  { k:"Conversión", v:"Más leads con menos pasos" },
                  { k:"Velocidad", v:"Carga rápida en móvil" },
                  { k:"Operación", v:"Menos tareas manuales" }
                ],
                title: "Captación + operación lista para vender",
                meta: ["Servicios", "Retail", "Reservas", "WhatsApp"],
                bullets: [
                  "Contexto: empresas que ya venden, pero el sitio no acompaña (mensaje difuso, fricción al contactar).",
                  "Sistema: narrativa por secciones + CTAs claros + captura de leads + canales de cierre listos (WhatsApp / formulario).",
                  "Continuidad: base mantenible con cambios de copy/brand sin romper producción."
                ],
                asideTitle: "Entrega típica",
                aside: ["Landing + secciones clave", "Eventos medibles (CTA / formularios)", "Optimización de imágenes + performance", "Checklist de publicación"]
              },
              corp: {
                label: "Corporativo",
                kpis: [
                  { k:"Gobernanza", v:"Consistencia y control" },
                  { k:"Estandarización", v:"Componentes reutilizables" },
                  { k:"Continuidad", v:"Releases sin drama" }
                ],
                title: "Ejecución ordenada para operación y reputación",
                meta: ["Multi-sección", "I18N", "Políticas", "QA"],
                bullets: [
                  "Contexto: presencia digital con múltiples stakeholders y necesidad de consistencia (no más parches).",
                  "Sistema: estándares de UI/UX + estructura modular + flujos documentados para handoffs claros.",
                  "Operación: cambios seguros con versionado y rollback rápido."
                ],
                asideTitle: "Estándares aplicados",
                aside: ["Performance budget", "Accesibilidad base", "Estados UI consistentes", "Documentación operativa"]
              },
              startup: {
                label: "Startups",
                kpis: [
                  { k:"Velocidad", v:"Ship rápido" },
                  { k:"Medición", v:"Eventos y embudo" },
                  { k:"Iteración", v:"Mejoras por fases" }
                ],
                title: "MVP medible, iteraciones rápidas",
                meta: ["MVP", "Funnels", "Experimentación", "Roadmap"],
                bullets: [
                  "Contexto: necesitas lanzar ya, pero con datos para decidir (no solo “se ve bonito”).",
                  "Sistema: embudo simple + puntos de medición + iteraciones por fases sin rehacer todo.",
                  "Evolución: base lista para sumar integraciones cuando el negocio lo pida."
                ],
                asideTitle: "Qué queda listo",
                aside: ["Instrumentación básica (eventos)", "Secciones convertibles (prueba + CTA)", "Escalabilidad técnica", "Plan de siguientes releases"]
              }
            },
            cta: "Agregar esto a mi proyecto"
          };
        }
        if(!I18N.en.casesSection){
          I18N.en.casesSection = {
            title: "Cases",
            desc: "Not just pages. Systems. Pick your scenario and see outcomes in conversion, operations, and continuity.",
            segAria: "Segment",
            segs: {
              sme: {
                label: "SMEs",
                kpis: [
                  { k:"Conversion", v:"More leads, fewer steps" },
                  { k:"Speed", v:"Fast mobile load" },
                  { k:"Ops", v:"Less manual work" }
                ],
                title: "Acquisition + operations ready to sell",
                meta: ["Services", "Retail", "Bookings", "WhatsApp"],
                bullets: [
                  "Context: companies already selling, but the site adds friction (unclear message, weak contact flow).",
                  "System: section narrative + clear CTAs + lead capture + closing channels (WhatsApp / form).",
                  "Continuity: maintainable base—update copy/brand without breaking production."
                ],
                asideTitle: "Typical delivery",
                aside: ["Landing + key sections", "Measurable events (CTA / forms)", "Image optimization + performance", "Publish checklist"]
              },
              corp: {
                label: "Enterprise",
                kpis: [
                  { k:"Governance", v:"Consistency and control" },
                  { k:"Standardization", v:"Reusable components" },
                  { k:"Continuity", v:"Safe releases" }
                ],
                title: "Structured execution for operations and reputation",
                meta: ["Multi-section", "I18N", "Policies", "QA"],
                bullets: [
                  "Context: multi-stakeholder web presence that needs consistency (no more patchwork).",
                  "System: UI/UX standards + modular structure + documented flows for clean handoffs.",
                  "Operations: safe changes with versioning and quick rollback."
                ],
                asideTitle: "Standards applied",
                aside: ["Performance budget", "Baseline accessibility", "Consistent UI states", "Operational docs"]
              },
              startup: {
                label: "Startups",
                kpis: [
                  { k:"Speed", v:"Ship fast" },
                  { k:"Measurement", v:"Events and funnel" },
                  { k:"Iteration", v:"Phased improvements" }
                ],
                title: "Measurable MVP, fast iterations",
                meta: ["MVP", "Funnels", "Iteration", "Roadmap"],
                bullets: [
                  "Context: launch now—but with signals to decide (not just “looks nice”).",
                  "System: simple funnel + measurement points + phased iterations without rewrites.",
                  "Evolution: foundation ready for integrations when the business demands it."
                ],
                asideTitle: "What’s ready",
                aside: ["Basic instrumentation (events)", "Convertible sections (proof + CTA)", "Technical scalability", "Next releases plan"]
              }
            },
            cta: "Add this to my project"
          };
        }
      }


      /* ===== Casos: showcase rotator (fixed, independent of segment) ===== */

      /* ===== Casos: showcase rotator (fixed, independent of segment) ===== */
      function initShowcase(){
        if (window.__gsShowcaseInit) return;
        window.__gsShowcaseInit = true;

        const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        function setup(){
          const frame = document.getElementById("showcaseFrame");
          if(!frame) return;
          const iframes = Array.from(frame.querySelectorAll(".showcase-iframe"));
          if(iframes.length < 2) return;

          const links = Array.from(document.querySelectorAll(".showcase-link[data-idx]"));

          let idx = 0;
          const dur = 10000; // ms
          document.documentElement.style.setProperty("--showcase-dur", (dur/1000) + "s");

          const prog = document.getElementById("showcaseProgress");

          const titleEl = document.getElementById("showcaseTitle");
          if(titleEl){ titleEl.textContent = (state.lang === "en") ? "Live projects" : "Proyectos reales en vivo"; }

          function setActive(next, restartProgress=true){
            idx = next;
            iframes.forEach((el, i) => el.classList.toggle("is-active", i === next));

            links.forEach(a => {
              const is = String(a.getAttribute("data-idx")) === String(next);
              a.classList.toggle("is-active", is);
              if(is) a.setAttribute("aria-current","true"); else a.removeAttribute("aria-current");
            });

            if(prog && !prefersReduced && restartProgress){
              prog.classList.remove("kick");
              void prog.offsetWidth; // reflow to restart
              prog.classList.add("kick");
            }
          }

          setActive(0, true);

          if(prefersReduced) return;

          // RAF-based scheduler (more resilient than setInterval on iOS)
          let last = performance.now();
          let acc = 0;

          function tick(now){
            const dt = now - last;
            last = now;
            acc += Math.min(dt, 200);

            if(acc >= dur){
              acc = 0;
              const next = (idx + 1) % iframes.length;
              setActive(next, true);
            }
            requestAnimationFrame(tick);
          }
          requestAnimationFrame(tick);

          // Recover after visibility changes (iOS throttles timers)
          document.addEventListener("visibilitychange", () => {
            if(document.hidden) return;
            last = performance.now();
            acc = 0;
            setActive(idx, true);
          }, { passive:true });

          // Keep language title in sync
          window.addEventListener("gs:langChanged", () => {
            const t = document.getElementById("showcaseTitle");
            if(t){ t.textContent = (state.lang === "en") ? "Live projects" : "Proyectos reales en vivo"; }
          }, { passive:true });
        }

        requestAnimationFrame(setup);
      }


function initCases(){
        if (window.__gsCasesInit) return;
        window.__gsCasesInit = true;

        ensureCasesI18N();

        const segWrap = document.getElementById("casesSeg");
        const body = document.getElementById("casesBody");
        const titleEl = document.getElementById("casesTitle");
        const descEl = document.getElementById("casesDesc");
        const ctaEl = document.getElementById("casesCta");
        if(!segWrap || !body) return;

        body.classList.add("cases-fade");

        let seg = "sme";

        function getCfg(){
          const lang = (state && state.lang) ? state.lang : (localStorage.getItem(STORAGE.lang) || "es");
          return (I18N[lang] && I18N[lang].casesSection) ? I18N[lang].casesSection : I18N.es.casesSection;
        }

        function setSelectedButtons(){
          segWrap.querySelectorAll(".cases-seg-btn").forEach(btn => {
            const is = btn.getAttribute("data-seg") === seg;
            btn.setAttribute("aria-selected", is ? "true" : "false");
          });
        }

        function render(){
          const cfg = getCfg();
          ensureCasesI18N();

          if(titleEl) titleEl.textContent = cfg.title || "Casos";
          if(descEl) descEl.textContent = cfg.desc || "";
          if(ctaEl) ctaEl.textContent = cfg.cta || (state.lang === "en" ? "Add this to my project" : "Agregar esto a mi proyecto");
          if(segWrap) segWrap.setAttribute("aria-label", cfg.segAria || (state.lang === "en" ? "Segment" : "Segmento"));

          // Update seg labels (header + segmented)
          const map = cfg.segs || {};
          segWrap.querySelectorAll(".cases-seg-btn").forEach(btn => {
            const k = btn.getAttribute("data-seg");
            if (map[k] && map[k].label) btn.textContent = map[k].label;
          });

          const s = (cfg.segs && cfg.segs[seg]) ? cfg.segs[seg] : cfg.segs.sme;

          const kpis = (s.kpis || []).slice(0,3).map(k => `
            <div class="kpi">
              <div class="kpi-label"><span class="kpi-dot" aria-hidden="true"></span>${k.k}</div>
              <div class="kpi-value">${k.v}</div>
            </div>
          `).join("");

          const chips = (s.meta || []).slice(0,6).map(c => `<span class="chip">${c}</span>`).join("");

          const bullets = (s.bullets || []).slice(0,4).map(b => `
            <li><span class="case-bullet" aria-hidden="true"></span><span>${b}</span></li>
          `).join("");

          const aside = (s.aside || []).slice(0,6).map(i => `<li>${i}</li>`).join("");


          const steps = (s.bullets || []).slice(0,4);
          const stepTitles = [
            (state.lang === "en" ? "Context" : "Contexto"),
            (state.lang === "en" ? "System" : "Sistema"),
            (state.lang === "en" ? "Continuity" : "Continuidad"),
            (state.lang === "en" ? "System updated" : "Sistema actualizado")
          ];

          const stepsHtml = steps.map((text, idx) => {
            const title = stepTitles[idx] || ((state.lang === "en") ? `Step ${idx+1}` : `Paso ${idx+1}`);
            const isLast = idx === steps.length - 1;
            return `
              <div class="case-step">
                <div class="step-rail" aria-hidden="true">
                  <div class="step-dot">${idx+1}</div>
                  ${isLast ? "" : "<div class=\"step-line\"></div>"}
                </div>
                <div class="step-content">
                  <div class="step-title">${title}</div>
                  <div class="step-text">${text}</div>
                </div>
              </div>
            `;
          }).join("");



          body.innerHTML = `<div class="cases-flow">
              <div class="cases-flow-grid">
                <div class="cases-steps" aria-label="Flujo">
                  ${stepsHtml}
                </div>

                <div class="cases-media" aria-label="${s.asideTitle || ""}">
                  <div class="aside-card cases-media-card">
                    <div class="aside-title">${s.asideTitle || ""}</div>
                    <ul class="aside-list">${aside}</ul>
                  </div>
                </div>
              </div>
            </div>`;
setSelectedButtons();
        }

        function swapTo(next){
          if(next === seg) return;
          seg = next;

          // transition (matches hero timing)
          body.classList.add("is-fading");
          window.setTimeout(() => {
            render();
            body.classList.remove("is-fading");
            body.classList.add("is-enter");
            requestAnimationFrame(() => body.classList.remove("is-enter"));
          }, 170);
        }

        segWrap.addEventListener("click", (e) => {
          const btn = e.target && e.target.closest ? e.target.closest(".cases-seg-btn") : null;
          if(!btn) return;
          swapTo(btn.getAttribute("data-seg"));
        });

        function setFromHash(){
          const h = (location.hash || "").toLowerCase();
          if (h === "#cases-sme") return swapTo("sme");
          if (h === "#cases-corp") return swapTo("corp");
          if (h === "#cases-startups") return swapTo("startup");
        }

        window.addEventListener("hashchange", setFromHash, { passive:true });

        // Header dropdown buttons: scroll + select segment (no duplicate listeners)
        const mapBtn = (id, hash, segKey) => {
          const el = document.getElementById(id);
          if(!el) return;
          el.addEventListener("click", (ev) => {
            ev.preventDefault();
            try { closeLangMenu(); closeThemeMenu(); } catch(_) {}
            const anchor = document.getElementById(hash.replace("#",""));
            if(anchor) anchor.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block:"start" });
            // set hash (so deep-links work)
            try{ history.replaceState(null, "", hash); } catch(_){ location.hash = hash; }
            swapTo(segKey);
          }, { passive:false });
        };

        mapBtn("caseSME", "#cases-sme", "sme");
        mapBtn("caseCorp", "#cases-corp", "corp");
        mapBtn("caseStartup", "#cases-startups", "startup");

        // Render initial
        render();
        setFromHash();

        window.addEventListener("gs:langChanged", () => {
          ensureCasesI18N();
          render();
        }, { passive:true });
      }


// Render inicial + al cambiar idioma
      renderPillars();
      window.addEventListener("gs:langChanged", renderPillars, { passive:true });

      renderWhatWeUse();
      initCases();
      initShowcase();
      window.addEventListener("gs:langChanged", renderWhatWeUse, { passive:true });


    })();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).catch(() => {});
  }, { once: true });
}
