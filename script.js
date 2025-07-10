// Countdown Timer
function updateCountdown() {
    const weddingDate = new Date('September 14, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // Calculate months
    const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44)); // Average days in a month
    const remainingDistanceAfterMonths = distance % (1000 * 60 * 60 * 24 * 30.44);
    const days = Math.floor(remainingDistanceAfterMonths / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timeValues = {
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };

    // Add pulse animation when numbers change
    const elements = ['months', 'days', 'hours', 'minutes', 'seconds'];
    elements.forEach(id => {
        const element = document.getElementById(id);
        const currentValue = element.textContent;
        const newValue = String(timeValues[id]).padStart(2, '0');

        if (currentValue !== newValue) {
            element.style.animation = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.animation = 'pulse 0.5s ease';
        }

        element.textContent = newValue;
    });

    // If the countdown is finished, display a message
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = '<p class="text-red-300 font-medium text-xl">We are Married!</p>';
    }
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);
const sections = document.querySelectorAll('section, #couple-header, #venue-header, #gallery-header, #contact-content');

sections.forEach(section => {
    observer.observe(section);
});

// Initial animations for hero section
document.getElementById('hero-title').classList.add('animate-slide-up');
document.getElementById('hero-subtitle').classList.add('animate-fade-in');
document.getElementById('hero-date').classList.add('animate-fade-in');
document.getElementById('hero-line').classList.add('animate-expand');
document.getElementById('discover-btn').classList.add('animate-slide-up');
document.getElementById('couple-header').classList.add('animate-fade-in');
document.getElementById('couple-story').classList.add('animate-slide-left');
document.getElementById('couple-image').classList.add('animate-slide-right');
document.getElementById('venue-header').classList.add('animate-fade-in');
document.getElementById('venue-map').classList.add('animate-slide-left');
document.getElementById('venue-details').classList.add('animate-slide-right');
document.getElementById('gallery-header').classList.add('animate-fade-in');
document.getElementById('gallery-grid').classList.add('animate-slide-up');
document.getElementById('contact-content').classList.add('animate-fade-in');

// Modal functionality
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const galleryImages = [
    'ruth.jpg',
    '2.jpg',
    'calm.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg',
    '6.jpg',
    '7.jpg',
    '8.jpg',
    '9.jpg',
    '10.jpg',
    '11.jpg',
    '12.jpg',
    '13.jpg',
    '14.jpg',
    '15.jpg',
    'longin.jpg',
    'video1.mp4', // <-- Added video file
    'video.mp4'
];
let currentImageIndex = 0;
const galleryCaptions = [
    'Celebrating beauty',
    'Forever in love',
    'Blessing in life',
    '', '', '', '', '', '', '', '', '', '', '', '', '', '',
    'Our Wedding Video' // <-- Added caption for video
];

function openModal(index) {
    currentImageIndex = index;
    const isVideo = galleryImages[index].toLowerCase().endsWith('.mp4');
    const modalImg = document.getElementById('modalImage');
    let videoElem = document.getElementById('modalVideo');
    if (isVideo) {
        if (!videoElem) {
            videoElem = document.createElement('video');
            videoElem.id = 'modalVideo';
            videoElem.controls = true;
            videoElem.style.maxWidth = '100%';
            videoElem.style.maxHeight = '80vh';
            modalImg.style.display = 'none';
            modalImg.parentNode.insertBefore(videoElem, modalImg);
        }
        videoElem.src = galleryImages[index];
        videoElem.style.display = '';
        modalImg.style.display = 'none';
    } else {
        if (videoElem) {
            videoElem.style.display = 'none';
            videoElem.pause && videoElem.pause();
        }
        modalImg.src = galleryImages[index];
        modalImg.style.display = '';
    }
    document.getElementById('modalCaption').textContent = galleryCaptions[index] || '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    let videoElem = document.getElementById('modalVideo');
    if (videoElem) {
        videoElem.pause && videoElem.pause();
    }
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Modal navigation functionality
function navigateModal(direction) {
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    const isVideo = galleryImages[currentImageIndex].toLowerCase().endsWith('.mp4');
    const modalImg = document.getElementById('modalImage');
    let videoElem = document.getElementById('modalVideo');
    if (isVideo) {
        if (!videoElem) {
            videoElem = document.createElement('video');
            videoElem.id = 'modalVideo';
            videoElem.controls = true;
            videoElem.style.maxWidth = '100%';
            videoElem.style.maxHeight = '80vh';
            modalImg.style.display = 'none';
            modalImg.parentNode.insertBefore(videoElem, modalImg);
        }
        videoElem.src = galleryImages[currentImageIndex];
        videoElem.style.display = '';
        modalImg.style.display = 'none';
    } else {
        if (videoElem) {
            videoElem.style.display = 'none';
            videoElem.pause && videoElem.pause();
        }
        modalImg.src = galleryImages[currentImageIndex];
        modalImg.style.display = '';
    }
    document.getElementById('modalCaption').textContent = galleryCaptions[currentImageIndex] || '';
}

// Close modal when clicking outside the content
modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function (e) {
    if (!modal.classList.contains('active')) return;

    switch (e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            navigateModal(-1);
            break;
        case 'ArrowRight':
            navigateModal(1);
            break;
    }
}); 
