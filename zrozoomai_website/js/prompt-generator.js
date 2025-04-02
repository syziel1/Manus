// Prompt generator functionality for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
  // Initialize prompt generator if it exists on the page
  initializePromptGenerator();
  
  function initializePromptGenerator() {
    const promptGenerator = document.getElementById('prompt-generator');
    if (!promptGenerator) return;
    
    // Get elements
    const promptTypeSelect = promptGenerator.querySelector('select[name="prompt-type"]');
    const generateBtn = promptGenerator.querySelector('.generate-btn');
    const copyBtn = promptGenerator.querySelector('.copy-btn');
    const promptResult = promptGenerator.querySelector('.prompt-result');
    const fieldSets = promptGenerator.querySelectorAll('[id$="-prompt-fields"]');
    
    // Set up event listeners
    if (promptTypeSelect) {
      promptTypeSelect.addEventListener('change', function() {
        switchPromptType(this.value);
      });
      
      // Initialize with first option
      switchPromptType(promptTypeSelect.value);
    }
    
    if (generateBtn) {
      generateBtn.addEventListener('click', function() {
        generatePrompt();
      });
    }
    
    if (copyBtn && promptResult) {
      copyBtn.addEventListener('click', function() {
        copyToClipboard(promptResult.textContent);
      });
    }
    
    // Function to switch between prompt types
    function switchPromptType(promptType) {
      // Hide all field sets
      fieldSets.forEach(fieldSet => {
        fieldSet.style.display = 'none';
      });
      
      // Show the selected field set
      const activeFieldSet = document.getElementById(`${promptType}-prompt-fields`);
      if (activeFieldSet) {
        activeFieldSet.style.display = 'block';
      }
    }
    
    // Function to generate prompt based on inputs
    function generatePrompt() {
      const promptType = promptTypeSelect.value;
      let template = '';
      
      // Get template based on prompt type
      switch (promptType) {
        case 'text':
          template = getTextPromptTemplate();
          break;
        case 'image':
          template = getImagePromptTemplate();
          break;
        case 'code':
          template = getCodePromptTemplate();
          break;
        case 'chat':
          template = getChatPromptTemplate();
          break;
        default:
          template = "Wybierz typ promptu, aby wygenerować szablon.";
      }
      
      // Replace placeholders with input values
      const activeFieldSet = document.getElementById(`${promptType}-prompt-fields`);
      if (activeFieldSet) {
        const inputs = activeFieldSet.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          if (input.name) {
            const placeholder = `{${input.name}}`;
            const value = input.value || input.placeholder;
            template = template.replace(new RegExp(placeholder, 'g'), value);
          }
        });
      }
      
      // Display result
      if (promptResult) {
        promptResult.textContent = template;
        promptResult.style.display = 'block';
        
        // Show copy button
        if (copyBtn) {
          copyBtn.style.display = 'inline-block';
        }
        
        // Scroll to result
        promptResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
    
    // Templates for different prompt types
    function getTextPromptTemplate() {
      return `Napisz {tone} tekst na temat {topic}. 

Tekst powinien być {length} i zawierać następujące elementy:
- {elements}

Tekst powinien być skierowany do {audience} i mieć następującą strukturę:
1. Wstęp, który przyciąga uwagę czytelnika
2. Rozwinięcie tematu z podziałem na logiczne sekcje
3. Podsumowanie z kluczowymi wnioskami

Dodatkowe wskazówki:
- {additional_instructions}`;
    }
    
    function getImagePromptTemplate() {
      return `Stwórz obraz przedstawiający {subject} w stylu {style}. 

Obraz powinien mieć {mood} nastrój i zawierać następujące elementy:
- {details}

Specyfikacje techniczne:
- Oświetlenie: {lighting}
- Perspektywa: {perspective}
- Kolorystyka: {colors}

Dodatkowe wskazówki:
- {additional_instructions}`;
    }
    
    function getCodePromptTemplate() {
      return `Napisz kod w języku {language}, który {functionality}.

Kod powinien być {complexity} i zawierać następujące elementy:
- {features}

Wymagania:
- Kod musi być optymalny pod względem wydajności
- Dodaj komentarze wyjaśniające kluczowe części kodu
- Uwzględnij obsługę błędów

Dodatkowe wskazówki:
- {additional_instructions}`;
    }
    
    function getChatPromptTemplate() {
      return `Chcę, żebyś wcielił się w rolę {role} i pomógł mi z {task}.

Kontekst sytuacji:
{context}

Moje oczekiwania:
- {expectations}

Preferowany format odpowiedzi:
{format}

Dodatkowe wskazówki:
- {additional_instructions}`;
    }
    
    // Function to copy text to clipboard
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(
        function() {
          // Success feedback
          const originalText = copyBtn.innerHTML;
          copyBtn.innerHTML = '<i class="fas fa-check"></i> Skopiowano!';
          
          setTimeout(function() {
            copyBtn.innerHTML = originalText;
          }, 2000);
        },
        function() {
          // Error feedback
          alert('Nie udało się skopiować tekstu. Spróbuj ponownie.');
        }
      );
    }
  }
  
  // Create sample prompt generator if container exists but is empty
  const sampleContainer = document.querySelector('.sample-prompt-generator');
  if (sampleContainer && sampleContainer.children.length === 0) {
    sampleContainer.id = 'prompt-generator';
    
    const promptGeneratorHTML = `
      <div class="prompt-generator-header">
        <h3>Generator promptów</h3>
        <p>Stwórz efektywne prompty dla modeli AI, dostosowane do Twoich potrzeb.</p>
      </div>
      
      <div class="prompt-generator-form">
        <div class="form-group">
          <label class="form-label">Typ promptu:</label>
          <select name="prompt-type" class="form-select">
            <option value="text">Tekst</option>
            <option value="image">Obraz</option>
            <option value="code">Kod</option>
            <option value="chat">Konwersacja</option>
          </select>
        </div>
        
        <!-- Text prompt fields -->
        <div id="text-prompt-fields">
          <div class="form-group">
            <label class="form-label">Temat:</label>
            <input type="text" name="topic" class="form-input" placeholder="sztuczna inteligencja w edukacji">
          </div>
          <div class="form-group">
            <label class="form-label">Ton:</label>
            <select name="tone" class="form-select">
              <option value="profesjonalny">Profesjonalny</option>
              <option value="konwersacyjny">Konwersacyjny</option>
              <option value="entuzjastyczny">Entuzjastyczny</option>
              <option value="informacyjny">Informacyjny</option>
              <option value="perswazyjny">Perswazyjny</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Długość:</label>
            <select name="length" class="form-select">
              <option value="krótki (300-500 słów)">Krótki (300-500 słów)</option>
              <option value="średni (500-800 słów)">Średni (500-800 słów)</option>
              <option value="długi (800-1200 słów)">Długi (800-1200 słów)</option>
              <option value="bardzo długi (ponad 1200 słów)">Bardzo długi (ponad 1200 słów)</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Elementy do uwzględnienia:</label>
            <input type="text" name="elements" class="form-input" placeholder="statystyki, przykłady, cytaty ekspertów">
          </div>
          <div class="form-group">
            <label class="form-label">Grupa docelowa:</label>
            <input type="text" name="audience" class="form-input" placeholder="nauczyciele i edukatorzy">
          </div>
          <div class="form-group">
            <label class="form-label">Dodatkowe instrukcje:</label>
            <textarea name="additional_instructions" class="form-textarea" placeholder="Unikaj żargonu technicznego. Dodaj praktyczne wskazówki."></textarea>
          </div>
        </div>
        
        <!-- Image prompt fields -->
        <div id="image-prompt-fields" style="display: none;">
          <div class="form-group">
            <label class="form-label">Temat obrazu:</label>
            <input type="text" name="subject" class="form-input" placeholder="futurystyczne miasto z latającymi samochodami">
          </div>
          <div class="form-group">
            <label class="form-label">Styl:</label>
            <select name="style" class="form-select">
              <option value="fotorealistyczny">Fotorealistyczny</option>
              <option value="cyfrowy art">Cyfrowy art</option>
              <option value="malarstwo olejne">Malarstwo olejne</option>
              <option value="akwarela">Akwarela</option>
              <option value="pixel art">Pixel art</option>
              <option value="anime">Anime</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Nastrój:</label>
            <select name="mood" class="form-select">
              <option value="spokojny">Spokojny</option>
              <option value="dramatyczny">Dramatyczny</option>
              <option value="tajemniczy">Tajemniczy</option>
              <option value="radosny">Radosny</option>
              <option value="mroczny">Mroczny</option>
              <option value="nostalgiczny">Nostalgiczny</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Szczegóły do uwzględnienia:</label>
            <input type="text" name="details" class="form-input" placeholder="wysokie wieżowce, zielone tereny, ludzie na ulicach">
          </div>
          <div class="form-group">
            <label class="form-label">Oświetlenie:</label>
            <input type="text" name="lighting" class="form-input" placeholder="zachód słońca, ciepłe światło">
          </div>
          <div class="form-group">
            <label class="form-label">Perspektywa:</label>
            <input type="text" name="perspective" class="form-input" placeholder="widok z lotu ptaka">
          </div>
          <div class="form-group">
            <label class="form-label">Kolorystyka:</label>
            <input type="text" name="colors" class="form-input" placeholder="niebieskie i fioletowe odcienie">
          </div>
          <div class="form-group">
            <label class="form-label">Dodatkowe instrukcje:</label>
            <textarea name="additional_instructions" class="form-textarea" placeholder="Wysoka jakość, ostre detale, bez zniekształceń twarzy."></textarea>
          </div>
        </div>
        
        <!-- Code prompt fields -->
        <div id="code-prompt-fields" style="display: none;">
          <div class="form-group">
            <label class="form-label">Język programowania:</label>
            <select name="language" class="form-select">
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Java">Java</option>
              <option value="C#">C#</option>
              <option value="PHP">PHP</option>
              <option value="HTML/CSS">HTML/CSS</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Funkcjonalność:</label>
            <input type="text" name="functionality" class="form-input" placeholder="pobiera dane z API i wyświetla je w formie tabeli">
          </div>
          <div class="form-group">
            <label class="form-label">Poziom złożoności:</label>
            <select name="complexity" class="form-select">
              <option value="prosty, odpowiedni dla początkujących">Prosty (dla początkujących)</option>
              <option value="średnio zaawansowany">Średnio zaawansowany</option>
              <option value="zaawansowany, z wykorzystaniem najlepszych praktyk">Zaawansowany</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Funkcje/elementy:</label>
            <input type="text" name="features" class="form-input" placeholder="obsługa błędów, paginacja, filtrowanie wyników">
          </div>
          <div class="form-group">
            <label class="form-label">Dodatkowe instrukcje:</label>
            <textarea name="additional_instructions" class="form-textarea" placeholder="Kod powinien być zgodny ze standardem PEP 8. Użyj funkcji asynchronicznych."></textarea>
          </div>
        </div>
        
        <!-- Chat prompt fields -->
        <div id="chat-prompt-fields" style="display: none;">
          <div class="form-group">
            <label class="form-label">Rola AI:</label>
            <input type="text" name="role" class="form-input" placeholder="ekspert ds. marketingu cyfrowego">
          </div>
          <div class="form-group">
            <label class="form-label">Zadanie:</label>
            <input type="text" name="task" class="form-input" placeholder="stworzenie strategii content marketingu">
          </div>
          <div class="form-group">
            <label class="form-label">Kontekst sytuacji:</label>
            <textarea name="context" class="form-textarea" placeholder="Prowadzę mały sklep internetowy z ręcznie robioną biżuterią. Chcę zwiększyć ruch organiczny i zaangażowanie klientów."></textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Oczekiwania:</label>
            <input type="text" name="expectations" class="form-input" placeholder="konkretne pomysły na treści, harmonogram publikacji, wskazówki dotyczące kanałów">
          </div>
          <div class="form-group">
            <label class="form-label">Format odpowiedzi:</label>
            <input type="text" name="format" class="form-input" placeholder="punkty z krótkim wyjaśnieniem każdego elementu">
          </div>
          <div class="form-group">
            <label class="form-label">Dodatkowe instrukcje:</label>
            <textarea name="additional_instructions" class="form-textarea" placeholder="Uwzględnij specyfikę branży jubilerskiej. Skup się na rozwiązaniach niskobudżetowych."></textarea>
          </div>
        </div>
        
        <div class="prompt-generator-controls">
          <button type="button" class="btn btn-primary generate-btn">Generuj prompt</button>
          <button type="button" class="btn btn-outline copy-btn" style="display: none;">Kopiuj do schowka</button>
        </div>
      </div>
      
      <pre class="prompt-result" style="display: none;"></pre>
    `;
    
    sampleContainer.innerHTML = promptGeneratorHTML;
    initializePromptGenerator();
  }
});
