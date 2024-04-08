let trou = {};
let n = [2, 4, 4, 4, 4, 25, 2, 2, 2, 4, 4, 4];
let nord = [11, 10, 9, 8, 7, 6];
let sud = [0, 1, 2, 3, 4, 5];
let score = 0;
let affichageScore = document.getElementById("score");
let tourEnCours = false;

for (let i = 11; i >= 0; i--) {
    trou[i] = document.getElementById(i.toString());  // Lie les variables à chaque div du document
    trou[i].innerText = n[i];                           // Attribue à chaque trou son nombre de graines

    /**
     * Au passage de la souris
     */

    trou[i].addEventListener("mouseover", () => {       // Fonction hover pour afficher les possibilités
        if (tourEnCours) { return; }
        Object.values(trou).forEach(element => {        // Réinitialise les bordures avant tout changement
            element.style.borderColor = "initial";
        });

        let cible = (i + n[i]) % 12;
        if (i < 6) {                         // Ne fonctionne que sur la barre du bas
            if ((i + n[i]) >= 6) {                     // Mouvement valide seulement s'il dépasse la barre du bas
                if (n[i] >= 12) { cible++; }          // Saute le trou initial en cas de double tour
                trou[i].style.borderColor = "blue";
                trou[cible].style.borderColor = "yellow";
            } else if (n[i] > 0) {                      // Mouvement invalide si le trou est rempli mais pas assez
                trou[i].style.borderColor = "red";
            }
        }
    });

    /**
     * Après le passage de la souris
     */

    trou[i].addEventListener("mouseout", () => {    // Réinitialisation quand hover prend fin
        Object.values(trou).forEach(element => {
            element.style.borderColor = "initial";
        });
    });

    /**
     * Au clic de la souris
     */

    trou[i].onclick = () => {                       // Fonction lancée au clic
        if (tourEnCours) { return; }              // Empêche de lancer 2 tours en même temps
        let cible = (i + n[i]) % 12;
        if (n[i] >= 12) { cible++; }
        let j = i;                          // Variable arbitraire qui prend la place de i pour s'incrémenter jusqu'à 11
        let k = j;                          // Variable arbitraire qui s'incrémente en parallèle de j, sans limite
        let priseDePoints = () => {             // Fonction d'implémentation du score et vidage des trous pris  
            while (cible >= 6 && (n[cible] === 2 || n[cible] === 3)) {    // Vérifie que les conditions sont remplies pour s'éxécuter
                trou[cible].classList.remove("highlighted");
                trou[cible].style.borderColor = "initial";
                score += n[cible];
                n[cible] = 0;
                trou[cible].innerText = n[cible];
                trou[cible].style.borderColor = "green";
                affichageScore.innerText = score;
                cible--;
            }

            setTimeout(() => {
                trou[cible].classList.remove("highlighted");
                trou[cible].style.borderColor = "initial";
            }, 300);
        }
        let tourDeJeu = () => {                     // Lancement de la mécanique de jeu si mouvement valide
            tourEnCours = true;
            if (trou[i].style.borderColor !== "red" && sud.includes(i)) { // Utilisation de la couleur pour éviter les conflits
                trou[cible].style.borderColor = "yellow";
                if (i !== j) {            // Icrémente de 1 chaque montant, sauf le trou initial
                    n[j]++;
                }
                trou[j].innerText = n[j];
                trou[j].classList.remove("empty");         // Dégrise les trous remplis
                if (j !== i) {
                    trou[j].classList.add("highlighted");
                }
                if (j !== 0) {
                    trou[(j - 1)].classList.remove("highlighted");
                } else { trou[11].classList.remove("highlighted"); }
                trou[i].innerText = 0;       // Affiche un trou d'origine vide dès le début
                trou[i].classList.add("empty");
                if (n[i] < 12) {           // Vérifie qu'il n'y a qu'un seul tour de plateau à effectuer
                    if (j !== cible) {  // Incrémente tant que la cible n'est pas atteinte
                        j = (j + 1) % 12;           // Prend en compte les valeurs de cible qui repassent par zéro
                    } else if (j === cible) {       // Une fois la cible atteinte, lance la fonction de prise de points
                        priseDePoints();
                        tourEnCours = false;
                        n[i] = 0;
                        return;
                    };
                } else if (n[i] < 24) {                   // En cas de second tour de plateau, permet d'éxecuter la progression jusqu'au bout
                    if (j !== cible || (j === cible && k < 12)) {  // Incrémente tant que la véritable cible n'est pas atteinte
                        j = (j + 1) % 12;
                        k++;
                    } else if (j === cible && k >= 12) {      // La cible peut être atteinte une fois qu'un premier tour a été effectué
                        priseDePoints();
                        tourEnCours = false;
                        n[i] = 0;
                        return;
                    };
                } else {                                // En cas de troisième tour
                    if (j !== cible || (j === cible && k < 24)) {
                        j = (j + 1) % 12;
                        k++;
                    } else if (j === cible && k >= 24) {
                        priseDePoints();
                        tourEnCours = false;
                        n[i] = 0;
                        return;
                    };
                }
                setTimeout(tourDeJeu, 300);
            }
        }

        tourDeJeu();
    }
}
