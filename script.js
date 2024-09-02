const tableau = document.getElementById('game-board');
const cases = Array.from(document.getElementsByClassName('cell'));
const statut = document.getElementById('status');
const boutonReset = document.getElementById('reset-button');
const boutonMode1v1 = document.getElementById('mode-1v1');
const boutonMode1va = document.getElementById('mode-1va');

let joueurActuel = 'X';
let etatTableau = Array(9).fill(null);
let modeJeu = null; // '1v1' ou '1va'

const combinaisonsGagnantes = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function verifierGagnant() {
    for (const combinaison of combinaisonsGagnantes) {
        const [a, b, c] = combinaison;
        if (etatTableau[a] && etatTableau[a] === etatTableau[b] && etatTableau[a] === etatTableau[c]) {
            return etatTableau[a];
        }
    }
    return etatTableau.every(caseValue => caseValue) ? 'Match Nul' : null;
}

function gererClic(event) {
    const index = event.target.dataset.index;

    if (etatTableau[index] || verifierGagnant()) return;

    etatTableau[index] = joueurActuel;
    event.target.textContent = joueurActuel;

    const gagnant = verifierGagnant();
    if (gagnant) {
        statut.textContent = gagnant === 'Match Nul' ? 'C\'est un Match Nul !' : `${gagnant} a Gagné !`;
    } else {
        if (modeJeu === '1va' && joueurActuel === 'X') {
            setTimeout(faireMouvementAuto, 500);
        } else {
            joueurActuel = joueurActuel === 'X' ? 'O' : 'X';
        }
    }
}

function faireMouvementAuto() {
    const casesLibres = etatTableau.map((valeur, index) => valeur === null ? index : null).filter(valeur => valeur !== null);
    const indexAleatoire = casesLibres[Math.floor(Math.random() * casesLibres.length)];
    
    etatTableau[indexAleatoire] = 'O';
    cases[indexAleatoire].textContent = 'O';
    
    const gagnant = verifierGagnant();
    if (gagnant) {
        statut.textContent = gagnant === 'Match Nul' ? 'C\'est un Match Nul !' : `${gagnant} a Gagné !`;
    } else {
        joueurActuel = 'X';
    }
}

function reinitialiserJeu() {
    etatTableau = Array(9).fill(null);
    cases.forEach(caseElement => caseElement.textContent = '');
    statut.textContent = '';
    joueurActuel = 'X';
}

function definirModeJeu(mode) {
    modeJeu = mode;
    reinitialiserJeu();
}

boutonMode1v1.addEventListener('click', () => definirModeJeu('1v1'));
boutonMode1va.addEventListener('click', () => definirModeJeu('1va'));
tableau.addEventListener('click', gererClic);
boutonReset.addEventListener('click', reinitialiserJeu);
