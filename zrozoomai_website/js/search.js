// Search functionality for zrozoomai.pl

document.addEventListener('DOMContentLoaded', function() {
  // Initialize search functionality
  initializeSearch();
  
  function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
      // Add event listeners
      searchBtn.addEventListener('click', function() {
        performSearch(searchInput.value);
      });
      
      searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          performSearch(searchInput.value);
        }
      });
    }
  }
  
  function performSearch(query) {
    if (!query || query.trim() === '') return;
    
    console.log('Searching for:', query);
    
    // Get all searchable content
    const cards = document.querySelectorAll('.card');
    const articles = document.querySelectorAll('.article-content');
    const terms = document.querySelectorAll('.dictionary-term');
    
    // Combine all searchable elements
    const searchableElements = [...cards, ...articles, ...terms];
    let results = [];
    
    // Search through elements
    searchableElements.forEach(element => {
      const textContent = element.textContent.toLowerCase();
      if (textContent.includes(query.toLowerCase())) {
        results.push(element);
      }
    });
    
    // Display results
    displaySearchResults(results, query);
  }
  
  function displaySearchResults(results, query) {
    // Create or get results container
    let resultsContainer = document.getElementById('search-results-container');
    
    if (!resultsContainer) {
      resultsContainer = document.createElement('div');
      resultsContainer.id = 'search-results-container';
      resultsContainer.className = 'dictionary-container';
      
      // Find where to insert results
      const mainContent = document.querySelector('.page-content');
      if (mainContent) {
        mainContent.parentNode.insertBefore(resultsContainer, mainContent);
      } else {
        document.body.appendChild(resultsContainer);
      }
    }
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Create header
    const header = document.createElement('h2');
    header.textContent = `Wyniki wyszukiwania dla: "${query}"`;
    resultsContainer.appendChild(header);
    
    // Display number of results
    const resultCount = document.createElement('p');
    resultCount.textContent = `Znaleziono ${results.length} wyników.`;
    resultsContainer.appendChild(resultCount);
    
    if (results.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'alert alert-info';
      noResults.textContent = 'Nie znaleziono wyników pasujących do zapytania. Spróbuj użyć innych słów kluczowych.';
      resultsContainer.appendChild(noResults);
      return;
    }
    
    // Create results list
    const resultsList = document.createElement('div');
    resultsList.className = 'search-results-list';
    
    results.forEach(result => {
      const resultItem = document.createElement('div');
      resultItem.className = 'search-result-item';
      
      // Get title
      let title = '';
      const titleElement = result.querySelector('h3') || result.querySelector('h2');
      if (titleElement) {
        title = titleElement.textContent;
      }
      
      // Get excerpt
      let excerpt = result.textContent.substring(0, 200) + '...';
      
      // Get link
      let link = '#';
      if (result.closest('a')) {
        link = result.closest('a').href;
      } else if (result.querySelector('a')) {
        link = result.querySelector('a').href;
      }
      
      // Create result item content
      resultItem.innerHTML = `
        <h3><a href="${link}">${title}</a></h3>
        <p>${excerpt}</p>
      `;
      
      resultsList.appendChild(resultItem);
    });
    
    resultsContainer.appendChild(resultsList);
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});
