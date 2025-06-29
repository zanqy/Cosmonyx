document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading
    setTimeout(function() {
        document.querySelector('.loading-screen').style.opacity = '0';
        setTimeout(function() {
            document.querySelector('.loading-screen').style.display = 'none';
        }, 1000);
    }, 2000);
    
    // Navigation setup
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            
            // Transition to section
            transitionToSection(sectionId);
            
            // Create shooting star animation
            createShootingStarAnimation();
        });
    });
    
    // Scroll effect for nav
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('.cosmic-nav');
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // Explore button
    document.getElementById('explore-button').addEventListener('click', function() {
        transitionToSection('planets');
        document.querySelector('.nav-link[data-section="planets"]').classList.add('active');
        document.querySelector('.nav-link[data-section="home"]').classList.remove('active');
    });
    
    // Generate planet cards and solar system
    generatePlanetCards();
    setupSolarSystem();
    
    // Setup quiz
    setupSpaceQuiz();
    
    // Setup galaxy cards
    setupGalaxyCards();
    
    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            // Change to light mode colors
            document.documentElement.style.setProperty('--space-dark', '#f0f0f0');
            document.documentElement.style.setProperty('--space-blue', '#ffffff');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            // Revert to dark mode colors
            document.documentElement.style.setProperty('--space-dark', '#0B0D21');
            document.documentElement.style.setProperty('--space-blue', '#1A1C33');
        }
    });
    
    // Modal setup
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    
    modalClose.addEventListener('click', function() {
        modalOverlay.classList.remove('active');
    });
    
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
    
    // About link
    document.getElementById('about-link').addEventListener('click', function(e) {
        e.preventDefault();
        showModal(
            'Tentang Cosmic Explorer',
            'Cosmic Explorer adalah platform edukasi interaktif yang dirancang untuk membawa Anda dalam perjalanan menakjubkan melalui alam semesta. Dengan antarmuka yang menarik dan konten yang akurat, kami bertujuan untuk membuat astronomi dapat diakses oleh semua orang.<br><br>Proyek ini dikembangkan oleh tim penggemar astronomi yang bersemangat untuk berbagi keajaiban kosmos dengan dunia.',
            'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        );
    });
    
    // Star lifecycle button
    document.getElementById('star-lifecycle-btn').addEventListener('click', function() {
        showModal(
            'Siklus Hidup Bintang',
            'Bintang menjalani siklus hidup yang kompleks berdasarkan massanya:<br><br>' +
            '1. <strong>Awan Molekuler:</strong> Bintang terbentuk dari awan gas dan debu yang runtuh karena gravitasi.<br>' +
            '2. <strong>Protobintang:</strong> Inti yang memanas di pusat awan yang runtuh.<br>' +
            '3. <strong>Deret Utama:</strong> Bintang menghabiskan sebagian besar hidupnya dalam fase ini (seperti Matahari kita sekarang).<br>' +
            '4. <strong>Raksasa Merah:</strong> Setelah hidrogen di intinya habis, bintang mengembang.<br>' +
            '5. <strong>Katai Putih/Nova/Supernova:</strong> Bergantung pada massa, bintang bisa berakhir sebagai katai putih, atau meledak sebagai supernova.<br>' +
            '6. <strong>Bintang Neutron/Lubang Hitam:</strong> Bintang sangat masif bisa berakhir sebagai bintang neutron atau lubang hitam.',
            'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
        );
    });
    
    // Setup shooting star animation
    setInterval(createShootingStarAnimation, 5000);
});

