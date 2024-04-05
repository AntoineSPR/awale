let trou = {};
let n = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
let validity = false;
for (let i = 11; i >= 0; i--) {
    trou[i] = document.getElementById(i.toString());  // Lie les variables à chaque div du document
    trou[i].innerText = n[i];
    trou[i].addEventListener("mouseover", () => {
        let cible = (i + n[i]) % 12;
        if (i < 6) {                                    // Ne fonctionne que sur la barre du bas
            if ((i + n[i]) >= 6) {                     // Mouvement valide seulement s'il dépasse la barre du bas
                trou[i].style.borderColor = "blue";
                trou[cible].style.borderColor = "yellow";
                validity = true;
            } else if (n[i] > 0) {
                validity = false;
                trou[i].style.borderColor = "red";
            }
        }
    });
    trou[i].addEventListener("mouseout", () => {
        Object.values(trou).forEach(element => {
            element.style.borderColor = "initial";
        });
    });
    trou[i].onclick = () => {
        let cible = (i + n[i]) % 12;
        let j = i;
        let tourDeJeu = () => {
            if (trou[i].style.borderColor !== "red") {
                if (j <= cible && validity === true) {
                    n[j]++;
                    trou[j].innerText = n[j];
                    n[i] = 0;
                    trou[i].innerText = n[i];
                    if (j < cible) {
                        j++;
                    } else if (j === cible) {
                        return;
                    };
                    setTimeout(tourDeJeu, 300);
                }
                if (cible < j) {
                    n[j]++;
                    trou[j].innerText = n[j];
                    n[i] = 0;
                    trou[i].innerText = n[i];
                    j = (j + 1) % 12;
                    setTimeout(tourDeJeu, 300);
                }
            }
        }
        tourDeJeu();
        if (n[i] === 0) {
            trou[i].style.opacity = "70%";
        }
    }
}
