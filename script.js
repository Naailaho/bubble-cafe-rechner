function updateGrandTotal(){
  let sum = 0;
  document.querySelectorAll('td[data-price]').forEach(td => {
    const price = parseInt(td.dataset.price);
    const qty = parseInt(td.parentElement.querySelector('input[type=number]').value) || 0;
    sum += price * qty;
  });
  document.getElementById('grandTotal').textContent = sum + " $";
}

document.querySelectorAll('input[type=number]').forEach(inp => {
  inp.addEventListener('input', updateGrandTotal);
});

document.getElementById('generateBtn').addEventListener('click', function(){
  let items = [];
  document.querySelectorAll('td[data-price]').forEach(td => {
    const qty = parseInt(td.parentElement.querySelector('input[type=number]').value) || 0;
    if(qty>0){
      items.push(qty + "x " + td.parentElement.children[0].textContent);
    }
  });

  const persons = document.getElementById('persons').value || 1;
  const total = document.getElementById('grandTotal').textContent;
  const now = new Date();
  const date = `${now.getDate()}.${now.getMonth()+1}.${now.getFullYear()}`;
  const billText = `Bubble Cafe - ${date} ♡ ${persons} P ♡ ${items.join(' ♡ ')} ♡ Gesamt: ${total}`;

  const billBox = document.getElementById('bill');
  billBox.style.display = 'block';
  billBox.textContent = billText;

  const copyBtn = document.getElementById('copyBtn');
  copyBtn.style.display = 'inline-block';
  copyBtn.onclick = function(){
    navigator.clipboard.writeText(billText).then(()=>{
      alert('Rechnung wurde kopiert!');
    }).catch(()=>alert('Kopieren fehlgeschlagen'));
  }
});

document.getElementById('resetBtn').addEventListener('click', function(){
  document.querySelectorAll('input[type=number]').forEach(inp => inp.value = inp.id==="persons"?1:0);
  document.getElementById('grandTotal').textContent = "0 $";
  document.getElementById('bill').style.display = 'none';
  document.getElementById('copyBtn').style.display = 'none';
});

// Initiale Summe
updateGrandTotal();