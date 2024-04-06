let trou = {};
let n = [2, 4, 4, 4, 4, 7, 2, 2, 2, 4, 4, 4];
let nord = [11, 10, 9, 8, 7, 6];
let sud = [0, 1, 2, 3, 4, 5];
let score=0;
let affichageScore=document.getElementById("score");

for (let i = 11; i >= 0; i--) {
    trou[i] = document.getElementById(i.toString());  // Lie les variables à chaque div du document
    trou[i].innerText = n[i];                           // Attribue à chaque trou son nombre de graines

    trou[i].addEventListener("mouseover", () => {       // Fonction hover pour afficher les possibilités
        Object.values(trou).forEach(element => {        // Réinitialise les bordures avant tout changement
            element.style.borderColor = "initial";
        });

        let cible = (i + n[i]) % 12;
        if (sud.includes(i)) {                         // Ne fonctionne que sur la barre du bas
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
        let j = i;
        let priseDePoints = () => {
            score += n[cible];
            n[cible]=0;
            trou[cible].innerText = n[cible];
            trou[cible].style.borderColor = "green";
            affichageScore.innerText = score;
        }

        let tourDeJeu = () => {                     // Lancement de la mécanique de jeu si mouvement valide
            if (trou[i].style.borderColor !== "red") { // Utilisation de la couleur pour éviter les conflits
                n[j]++;
                trou[j].innerText = n[j];
                trou[j].style.opacity = "100%";         // Dégrise les trous remplis
                n[i] = 0;
                trou[i].innerText = n[i];
                if (j !== cible) {            // Incrémente tant que la cible n'est pas atteinte
                    j = (j + 1) % 12;           // Prend en compte les valeurs de cible qui repassent par zéro
                } else if (j === cible) {       // Une fois la cible atteinte, vérifie les conditions de prise de points
                    while (cible>=6 && (n[cible]===2 || n[cible]===3)) {
                        priseDePoints();
                        cible--;
                    }
                    return;
                };
                setTimeout(tourDeJeu, 300);
            }
        }
        tourDeJeu();
    
        if (n[i] === 0) {                       // Grise les trous vides après clic
            trou[i].style.opacity = "70%";      // (Pas de rouge = pas de conflit avec la boucle de jeu)
        }
    }
}
