 const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


/*const dummyTransctions = [
    {id: 1 , text: 'book' , amount: -30},
    {id: 2 , text: 'flowers' , amount: 300},
    {id: 3 , text: 'ball' , amount: -200}
];
*/
const localStorageTransction = JSON.parse( localStorage.getItem('transctions') );

let transctions = localStorage.getItem('transctions') !== null ? localStorageTransction : [] ;



function addTransactionsToDom(transctions) {
    const sign = transctions.amount < 0 ? '-' : '+';
    const item = document.createElement('li');
    item.classList.add (transctions.amount < 0 ? 'minus':'plus');
    item.innerHTML = `
    ${transctions.text} <span> ${sign} ${Math.abs(transctions.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${
        transctions.id
      })">x</button>
    `
    list.appendChild(item);
}

function updataValue() {
    const amounts = transctions.map(transction => transction.amount);
    const total = amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const income = amounts.filter (item => item > 0)
                          .reduce((acc,item) => (acc+=item),0).toFixed(2);
    const expense = (amounts.filter(item => item < 0 ).reduce((acc,item) => (acc+=item),0)*-1)
                           .toFixed(2);

  balance.innerText = `$${total}`
  money_plus.innerText = `$${income}`
  money_minus.innerText = `$${expense}`
                           
}



function addTransactions(e)  {
    e.preventDefault();
    
    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('please add text and amount');
    }else{
        const transction =  {
            id:Math.floor( Math.random()*100 ),
            text:text.value,
            amount:parseInt( amount.value ) 
        }

        transctions.push(transction);
        addTransactionsToDom(transction);
    
        updataValue();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }
}

function removeTransaction(id) {
    transctions = transctions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    init()
  }
  

function updateLocalStorage() {
localStorage.setItem('transctions',JSON.stringify(transctions));
}


function init() {
    list.innerHTML = '';
    transctions.forEach(addTransactionsToDom);
    updataValue();
  }
  
  init();

form.addEventListener('submit',addTransactions);