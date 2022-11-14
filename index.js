 //POKèSEARCH
 
 //cerca un Pokemon inserendo nella barra di ricerca il suo nome o il suo numero per visualizzarne il risultato
   
    const pokeSearch = document.querySelector('.poke-search')

        // creo la callback x l'event listener

            function cercaPokemon(event){
                event.preventDefault(); // non fa refreshare la pagina 
                const baseEndpoint = "https://pokeapi.co/api/v2"; // endpoint fornito dal sito
                const data = pulisciDati(event.target);// l'event target è il form xke è la callback del form
                                                       //restituisce cio che scrivo nell'input search
                console.log(data)
                fetch(`${baseEndpoint}/pokemon/${data[0]}`)//${data[0]} è cio che scrivo nell'input
                //finito lo stato di pending della richiesta fetch, si usa then() se avviene correttamente.
                //.then(response=>console.log(response)) // visualizzo la risposta 
                .then(response=>response.json()) // con il metodo json di response elabora e ritorna la risposta in json
                //.then(pokeDati => console.log(pokeDati)) // mostra risposta elaborata
                .then(pokeDati => renderPokemon(pokeDati)) // mostra risposta elaborata 
            }
            
            function renderPokemon(dati){
                const card = document.createElement('div');
                card.classList.add('card', dati.types[0].type.name);
                card.insertAdjacentHTML('afterbegin', 
                               
                `
                <div class= "media">
                    <img src="${dati.sprites.front_default}" alt= "${dati.name}"/> 
                </div>

                <div class="stats" >
                    <h2>${dati.name}</h2>
                        <ul>
                            <li><span> Punti Vita: ${dati.stats[0].base_stat}</li>
                            <li><span> Attacco: ${dati.stats[1].base_stat}</li>
                            <li><span> Difesa: ${dati.stats[2].base_stat}</li>                             
                        </ul>
                </div>

                `             
                )
                console.log(card)
                pokeSearch.insertAdjacentHTML('afterend', card); // mi mostra l'objecthtml ma nn mi fa vedere il div.
            };

            
         //funzione pulisciDati sempre come argomento il form
         
            function pulisciDati(form){
            // formData è un oggetto del dom che ci fa fare reucperare tutti gli input del form
                const datiInviati = new FormData(form) //lo inizializzo a una variabile
                const datiPuliti = []; // creo array vuoto x avere i dati puliti
            //entries è un metodo di FormData che restituisce un array. 
                for (let input of datiInviati.entries()){ 
                    //[0] è il nome del pokemon
                    //[1] è il valore            
                    datiPuliti.push(sanifica(input[1])) //aggiunge all'array dati puliti il 
                                                        //valore di quello che ho inserito nel form
                }

                return datiPuliti; // restituisce l'array dopo aver aggiunto quello che scrivo nell'input
                // il risultato, sarà nell'array data della callback, che useremo x la fetch()
            }

        //funzione di sanificazione
            function sanifica(input){
                    return input.trim().toLowerCase(); //ritorna ciò che scriviamo nell'input del form
                    //senza spazi e in minuscolo
             }

        pokeSearch.addEventListener('submit',cercaPokemon)