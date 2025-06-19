// dark-mode.js
document.addEventListener('DOMContentLoaded', function() {
    // Buat tombol toggle dengan SVG
    const darkModeToggle = document.createElement('button');
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.innerHTML = `
        <span class="toggle-icon">
            <svg class="sun" width="20" height="20" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="5" fill="currentColor"/>
                <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
                <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2"/>
                <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2"/>
                <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2"/>
            </svg>
            <svg class="moon" width="20" height="20" viewBox="0 0 24 24">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor"/>
            </svg>
        </span>
        <span class="toggle-text"></span>
    `;
    
    // Style tombol dengan JavaScript
    Object.assign(darkModeToggle.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 16px',
        borderRadius: '30px',
        cursor: 'pointer',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        zIndex: '1000',
        transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#ffffff',
        color: '#333333'
    });
    
    // Style untuk animasi ikon
    const style = document.createElement('style');
    style.textContent = `
        .toggle-icon {
            position: relative;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .sun, .moon {
            position: absolute;
            transition: all 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .sun {
            opacity: 1;
            transform: rotate(0deg) scale(1);
        }
        .moon {
            opacity: 0;
            transform: rotate(-90deg) scale(0.5);
        }
        .dark-mode .sun {
            opacity: 0;
            transform: rotate(90deg) scale(0.5);
        }
        .dark-mode .moon {
            opacity: 1;
            transform: rotate(0deg) scale(1);
        }
        #darkModeToggle:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }
        #darkModeToggle:active {
            transform: scale(0.98);
        }
        #darkModeToggle .toggle-text {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Cek preferensi dark mode
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        updateToggle(true);
    } else {
        updateToggle(false);
    }
    
    // Fungsi update tampilan toggle
    function updateToggle(isDark) {
        const toggleText = darkModeToggle.querySelector('.toggle-text');
        toggleText.textContent = isDark ? 'Light' : 'Dark';
        
        Object.assign(darkModeToggle.style, {
            backgroundColor: isDark ? '#333333' : '#ffffff',
            color: isDark ? '#ffffff' : '#333333',
            boxShadow: isDark ? '0 2px 10px rgba(0, 0, 0, 0.3)' : '0 2px 10px rgba(0, 0, 0, 0.1)'
        });
    }
    
    // Event listener untuk toggle
    darkModeToggle.addEventListener('click', function() {
        const isDark = !document.body.classList.contains('dark-mode');
        document.body.classList.toggle('dark-mode');
        
        // Animasi klik
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = isDark ? 'translateY(-2px) scale(1.02)' : 'scale(1)';
        }, 100);
        
        // Update state dan localStorage
        updateToggle(isDark);
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        
        // Tambahkan animasi teks
        const toggleText = this.querySelector('.toggle-text');
        toggleText.style.opacity = '0';
        setTimeout(() => {
            toggleText.textContent = isDark ? 'Light' : 'Dark';
            toggleText.style.opacity = '1';
        }, 200);
    });
    
    document.body.appendChild(darkModeToggle);
    
    // Terapkan dark mode ke elemen yang diperlukan
    function applyDarkModeStyles() {
        if (!document.querySelector('#darkModeStyles')) {
            const darkStyle = document.createElement('style');
            darkStyle.id = 'darkModeStyles';
            darkStyle.textContent = `
                .dark-mode {
                    background-color: #121212;
                    color: #e0e0e0;
                    transition: all 0.5s ease;
                }
                .dark-mode header {
                    background-color: #1e1e1e;
                    border-bottom: 1px solid #333;
                }
                .dark-mode nav a {
                    color: #bb86fc;
                }
                .dark-mode section {
                    background-color: #1e1e1e;
                    border: 1px solid #333;
                }
                .dark-mode article {
                    background-color: #2d2d2d;
                }
                .dark-mode .skill-bar {
                    background-color: #444;
                }
                .dark-mode .skill-level {
                    background-color: #bb86fc;
                }
                .dark-mode .skill-tag {
                    background-color: #3700b3;
                    color: white;
                }
                .dark-mode aside {
                    background-color: #1e1e1e;
                    border-left: 1px solid #333;
                }
                .dark-mode footer {
                    background-color: #1e1e1e;
                    border-top: 1px solid #333;
                }
                .dark-mode h1, .dark-mode h2, .dark-mode h3, .dark-mode h4 {
                    color: #ffffff;
                }
                .dark-mode .certifications li {
                    color: #e0e0e0;
                }
                * {
                    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
                }
            `;
            document.head.appendChild(darkStyle);
        }
    }
    
    applyDarkModeStyles();
});