function transitionToSection(sectionId) {
    const currentSection = document.querySelector('.content-section.active');
    const newSection = document.getElementById(sectionId);
    
    if (!newSection || currentSection.id === sectionId) return;
    
    // Animate out current section
    currentSection.style.opacity = '0';
    currentSection.style.transform = 'translateY(-20px)';
    
    setTimeout(() => {
        currentSection.classList.remove('active');
        
        // Show new section
        newSection.classList.add('active');
        setTimeout(() => {
            newSection.style.opacity = '1';
            newSection.style.transform = 'translateY(0)';
        }, 50);
        
        // Scroll to top of section
        window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 500);
}

function generatePlanetCards() {
    const planets = [
        { 
            name: 'Merkurius', 
            desc: 'Planet terkecil dan terdekat dengan Matahari. Tidak memiliki satelit alami dan permukaannya dipenuhi kawah.', 
            color: 'var(--planet-mercury)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/mercury-messenger-globe-pia15162-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '57.9 juta km' },
                { title: 'Diameter', value: '4.880 km' },
                { title: 'Masa Orbit', value: '88 hari Bumi' },
                { title: 'Masa Rotasi', value: '59 hari Bumi' },
                { title: 'Suhu Rata-rata', value: '167°C' },
                { title: 'Satelit Alami', value: 'Tidak ada' }
            ]
        },
        { 
            name: 'Venus', 
            desc: 'Planet terpanas dengan atmosfer tebal karbon dioksida. Dikenal sebagai bintang kejora atau bintang fajar.', 
            color: 'var(--planet-venus)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/venus-magellan-colorized-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '108.2 juta km' },
                { title: 'Diameter', value: '12.104 km' },
                { title: 'Masa Orbit', value: '225 hari Bumi' },
                { title: 'Masa Rotasi', value: '243 hari Bumi' },
                { title: 'Suhu Rata-rata', value: '464°C' },
                { title: 'Satelit Alami', value: 'Tidak ada' }
            ]
        },
        { 
            name: 'Bumi', 
            desc: 'Planet kita, satu-satunya yang diketahui memiliki kehidupan. 70% permukaannya tertutup air.', 
            color: 'var(--planet-earth)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/earth-blue-marble-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '149.6 juta km' },
                { title: 'Diameter', value: '12.742 km' },
                { title: 'Masa Orbit', value: '365.25 hari' },
                { title: 'Masa Rotasi', value: '23 jam 56 menit' },
                { title: 'Suhu Rata-rata', value: '15°C' },
                { title: 'Satelit Alami', value: '1 (Bulan)' }
            ]
        },
        { 
            name: 'Mars', 
            desc: 'Planet merah dengan gunung tertinggi di tata surya (Olympus Mons). Target utama kolonisasi manusia.', 
            color: 'var(--planet-mars)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/mars-globe-valles-marineris-enhanced-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '227.9 juta km' },
                { title: 'Diameter', value: '6.779 km' },
                { title: 'Masa Orbit', value: '687 hari Bumi' },
                { title: 'Masa Rotasi', value: '24 jam 37 menit' },
                { title: 'Suhu Rata-rata', value: '-65°C' },
                { title: 'Satelit Alami', value: '2 (Phobos & Deimos)' }
            ]
        },
        { 
            name: 'Jupiter', 
            desc: 'Planet terbesar dengan Badai Besar Merah yang telah berlangsung selama berabad-abad.', 
            color: 'var(--planet-jupiter)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/jupiter-voyager-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '778.3 juta km' },
                { title: 'Diameter', value: '139.820 km' },
                { title: 'Masa Orbit', value: '11.9 tahun Bumi' },
                { title: 'Masa Rotasi', value: '9 jam 56 menit' },
                { title: 'Suhu Rata-rata', value: '-110°C' },
                { title: 'Satelit Alami', value: '79 (terbesar: Ganymede)' }
            ]
        },
        { 
            name: 'Saturnus', 
            desc: 'Dikenal dengan cincinnya yang indah yang terdiri dari es dan batu. Memiliki 82 bulan yang diketahui.', 
            color: 'var(--planet-saturn)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/saturn-cassini-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '1.427 miliar km' },
                { title: 'Diameter', value: '116.460 km' },
                { title: 'Masa Orbit', value: '29.5 tahun Bumi' },
                { title: 'Masa Rotasi', value: '10 jam 33 menit' },
                { title: 'Suhu Rata-rata', value: '-140°C' },
                { title: 'Satelit Alami', value: '82 (terbesar: Titan)' }
            ]
        },
        { 
            name: 'Uranus', 
            desc: 'Planet es raksasa dengan kemiringan ekstrim (98°). Memiliki sistem cincin yang redup.', 
            color: 'var(--planet-uranus)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/uranus-voyager-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '2.871 miliar km' },
                { title: 'Diameter', value: '50.724 km' },
                { title: 'Masa Orbit', value: '84 tahun Bumi' },
                { title: 'Masa Rotasi', value: '17 jam 14 menit' },
                { title: 'Suhu Rata-rata', value: '-195°C' },
                { title: 'Satelit Alami', value: '27 (terbesar: Titania)' }
            ]
        },
        { 
            name: 'Neptunus', 
            desc: 'Planet terjauh dengan angin terkuat di tata surya (2.100 km/jam).', 
            color: 'var(--planet-neptune)',
            image: 'https://science.nasa.gov/wp-content/uploads/2023/09/neptune-voyager-800x800.jpg',
            facts: [
                { title: 'Jarak dari Matahari', value: '4.498 miliar km' },
                { title: 'Diameter', value: '49.244 km' },
                { title: 'Masa Orbit', value: '165 tahun Bumi' },
                { title: 'Masa Rotasi', value: '16 jam 6 menit' },
                { title: 'Suhu Rata-rata', value: '-200°C' },
                { title: 'Satelit Alami', value: '14 (terbesar: Triton)' }
            ]
        }
    ];
    
    const container = document.getElementById('planet-container');
    container.innerHTML = planets.map(planet => `
        <div class="planet-card" style="border-color: ${planet.color}" data-planet="${planet.name.toLowerCase()}">
            <div class="planet-icon" style="background: ${planet.color}; box-shadow: 0 0 30px ${planet.color}"></div>
            <h3>${planet.name}</h3>
            <p>${planet.desc}</p>
            <button class="planet-btn" style="background: ${planet.color}">
                <i class="fas fa-info-circle"></i> Pelajari
            </button>
        </div>
    `).join('');
    
    // Add event listeners to planet cards
    document.querySelectorAll('.planet-card').forEach(card => {
        card.addEventListener('click', function() {
            const planetName = this.getAttribute('data-planet');
            showPlanetDetail(planetName, planets);
        });
    });
    
    // Back button for planet detail
    document.getElementById('back-to-planets').addEventListener('click', function() {
        document.getElementById('planet-container').style.display = 'grid';
        document.getElementById('planet-detail').style.display = 'none';
    });
}

