// Jazz-inspired smooth animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll-triggered animations with jazz rhythm
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
            }
        });
    }, observerOptions);

    // Observe all sections for smooth scroll animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        observer.observe(section);
    });

    // Subtle parallax effect with jazz tempo
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const visualElement = document.querySelector('.visual-element');
        if (visualElement) {
            const rate = scrolled * -0.3; // Slower, more deliberate movement
            visualElement.style.transform = `rotate(5deg) translateY(${rate}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Enhanced CTA button interactions
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 12px 30px rgba(201, 139, 65, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(201, 139, 65, 0.3)';
        });
    });

    // Keyboard navigation with focus management
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Enhanced scroll behavior with navigation
    let lastScrollTop = 0;
    const nav = document.querySelector('.main-nav');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const direction = scrollTop > lastScrollTop ? 'down' : 'up';
        lastScrollTop = scrollTop;
        
        // Add subtle rhythm to scroll behavior
        document.body.style.setProperty('--scroll-direction', direction);
        
        // Navigation scroll effect
        if (scrollTop > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
});

// Services Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carouselTrack = document.getElementById('carouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Initialize carousel
    function initCarousel() {
        updateCarousel();
        updateDots();
        updateButtons();
    }
    
    // Update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;
        
        // Update active slide
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Update dot indicators
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Update navigation buttons
    function updateButtons() {
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
        updateDots();
        updateButtons();
    }
    
    // Next slide
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateCarousel();
            updateDots();
            updateButtons();
        }
    }
    
    // Previous slide
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
            updateDots();
            updateButtons();
        }
    }
    
    // Auto-play functionality (optional)
    let autoPlayInterval;
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            if (currentSlide < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0); // Loop back to first slide
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Event listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    carouselTrack.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        stopAutoPlay();
    });
    
    carouselTrack.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                nextSlide(); // Swipe left - next slide
            } else {
                prevSlide(); // Swipe right - previous slide
            }
        }
    });
    
    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoPlay);
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Initialize carousel
    initCarousel();
    
    // Start auto-play (optional - comment out if not desired)
    // startAutoPlay();
});

// Timeline functionality for About page
document.addEventListener('DOMContentLoaded', function() {
    const timelinePoints = document.querySelectorAll('.timeline-point.clickable');
    
    timelinePoints.forEach(point => {
        point.addEventListener('click', function() {
            const phase = this.getAttribute('data-phase');
            showTimelineModal(phase);
        });
    });
    
    function showTimelineModal(phase) {
        // Create modal content based on phase
        const modalContent = {
            'early-career': {
                title: 'Early Career',
                content: 'Jay Strear began his career in the nonprofit and educational sectors, where he developed a reputation for strategic vision, adaptability, and community-oriented leadership. He held pivotal management roles, led multi-faceted teams, and guided organizational restructures and institutional initiatives that advanced collaboration and innovation. These formativeexperiences shaped his ability to foster trust, balance complex demands, and lead with clarity and compassion.'
            },
            'transformation': {
                title: 'Transformation',
                content: 'Jay’s career reached a pivotal moment when he became a CEO, responsible for leading an organization through a period of change and growth. During this time, he discovered and implemented the Entrepreneurial Operating System (EOS), aligning his leadership team around shared accountability, clear priorities, and strategic focus. This hands-on experience with EOS reshaped organizational culture, improved alignment, and ignited Jay’s commitment to helping other leaders achieve the same sense of clarity and traction in their own companies.'
            },
            'present': {
                title: 'Present',
                content: 'Today, Jay Strear serves as a trusted teacher, facilitator, coach, partnering with CEOs and executive teams to foster sustainable growth and cohesive cultures. He integrates entrepreneurial best practices—including EOS and Kolbe to help organizations bring structure, vision, and accountability to life across departments and individuals. Jay’s work centers on guiding leaders from chaos to clarity, empowering them to align vision with execution and lead with empathy, presence, and purpose.'
            }
        };
        
        const phaseData = modalContent[phase];
        if (phaseData) {
            // Create and show modal
            const modal = document.createElement('div');
            modal.className = 'timeline-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${phaseData.title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${phaseData.content}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Add modal styles
            const modalStyles = document.createElement('style');
            modalStyles.textContent = `
                .timeline-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                
                .modal-content {
                    background: white;
                    border-radius: 12px;
                    padding: 2rem;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: slideUp 0.3s ease;
                }
                
                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                }
                
                .modal-header h3 {
                    color: #1C2942;
                    font-family: 'Playfair Display', serif;
                    font-size: 1.5rem;
                    margin: 0;
                }
                
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #7A5B42;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-body p {
                    color: #7A5B42;
                    line-height: 1.6;
                    margin: 0;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes slideUp {
                    from { transform: translateY(30px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
            `;
            document.head.appendChild(modalStyles);
            
            // Close modal functionality
            const closeBtn = modal.querySelector('.modal-close');
            closeBtn.addEventListener('click', () => {
                modal.remove();
                modalStyles.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                    modalStyles.remove();
                }
            });
        }
    }
});

// Add CSS for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .keyboard-navigation .cta-button:focus {
        outline: 2px solid #8b7355;
        outline-offset: 2px;
    }
    
    .carousel-slide {
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .carousel-track {
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
`;
document.head.appendChild(style);

// Global Audio Manager for persistent playback across pages
class GlobalAudioManager {
    constructor() {
        this.audioElement = null;
        this.audioContext = null;
        this.analyser = null;
        this.audioSource = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.isInitialized = false;
        
        // Initialize global audio if not already done
        if (!window.globalAudioManager) {
            this.init();
            window.globalAudioManager = this;
        }
    }
    
    init() {
        this.setupEventListeners();
        this.loadAudio();
        this.restoreAudioState();
    }
    
    setupEventListeners() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        console.log('GlobalAudioManager setupEventListeners:', {
            playPauseBtn: !!playPauseBtn,
            hasListener: playPauseBtn ? playPauseBtn.hasAttribute('data-listener-added') : 'no button',
            page: window.location.pathname
        });
        
        if (playPauseBtn && !playPauseBtn.hasAttribute('data-listener-added')) {
            console.log('Adding GlobalAudioManager event listeners');
            
            // Add both click and touch events for better mobile support
            playPauseBtn.addEventListener('click', (e) => {
                console.log('GlobalAudioManager: Button clicked!');
                e.preventDefault();
                this.togglePlayPause();
            });
            
            playPauseBtn.addEventListener('touchend', (e) => {
                console.log('GlobalAudioManager: Button touched!');
                e.preventDefault();
                this.togglePlayPause();
            });
            
            playPauseBtn.setAttribute('data-listener-added', 'true');
        } else if (playPauseBtn) {
            console.log('Button already has listeners');
        } else {
            console.log('Button not found!');
        }
        
        // Save audio state before page unload (only add once)
        if (!this.beforeUnloadListenerAdded) {
            window.addEventListener('beforeunload', () => {
                this.saveAudioState();
            });
            this.beforeUnloadListenerAdded = true;
        }
        
        // Update button state on page load
        this.updateButtonIcons();
    }
    
    async loadAudio() {
        if (this.audioElement) return; // Already loaded
        
        try {
            this.audioElement = new Audio();
            this.audioElement.crossOrigin = 'anonymous';
            this.audioElement.src = 'Rocker_MD.mp3';
            
            // Wait for audio to be ready
            await new Promise((resolve, reject) => {
                this.audioElement.addEventListener('canplaythrough', resolve, { once: true });
                this.audioElement.addEventListener('error', reject, { once: true });
                this.audioElement.load();
            });
            
            // Set up audio context
            this.setupAudioContext();
            
            // Restore previous state after audio is ready
            setTimeout(() => {
                this.restoreAudioState();
                this.updateButtonIcons();
            }, 100);
            
        } catch (error) {
            console.error('Error loading audio:', error);
            this.updateButtonIcons(); // Update button state even if audio fails
        }
    }
    
    setupAudioContext() {
        if (this.audioContext) return; // Already set up
        
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        
        this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        // Configure analyser
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = 0.3;
        
        // Set up audio event listeners
        this.audioElement.addEventListener('play', () => {
            this.isPlaying = true;
            this.updateButtonIcons();
            this.startRecordSpinning();
        });
        
        this.audioElement.addEventListener('pause', () => {
            this.isPlaying = false;
            this.updateButtonIcons();
            this.stopRecordSpinning();
        });
        
        this.audioElement.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentTime = 0;
            this.updateButtonIcons();
            this.stopRecordSpinning();
        });
        
        this.audioElement.addEventListener('timeupdate', () => {
            this.currentTime = this.audioElement.currentTime;
            // Save state periodically while playing
            this.saveAudioState();
        });
    }
    
    togglePlayPause() {
        console.log('GlobalAudioManager togglePlayPause called', {
            isToggling: this.isToggling,
            hasAudioElement: !!this.audioElement,
            audioPaused: this.audioElement ? this.audioElement.paused : 'no audio',
            page: window.location.pathname
        });
        
        // Prevent rapid clicking
        if (this.isToggling) {
            console.log('Toggle blocked - already toggling');
            return;
        }
        this.isToggling = true;
        
        if (!this.audioElement) {
            console.log('No audio element - loading audio');
            this.loadAudio();
            this.isToggling = false;
            return;
        }
        
        if (this.audioElement.paused) {
            console.log('Playing audio');
            this.audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
                this.updateButtonIcons();
            });
        } else {
            console.log('Pausing audio');
            this.audioElement.pause();
        }
        
        // Reset toggle lock after a short delay
        setTimeout(() => {
            this.isToggling = false;
        }, 300);
    }
    
    updateButtonIcons() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        // Default to play state if no audio element
        const isPlaying = this.audioElement && !this.audioElement.paused;
        
        if (isPlaying) {
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        } else {
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
        
        // Update the isPlaying state
        this.isPlaying = isPlaying;
        
        // Notify WaveformVisualizer if it exists
        if (window.waveformVisualizer && window.waveformVisualizer.updateButtonIcons) {
            window.waveformVisualizer.updateButtonIcons();
        }
    }
    
    startRecordSpinning() {
        const record = document.getElementById('record');
        if (record) {
            record.style.animationPlayState = 'running';
        }
    }
    
    stopRecordSpinning() {
        const record = document.getElementById('record');
        if (record) {
            record.style.animationPlayState = 'paused';
        }
    }
    
    saveAudioState() {
        if (this.audioElement) {
            localStorage.setItem('audioCurrentTime', this.audioElement.currentTime.toString());
            localStorage.setItem('audioIsPlaying', this.isPlaying.toString());
        }
    }
    
    restoreAudioState() {
        if (!this.audioElement) return;
        
        const savedTime = localStorage.getItem('audioCurrentTime');
        const savedIsPlaying = localStorage.getItem('audioIsPlaying');
        
        if (savedTime) {
            this.audioElement.currentTime = parseFloat(savedTime);
            this.currentTime = parseFloat(savedTime);
        }
        
        if (savedIsPlaying === 'true') {
            // Only auto-play if user has previously interacted with the page
            // This prevents autoplay issues in modern browsers
            this.audioElement.play().catch(error => {
                console.log('Auto-play prevented by browser:', error);
                // Update button state to reflect actual state
                this.updateButtonIcons();
            });
        }
    }
}

