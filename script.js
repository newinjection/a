// Constants
const STORAGE_KEY = 'hasRated';
const RATING_TIMESTAMP_KEY = 'ratingTimestamp';

// Elements
const ratingButtons = document.getElementById('ratingButtons');
const responseMessage = document.getElementById('responseMessage');
const allButtons = document.querySelectorAll('.rating-btn');

// Response messages
const responses = {
    excellent: `
        <div style="font-size: 24px; margin-bottom: 12px;">🎉 תודה רבה!</div>
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">המשוב שלך התקבל בהצלחה</div>
        <div style="font-size: 13px; opacity: 0.75; font-style: italic;">
            (למען האמת... זה לא באמת נשלח לשום מקום 😊)
        </div>
    `,
    fair: `
        <div style="font-size: 24px; margin-bottom: 12px;">🙏 תודה על המשוב</div>
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">אשתדל להשתפר!</div>
        <div style="font-size: 13px; opacity: 0.75; font-style: italic;">
            (אבל אף אחד לא באמת ידע מזה 🤫)
        </div>
    `,
    poor: `
        <div style="font-size: 24px; margin-bottom: 12px;">💪 מצטער לשמוע</div>
        <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">אנסה להשתדל הרבה יותר בפעם הבאה!</div>
        <div style="font-size: 13px; opacity: 0.75; font-style: italic;">
            (בכל מקרה זה לא נשלח לשום מקום, אז אנחנו בסדר 😅)
        </div>
    `
};

const alreadyRatedMessage = `
    <div style="font-size: 24px; margin-bottom: 12px;">✅ כבר דירגת</div>
    <div style="font-size: 16px; font-weight: 600; margin-bottom: 8px;">אתה כבר שיתפת את המשוב שלך</div>
    <div style="font-size: 13px; opacity: 0.75; font-style: italic;">
        (או שלא... אף אחד לא באמת יודע 🤷‍♂️)
    </div>
`;

// Check if already rated
const hasRated = localStorage.getItem(STORAGE_KEY);

if (hasRated) {
    showAlreadyRatedMessage();
}

// Add click listeners
allButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        if (hasRated) {
            return;
        }
        
        const rating = this.getAttribute('data-rating');
        handleRating(rating, this);
    });

    // Add hover sound effect (optional)
    button.addEventListener('mouseenter', function() {
        this.style.setProperty('--hover', '1');
    });
});

function handleRating(rating, button) {
    // Mark as rated
    localStorage.setItem(STORAGE_KEY, 'true');
    localStorage.setItem(RATING_TIMESTAMP_KEY, new Date().toISOString());
    
    // Animate selected button
    button.style.transform = 'translateX(-5px) scale(1.05)';
    button.style.zIndex = '10';
    
    // Add shine effect
    const shine = document.createElement('div');
    shine.style.cssText = `
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        transition: left 0.5s;
        z-index: 2;
    `;
    button.appendChild(shine);
    setTimeout(() => shine.style.left = '100%', 10);
    
    // Disable all buttons
    ratingButtons.classList.add('disabled');
    
    // Show response
    setTimeout(() => {
        showResponse(rating);
        
        // Confetti for excellent rating
        if (rating === 'excellent') {
            createConfetti();
            createFireworks();
        }
    }, 400);
}

function showResponse(rating) {
    responseMessage.innerHTML = responses[rating];
    responseMessage.className = 'response-message show ' + rating + '-msg';
}

function showAlreadyRatedMessage() {
    ratingButtons.classList.add('disabled');
    responseMessage.innerHTML = alreadyRatedMessage;
    responseMessage.className = 'response-message show fair-msg';
}

// Enhanced confetti effect
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#a29bfe', '#fd79a8', '#fdcb6e'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const startX = Math.random() * window.innerWidth;
            const endX = startX + (Math.random() - 0.5) * 300;
            const rotation = Math.random() * 360;
            const duration = Math.random() * 2 + 2;
            
            confetti.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                left: ${startX}px;
                top: -20px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 9999;
                pointer-events: none;
                box-shadow: 0 0 10px ${color};
            `;
            
            document.body.appendChild(confetti);
            
            confetti.animate([
                { 
                    transform: `translate(0, 0) rotate(0deg)`,
                    opacity: 1 
                },
                { 
                    transform: `translate(${endX - startX}px, ${window.innerHeight + 20}px) rotate(${rotation}deg)`,
                    opacity: 0 
                }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => confetti.remove(), duration * 1000);
        }, i * 30);
    }
}

// Fireworks effect
function createFireworks() {
    const colors = ['#ff6b6b', '#4ecdc4', '#f9ca24', '#6c5ce7', '#fd79a8'];
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * (window.innerHeight * 0.5);
            
            for (let j = 0; j < 20; j++) {
                const particle = document.createElement('div');
                const angle = (Math.PI * 2 * j) / 20;
                const velocity = Math.random() * 100 + 50;
                const color = colors[Math.floor(Math.random() * colors.length)];
                
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: ${color};
                    border-radius: 50%;
                    left: ${x}px;
                    top: ${y}px;
                    z-index: 9999;
                    pointer-events: none;
                    box-shadow: 0 0 10px ${color};
                `;
                
                document.body.appendChild(particle);
                
                const endX = x + Math.cos(angle) * velocity;
                const endY = y + Math.sin(angle) * velocity;
                
                particle.animate([
                    { 
                        transform: 'translate(0, 0) scale(1)',
                        opacity: 1 
                    },
                    { 
                        transform: `translate(${endX - x}px, ${endY - y}px) scale(0)`,
                        opacity: 0 
                    }
                ], {
                    duration: 1000,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => particle.remove(), 1000);
            }
        }, i * 200);
    }
}

// Easter egg: Double click footer to reset
document.querySelector('.footer').addEventListener('dblclick', function() {
    if (confirm('למחוק את הדירוג ולאפשר דירוג מחדש?')) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(RATING_TIMESTAMP_KEY);
        location.reload();
    }
});

// Add some sparkle to robot on hover
document.querySelector('.robot-avatar').addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.1) rotate(5deg)';
});

document.querySelector('.robot-avatar').addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1) rotate(0deg)';
});

console.log('%c🤖 מערכת דירוג IT מתקדמת v2.0', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c💡 טיפ: לחץ פעמיים על הפוטר כדי לאפס את הדירוג', 'font-size: 12px; color: #666;');
