// Interactive elements for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
  // Interactive search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  if (searchInput && searchBtn) {
    searchBtn.addEventListener('click', function() {
      performSearch(searchInput.value);
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch(searchInput.value);
      }
    });
  }
  
  function performSearch(query) {
    if (query.trim() === '') return;
    
    // For demonstration purposes, we'll just filter visible cards
    // In a real implementation, this would be server-side or more sophisticated
    const cards = document.querySelectorAll('.card');
    let foundCount = 0;
    
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      const text = card.querySelector('.card-text').textContent.toLowerCase();
      const searchQuery = query.toLowerCase();
      
      if (title.includes(searchQuery) || text.includes(searchQuery)) {
        card.style.display = 'block';
        foundCount++;
      } else {
        card.style.display = 'none';
      }
    });
    
    // Show search results message
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'alert alert-info';
    resultsContainer.id = 'search-results';
    resultsContainer.textContent = `Znaleziono ${foundCount} wyników dla "${query}"`;
    
    // Remove any existing search results message
    const existingResults = document.getElementById('search-results');
    if (existingResults) {
      existingResults.remove();
    }
    
    // Add the new message before the cards
    const container = document.querySelector('.blog-grid');
    if (container) {
      container.parentNode.insertBefore(resultsContainer, container);
    }
  }
  
  // Blog filters functionality
  const categoryFilter = document.getElementById('category-filter');
  const difficultyFilter = document.getElementById('difficulty-filter');
  const sortFilter = document.getElementById('sort-filter');
  
  if (categoryFilter && difficultyFilter && sortFilter) {
    const filters = [categoryFilter, difficultyFilter, sortFilter];
    
    filters.forEach(filter => {
      filter.addEventListener('change', applyFilters);
    });
  }
  
  function applyFilters() {
    const cards = document.querySelectorAll('.card');
    const categoryValue = categoryFilter ? categoryFilter.value : 'all';
    const difficultyValue = difficultyFilter ? difficultyFilter.value : 'all';
    
    cards.forEach(card => {
      const cardCategory = card.dataset.category;
      const cardDifficulty = card.dataset.difficulty;
      
      const categoryMatch = categoryValue === 'all' || cardCategory === categoryValue;
      const difficultyMatch = difficultyValue === 'all' || cardDifficulty === difficultyValue;
      
      if (categoryMatch && difficultyMatch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
    
    // Apply sorting
    if (sortFilter) {
      const sortValue = sortFilter.value;
      const cardsArray = Array.from(cards).filter(card => card.style.display !== 'none');
      
      cardsArray.sort((a, b) => {
        const dateA = new Date(a.querySelector('.card-date').textContent);
        const dateB = new Date(b.querySelector('.card-date').textContent);
        
        if (sortValue === 'newest') {
          return dateB - dateA;
        } else if (sortValue === 'oldest') {
          return dateA - dateB;
        }
        
        return 0;
      });
      
      const container = document.querySelector('.blog-grid');
      if (container) {
        cardsArray.forEach(card => {
          container.appendChild(card);
        });
      }
    }
  }
  
  // Dictionary index functionality
  const indexLetters = document.querySelectorAll('.index-letter');
  
  indexLetters.forEach(letter => {
    letter.addEventListener('click', function() {
      const targetId = 'letter-' + this.textContent;
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Prompt generator functionality
  const promptGenerator = document.getElementById('prompt-generator');
  
  if (promptGenerator) {
    const promptTypeSelect = promptGenerator.querySelector('select[name="prompt-type"]');
    const generateBtn = promptGenerator.querySelector('.generate-btn');
    const promptResult = promptGenerator.querySelector('.prompt-result');
    
    if (promptTypeSelect && generateBtn && promptResult) {
      generateBtn.addEventListener('click', function() {
        const promptType = promptTypeSelect.value;
        let template = '';
        
        switch (promptType) {
          case 'text':
            template = "Napisz {tone} tekst na temat {topic}. Tekst powinien być {length} i zawierać {elements}.";
            break;
          case 'image':
            template = "Stwórz obraz przedstawiający {subject} w stylu {style}. Obraz powinien mieć {mood} nastrój i zawierać {details}.";
            break;
          case 'code':
            template = "Napisz kod w języku {language}, który {functionality}. Kod powinien być {complexity} i zawierać komentarze.";
            break;
          default:
            template = "Napisz {tone} tekst na temat {topic}.";
        }
        
        // Replace placeholders with input values
        const inputs = promptGenerator.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          if (input.name && input.name !== 'prompt-type') {
            const placeholder = `{${input.name}}`;
            const value = input.value || input.placeholder;
            template = template.replace(placeholder, value);
          }
        });
        
        promptResult.textContent = template;
        promptResult.style.display = 'block';
      });
      
      // Show/hide fields based on prompt type
      promptTypeSelect.addEventListener('change', function() {
        const promptType = this.value;
        const fieldSets = promptGenerator.querySelectorAll('[id$="-prompt-fields"]');
        
        fieldSets.forEach(fieldSet => {
          fieldSet.style.display = 'none';
        });
        
        const activeFieldSet = document.getElementById(`${promptType}-prompt-fields`);
        if (activeFieldSet) {
          activeFieldSet.style.display = 'block';
        }
      });
    }
  }
  
  // Quiz functionality
  const quizForms = document.querySelectorAll('.quiz-form');
  
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
        
        // Scroll to results
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
  
  // Learning path interactive elements
  const pathSteps = document.querySelectorAll('.learning-path .path-step');
  
  pathSteps.forEach((step, index) => {
    step.addEventListener('click', function() {
      // Remove active class from all steps
      pathSteps.forEach(s => s.classList.remove('active'));
      
      // Add active class to current step and all previous steps
      for (let i = 0; i <= index; i++) {
        pathSteps[i].classList.add('active');
      }
      
      // Show content for current step
      const stepContents = document.querySelectorAll('.step-content');
      stepContents.forEach(content => content.style.display = 'none');
      
      const currentContent = document.getElementById(`content-${index + 1}`);
      if (currentContent) {
        currentContent.style.display = 'block';
      }
    });
  });
  
  // Newsletter form submission
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success';
        successMessage.textContent = 'Dziękujemy za zapisanie się do newslettera!';
        
        // Replace form with success message
        this.parentNode.insertBefore(successMessage, this);
        this.style.display = 'none';
        
        // In a real implementation, you would send the email to your server here
        console.log('Newsletter signup:', emailInput.value);
      }
    });
  });
  
  // Contact form submission
  const contactForm = document.querySelector('.contact-form form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'alert alert-success';
      successMessage.textContent = 'Dziękujemy za wiadomość! Odpowiemy najszybciej jak to możliwe.';
      
      // Add success message
      this.parentNode.insertBefore(successMessage, this);
      
      // Reset form
      this.reset();
      
      // Scroll to success message
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // In a real implementation, you would send the form data to your server here
      console.log('Contact form submitted');
    });
  }
});
