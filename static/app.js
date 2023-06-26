document.addEventListener("DOMContentLoaded", () => {
    fetch('/api/locations')
      .then(response => response.json())
      .then(data => {
        const locations = data.locations;
        console.log(locations); // Log the locations to the console
  
        // Call the function to initialize autocomplete with the locations
        initializeAutocomplete(locations);
      })
      .catch(error => {
        console.error('Error fetching API locations:', error);
      });
  });
  
  function initializeAutocomplete(locations) {
    // Extract the location data for autocomplete suggestions
    const suggestions = locations.list.map(location => ({
      id: location.id,
      name: location.name,
      city: location.name,
      weather: location.weather[0].description
    }));
  
    // Initialize autocomplete on search input field using location data
    // Use a JavaScript library like Autocomplete.js or jQuery UI Autocomplete
  
    // Example with Autocomplete.js library
    new Autocomplete(searchInput, {
      data: suggestions,
      searchKey: 'name',
      template: suggestion => {
        return `<div>${suggestion.name}, ${suggestion.city} - ${suggestion.weather}</div>`;
      }
    });
  }

  