// Audio Waveform Visualizer
class WaveformVisualizer {
    constructor() {
        this.audioElement = null;
        this.audioContext = null;
        this.analyser = null;
        this.audioSource = null;
        this.waveformData = null;
        this.isPlaying = false;
        this.animationId = null;
        this.playheadPosition = 0;
        this.record = null;
        
        this.init();
    }
    
    init() {
        this.record = document.getElementById('record');
        this.setupEventListeners();
        
        // Initialize button state
        this.updateButtonIcons();
        
        // Auto-load Rocker_MD.mp3
        this.loadRockerMD();
        
        // Add additional state saving mechanisms
        this.setupStateSaving();
        
        // Sync with GlobalAudioManager state
        this.syncWithGlobalAudioManager();
    }
    
    setupEventListeners() {
        // Don't add event listeners here - GlobalAudioManager handles them
        // We just need to sync our state with GlobalAudioManager
        if (window.globalAudioManager) {
            this.isPlaying = window.globalAudioManager.isPlaying;
            this.updateButtonIcons();
        }
    }
    
    async loadRockerMD() {
        try {
            // Use the existing audio element from GlobalAudioManager
            if (window.globalAudioManager && window.globalAudioManager.audioElement) {
                this.audioElement = window.globalAudioManager.audioElement;
                console.log('Using existing audio element from GlobalAudioManager');
            } else {
                // Fallback: create new audio element if GlobalAudioManager doesn't exist
            this.audioElement = new Audio();
            this.audioElement.crossOrigin = 'anonymous';
            this.audioElement.src = 'Rocker_MD.mp3';
                console.log('Created new audio element');
            }
            
            // Set up audio context and analyser
            await this.setupAudioContext();
            
            // Update button icons to show play state
            this.updateButtonIcons();
            
            // Draw the initial waveform
            this.drawWaveform();
            
            // Restore previous audio state after audio is loaded
            this.audioElement.addEventListener('canplay', () => {
                this.restoreAudioState();
            }, { once: true });
            
        } catch (error) {
            console.error('Error loading Rocker_MD.mp3:', error);
            // Still show play button even if loading fails
            this.updateButtonIcons();
        }
    }
    
    
    async setupAudioContext() {
        // Create audio context
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        
        // Connect audio element to analyser
        this.audioSource = this.audioContext.createMediaElementSource(this.audioElement);
        this.audioSource.connect(this.analyser);
        this.analyser.connect(this.audioContext.destination);
        
        // Configure analyser for time domain data (waveform)
        this.analyser.fftSize = 2048;
        this.analyser.smoothingTimeConstant = 0.3;
        
        // Create data array for time domain data
        const bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(bufferLength);
        
        // Set up additional event listeners for vinyl record functionality
        // Note: GlobalAudioManager already handles play/pause/ended events
        this.audioElement.addEventListener('play', () => {
            this.startRecordSpinning();
        });
        
        this.audioElement.addEventListener('pause', () => {
            this.stopRecordSpinning();
        });
        
        this.audioElement.addEventListener('ended', () => {
            this.stopRecordSpinning();
        });
    }
    
    
    startRecordSpinning() {
        if (this.record) {
            this.record.style.animationPlayState = 'running';
        }
    }
    
