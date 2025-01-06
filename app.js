function extractUTM() {
  const urlInput = document.getElementById('urlInput').value.trim();
  const resultContainer = document.getElementById('result');
  const utmTable = document.getElementById('utmTable');
  const errorMessage = document.getElementById('errorMessage');
  const tbody = utmTable.getElementsByTagName('tbody')[0];

  // Clear previous results
  tbody.innerHTML = '';
  errorMessage.style.display = 'none';
  utmTable.style.display = 'none';

  if (urlInput === '') {
    errorMessage.style.display = 'none';
    return;
  }

  try {
    // Check if the URL is valid
    const url = new URL(urlInput);

    // Extract the query string
    const params = new URLSearchParams(url.search);

    // List of all possible UTM parameters based on Google Campaign URL Builder
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'];
    let hasUTMParams = false;

    utmParams.forEach((param) => {
      const value = params.get(param);
      if (value) {
        hasUTMParams = true;
        const row = tbody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = param;
        cell2.textContent = decodeURIComponent(value);
      }
    });

    // Display results based on whether UTM parameters were found
    if (hasUTMParams) {
      utmTable.style.display = 'table';
    } else {
      errorMessage.textContent = 'No UTM parameters found in this URL.';
      errorMessage.style.display = 'block';
    }
  } catch (e) {
    errorMessage.textContent = 'Invalid URL. Please make sure the URL is correctly formatted.';
    errorMessage.style.display = 'block';
  }
}

// Auto-execute the extraction on input change
document.getElementById('urlInput').addEventListener('input', function() {
  extractUTM();
});
