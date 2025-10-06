alert("Welcome to the Counter App!, My first project");
let count = 0;

const value = document.getElementById('value');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const resetBtn = document.getElementById('reset');

const saved = localStorage.getItem('counterValue');
if(saved !== null) count = Number(saved);

function updateUI(){

    value.textContent = count;

    if (count > 0) value.style.color = 'green';
    else if (count < 0) value.style.color = 'red';
    else value.style.color = '#333';

    //disable decrease button when at 0
    //decreaseBtn.disabled = (count <=0);

    //save current value (string)
    localStorage.setItem('counterValue', String(count));
}

function animateValue(){
    value.classList.add('bump');
    setTimeout(() => value.classList.remove('bump'), 300);
}

//event listners
increaseBtn.addEventListener('click', () => {
    count ++;
    updateUI();
    animateValue();
    
});

decreaseBtn.addEventListener('click', () =>{
    count --;
    updateUI();
    animateValue();
});


resetBtn.addEventListener('click', () => {
    count = 0;
    updateUI();
    animateValue();
});


//keyboard shortcuts
window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') increaseBtn.click();
    if (e.key === 'ArrowDown') decreaseBtn.click();
    if (e.key === 'Delete') resetBtn.click();
});

updateUI();