    stopRecordSpinning() {
        if (this.record) {
            this.record.style.animationPlayState = 'paused';
        }
    }
    
    // togglePlayPause is handled by GlobalAudioManager
    
    syncWithGlobalAudioManager() {
        if (window.globalAudioManager) {
            console.log('Syncing WaveformVisualizer with GlobalAudioManager');
            this.isPlaying = window.globalAudioManager.isPlaying;
            this.updateButtonIcons();
            
            // Start/stop record spinning based on current state
            if (this.isPlaying) {
                this.startRecordSpinning();
            } else {
                this.stopRecordSpinning();
            }
        }
    }
    
    updateButtonIcons() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        // Sync with GlobalAudioManager's state
        if (window.globalAudioManager) {
            this.isPlaying = window.globalAudioManager.isPlaying;
        } else if (this.audioElement) {
            this.isPlaying = !this.audioElement.paused;
        }
        
        // Only update the visual state, don't call GlobalAudioManager
        if (this.isPlaying) {
            // Audio is playing - show pause icon
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        } else {
            // Audio is paused - show play icon
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
        }
        
        // Update vinyl record spinning based on state
        if (this.isPlaying) {
            this.startRecordSpinning();
        } else {
            this.stopRecordSpinning();
        }
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.audioContext) {
            this.audioContext.close();
        }
        
        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.src = '';
        }
    }
    
    setupStateSaving() {
        // Save state when page is about to be unloaded
        window.addEventListener('beforeunload', () => {
            this.saveAudioState();
        });
        
        // Save state when page becomes hidden (mobile browsers)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveAudioState();
            }
        });
        
        // Save state when window loses focus
        window.addEventListener('blur', () => {
            this.saveAudioState();
        });
    }
    
    saveAudioState() {
        if (this.audioElement) {
            localStorage.setItem('audioCurrentTime', this.audioElement.currentTime.toString());
            localStorage.setItem('audioIsPlaying', this.isPlaying.toString());
            console.log('Audio state saved:', { 
                currentTime: this.audioElement.currentTime, 
                isPlaying: this.isPlaying 
            });
        }
    }
    
    restoreAudioState() {
        if (!this.audioElement) return;
        
        // Use GlobalAudioManager's state instead of localStorage directly
        if (window.globalAudioManager) {
            console.log('Using GlobalAudioManager state for restoration');
            // The GlobalAudioManager already handles state restoration
            // We just need to sync our local state
            this.isPlaying = window.globalAudioManager.isPlaying;
            this.updateButtonIcons();
            
            // Start/stop record spinning based on current state
            if (this.isPlaying) {
                this.startRecordSpinning();
            } else {
                this.stopRecordSpinning();
            }
        } else {
            // Fallback to localStorage if GlobalAudioManager doesn't exist
            const savedTime = localStorage.getItem('audioCurrentTime');
            const savedIsPlaying = localStorage.getItem('audioIsPlaying');
            
            console.log('Fallback: Restoring from localStorage:', { savedTime, savedIsPlaying });
            
            if (savedTime) {
                const time = parseFloat(savedTime);
                this.audioElement.currentTime = time;
                this.playheadPosition = time;
            }
            
            if (savedIsPlaying === 'true') {
                this.audioElement.play().catch(error => {
                    console.log('Auto-play prevented by browser:', error);
                });
            }
        }
    }
}

