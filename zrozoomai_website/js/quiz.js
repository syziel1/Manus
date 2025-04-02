// Quiz functionality for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all quizzes on the page
  initializeQuizzes();
  
  function initializeQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');
    
    quizContainers.forEach((container, index) => {
      createQuiz(container, index);
    });
  }
  
  function createQuiz(container, quizIndex) {
    // Get quiz data from container's data attributes
    const quizData = JSON.parse(container.dataset.quiz || '[]');
    if (!quizData.length) return;
    
    // Create quiz HTML structure
    const quizHTML = `
      <div class="quiz-header">
        <h3>${container.dataset.title || 'Quiz wiedzy o AI'}</h3>
        <p>${container.dataset.description || 'Sprawdź swoją wiedzę o sztucznej inteligencji.'}</p>
      </div>
      <form class="quiz-form" id="quiz-form-${quizIndex}">
        ${quizData.map((question, qIndex) => `
          <div class="quiz-question" data-correct="${question.correct}">
            <h4>${qIndex + 1}. ${question.question}</h4>
            <div class="quiz-options">
              ${question.options.map((option, oIndex) => `
                <div class="quiz-option">
                  <input type="radio" id="q${quizIndex}-${qIndex}-${oIndex}" name="q${quizIndex}-${qIndex}" value="${option.value}">
                  <label for="q${quizIndex}-${qIndex}-${oIndex}">${option.text}</label>
                </div>
              `).join('')}
            </div>
            <div class="quiz-explanation" style="display: none;">
              ${question.explanation || ''}
            </div>
          </div>
        `).join('')}
        <div class="quiz-controls">
          <button type="submit" class="btn btn-primary">Sprawdź wyniki</button>
          <button type="button" class="btn btn-outline quiz-reset" style="display: none;">Rozpocznij ponownie</button>
        </div>
        <div class="quiz-result" style="display: none;"></div>
      </form>
    `;
    
    // Set the HTML content
    container.innerHTML = quizHTML;
    
    // Add event listeners
    const form = container.querySelector('.quiz-form');
    const resetButton = container.querySelector('.quiz-reset');
    
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      evaluateQuiz(this, quizData);
    });
    
    resetButton.addEventListener('click', function() {
      resetQuiz(form);
    });
  }
  
  function evaluateQuiz(form, quizData) {
    let score = 0;
    const questions = form.querySelectorAll('.quiz-question');
    const totalQuestions = questions.length;
    
    questions.forEach((question, index) => {
      const correctAnswer = question.getAttribute('data-correct');
      const selectedOption = question.querySelector('input:checked');
      const explanation = question.querySelector('.quiz-explanation');
      
      // Remove previous classes
      question.classList.remove('correct', 'incorrect');
      
      if (selectedOption) {
        if (selectedOption.value === correctAnswer) {
          score++;
          question.classList.add('correct');
        } else {
          question.classList.add('incorrect');
        }
        
        // Disable inputs
        question.querySelectorAll('input').forEach(input => {
          input.disabled = true;
        });
        
        // Show explanation
        if (explanation) {
          explanation.style.display = 'block';
        }
      } else {
        question.classList.add('unanswered');
      }
    });
    
    // Show result
    const resultElement = form.querySelector('.quiz-result');
    if (resultElement) {
      const percentage = Math.round((score / totalQuestions) * 100);
      let message = '';
      
      if (percentage >= 80) {
        message = 'Świetny wynik! Masz solidną wiedzę o AI.';
      } else if (percentage >= 60) {
        message = 'Dobry wynik! Masz podstawową wiedzę o AI.';
      } else {
        message = 'Warto poszerzyć swoją wiedzę o AI. Zapoznaj się z naszymi materiałami!';
      }
      
      resultElement.innerHTML = `
        <div class="result-score">Twój wynik: ${score}/${totalQuestions} (${percentage}%)</div>
        <div class="result-message">${message}</div>
      `;
      resultElement.style.display = 'block';
    }
    
    // Show reset button
    const resetButton = form.querySelector('.quiz-reset');
    if (resetButton) {
      resetButton.style.display = 'inline-block';
    }
    
    // Scroll to results
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  
  function resetQuiz(form) {
    // Reset form
    form.reset();
    
    // Enable all inputs
    form.querySelectorAll('input').forEach(input => {
      input.disabled = false;
    });
    
    // Hide explanations
    form.querySelectorAll('.quiz-explanation').forEach(explanation => {
      explanation.style.display = 'none';
    });
    
    // Remove classes
    form.querySelectorAll('.quiz-question').forEach(question => {
      question.classList.remove('correct', 'incorrect', 'unanswered');
    });
    
    // Hide result
    const resultElement = form.querySelector('.quiz-result');
    if (resultElement) {
      resultElement.style.display = 'none';
    }
    
    // Hide reset button
    const resetButton = form.querySelector('.quiz-reset');
    if (resetButton) {
      resetButton.style.display = 'none';
    }
    
    // Scroll to top of quiz
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  
  // Create sample quiz if container exists but no data
  const sampleContainer = document.querySelector('.sample-quiz-container');
  if (sampleContainer && !sampleContainer.dataset.quiz) {
    const sampleQuizData = [
      {
        question: "Co to jest sztuczna inteligencja?",
        options: [
          { value: "a", text: "Program komputerowy, który może wykonywać tylko zaprogramowane zadania" },
          { value: "b", text: "Dziedzina informatyki zajmująca się tworzeniem systemów zdolnych do wykonywania zadań wymagających ludzkiej inteligencji" },
          { value: "c", text: "Robot z ludzkimi cechami" },
          { value: "d", text: "System operacyjny nowej generacji" }
        ],
        correct: "b",
        explanation: "Sztuczna inteligencja to dziedzina informatyki zajmująca się tworzeniem systemów zdolnych do wykonywania zadań wymagających ludzkiej inteligencji, takich jak rozpoznawanie obrazów, przetwarzanie języka naturalnego czy podejmowanie decyzji."
      },
      {
        question: "Czym różni się uczenie maszynowe od głębokiego uczenia?",
        options: [
          { value: "a", text: "To są dwie nazwy tego samego zjawiska" },
          { value: "b", text: "Uczenie maszynowe wymaga dużych zbiorów danych, a głębokie uczenie nie" },
          { value: "c", text: "Głębokie uczenie to poddziedzina uczenia maszynowego wykorzystująca wielowarstwowe sieci neuronowe" },
          { value: "d", text: "Uczenie maszynowe jest nowszą technologią niż głębokie uczenie" }
        ],
        correct: "c",
        explanation: "Głębokie uczenie (deep learning) to poddziedzina uczenia maszynowego, która wykorzystuje wielowarstwowe sieci neuronowe do analizy danych. Jest szczególnie skuteczne w zadaniach takich jak rozpoznawanie obrazów czy przetwarzanie języka naturalnego."
      },
      {
        question: "Który z poniższych modeli jest przykładem generatywnej AI?",
        options: [
          { value: "a", text: "System rekomendacji Netflixa" },
          { value: "b", text: "System rozpoznawania twarzy" },
          { value: "c", text: "ChatGPT" },
          { value: "d", text: "System wykrywania oszustw bankowych" }
        ],
        correct: "c",
        explanation: "ChatGPT jest przykładem generatywnej AI - modelu, który potrafi tworzyć nowe treści (w tym przypadku tekst) na podstawie danych treningowych. Pozostałe przykłady to systemy analityczne lub klasyfikacyjne."
      },
      {
        question: "Co to jest prompt engineering?",
        options: [
          { value: "a", text: "Technika programowania robotów" },
          { value: "b", text: "Sztuka formułowania zapytań do modeli AI w celu uzyskania najlepszych wyników" },
          { value: "c", text: "Metoda trenowania sieci neuronowych" },
          { value: "d", text: "Proces tworzenia interfejsów użytkownika dla systemów AI" }
        ],
        correct: "b",
        explanation: "Prompt engineering to sztuka formułowania zapytań (promptów) do modeli AI w sposób, który maksymalizuje jakość i trafność odpowiedzi. Jest to kluczowa umiejętność w pracy z generatywnymi modelami AI."
      },
      {
        question: "Która z poniższych technologii NIE jest przykładem zastosowania AI?",
        options: [
          { value: "a", text: "Autonomiczne pojazdy" },
          { value: "b", text: "Systemy rekomendacji w serwisach streamingowych" },
          { value: "c", text: "Tradycyjne bazy danych SQL" },
          { value: "d", text: "Asystenci głosowi (Siri, Alexa)" }
        ],
        correct: "c",
        explanation: "Tradycyjne bazy danych SQL to technologia przechowywania i zarządzania danymi, która nie wykorzystuje sztucznej inteligencji. Działają one na podstawie ściśle zdefiniowanych zapytań i reguł, bez elementów uczenia się czy adaptacji."
      }
    ];
    
    sampleContainer.dataset.quiz = JSON.stringify(sampleQuizData);
    sampleContainer.dataset.title = "Quiz wiedzy o sztucznej inteligencji";
    sampleContainer.dataset.description = "Sprawdź swoją podstawową wiedzę o AI. Quiz składa się z 5 pytań.";
    
    createQuiz(sampleContainer, 'sample');
  }
});
