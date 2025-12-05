// Type card interaction for Products Page
const typeCards = document.querySelectorAll('.type-card');
const droneCards = document.querySelectorAll('.drone-card');

typeCards.forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-type');
        
        // Visual feedback
        typeCards.forEach(c => c.style.opacity = '0.5');
        card.style.opacity = '1';
        
        // Filter effect (visual demonstration)
        droneCards.forEach(drone => {
            drone.style.transform = 'scale(0.95)';
            drone.style.opacity = '0.7';
            
            setTimeout(() => {
                drone.style.transform = 'scale(1)';
                drone.style.opacity = '1';
            }, 300);
        });
        
        // Reset after animation
        setTimeout(() => {
            typeCards.forEach(c => c.style.opacity = '1');
        }, 1000);
    });
});

// Smooth animations on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.addEventListener('DOMContentLoaded', () => {
    droneCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});