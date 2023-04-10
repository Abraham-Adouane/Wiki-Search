// Codez un système de recherche grâce à l'API de Wikipedia.
// L'utilisateur peut effectuer une recherche et voir s'afficher des résultats sur lesquelles il pourra cliquer si il veut se déplacer sur la page de l'article en question. 


// 1. Gérez l'entrée de la recherche grâce au formulaire et à l'input.

// 2. Utilisez l'API de Wikipedia afin d'obtenir les résultats de cette recherche.<br>
// Voici l'api vous deverez la compléter avec le contenu de la recherche:
// https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=

// 3.Redirgiez l'utilisateur vers la page de l'article en question en cliquant sur le titre de l'article.
// API a completer : https://en.wikipedia.org/?curid=


// Points à prendre en compte:
// a. Ajoutez un loader pendant le chargement.
// b. Affichez les résultats en dessous de l'input.
// c. Faites en sorte qu'on puisse éffectuer autant de recherches qu'on le souhaite.
// d.Bonus : Gérez les erreurs.


const form = document.querySelector("form");
const input = document.querySelector('input');
const articleList = document.querySelector('.articleList');
const loader = document.querySelector('.loader');
let region = 'en';
let timer= 500 //Durée d'attente pour la recherche

form.addEventListener('submit', (e) => {
    e.preventDefault();
    articleList.innerHTML = '';
    loader.classList.add('visible');

    fetch(`https://${region}.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${input.value}`)
    .then(response => response.json())
    .then(posts=>{
        let articles = posts.query.search;
        console.log('articles');
       
       
            
            for(let i = 0 ; i<articles.length; i++){
                const titleElement = document.createElement('a');
                articleList.appendChild(titleElement);
                titleElement.innerHTML=`<h3>${articles[i].title}</h3>`;
                titleElement.href=`https://${region}.wikipedia.org/?curid=${articles[i].pageid}`;
                
                const linkElement = document.createElement('a');
                articleList.appendChild(linkElement);
                linkElement.textContent=`https://${region}.wikipedia.org/?curid=${articles[i].pageid}`;
                linkElement.href=`https://${region}.wikipedia.org/?curid=${articles[i].pageid}`;
                
                const paragraphElement = document.createElement('p');
                articleList.appendChild(paragraphElement);
                paragraphElement.innerHTML=articles[i].snippet;
                
            }
            loader.classList.remove('visible');        
        
        })
        .catch(error => console.error(error)); 
         
    })
    

        