// Mobile Burger Menu Functionality
class MobileMenu {
    constructor() {
        this.burgerMenu = document.getElementById('burgerMenu');
        this.mobileMenu = document.getElementById('mobileMenu');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.burgerMenu && this.mobileMenu) {
            // Set initial display states based on screen size
            this.setInitialDisplayStates();
            
            this.burgerMenu.addEventListener('click', () => this.toggleMenu());
            
            // Close menu when clicking on a link
            const mobileLinks = this.mobileMenu.querySelectorAll('.mobile-nav-link');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => this.closeMenu());
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isOpen && !this.burgerMenu.contains(e.target) && !this.mobileMenu.contains(e.target)) {
                    this.closeMenu();
                }
            });
            
            // Close menu on window resize if screen becomes larger
            window.addEventListener('resize', () => {
                if (window.innerWidth > 768) {
                    this.closeMenu();
                }
                
                // Ensure proper display states on resize
                const navLinks = document.querySelector('.nav-links');
                const burgerMenu = document.querySelector('.burger-menu');
                const mobileMenu = document.querySelector('.mobile-menu');
                
                if (window.innerWidth <= 768) {
                    if (navLinks) navLinks.style.display = 'none';
                    if (burgerMenu) burgerMenu.style.display = 'flex';
                    if (mobileMenu) mobileMenu.style.display = 'block';
                } else {
                    if (navLinks) navLinks.style.display = 'flex';
                    if (burgerMenu) burgerMenu.style.display = 'none';
                    if (mobileMenu) mobileMenu.style.display = 'none';
                }
            });
        }
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.burgerMenu.classList.add('active');
        this.mobileMenu.classList.add('active');
        this.isOpen = true;
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    closeMenu() {
        this.burgerMenu.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        this.isOpen = false;
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    setInitialDisplayStates() {
        const navLinks = document.querySelector('.nav-links');
        const burgerMenu = document.querySelector('.burger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (window.innerWidth <= 768) {
            if (navLinks) navLinks.style.display = 'none';
            if (burgerMenu) burgerMenu.style.display = 'flex';
            if (mobileMenu) mobileMenu.style.display = 'block';
        } else {
            if (navLinks) navLinks.style.display = 'flex';
            if (burgerMenu) burgerMenu.style.display = 'none';
            if (mobileMenu) mobileMenu.style.display = 'none';
        }
    }
}

