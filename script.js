// בדיקה אם המשתמש כבר דירג
const hasRated = localStorage.getItem('hasRated');
const ratingButtons = document.getElementById('ratingButtons');
const responseMessage = document.getElementById('responseMessage');

// אובייקט התגובות המצחיקות
const responses = {
    excellent: 'תודה לך! 🎉<br><small style="opacity: 0.7;">(אבל זה לא נשלח לשום מקום 😊)</small>',
    fair: 'תודה בכל מקרה! 🙏<br><small style="opacity: 0.7;">(אבל אף אחד לא ידע מזה 🤫)</small>',
    poor: 'אנסה להשתדל יותר בפעם הבאה! 💪<br><small style="opacity: 0.7;">(אבל זה לא נשלח לשום מקום בכל מקרה 😅)</small>'
};

// אם כבר דירג - הצג הודעה
if (hasRated) {
    showAlreadyRatedMessage();
}

// האזנה ללחיצות על כפתורי הדירוג
document.querySelectorAll('.rating-btn').forEach(button => {
    button.addEventListener('click', function() {
        if (hasRated) {
            return;
        }

        const rating = this.getAttribute('data-rating');
        handleRating(rating);
    });
});

function handleRating(rating) {
    // סמן שהמשתמש כבר דירג
    localStorage.setItem('hasRated', 'true');
    
    // הוסף אנימציה לכפתור שנבחר
    const selectedButton = document.querySelector(`[data-rating="${rating}"]`);
    selectedButton.style.transform = 'scale(1.05)';
    
    // השבת את שאר הכפתורים
    ratingButtons.classList.add('disabled');
    
    // הצג הודעת תגובה
    setTimeout(() => {
        showResponse(rating);
    }, 300);
}

function showResponse(rating) {
    responseMessage.innerHTML = responses[rating];
    responseMessage.className = 'response-message show ' + rating + '-msg';
    
    // אפקט קונפטי לטוב מאוד
    if (rating === 'excellent') {
        createConfetti();
    }
}

function showAlreadyRatedMessage() {
    ratingButtons.classList.add('disabled');
    responseMessage.innerHTML = 'כבר דירגת את השירות שלי! 😊<br><small style="opacity: 0.7;">(ממש הערכתי את זה... או לא... אף אחד לא יודע 🤷‍♂️)</small>';
    responseMessage.className = 'response-message show fair-msg';
}

// אפקט קונפטי פשוט
function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = Math.random() * 3 + 2;
        const xMovement = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${xMovement}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => {
            confetti.remove();
        }, duration * 1000);
    }
}

// אפשרות לאיפוס (רק לצורך בדיקה - הסר בייצור)
// localStorage.removeItem('hasRated');
