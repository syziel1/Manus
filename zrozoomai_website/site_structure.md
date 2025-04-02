# Struktura strony zrozoomai.pl

## Główne sekcje strony

### 1. Strona główna (index.html)
- Nagłówek z logo i menu nawigacyjnym
- Baner powitalny z krótkim opisem misji strony
- Wyróżnione najnowsze artykuły
- Sekcja "Zacznij tutaj" dla początkujących
- Sekcja "Popularne tematy"
- Sekcja "Dołącz do społeczności"
- Stopka z informacjami kontaktowymi i linkami

### 2. AI dla początkujących (beginners.html)
- Wprowadzenie do sekcji
- Ścieżka nauki dla początkujących (wizualna mapa)
- Lista artykułów z serii "AI od podstaw"
- Podstawowe pojęcia i definicje
- FAQ dla początkujących

### 3. Praktyczne tutoriale (tutorials.html)
- Wprowadzenie do sekcji
- Filtry tutoriali (poziom trudności, kategoria)
- Lista tutoriali krok po kroku
- Wyróżnione projekty czytelników

### 4. Narzędzia AI (tools.html)
- Wprowadzenie do sekcji
- Porównanie popularnych narzędzi AI
- Przeglądy i recenzje
- Poradniki dotyczące wyboru narzędzi

### 5. Słownik pojęć (dictionary.html)
- Wprowadzenie do sekcji
- Alfabetyczny indeks pojęć
- Szczegółowe definicje z przykładami
- Powiązane artykuły

### 6. Blog (blog.html)
- Lista wszystkich artykułów
- Filtry (kategoria, data, poziom trudności)
- Wyszukiwarka

### 7. O nas (about.html)
- Informacje o projekcie
- Misja i wizja
- Zespół
- Kontakt

### 8. Zasoby (resources.html)
- E-booki do pobrania
- Szablony promptów
- Materiały dodatkowe
- Linki do zewnętrznych zasobów

## Struktura katalogów

```
zrozoomai_website/
├── index.html                  # Strona główna
├── beginners.html              # AI dla początkujących
├── tutorials.html              # Praktyczne tutoriale
├── tools.html                  # Narzędzia AI
├── dictionary.html             # Słownik pojęć
├── blog.html                   # Blog
├── about.html                  # O nas
├── resources.html              # Zasoby
├── css/                        # Style CSS
│   ├── main.css                # Główny arkusz stylów
│   ├── responsive.css          # Style responsywne
│   └── components.css          # Style komponentów
├── js/                         # Skrypty JavaScript
│   ├── main.js                 # Główny skrypt
│   ├── search.js               # Funkcjonalność wyszukiwania
│   └── interactive.js          # Elementy interaktywne
├── images/                     # Obrazy i grafiki
│   ├── logo.png                # Logo strony
│   ├── icons/                  # Ikony
│   └── illustrations/          # Ilustracje
├── articles/                   # Artykuły
│   ├── basics/                 # Artykuły z podstaw AI
│   ├── tutorials/              # Tutoriale
│   └── tools/                  # Artykuły o narzędziach
└── resources/                  # Zasoby do pobrania
    ├── ebooks/                 # E-booki
    ├── templates/              # Szablony
    └── checklists/             # Listy kontrolne
```

## Elementy nawigacji

### Menu główne
- Strona główna
- AI dla początkujących
- Praktyczne tutoriale
- Narzędzia AI
- Słownik pojęć
- Blog
- O nas
- Zasoby

### Stopka
- O nas
- Kontakt
- Polityka prywatności
- Newsletter
- Media społecznościowe

## Elementy interaktywne

1. **Wyszukiwarka** - na każdej stronie w nagłówku
2. **Filtry treści** - na stronach z listami artykułów
3. **Ścieżka nauki** - interaktywna mapa na stronie dla początkujących
4. **Quizy wiedzy** - osadzone w artykułach
5. **Formularz newslettera** - w stopce i na dedykowanej stronie
6. **Komentarze** - pod artykułami
7. **Przyciski udostępniania** - dla mediów społecznościowych

## Responsywność

Strona będzie w pełni responsywna, dostosowana do następujących rozmiarów ekranów:
- Duże ekrany (desktop): > 1200px
- Średnie ekrany (laptop): 992px - 1199px
- Małe ekrany (tablet): 768px - 991px
- Bardzo małe ekrany (telefon): < 767px

## Paleta kolorów

- Kolor podstawowy: #1E3A8A (ciemny niebieski)
- Kolor akcentujący: #06B6D4 (turkusowy)
- Kolor tła: #F9FAFB (jasny szary)
- Kolor tekstu: #1F2937 (ciemny szary)
- Kolor nagłówków: #111827 (prawie czarny)
- Kolor ostrzeżeń/alertów: #EF4444 (czerwony)
- Kolor sukcesu: #10B981 (zielony)

## Typografia

- Nagłówki: Montserrat, sans-serif
- Tekst podstawowy: Open Sans, sans-serif
- Kod: Fira Code, monospace

## Technologie

- HTML5
- CSS3 (z wykorzystaniem Flexbox i Grid)
- JavaScript (vanilla)
- Opcjonalnie: Bootstrap 5 dla komponentów UI