// Initialize audio and mobile menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing audio system');
    
    // Initialize mobile menu on all pages
    window.mobileMenu = new MobileMenu();
    
    // Initialize GlobalAudioManager on all pages (including index)
    if (!window.globalAudioManager) {
        console.log('Creating GlobalAudioManager');
        window.globalAudioManager = new GlobalAudioManager();
    } else {
        console.log('Using existing GlobalAudioManager');
    }
    
    // On index page, also initialize WaveformVisualizer for vinyl record functionality
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        if (!window.waveformVisualizer) {
            console.log('Creating WaveformVisualizer');
            // Wait for GlobalAudioManager to be ready
            setTimeout(() => {
        window.waveformVisualizer = new WaveformVisualizer();
            }, 100);
        } else {
            console.log('Using existing WaveformVisualizer');
        }
    }
    
    // Test button functionality
    setTimeout(() => {
        const testBtn = document.getElementById('playPauseBtn');
        if (testBtn) {
            console.log('Button test - adding test click handler');
            testBtn.addEventListener('click', () => {
                console.log('TEST: Button click detected!');
            });
        } else {
            console.log('ERROR: Button not found for testing!');
        }
    }, 200);
});

// Clean up when leaving the page
window.addEventListener('beforeunload', () => {
    if (window.globalAudioManager) {
        window.globalAudioManager.saveAudioState();
    }
    if (window.waveformVisualizer) {
        window.waveformVisualizer.saveAudioState();
    }
});