function setupSolarSystem() {
    const solarSystem = document.getElementById('solar-system');
    const planetTooltip = document.getElementById('planet-tooltip');
    
    // Clear existing planets
    solarSystem.innerHTML = '<div class="sun" id="sun" title="Matahari - Bintang Kita"></div>';
    
    const planets = [
        { name: 'mercury', radius: 8, orbitRadius: 90, color: 'var(--planet-mercury)', period: 4, facts: 'Merkurius: Planet terkecil dan terdekat dengan Matahari' },
        { name: 'venus', radius: 12, orbitRadius: 120, color: 'var(--planet-venus)', period: 8, facts: 'Venus: Planet terpanas dengan atmosfer tebal CO₂' },
        { name: 'earth', radius: 12, orbitRadius: 150, color: 'var(--planet-earth)', period: 12, facts: 'Bumi: Planet kita dengan kehidupan dan air melimpah' },
        { name: 'mars', radius: 10, orbitRadius: 180, color: 'var(--planet-mars)', period: 20, facts: 'Mars: Planet merah dengan gunung tertinggi' },
        { name: 'jupiter', radius: 20, orbitRadius: 240, color: 'var(--planet-jupiter)', period: 48, facts: 'Jupiter: Planet terbesar dengan Badai Besar Merah' },
        { name: 'saturn', radius: 18, orbitRadius: 300, color: 'var(--planet-saturn)', period: 84, facts: 'Saturnus: Dikenal dengan cincinnya yang indah' },
        { name: 'uranus', radius: 15, orbitRadius: 340, color: 'var(--planet-uranus)', period: 168, facts: 'Uranus: Planet dengan kemiringan ekstrim 98°' },
        { name: 'neptune', radius: 15, orbitRadius: 380, color: 'var(--planet-neptune)', period: 240, facts: 'Neptunus: Planet terjauh dengan angin terkuat' }
    ];
    
    planets.forEach(planet => {
        // Create orbit
        const orbit = document.createElement('div');
        orbit.className = 'planet-orbit';
        orbit.style.width = `${planet.orbitRadius * 2}px`;
        orbit.style.height = `${planet.orbitRadius * 2}px`;
        orbit.style.setProperty('--orbit-radius', `${planet.orbitRadius}px`);
        
        // Create planet
        const planetElement = document.createElement('div');
        planetElement.className = 'planet';
        planetElement.id = planet.name;
        planetElement.style.width = `${planet.radius}px`;
        planetElement.style.height = `${planet.radius}px`;
        planetElement.style.background = planet.color;
        planetElement.style.animation = `orbit ${planet.period}s linear infinite`;
        planetElement.title = planet.facts;
        
        // Add hover effects
        planetElement.addEventListener('mouseenter', function() {
            planetTooltip.innerHTML = `<h4>${planet.name.charAt(0).toUpperCase() + planet.name.slice(1)}</h4><p>${planet.facts}</p>`;
            planetTooltip.style.opacity = '1';
            planetTooltip.style.left = `${this.getBoundingClientRect().right + 10}px`;
            planetTooltip.style.top = `${this.getBoundingClientRect().top}px`;
        });
        
        planetElement.addEventListener('mouseleave', function() {
            planetTooltip.style.opacity = '0';
        });
        
        planetElement.addEventListener('click', function() {
            showPlanetDetail(planet.name, planets);
        });
        
        orbit.appendChild(planetElement);
        solarSystem.appendChild(orbit);
    });
    
    // Sun hover effect
    document.getElementById('sun').addEventListener('mouseenter', function() {
        planetTooltip.innerHTML = '<h4>Matahari</h4><p>Bintang kita yang menyediakan energi untuk kehidupan di Bumi</p>';
        planetTooltip.style.opacity = '1';
        planetTooltip.style.left = `${this.getBoundingClientRect().right + 10}px`;
        planetTooltip.style.top = `${this.getBoundingClientRect().top}px`;
    });

    document.getElementById('sun').addEventListener('mouseleave', function() {
        planetTooltip.style.opacity = '0';
    });

    // Store original animation durations
    const originalDurations = {};
    document.querySelectorAll('.planet').forEach(planet => {
        originalDurations[planet.id] = planet.style.animation.match(/\d+/)[0];
    });

    // Planet controls
    document.getElementById('view-orbits').addEventListener('click', function() {
        document.querySelectorAll('.planet-orbit').forEach(orbit => {
            orbit.style.border = '1px dashed rgba(255, 255, 255, 0.1)';
        });
        this.classList.add('active');
        document.getElementById('view-scale').classList.remove('active');
        
        // Reset to original scale
        document.querySelectorAll('.planet').forEach(planet => {
            planet.style.transform = 'scale(1)';
        });
    });

    document.getElementById('view-scale').addEventListener('click', function() {
        document.querySelectorAll('.planet-orbit').forEach(orbit => {
            orbit.style.border = 'none';
        });
        this.classList.add('active');
        document.getElementById('view-orbits').classList.remove('active');
        
        // Scale planets to relative sizes
        const scaleFactors = {
            'mercury': 0.4,
            'venus': 0.6,
            'earth': 0.6,
            'mars': 0.5,
            'jupiter': 1.5,
            'saturn': 1.3,
            'uranus': 0.8,
            'neptune': 0.8
        };
        
        document.querySelectorAll('.planet').forEach(planet => {
            const scale = scaleFactors[planet.id] || 1;
            planet.style.transform = `scale(${scale})`;
        });
    });

    let speed = 1;
    document.getElementById('view-speed').addEventListener('click', function() {
        speed = speed === 1 ? 5 : speed === 5 ? 10 : 1;
        this.textContent = `Kecepatan: ${speed === 1 ? 'Normal' : speed === 5 ? 'Cepat' : 'Sangat Cepat'}`;
        
        document.querySelectorAll('.planet').forEach(planet => {
            const originalDuration = originalDurations[planet.id];
            const newDuration = originalDuration / speed;
            const currentAnimation = planet.style.animation;
            const newAnimation = currentAnimation.replace(/\d+s/, `${newDuration}s`);
            planet.style.animation = newAnimation;
        });
    });
}

