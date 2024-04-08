# awale
(En cours) Recréation virtuelle du jeu africain Awalé.



Mécaniques de base du jeu implémentées : 
> Affiche les possibilités en surbrillance au survol des 'trous' de la planche de jeu.
> 
> Au clic (si valide), vide le trou initial et incrémente tous les autres jusqu'à la cible.
> 
> Si les conditions sont remplies, la cible (et le cas échéant les trous précédents) est vidée et le score incrémenté.
> 
> En cas de double tour du plateau, la bonne cible est prise en compte.



A faire : Implémenter la possibilité rare de faire un triple tour, faire sauter la case initiale en cas de double/triple tour, et ajouter un mode deux joueurs et/ou une IA adverse, ainsi que les conditions de victoire.

/////////////////////////////////////////////////////////////
/////////////////////// Règles du jeu ///////////////////////
/////////////////////////////////////////////////////////////

L'awalé se joue sur un plateau composé de 2 rangées de 6 trous chacune; chaque trou recevant 4 graines au début du jeu.

Le but du jeu est de récolter plus de graines que son adversaire.

Chaque joueur se place devant une rangée de 6 cases, qui deviennent alors son camp.

Chacun son tour, un joueur prend toutes les graines d'une des cases de son camp et les sème une par une dans les cases suivantes dans le sens inverse de celui des aiguilles d'une montre. 

Au cours de cette opération, on ne doit jamais remettre de graine dans le trou de départ. Si le nombre de graines prises dans un trou excède 11, on sème pendant un tour complet, on saute le trou de départ, puis on continue à semer dans les autres trous suivants.

Si la dernière graine semée est déposée dans une case du camp adverse, dans laquelle il n'y a, avant qu'il ne la pose, qu'une ou 2 graines, le joueur ramasse toutes les graines de ce trou (y compris celle qu’il vient de semer). De même, il ramasse les graines des cases précédentes du camp adverse si elles sont au nombre de 2 ou 3. En revanche, il ne récolte rien s'il sème sa dernière graine dans une case vide, alliée ou dotée de plus de 3 graines après son semage.
 
L'awalé est un jeu tactique. Un des éléments importants de ce jeu est de pouvoir construire des « greniers » par accumulation de graines dans un seul trou afin de faire plus d’un tour du plateau de jeu. Les « geniers » ont pour effet de dégarnir le camp de l’adversaire, ce qui permettra, une fois les graines de la maison semées, de prendre plusieurs graines en une fois.

Dernière règle, un joueur est obligé de « nourrir » son adversaire, ce qui veut dire qu'il doit jouer de manière à laisser au moins une graine dans le camp adverse. Si un joueur ne peut nourrir son adversaire ou ne peut plus jouer, la partie s’arrête. Il est possible d’arrêter une partie si le nombre de graines sur le plateau de jeu soit trop faible pour pouvoir permettre des prises (on peut considérer qu’à partir de 3 graines ou moins la partie peut s’arrêter). Chacun compte alors ses graines et le joueur en ayant le plus a gagné.
