// Main JavaScript for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                // Here you would typically send the email to your server
                alert('Dziękujemy za zapisanie się do newslettera!');
                emailInput.value = '';
            }
        });
    }
    
    // Dictionary index letter click
    const indexLetters = document.querySelectorAll('.index-letter');
    if (indexLetters.length > 0) {
        indexLetters.forEach(letter => {
            letter.addEventListener('click', function() {
                const letterValue = this.textContent;
                const targetElement = document.getElementById('letter-' + letterValue);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Blog filters
    const filterSelects = document.querySelectorAll('.filter-select');
    if (filterSelects.length > 0) {
        filterSelects.forEach(select => {
            select.addEventListener('change', function() {
                // Here you would typically filter the blog posts based on selection
                console.log('Filter changed:', this.value);
                // For demo purposes, we'll just reload the page
                // In a real implementation, you would use AJAX or client-side filtering
                // window.location.href = window.location.pathname + '?filter=' + this.value;
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add active class to current nav item
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Initialize any interactive elements
    initInteractiveElements();
});

// Function to initialize interactive elements
function initInteractiveElements() {
    // Quiz functionality
    const quizForms = document.querySelectorAll('.quiz-form');
    if (quizForms.length > 0) {
        quizForms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let score = 0;
                const questions = this.querySelectorAll('.quiz-question');
                const totalQuestions = questions.length;
                
                questions.forEach(question => {
                    const correctAnswer = question.getAttribute('data-correct');
                    const selectedOption = question.querySelector('input:checked');
                    
                    if (selectedOption && selectedOption.value === correctAnswer) {
                        score++;
                        question.classList.add('correct');
                    } else {
                        question.classList.add('incorrect');
                    }
                });
                
                const resultElement = this.querySelector('.quiz-result');
                if (resultElement) {
                    resultElement.textContent = `Twój wynik: ${score}/${totalQuestions}`;
                    resultElement.style.display = 'block';
                }
            });
        });
    }
    
    // Prompt generator
    const promptGenerator = document.getElementById('prompt-generator');
    if (promptGenerator) {
        const generateBtn = promptGenerator.querySelector('.generate-btn');
        const promptResult = promptGenerator.querySelector('.prompt-result');
        
        if (generateBtn && promptResult) {
            generateBtn.addEventListener('click', function() {
                const inputs = promptGenerator.querySelectorAll('input, select, textarea');
                let promptTemplate = '';
                
                // Get the template based on the selected type
                const promptType = promptGenerator.querySelector('select[name="prompt-type"]').value;
                
                switch (promptType) {
                    case 'text':
                        promptTemplate = "Napisz {tone} tekst na temat {topic}. Tekst powinien być {length} i zawierać {elements}.";
                        break;
                    case 'image':
                        promptTemplate = "Stwórz obraz przedstawiający {subject} w stylu {style}. Obraz powinien mieć {mood} nastrój i zawierać {details}.";
                        break;
                    case 'code':
                        promptTemplate = "Napisz kod w języku {language}, który {functionality}. Kod powinien być {complexity} i zawierać komentarze.";
                        break;
                    default:
                        promptTemplate = "Napisz {tone} tekst na temat {topic}.";
                }
                
                // Replace placeholders with input values
                inputs.forEach(input => {
                    if (input.name && input.name !== 'prompt-type') {
                        const placeholder = `{${input.name}}`;
                        promptTemplate = promptTemplate.replace(placeholder, input.value || input.placeholder);
                    }
                });
                
                promptResult.textContent = promptTemplate;
                promptResult.style.display = 'block';
            });
        }
    }
    
    // Interactive path visualization
    const learningPath = document.querySelector('.learning-path');
    if (learningPath) {
        const pathSteps = learningPath.querySelectorAll('.path-step');
        
        pathSteps.forEach((step, index) => {
            step.addEventListener('click', function() {
                // Remove active class from all steps
                pathSteps.forEach(s => s.classList.remove('active'));
                
                // Add active class to current step and all previous steps
                for (let i = 0; i <= index; i++) {
                    pathSteps[i].classList.add('active');
                }
                
                // Show content for current step
                const stepContents = learningPath.querySelectorAll('.step-content');
                stepContents.forEach(content => content.style.display = 'none');
                
                const currentContent = stepContents[index];
                if (currentContent) {
                    currentContent.style.display = 'block';
                }
            });
        });
        
        // Activate first step by default
        if (pathSteps.length > 0) {
            pathSteps[0].click();
        }
    }
}
