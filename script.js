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
                content: 'Today, Jay Strear serves as a trusted EOS Implementer and leadership advisor, partnering with CEOs and executive teams to foster sustainable growth and cohesive cultures. He integrates entrepreneurial best practices—including EOS and Kolbe to help organizations bring structure, vision, and accountability to life across departments and individuals. Jay’s work centers on guiding leaders from chaos to clarity, empowering them to align vision with execution and lead with empathy, presence, and purpose.'
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
    }
    
    setupEventListeners() {
        const playPauseBtn = document.getElementById('playPauseBtn');
        
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', () => this.togglePlayPause());
        }
    }
    
    async loadRockerMD() {
        try {
            // Create audio element for Rocker_MD.mp3
            this.audioElement = new Audio();
            this.audioElement.crossOrigin = 'anonymous';
            this.audioElement.src = 'Rocker_MD.mp3';
            
            // Set up audio context and analyser
            await this.setupAudioContext();
            
            // Update button icons to show play state
            this.updateButtonIcons();
            
            // Draw the initial waveform
            this.drawWaveform();
            
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
            this.playheadPosition = 0;
            this.updateButtonIcons();
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
    
    togglePlayPause() {
        if (!this.audioElement) {
            // If audio element doesn't exist, try to load it
            this.loadRockerMD();
            return;
        }
        
        if (this.audioElement.paused) {
            this.audioElement.play().catch(error => {
                console.error('Error playing audio:', error);
            });
        } else {
            this.audioElement.pause();
        }
    }
    
    updateButtonIcons() {
        const playIcon = document.querySelector('.play-icon');
        const pauseIcon = document.querySelector('.pause-icon');
        
        if (this.audioElement && !this.audioElement.paused) {
            // Audio is playing - show pause icon
            if (playIcon) playIcon.style.display = 'none';
            if (pauseIcon) pauseIcon.style.display = 'block';
        } else {
            // Audio is paused - show play icon
            if (playIcon) playIcon.style.display = 'block';
            if (pauseIcon) pauseIcon.style.display = 'none';
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
}

// Initialize waveform visualizer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize on index page
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        window.waveformVisualizer = new WaveformVisualizer();
    }
});

// Clean up when leaving the page
window.addEventListener('beforeunload', () => {
    if (window.waveformVisualizer) {
        window.waveformVisualizer.destroy();
    }
});