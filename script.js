// Modal Management
class ModalManager {
    constructor() {
        this.loginModal = document.getElementById('loginModal');
        this.signupModal = document.getElementById('signupModal');
        this.addHabitModal = document.getElementById('addHabitModal');
        
        this.init();
    }
    
    init() {
        // Login Modal
        const loginBtn = document.getElementById('loginBtn');
        const closeLoginModal = document.getElementById('closeLoginModal');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.openModal(this.loginModal);
            });
        }
        
        if (closeLoginModal) {
            closeLoginModal.addEventListener('click', () => {
                this.closeModal(this.loginModal);
            });
        }
        
        // Signup Modal
        const signupBtn = document.getElementById('signupBtn');
        const closeSignupModal = document.getElementById('closeSignupModal');
        
        if (signupBtn) {
            signupBtn.addEventListener('click', () => {
                this.openModal(this.signupModal);
            });
        }
        
        if (closeSignupModal) {
            closeSignupModal.addEventListener('click', () => {
                this.closeModal(this.signupModal);
            });
        }
        
        // Add Habit Modal
        const addHabitBtn = document.getElementById('addHabitBtn');
        const closeAddHabitModal = document.getElementById('closeAddHabitModal');
        
        if (addHabitBtn) {
            addHabitBtn.addEventListener('click', () => {
                this.openModal(this.addHabitModal);
            });
        }
        
        if (closeAddHabitModal) {
            closeAddHabitModal.addEventListener('click', () => {
                this.closeModal(this.addHabitModal);
            });
        }
        
        // Close modal when clicking overlay
        [this.loginModal, this.signupModal, this.addHabitModal].forEach(modal => {
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal(modal);
                    }
                });
            }
        });
    }
    
    openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Habit Management
class HabitManager {
    constructor() {
        this.habitsGrid = document.getElementById('habitsGrid');
        this.habitForm = document.getElementById('habitForm');
        this.habits = this.loadHabits();
        
        this.init();
    }
    
    init() {
        // Habit form submission
        if (this.habitForm) {
            this.habitForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.addHabit();
            });
        }
        
        // Check buttons
        const checkButtons = document.querySelectorAll('.btn-check');
        checkButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const habitId = e.target.getAttribute('data-habit');
                this.completeHabit(habitId);
            });
        });
        
        // Render existing habits
        this.renderHabits();
    }
    
    loadHabits() {
        const saved = localStorage.getItem('habits');
        if (saved) {
            return JSON.parse(saved);
        }
        return [];
    }
    
    saveHabits() {
        localStorage.setItem('habits', JSON.stringify(this.habits));
    }
    
    addHabit() {
        const name = document.getElementById('habitName').value;
        const days = parseInt(document.getElementById('habitDays').value);
        const description = document.getElementById('habitDescription').value;
        
        if (!name || !days) {
            alert('습관 이름과 목표 일수를 입력해주세요.');
            return;
        }
        
        const newHabit = {
            id: Date.now().toString(),
            name: name,
            targetDays: days,
            description: description,
            currentDays: 0,
            consecutiveDays: 0,
            completed: false
        };
        
        this.habits.push(newHabit);
        this.saveHabits();
        this.renderHabits();
        
        // Close modal and reset form
        const modal = document.getElementById('addHabitModal');
        if (modal) {
            modal.classList.remove('active');
        }
        this.habitForm.reset();
        document.body.style.overflow = '';
    }
    
    completeHabit(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) {
            // Handle default habits (not in localStorage)
            const btn = document.querySelector(`[data-habit="${habitId}"]`);
            if (btn && !btn.classList.contains('completed')) {
                btn.classList.add('completed');
                btn.textContent = '✓ 완료됨';
                alert('오늘의 습관이 완료되었습니다!');
            }
            return;
        }
        
        if (!habit.completed) {
            habit.currentDays++;
            habit.consecutiveDays++;
            habit.completed = true;
            this.saveHabits();
            this.renderHabits();
            alert('오늘의 습관이 완료되었습니다!');
        }
    }
    
    renderHabits() {
        if (!this.habitsGrid) return;
        
        // Clear existing custom habits
        const customHabits = this.habitsGrid.querySelectorAll('[data-custom-habit]');
        customHabits.forEach(habit => habit.remove());
        
        // Render new habits
        this.habits.forEach(habit => {
            const habitCard = this.createHabitCard(habit);
            this.habitsGrid.appendChild(habitCard);
        });
    }
    
    createHabitCard(habit) {
        const card = document.createElement('div');
        card.className = 'habit-card';
        card.setAttribute('data-custom-habit', 'true');
        card.setAttribute('data-habit-id', habit.id);
        
        const progress = Math.min((habit.currentDays / habit.targetDays) * 100, 100);
        const achievementRate = Math.round((habit.currentDays / habit.targetDays) * 100);
        
        card.innerHTML = `
            <div class="habit-card-header">
                <h3 class="habit-title">${habit.name}</h3>
                <button class="btn-edit" onclick="habitManager.editHabit('${habit.id}')">수정</button>
            </div>
            <div class="habit-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <span class="progress-text">${habit.currentDays}일 / ${habit.targetDays}일</span>
            </div>
            <div class="habit-stats">
                <div class="stat-item">
                    <span class="stat-label">연속일</span>
                    <span class="stat-value">${habit.consecutiveDays}일</span>
                </div>
                <div class="stat-item">
                    <span class="stat-label">달성률</span>
                    <span class="stat-value">${achievementRate}%</span>
                </div>
            </div>
            <div class="habit-actions">
                <button class="btn-check ${habit.completed ? 'completed' : ''}" 
                        data-habit="${habit.id}"
                        ${habit.completed ? 'disabled' : ''}>
                    ${habit.completed ? '✓ 완료됨' : '✓ 오늘 완료'}
                </button>
            </div>
        `;
        
        // Add event listener to check button
        const checkBtn = card.querySelector('.btn-check');
        if (checkBtn) {
            checkBtn.addEventListener('click', () => {
                this.completeHabit(habit.id);
            });
        }
        
        return card;
    }
    
    editHabit(habitId) {
        const habit = this.habits.find(h => h.id === habitId);
        if (!habit) return;
        
        const newName = prompt('습관 이름을 수정하세요:', habit.name);
        if (newName && newName.trim()) {
            habit.name = newName.trim();
            this.saveHabits();
            this.renderHabits();
        }
    }
}

// Auth Form Handlers
class AuthManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Login form
        const loginForm = document.querySelector('#loginModal .auth-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }
        
        // Signup form
        const signupForm = document.querySelector('#signupModal .auth-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignup(e.target);
            });
        }
    }
    
    handleLogin(form) {
        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelector('input[type="password"]').value;
        
        // Simulate login (replace with actual API call)
        console.log('Login attempt:', { email, password });
        alert('로그인 기능은 실제 API와 연동이 필요합니다.');
        
        // Close modal
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    handleSignup(form) {
        const name = form.querySelector('input[type="text"]').value;
        const email = form.querySelectorAll('input[type="email"]')[0].value;
        const password = form.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
        
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        
        // Simulate signup (replace with actual API call)
        console.log('Signup attempt:', { name, email, password });
        alert('회원가입 기능은 실제 API와 연동이 필요합니다.');
        
        // Close modal
        const modal = document.getElementById('signupModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize everything when DOM is loaded
let modalManager;
let habitManager;
let authManager;

document.addEventListener('DOMContentLoaded', () => {
    modalManager = new ModalManager();
    habitManager = new HabitManager();
    authManager = new AuthManager();
    initSmoothScroll();
    
    // Make habitManager globally available for edit button
    window.habitManager = habitManager;
});
