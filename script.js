document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/fonts')
        .then(response => response.json())
        .then(fonts => {
            const fontSamplesContainer = document.getElementById('fontSamples');

            fonts.forEach(font => {
                const fontFormat = font.endsWith('.ttf') ? 'truetype' : 'opentype';
                const fontURL = `/fonts/${font}`;

                // Create @font-face rule dynamically
                const style = document.createElement('style');
                style.textContent = `
@font-face {
    font-family: '${font}';
    src: url('${fontURL}') format('${fontFormat}');
}
font-family: '${font}', sans-serif;
                `;
                document.head.appendChild(style);

                // Create a font sample box
                const fontSampleDiv = document.createElement('div');
                fontSampleDiv.classList.add('font-sample');
                fontSampleDiv.innerHTML = `
                    <h3>${font}</h3>
                    <p style="font-family: '${font}';">
                    ArciTech, We Get Your Bytes in Order
                    </p>
                    <pre class="css-code">
@font-face {
    font-family: '${font}';
    src: url('assets${fontURL}') format('${fontFormat}');
}
font-family: '${font}', sans-serif;
                    </pre>
                    <button class="copy-btn">Copy CSS</button>
                `;

                // Add click event to toggle the CSS code visibility
                fontSampleDiv.addEventListener('click', () => {
                    const cssCodeElement = fontSampleDiv.querySelector('.css-code');
                    cssCodeElement.classList.toggle('show');
                });

                // Add click event to copy CSS code
                fontSampleDiv.querySelector('.copy-btn').addEventListener('click', (event) => {
                    event.stopPropagation(); // Prevent event from bubbling up to the font sample click
                    const cssCodeElement = fontSampleDiv.querySelector('.css-code');
                    navigator.clipboard.writeText(cssCodeElement.textContent)
                        .then(() => {
                            alert('CSS code copied to clipboard!');
                        })
                        .catch(err => {
                            console.error('Error copying CSS code:', err);
                        });
                });

                fontSamplesContainer.appendChild(fontSampleDiv);
            });
        })
        .catch(err => {
            console.error('Error fetching font list:', err);
        });
});