let trou = {};
let n = [2, 4, 4, 4, 4, 13, 2, 2, 2, 4, 4, 4];
let nord = [11, 10, 9, 8, 7, 6];
let sud = [0, 1, 2, 3, 4, 5];
let score = 0;
let affichageScore = document.getElementById("score");

for (let i = 11; i >= 0; i--) {
    trou[i] = document.getElementById(i.toString());  // Lie les variables à chaque div du document
    trou[i].innerText = n[i];                           // Attribue à chaque trou son nombre de graines

    trou[i].addEventListener("mouseover", () => {       // Fonction hover pour afficher les possibilités
        Object.values(trou).forEach(element => {        // Réinitialise les bordures avant tout changement
            element.style.borderColor = "initial";
        });

        let cible = (i + n[i]) % 12;
        if (i < 6) {                         // Ne fonctionne que sur la barre du bas
            if ((i + n[i]) >= 6) {                     // Mouvement valide seulement s'il dépasse la barre du bas
                trou[i].style.borderColor = "blue";
                trou[cible].style.borderColor = "yellow";
            } else if (n[i] > 0) {                      // Mouvement invalide si le trou est rempli mais pas assez
                trou[i].style.borderColor = "red";
            }
        }
    });

    trou[i].addEventListener("mouseout", () => {    // Réinitialisation quand hover prend fin
        Object.values(trou).forEach(element => {
            element.style.borderColor = "initial";
        });
    });

    trou[i].onclick = () => {                       // Fonction lancée au clic
        let cible = (i + n[i]) % 12;
        let j = i;                          // Variable arbitraire qui prend la place de i pour s'incrémenter jusqu'à 11
        let k = j;                          // Variable arbitraire qui s'incrémente en parallèle de j, sans limite
        let priseDePointsLancée = false;
        let priseDePoints = () => {             // Fonction d'implémentation du score et vidage des trous pris
            while (cible >= 6 && (n[cible] === 2 || n[cible] === 3)) {    // Vérifie que les conditions sont remplies pour s'éxécuter
                score += n[cible];
                n[cible] = 0;
                trou[cible].innerText = n[cible];
                trou[cible].style.borderColor = "green";
                affichageScore.innerText = score;
                cible--;
            }
        }
        let tourDeJeu = () => {                     // Lancement de la mécanique de jeu si mouvement valide
            if (trou[i].style.borderColor !== "red") { // Utilisation de la couleur pour éviter les conflits
                console.log(n[i]);
                if (i!==j){            // Icrémente de 1 chaque montant, sauf le trou initial
                    n[j]++;
                }
                trou[j].innerText = n[j];
                trou[j].style.opacity = "100%";         // Dégrise les trous remplis
                trou[i].innerText = 0;       // Affiche un trou d'origine vide dès le début
                if (n[i] < 12) {           // Vérifie qu'il n'y a qu'un seul tour de plateau à effectuer
                    console.log("cas 1");
                    if (j !== cible) {  // Incrémente tant que la cible n'est pas atteinte
                        j = (j + 1) % 12;           // Prend en compte les valeurs de cible qui repassent par zéro
                    } else if (j === cible) {       // Une fois la cible atteinte, lance la fonction de prise de points
                        priseDePoints();
                        return;
                    };
                } else {                   // En cas de second tour de plateau, permet d'éxecuter la progression jusqu'au bout
                    console.log("cas 2");
                    if (j !== cible || (j === cible && k < 12)) {  // Incrémente tant que la véritable cible n'est pas atteinte
                        j = (j + 1) % 12;
                        k++;
                        console.log("tour suivant");
                    } else if (j === cible && k >= 12) {      // La cible peut être atteinte une fois qu'un premier tour a été effectué
                        priseDePoints();
                        priseDePointsLancée = true;
                        console.log("pris!");
                        return;
                    };
                }
                setTimeout(tourDeJeu, 300);
            }
        }

        tourDeJeu();

        if (priseDePointsLancée){
        n[i] = 0;          // Vide le trou d'origine à la toute fin pour ne pas interférer avec le programme
        }

        if (n[i] === 0) {                       // Grise les trous vides après clic
            trou[i].style.opacity = "70%";      // (Pas de rouge = pas de conflit avec la boucle de jeu)
        }
    }
}
