// Learning path functionality for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
  // Initialize learning paths if they exist on the page
  initializeLearningPaths();
  
  function initializeLearningPaths() {
    const learningPathContainers = document.querySelectorAll('.learning-path');
    
    learningPathContainers.forEach((container, index) => {
      setupLearningPath(container, index);
    });
  }
  
  function setupLearningPath(container, pathIndex) {
    // Get all steps and contents
    const steps = container.querySelectorAll('.path-step');
    const contents = container.querySelectorAll('.step-content');
    
    // Hide all content sections initially
    contents.forEach(content => {
      content.style.display = 'none';
    });
    
    // Show first content section by default
    if (contents.length > 0) {
      contents[0].style.display = 'block';
    }
    
    // Add active class to first step
    if (steps.length > 0) {
      steps[0].classList.add('active');
    }
    
    // Add click event to each step
    steps.forEach((step, stepIndex) => {
      step.addEventListener('click', function() {
        // Remove active class from all steps
        steps.forEach(s => s.classList.remove('active'));
        
        // Add active class to current step and all previous steps
        for (let i = 0; i <= stepIndex; i++) {
          steps[i].classList.add('active');
        }
        
        // Hide all content sections
        contents.forEach(content => {
          content.style.display = 'none';
        });
        
        // Show selected content section
        if (contents[stepIndex]) {
          contents[stepIndex].style.display = 'block';
          
          // Scroll to content
          contents[stepIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
        
        // Save progress in localStorage
        saveProgress(pathIndex, stepIndex);
      });
    });
    
    // Load saved progress
    loadProgress(pathIndex, steps, contents);
    
    // Add progress tracking
    addProgressTracker(container, steps.length);
  }
  
  function saveProgress(pathIndex, stepIndex) {
    // Create a unique key for this learning path
    const key = `learning-path-${pathIndex}-progress`;
    
    // Save to localStorage
    localStorage.setItem(key, stepIndex);
  }
  
  function loadProgress(pathIndex, steps, contents) {
    // Create a unique key for this learning path
    const key = `learning-path-${pathIndex}-progress`;
    
    // Get saved progress
    const savedProgress = localStorage.getItem(key);
    
    if (savedProgress !== null) {
      const stepIndex = parseInt(savedProgress);
      
      // Activate steps up to saved progress
      for (let i = 0; i <= stepIndex; i++) {
        if (steps[i]) {
          steps[i].classList.add('active');
        }
      }
      
      // Show content for saved progress
      contents.forEach(content => {
        content.style.display = 'none';
      });
      
      if (contents[stepIndex]) {
        contents[stepIndex].style.display = 'block';
      }
      
      // Update progress tracker
      const progressBar = document.querySelector(`.learning-path-progress-bar[data-path="${pathIndex}"]`);
      if (progressBar) {
        const progress = ((stepIndex + 1) / steps.length) * 100;
        progressBar.style.width = `${progress}%`;
        
        const progressText = document.querySelector(`.learning-path-progress-text[data-path="${pathIndex}"]`);
        if (progressText) {
          progressText.textContent = `Postęp: ${stepIndex + 1}/${steps.length} (${Math.round(progress)}%)`;
        }
      }
    }
  }
  
  function addProgressTracker(container, totalSteps) {
    const pathIndex = Array.from(document.querySelectorAll('.learning-path')).indexOf(container);
    
    // Create progress tracker element
    const progressTracker = document.createElement('div');
    progressTracker.className = 'learning-path-progress';
    
    // Create progress bar
    const progressBarContainer = document.createElement('div');
    progressBarContainer.className = 'learning-path-progress-container';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'learning-path-progress-bar';
    progressBar.setAttribute('data-path', pathIndex);
    
    // Create progress text
    const progressText = document.createElement('div');
    progressText.className = 'learning-path-progress-text';
    progressText.setAttribute('data-path', pathIndex);
    progressText.textContent = `Postęp: 1/${totalSteps} (${Math.round((1/totalSteps) * 100)}%)`;
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.className = 'btn btn-outline learning-path-reset';
    resetButton.textContent = 'Resetuj postęp';
    resetButton.addEventListener('click', function() {
      resetProgress(pathIndex, container);
    });
    
    // Assemble progress tracker
    progressBarContainer.appendChild(progressBar);
    progressTracker.appendChild(progressBarContainer);
    progressTracker.appendChild(progressText);
    progressTracker.appendChild(resetButton);
    
    // Add to container
    container.insertBefore(progressTracker, container.firstChild);
    
    // Add CSS for progress tracker
    addProgressTrackerStyles();
  }
  
  function resetProgress(pathIndex, container) {
    // Clear localStorage
    const key = `learning-path-${pathIndex}-progress`;
    localStorage.removeItem(key);
    
    // Reset UI
    const steps = container.querySelectorAll('.path-step');
    const contents = container.querySelectorAll('.step-content');
    
    // Remove active class from all steps except first
    steps.forEach((step, index) => {
      if (index === 0) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
    
    // Show only first content
    contents.forEach((content, index) => {
      content.style.display = index === 0 ? 'block' : 'none';
    });
    
    // Reset progress bar
    const progressBar = container.querySelector('.learning-path-progress-bar');
    if (progressBar) {
      const progress = (1 / steps.length) * 100;
      progressBar.style.width = `${progress}%`;
      
      const progressText = container.querySelector('.learning-path-progress-text');
      if (progressText) {
        progressText.textContent = `Postęp: 1/${steps.length} (${Math.round(progress)}%)`;
      }
    }
    
    // Scroll to top of learning path
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  function addProgressTrackerStyles() {
    // Check if styles already exist
    if (document.getElementById('learning-path-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'learning-path-styles';
    style.textContent = `
      .learning-path-progress {
        margin-bottom: 2rem;
        padding: 1rem;
        background-color: #f9fafb;
        border-radius: 8px;
      }
      
      .learning-path-progress-container {
        height: 8px;
        background-color: #e5e7eb;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        overflow: hidden;
      }
      
      .learning-path-progress-bar {
        height: 100%;
        background-color: var(--primary-color);
        width: 0%;
        transition: width 0.3s ease;
      }
      
      .learning-path-progress-text {
        font-size: 0.875rem;
        color: #6b7280;
        margin-bottom: 0.5rem;
      }
      
      .learning-path-reset {
        font-size: 0.875rem;
        padding: 0.25rem 0.5rem;
      }
      
      .path-step {
        position: relative;
        padding: 1rem;
        margin-bottom: 0.5rem;
        border-radius: 8px;
        background-color: #f9fafb;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .path-step:hover {
        background-color: #f3f4f6;
      }
      
      .path-step.active {
        background-color: rgba(30, 58, 138, 0.1);
        border-left: 4px solid var(--primary-color);
      }
      
      .path-step.active::before {
        content: "✓";
        position: absolute;
        right: 1rem;
        color: var(--primary-color);
        font-weight: bold;
      }
      
      .step-content {
        margin-top: 1.5rem;
        padding: 1.5rem;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      body.dark-mode .learning-path-progress {
        background-color: #2a2a2a;
      }
      
      body.dark-mode .learning-path-progress-container {
        background-color: #3a3a3a;
      }
      
      body.dark-mode .path-step {
        background-color: #2a2a2a;
      }
      
      body.dark-mode .path-step:hover {
        background-color: #333;
      }
      
      body.dark-mode .path-step.active {
        background-color: rgba(74, 107, 223, 0.2);
      }
      
      body.dark-mode .step-content {
        background-color: #1e1e1e;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Create sample learning path if container exists but is empty
  const sampleContainer = document.querySelector('.sample-learning-path');
  if (sampleContainer && sampleContainer.children.length === 0) {
    sampleContainer.className = 'learning-path sample-learning-path';
    
    const learningPathHTML = `
      <h3>Ścieżka nauki: Podstawy AI dla początkujących</h3>
      <p>Krok po kroku poznaj podstawy sztucznej inteligencji. Ukończ wszystkie etapy, aby zdobyć solidne fundamenty wiedzy o AI.</p>
      
      <div class="path-steps">
        <div class="path-step">
          <h4>Krok 1: Wprowadzenie do AI</h4>
          <p>Poznaj podstawowe pojęcia i historię sztucznej inteligencji.</p>
        </div>
        
        <div class="step-content" id="content-1">
          <h3>Wprowadzenie do sztucznej inteligencji</h3>
          <p>Sztuczna inteligencja (AI) to dziedzina informatyki, która zajmuje się tworzeniem systemów zdolnych do wykonywania zadań wymagających ludzkiej inteligencji. Obejmuje to rozpoznawanie obrazów, przetwarzanie języka naturalnego, podejmowanie decyzji i uczenie się.</p>
          
          <h4>Kluczowe pojęcia:</h4>
          <ul>
            <li><strong>Sztuczna inteligencja (AI)</strong> - Systemy komputerowe zdolne do wykonywania zadań, które tradycyjnie wymagały ludzkiej inteligencji.</li>
            <li><strong>Uczenie maszynowe (ML)</strong> - Poddziedzina AI, która umożliwia systemom uczenie się na podstawie danych bez jawnego programowania.</li>
            <li><strong>Głębokie uczenie</strong> - Zaawansowana forma uczenia maszynowego wykorzystująca wielowarstwowe sieci neuronowe.</li>
          </ul>
          
          <h4>Historia AI:</h4>
          <ul>
            <li><strong>1950s</strong> - Narodziny koncepcji AI, Test Turinga</li>
            <li><strong>1960s-1970s</strong> - Pierwsze programy AI (ELIZA, SHRDLU)</li>
            <li><strong>1980s</strong> - Rozwój systemów eksperckich</li>
            <li><strong>1990s-2000s</strong> - Rozwój uczenia maszynowego</li>
            <li><strong>2010s-obecnie</strong> - Przełom w głębokim uczeniu, rozwój dużych modeli językowych</li>
          </ul>
          
          <div class="alert alert-info">
            <p>Aby przejść do następnego kroku, kliknij na "Krok 2" powyżej.</p>
          </div>
        </div>
        
        <div class="path-step">
          <h4>Krok 2: Rodzaje AI</h4>
          <p>Poznaj różne rodzaje i kategorie sztucznej inteligencji.</p>
        </div>
        
        <div class="step-content" id="content-2">
          <h3>Rodzaje sztucznej inteligencji</h3>
          
          <h4>Podział ze względu na możliwości:</h4>
          <ul>
            <li><strong>AI wąska (ANI)</strong> - Systemy zaprojektowane do wykonywania konkretnych zadań, np. rozpoznawanie twarzy, tłumaczenie języków.</li>
            <li><strong>AI ogólna (AGI)</strong> - Hipotetyczne systemy zdolne do wykonywania dowolnych zadań intelektualnych na poziomie człowieka.</li>
            <li><strong>AI superinteligentna (ASI)</strong> - Hipotetyczne systemy przewyższające ludzkie zdolności we wszystkich dziedzinach.</li>
          </ul>
          
          <h4>Podział ze względu na metodę działania:</h4>
          <ul>
            <li><strong>Systemy oparte na regułach</strong> - Wykorzystują zdefiniowane przez człowieka reguły i logikę.</li>
            <li><strong>Uczenie maszynowe</strong> - Systemy uczące się na podstawie danych.</li>
            <li><strong>Głębokie uczenie</strong> - Wykorzystuje wielowarstwowe sieci neuronowe.</li>
            <li><strong>Generatywna AI</strong> - Tworzy nowe treści: tekst, obrazy, muzykę, wideo.</li>
          </ul>
          
          <div class="alert alert-info">
            <p>Aby przejść do następnego kroku, kliknij na "Krok 3" powyżej.</p>
          </div>
        </div>
        
        <div class="path-step">
          <h4>Krok 3: Zastosowania AI</h4>
          <p>Poznaj praktyczne zastosowania AI w różnych dziedzinach.</p>
        </div>
        
        <div class="step-content" id="content-3">
          <h3>Praktyczne zastosowania AI</h3>
          
          <h4>Zastosowania w codziennym życiu:</h4>
          <ul>
            <li><strong>Asystenci głosowi</strong> - Siri, Alexa, Google Assistant</li>
            <li><strong>Rekomendacje</strong> - Netflix, Spotify, sklepy internetowe</li>
            <li><strong>Fotografia</strong> - Ulepszanie zdjęć, usuwanie tła</li>
            <li><strong>Nawigacja</strong> - Optymalizacja tras, przewidywanie korków</li>
          </ul>
          
          <h4>Zastosowania w biznesie:</h4>
          <ul>
            <li><strong>Automatyzacja procesów</strong> - Chatboty obsługi klienta, analiza dokumentów</li>
            <li><strong>Analiza danych</strong> - Wykrywanie wzorców, prognozowanie trendów</li>
            <li><strong>Marketing</strong> - Personalizacja treści, optymalizacja kampanii</li>
            <li><strong>Zarządzanie łańcuchem dostaw</strong> - Optymalizacja logistyki, przewidywanie popytu</li>
          </ul>
          
          <h4>Zastosowania w nauce i medycynie:</h4>
          <ul>
            <li><strong>Diagnostyka medyczna</strong> - Analiza obrazów medycznych, wykrywanie chorób</li>
            <li><strong>Odkrywanie leków</strong> - Przyspieszenie procesu badań nad nowymi lekami</li>
            <li><strong>Modelowanie klimatu</strong> - Prognozowanie zmian klimatycznych</li>
            <li><strong>Astronomia</strong> - Analiza danych z teleskopów, odkrywanie nowych obiektów</li>
          </ul>
          
          <div class="alert alert-info">
            <p>Aby przejść do następnego kroku, kliknij na "Krok 4" powyżej.</p>
          </div>
        </div>
        
        <div class="path-step">
          <h4>Krok 4: Jak zacząć korzystać z AI</h4>
          <p>Poznaj praktyczne wskazówki, jak rozpocząć korzystanie z narzędzi AI.</p>
        </div>
        
        <div class="step-content" id="content-4">
          <h3>Jak zacząć korzystać z AI</h3>
          
          <h4>Pierwsze kroki:</h4>
          <ol>
            <li>Zapoznaj się z dostępnymi narzędziami AI (ChatGPT, Gemini, DALL-E)</li>
            <li>Załóż konta na wybranych platformach</li>
            <li>Eksperymentuj z różnymi promptami i zastosowaniami</li>
            <li>Śledź blogi i kanały o AI, aby być na bieżąco</li>
          </ol>
          
          <h4>Popularne narzędzia AI dla początkujących:</h4>
          <ul>
            <li><strong>ChatGPT</strong> - Konwersacyjny model AI do generowania tekstu</li>
            <li><strong>Google Gemini</strong> - Multimodalny model AI od Google</li>
            <li><strong>DALL-E, Midjourney</strong> - Generatory obrazów</li>
            <li><strong>Stable Audio</strong> - Generator muzyki</li>
            <li><strong>Canva z AI</strong> - Narzędzie do projektowania z funkcjami AI</li>
          </ul>
          
          <h4>Wskazówki dotyczące promptów:</h4>
          <ul>
            <li>Bądź konkretny i precyzyjny w swoich zapytaniach</li>
            <li>Określaj kontekst i cel swojego zapytania</li>
            <li>Podawaj przykłady oczekiwanego wyniku</li>
            <li>Iteracyjnie udoskonalaj swoje prompty</li>
          </ul>
          
          <div class="alert alert-success">
            <p>Gratulacje! Ukończyłeś podstawową ścieżkę nauki o AI. Możesz teraz przejść do bardziej zaawansowanych tematów lub zacząć praktycznie stosować zdobytą wiedzę.</p>
          </div>
        </div>
      </div>
    `;
    
    sampleContainer.innerHTML = learningPathHTML;
    setupLearningPath(sampleContainer, 'sample');
  }
});