function showPlanetDetail(planetName, planets) {
    const planet = planets.find(p => p.name.toLowerCase() === planetName.toLowerCase());
    if (!planet) return;
    
    // Hide planet grid and show detail
    document.getElementById('planet-container').style.display = 'none';
    const detailContainer = document.getElementById('planet-detail');
    detailContainer.style.display = 'block';
    
    // Set planet details
    document.getElementById('detail-planet-name').textContent = planet.name;
    document.getElementById('detail-planet-image').src = planet.image;
    document.getElementById('detail-planet-image').alt = planet.name;
    document.getElementById('detail-planet-description').textContent = planet.desc;
    
    // Set planet facts
    const factsContainer = document.getElementById('planet-facts-container');
    factsContainer.innerHTML = planet.facts.map(fact => `
        <div class="planet-fact">
            <h4>${fact.title}</h4>
            <p>${fact.value}</p>
        </div>
    `).join('');
    
    // Scroll to detail
    detailContainer.scrollIntoView({ behavior: 'smooth' });
}

function setupGalaxyCards() {
    const galaxies = [
        {
            name: 'Bima Sakti',
            type: 'Spiral',
            image: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Bima Sakti adalah galaksi spiral yang menjadi rumah bagi tata surya kita. Dengan diameter sekitar 100.000-180.000 tahun cahaya, galaksi ini diperkirakan mengandung 100-400 miliar bintang. Nama "Bima Sakti" berasal dari penampakannya sebagai pita cahaya samar yang membentang di langit malam, yang sebenarnya adalah pandangan dari dalam cakram galaksi.',
            facts: [
                { title: 'Jenis', value: 'Spiral berbatang' },
                { title: 'Diameter', value: '100.000-180.000 tahun cahaya' },
                { title: 'Jumlah Bintang', value: '100-400 miliar' },
                { title: 'Usia', value: '13.51 miliar tahun' },
                { title: 'Massa', value: '1.5 triliun massa matahari' }
            ]
        },
        {
            name: 'Andromeda',
            type: 'Spiral',
            image: 'https://images.unsplash.com/photo-1462332420958-a05d1e002413?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            description: 'Galaksi Andromeda (M31) adalah galaksi spiral terdekat dengan Bima Sakti, berjarak sekitar 2.5 juta tahun cahaya. Dengan diameter sekitar 220.000 tahun cahaya, Andromeda lebih besar dari Bima Sakti dan mengandung sekitar 1 triliun bintang. Andromeda dan Bima Sakti diperkirakan akan bertabrakan dalam sekitar 4.5 miliar tahun.',
            facts: [
                { title: 'Jenis', value: 'Spiral' },
                { title: 'Diameter', value: '220.000 tahun cahaya' },
                { title: 'Jumlah Bintang', value: '1 triliun' },
                { title: 'Jarak dari Bumi', value: '2.5 juta tahun cahaya' },
                { title: 'Kecerlangan', value: 'Magnitudo tampak 3.4' }
            ]
        },
        {
            name: 'Sombrero',
            type: 'Spiral',
            image: 'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Galaksi Sombrero (M104) adalah galaksi spiral yang terkenal dengan penampilannya yang menyerupai topi Sombrero. Galaksi ini memiliki tonjolan pusat yang besar dan jalur debu yang menonjol di cakramnya. Sombrero berjarak sekitar 29.3 juta tahun cahaya dari Bumi dan memiliki diameter sekitar 50.000 tahun cahaya.',
            facts: [
                { title: 'Jenis', value: 'Spiral' },
                { title: 'Diameter', value: '50.000 tahun cahaya' },
                { title: 'Jarak dari Bumi', value: '29.3 juta tahun cahaya' },
                { title: 'Kecerlangan', value: 'Magnitudo tampak 8.0' },
                { title: 'Massa', value: '800 miliar massa matahari' }
            ]
        },
        {
            name: 'Whirlpool',
            type: 'Spiral',
            image: 'https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxy-73873.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            description: 'Galaksi Whirlpool (M51) adalah galaksi spiral klasik yang terkenal karena interaksinya dengan galaksi pendamping NGC 5195. Interaksi gravitasi antara kedua galaksi ini telah memicu pembentukan bintang yang intens di Whirlpool. Galaksi ini berjarak sekitar 23 juta tahun cahaya dari Bumi dan memiliki struktur spiral yang sangat jelas.',
            facts: [
                { title: 'Jenis', value: 'Spiral' },
                { title: 'Diameter', value: '60.000 tahun cahaya' },
                { title: 'Jarak dari Bumi', value: '23 juta tahun cahaya' },
                { title: 'Kecerlangan', value: 'Magnitudo tampak 8.4' },
                { title: 'Penemu', value: 'Charles Messier (1773)' }
            ]
        }
    ];
    
    // Add event listeners to galaxy cards
    document.querySelectorAll('.galaxy-card').forEach(card => {
        card.addEventListener('click', function() {
            const galaxyId = this.getAttribute('data-galaxy');
            const galaxy = galaxies.find(g => g.name.toLowerCase().replace(' ', '-') === galaxyId);
            if (galaxy) showGalaxyDetail(galaxy);
        });
    });
    
    // Back button for galaxy detail
    document.getElementById('back-to-galaxies').addEventListener('click', function() {
        document.querySelector('.galaxy-grid').style.display = 'grid';
        document.getElementById('galaxy-detail').style.display = 'none';
    });
}

