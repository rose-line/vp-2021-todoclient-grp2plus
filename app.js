let ajouterForm = document.getElementById('ajouterForm');
let nouvelleChoseInput = document.getElementById('nouvelleChoseInput');
let listeChoses = document.getElementById('listeChoses');

let rechercheForm = document.getElementById('rechercheForm');
let cibleInput = document.getElementById('cibleInput');

// charger depuis le local storage
let choses = JSON.parse(localStorage.getItem('listeDeChoses'));
rafraichirListe();

ajouterForm.addEventListener('submit', e => {
  e.preventDefault();

  ajouterChose(nouvelleChoseInput.value);

  nouvelleChoseInput.value = '';
  nouvelleChoseInput.focus();
});

function ajouterChose(chose) {
  chose = chose.trim();
  if (chose !== '') {
    choses.push(chose);
    rafraichirListe();
    localStorage.setItem('listeDeChoses', JSON.stringify(choses));
  }
}

function rafraichirListe() {
  listeChoses.innerHTML = '';
  choses.forEach(chose => {
    // générer le li correspondant à la chose et insérer le li dans le ul
    let liAInserer = `<li><span>${chose}</span> <button onClick="supprimerChose(this)">Supprimer</button> <button onClick="editerChose(this)">Éditer</button></li>`;
    console.log(liAInserer);
    listeChoses.insertAdjacentHTML('beforeend', liAInserer)
  });
}

function supprimerChose(buttonCorrespondant) {
  let chose = buttonCorrespondant.parentElement.firstChild.textContent;
  // console.log(chose);
  choses.splice(choses.indexOf(chose), 1);
  localStorage.setItem('listeDeChoses', JSON.stringify(choses));
  rafraichirChoses();

}

function editerChose(buttonCorrespondant) {
  let liCorrespondant = buttonCorrespondant.parentElement;
  let leSpan = liCorrespondant.firstChild;
  leSpan.textContent = prompt('Nouvelle chose : ');
}

rechercheForm.addEventListener('submit', e => {
  e.preventDefault();

  let cible = cibleInput.value;

  let items = listeChoses.querySelectorAll('li');
  // console.log(items);

  items.forEach(li => {
    console.log("'" + li.textContent + "'");
    if (li.textContent.indexOf(cible) !== -1) {
      // j'ai  une correspondance
      li.firstChild.style.background = 'pink';
    }
  });


});


