const btn = document.getElementById("changeBtn");
const colorCode = document.getElementById("colorCode");


function getRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i=0; i<6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

btn.addEventListener('click', () => {
    const newColor = getRandomColor();
    document.body.style.background = newColor;
    colorCode.textContent = newColor;
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') btn.click();
});

// Step 4: Copy color to clipboard when clicked
colorCode.addEventListener("click", () => {
  const color = colorCode.textContent; // get current color
  navigator.clipboard.writeText(color) // copy to clipboard
    .then(() => {
      alert(`Copied ${color} to clipboard!`);
    })
    .catch(err => {
      console.error("Failed to copy: ", err);
    });
});