function showGalaxyDetail(galaxy) {
    // Hide galaxy grid and show detail
    document.querySelector('.galaxy-grid').style.display = 'none';
    const detailContainer = document.getElementById('galaxy-detail');
    detailContainer.style.display = 'block';
    
    // Set galaxy details
    document.getElementById('detail-galaxy-name').textContent = galaxy.name;
    document.getElementById('detail-galaxy-type').textContent = `Tipe: ${galaxy.type}`;
    document.getElementById('detail-galaxy-image').src = galaxy.image;
    document.getElementById('detail-galaxy-image').alt = galaxy.name;
    document.getElementById('detail-galaxy-description').innerHTML = `<p>${galaxy.description}</p>`;
    
    // Set galaxy facts
    const factsContainer = document.getElementById('galaxy-facts');
    factsContainer.innerHTML = galaxy.facts.map(fact => `
        <p><strong>${fact.title}:</strong> ${fact.value}</p>
    `).join('');
    
    // Scroll to detail
    detailContainer.scrollIntoView({ behavior: 'smooth' });
}

function setupSpaceQuiz() {
    const quizQuestions = [
        {
            question: 'Apa planet terbesar di tata surya kita?',
            options: ['Bumi', 'Mars', 'Jupiter', 'Venus'],
            correct: 2
        },
        {
            question: 'Bulan mengorbit benda langit apa?',
            options: ['Bumi', 'Matahari', 'Mars', 'Jupiter'],
            correct: 0
        },
        {
            question: 'Galaksi kita disebut apa?',
            options: ['Andromeda', 'Bima Sakti', 'Sombrero', 'Triangulum'],
            correct: 1
        },
        {
            question: 'Apa nama teleskop luar angkasa terkenal yang diluncurkan tahun 1990?',
            options: ['James Webb', 'Hubble', 'Kepler', 'Spitzer'],
            correct: 1
        },
        {
            question: 'Planet apa yang dikenal sebagai "Planet Merah"?',
            options: ['Venus', 'Mars', 'Jupiter', 'Saturnus'],
            correct: 1
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    const quizQuestion = document.getElementById('quiz-question');
    const quizOptions = document.getElementById('quiz-options');
    const quizPrev = document.getElementById('quiz-prev');
    const quizNext = document.getElementById('quiz-next');
    const quizResult = document.getElementById('quiz-result');
    
    function loadQuestion(index) {
        const question = quizQuestions[index];
        quizQuestion.textContent = question.question;
        
        quizOptions.innerHTML = question.options.map((option, i) => 
            `<div class="quiz-option" data-correct="${i === question.correct}">${option}</div>`
        ).join('');
        
        // Update navigation buttons
        quizPrev.disabled = index === 0;
        quizNext.textContent = index === quizQuestions.length - 1 ? 'Lihat Hasil' : 'Selanjutnya';
        
        // Add event listeners to options
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.addEventListener('click', function() {
                if (this.classList.contains('selected')) return;
                
                // Remove selected class from all options
                document.querySelectorAll('.quiz-option').forEach(opt => {
                    opt.classList.remove('selected', 'correct', 'incorrect');
                });
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Check if answer is correct
                if (this.getAttribute('data-correct') === 'true') {
                    this.classList.add('correct');
                    score++;
                } else {
                    this.classList.add('incorrect');
                    // Highlight correct answer
                    document.querySelector(`.quiz-option[data-correct="true"]`).classList.add('correct');
                }
            });
        });
    }
    
    quizPrev.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion(currentQuestion);
        }
    });
    
    quizNext.addEventListener('click', function() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            loadQuestion(currentQuestion);
        } else {
            // Show results
            quizResult.textContent = `Skor Anda: ${score} dari ${quizQuestions.length}`;
            quizResult.style.display = 'block';
            quizNext.disabled = true;
        }
    });
    
    // Load first question
    loadQuestion(0);
}

function createShootingStarAnimation() {
    const shootingStar = document.createElement('div');
    shootingStar.className = 'shooting-star';
    shootingStar.style.top = Math.random() * 100 + '%';
    shootingStar.style.left = Math.random() * 100 + '%';
    shootingStar.style.animationDelay = Math.random() * 5 + 's';
    shootingStar.style.animationDuration = (2 + Math.random() * 3) + 's';
    
    document.querySelector('.space-background').appendChild(shootingStar);
    
    // Remove element after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, 5000);
}

function showModal(title, content, imageUrl) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-text').innerHTML = content;
    document.getElementById('modal-image').src = imageUrl;
    document.getElementById('modal-image').alt = title;
    document.getElementById('modal-overlay').classList.add('active');
}