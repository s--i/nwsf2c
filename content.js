/**
 * Converts a Fahrenheit temperature to Celsius.
 * @param {number} fahrenheit - The temperature in Fahrenheit.
 * @param {number} [decimalPlaces=1] - The number of decimal places to round the Celsius temperature to. Defaults to 1.
 * @returns {string} The temperature in Celsius, rounded to the specified decimal places, as a string.
 */
function fahrenheitToCelsius(fahrenheit, decimalPlaces = 1) {
    return ((fahrenheit - 32) * 5 / 9).toFixed(decimalPlaces);
}

/**
 * Handles the conversion for paragraph elements with 'temp' class.
 * E.g., "<p class="temp temp-high">High: 63 °F</p>" becomes "High: 63 °F (17.2 °C)"
 * @param {HTMLElement} el - The paragraph element to process.
 * @returns {string} The modified text content or the original text if no conversion happened.
 */
function handleTempParagraph(el) {
    const originalText = el.textContent;
    const fahrenheitMatch = originalText.match(/(\d+)\s+°F/);
    if (fahrenheitMatch && fahrenheitMatch[1]) {
        const fahrenheit = parseFloat(fahrenheitMatch[1]);
        const celsius = fahrenheitToCelsius(fahrenheit);

        return `${originalText} (${celsius} °C)`;
    }

    return originalText;
}

/**
 * Handles the conversion for div elements with 'forecast-text' class.
 * E.g., "low around 56" becomes "low around 56°F (13 °C)"
 * @param {HTMLElement} el - The div element to process.
 * @returns {string} The modified text content or the original text if no conversion happened.
 */
function handleForecastTextDiv(el) {
    let newText = el.textContent;
    newText = newText.replace(/(around|near)\s+(\d+)/gi, (match, prefix, fahrenheitStr) => {
        const fahrenheit = parseFloat(fahrenheitStr);
        const celsius = fahrenheitToCelsius(fahrenheit, 0);

        return `${prefix} ${fahrenheitStr} (${celsius})`;
    });

    return newText;
}

/**
 * Finds all relevant temperature-containing elements on the page and converts
 * Fahrenheit temperatures to Celsius.
 */
function convertTemperatures() {
    document
        .querySelectorAll("#seven-day-forecast-body p.temp")
        .forEach(element => {
            const updatedText = handleTempParagraph(element);
            if (element.textContent !== updatedText) {
                element.textContent = updatedText;
            }
        });

    document
        .querySelectorAll("#detailed-forecast div.forecast-text")
        .forEach(element => {
            const updatedText = handleForecastTextDiv(element);
            if (element.textContent !== updatedText) {
                element.textContent = updatedText;
            }
        });
}

convertTemperatures();