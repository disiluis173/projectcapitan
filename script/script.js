// --- Corrección de errores de variables ---
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

// Completando la funcionalidad del menú móvil
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll(".nav-links a").forEach(n => {
    n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});

// Header scroll effect
window.addEventListener("scroll", function() {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("header-scrolled");
    } else {
        header.classList.remove("header-scrolled");
    }
});

// --- Slider de Testimonios Mejorado ---
document.addEventListener('DOMContentLoaded', function() {
    // Testimonios slider mejorado
    const slider = document.querySelector('.testimonios-slider');
    const slides = document.querySelectorAll('.testimonios-slide');
    const dots = document.querySelectorAll('.testimonios-dots .dot');
    const prevBtn = document.getElementById('prevTestimonio');
    const nextBtn = document.getElementById('nextTestimonio');
    let current = 0;
    let testimoniosInterval;

    function updateSlider(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        slider.style.transform = `translateX(-${index * 100}%)`;
        current = index;
    }

    function nextSlide() {
        let idx = (current + 1) % slides.length;
        updateSlider(idx);
    }

    function prevSlide() {
        let idx = (current - 1 + slides.length) % slides.length;
        updateSlider(idx);
    }

    // Dots click
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            updateSlider(i);
            resetInterval();
        });
    });

    // Arrows click
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
    }

    // Auto cambio
    function startInterval() {
        testimoniosInterval = setInterval(nextSlide, 6000);
    }
    function resetInterval() {
        clearInterval(testimoniosInterval);
        startInterval();
    }
    startInterval();

    // Swipe/touch support
    let startX = null;
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', e => {
        if (startX === null) return;
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) {
            prevSlide();
            resetInterval();
        } else if (startX - endX > 50) {
            nextSlide();
            resetInterval();
        }
        startX = null;
    });

    // Inicializa slider
    updateSlider(0);
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Galería de imágenes con Lightbox simple
const galeriaItems = document.querySelectorAll('.galeria-item');

// Crear elementos para el lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.position = 'fixed';
lightbox.style.top = '0';
lightbox.style.left = '0';
lightbox.style.width = '100%';
lightbox.style.height = '100%';
lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
lightbox.style.display = 'none';
lightbox.style.alignItems = 'center';
lightbox.style.justifyContent = 'center';
lightbox.style.zIndex = '1001';
lightbox.style.cursor = 'pointer';

const lightboxImg = document.createElement('img');
lightboxImg.style.maxWidth = '90%';
lightboxImg.style.maxHeight = '90%';
lightboxImg.style.objectFit = 'contain';
lightboxImg.style.border = '3px solid white';
lightboxImg.style.borderRadius = '5px';

lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

// Aplicar lightbox a las imágenes de la galería
galeriaItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('img');
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

// Cerrar lightbox al hacer clic
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1  // 10% del elemento visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecer');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar animación a diversos elementos
const elements = document.querySelectorAll('.esencia-item, .historia-container, .galeria-item, .ubicacion-item');

// Añadir estilo para la animación
const style = document.createElement('style');
style.textContent = `
    .esencia-item, .historia-container, .galeria-item, .ubicacion-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    .aparecer {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

elements.forEach(element => {
    observer.observe(element);
});

// Mapa para la sección de ubicaciones (usando Leaflet)
// Esto requiere incluir Leaflet en el HTML
function initMap() {
    // Verifica si el elemento del mapa existe y si Leaflet está cargado
    if (document.getElementById('mapa') && typeof L !== 'undefined') {
        // Crear mapa centrado
        const map = L.map('mapa').setView([-12.0464, -77.0428], 12); // Coordenadas de ejemplo
        
        // Agregar capa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Ubicaciones (ejemplo)
        const ubicaciones = [
            {
                nombre: "El Capitán - Miraflores",
                latLng: [-12.1164, -77.0359], 
                direccion: "Av. José Pardo 1234, Miraflores"
            },
            {
                nombre: "El Capitán - San Isidro",
                latLng: [-12.0964, -77.0323],
                direccion: "Calle Las Begonias 567, San Isidro"
            },
            {
                nombre: "El Capitán - Barranco",
                latLng: [-12.1494, -77.0234],
                direccion: "Jr. Unión 789, Barranco"
            }
        ];
        
        // Agregar marcadores
        ubicaciones.forEach(ubicacion => {
            const marker = L.marker(ubicacion.latLng).addTo(map);
            marker.bindPopup(`<b>${ubicacion.nombre}</b><br>${ubicacion.direccion}`);
        });
    }
}

// Llamar a initMap cuando todo el contenido esté cargado
document.addEventListener('DOMContentLoaded', initMap);

// Contador de visitantes (ejemplo)
document.addEventListener('DOMContentLoaded', () => {
    // Simular un contador de visitantes (en producción usarías una API real)
    const contadorEl = document.getElementById('contador-visitantes');
    if (contadorEl) {
        let contador = Math.floor(Math.random() * 5000) + 10000;
        contadorEl.textContent = contador.toLocaleString();
        
        // Incrementar ocasionalmente
        setInterval(() => {
            if (Math.random() > 0.7) {
                contador++;
                contadorEl.textContent = contador.toLocaleString();
            }
        }, 3000);
    }
});

// Validación de formulario de contacto o reserva (si existe)
const form = document.querySelector('form.contacto-form, form.reserva-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        // Validación especial para email
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value)) {
                isValid = false;
                emailField.classList.add('error');
            }
        }
        
        if (isValid) {
            // Aquí irían las llamadas AJAX para enviar datos o redirigir
            alert('¡Formulario enviado con éxito!');
            form.reset();
        } else {
            alert('Por favor completa todos los campos correctamente');
        }
    });
}

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Sistema de Galería Mejorado
document.addEventListener('DOMContentLoaded', function() {
    // Filtros de galería
    const filterButtons = document.querySelectorAll('.tab-btn');
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    // Función de filtrado mejorada
    function filterGallery(category) {
        galeriaItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Event listeners para los botones de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterGallery(this.getAttribute('data-filter'));
        });
    });

    // Modal mejorado
    const modal = document.getElementById('galeria-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-modal');

    // Función para abrir modal
    function openModal(imgSrc, title, description) {
        modal.style.display = 'flex';
        modalImg.src = imgSrc;
        modalCaption.innerHTML = `<h3>${title}</h3><p>${description}</p>`;
        document.body.style.overflow = 'hidden';
    }

    // Función para cerrar modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Event listeners para abrir/cerrar modal
    document.querySelectorAll('.galeria-overlay').forEach(item => {
        item.addEventListener('click', function(e) {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const desc = this.querySelector('p').textContent;
            openModal(img.src, title, desc);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Navegación con teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });
});