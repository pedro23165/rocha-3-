document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const logoutButton = document.getElementById('logoutButton');

    const loginMessageEl = document.getElementById('loginMessage');
    const registerMessageEl = document.getElementById('registerMessage');

    // Simulate a user database with localStorage
    const DUMMY_USERNAME = "user";
    const DUMMY_PASSWORD = "password123";

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            if (!username || !password) {
                displayMessage(loginMessageEl, 'Por favor, preencha todos os campos.', 'error');
                return;
            }

            const storedUser = JSON.parse(localStorage.getItem('registeredUser'));
            let loginSuccess = false;

            if (storedUser && storedUser.username === username && storedUser.password === password) {
                loginSuccess = true;
            } else if (username === DUMMY_USERNAME && password === DUMMY_PASSWORD && !storedUser) {
                loginSuccess = true;
            }

            if (loginSuccess) {
                localStorage.setItem('loggedInUser', username);
                displayMessage(loginMessageEl, 'Login bem-sucedido! Redirecionando...', 'success');
                setTimeout(() => {
                    window.location.href = 'home.html';
                }, 1500);
            } else {
                displayMessage(loginMessageEl, 'Usuário ou senha inválidos.', 'error');
            }
        });
    }

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = registerForm.regUsername.value;
            const email = registerForm.regEmail.value;
            const password = registerForm.regPassword.value;

            if (!username || !email || !password) {
                displayMessage(registerMessageEl, 'Por favor, preencha todos os campos.', 'error');
                return;
            }
            if (password.length < 6) {
                displayMessage(registerMessageEl, 'A senha deve ter pelo menos 6 caracteres.', 'error');
                return;
            }

            localStorage.setItem('registeredUser', JSON.stringify({ username, email, password }));
            displayMessage(registerMessageEl, 'Registro bem-sucedido! Você será redirecionado para o login.', 'success');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        });
    }

    // Handle Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html';
        });
    }

    // Protect Home Page
    if (window.location.pathname.endsWith('home.html')) {
        if (!localStorage.getItem('loggedInUser')) {
            window.location.href = 'index.html'; 
        }
    }
    
    function displayMessage(element, message, type) {
        if (!element) return;
        element.textContent = message;
        element.className = `message ${type}`;
    }

    // Modal Functionality
    const detailsButtons = document.querySelectorAll('.btn-details');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close-btn');

    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore background scroll
            }
        });
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto'; // Restore background scroll
            }
        });
    });

});