const searchButton = document.querySelector('.search-button');
searchButton.addEventListener('click', async function(){
    try {
        const inputKeyword = document.querySelector('.input-keyword');
        const response = await fetch(`https://transfermarket.p.rapidapi.com/search?query=${inputKeyword.value}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "transfermarket.p.rapidapi.com",
                "x-rapidapi-key": "36c438985bmsh2187c80da8aa9a0p1c28c2jsn1723efe9e97c"
            },
        });
        const data = await response.json();
        const players = await data.players;
        for(let i = 0; i < players.length; i++){
            const playerDetails = players[i];
            console.log(playerDetails);
        }
        updateUI(players);
    } catch (error) {
        console.log(error);
        return;
    }
});

document.addEventListener('click', async function(e) {
    if(e.target.classList.contains('player-detail')) {
        const newPlayer = e.target.dataset.player;
        console.log(newPlayer);
        const modalPlayer = await getPlayerModal(newPlayer);
        console.log(updateUIModal(modalPlayer));
    }
});

function updateUIModal(modalPlayer){
    const playerDetail = showModal(modalPlayer);
    const modalBody = document.querySelector('.modal-body');
    return modalBody.innerHTML = playerDetail;
}

function updateUI(players){
    let cards = '';
    players.forEach(player => {
        cards += showCards(player);
    });
    const playerContainer = document.querySelector('.card-container');
    playerContainer.innerHTML = cards;
}

async function getPlayerModal(newPlayer) {
    try {
        const responseModal = await fetch(`https://transfermarket.p.rapidapi.com/search?query=${newPlayer}`, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "transfermarket.p.rapidapi.com",
                "x-rapidapi-key": "36c438985bmsh2187c80da8aa9a0p1c28c2jsn1723efe9e97c"
            },
        });
        const dataModal = await responseModal.json();
        const playersModal = await dataModal.players[0];
        return playersModal;
    } catch (error) {
        console.log(error);
        return;
    }
}

//fungsi untuk menampilkan 'cards'
function showCards(player){
    return `<div class="col-md-3 my-5 player-card">
                <div class="card" style="width: 10rem;">
                    <img src="${player.playerImage}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${player.playerName}</h5>
                        <p class="card-text">${player.club}</p>
                        <a href="#" class="btn btn-primary player-detail data-bs-toggle="modal" data-bs-target="#playerDetailModal"
                        data-player="${player.playerName}" ">Player details</a>
                    </div>
                </div>
            </div>`;
}

function showModal(player){
    return `<div class="container-fluid">  <!-- untuk membuat modal yang dinamis -->
                <div class="row">
                    <div class="col-md-3 my-2">
                        <img src="${player.playerImage}" class="img-fluid">  <!-- agar gambar yang ditampilkan dinamis-->
                    </div>
                    <div class="col-md">
                        <ul class="list-group">
                            <li class="list-group-item">
                                <h5><strong>${player.firstName + " " + player.lastName}</strong></h5>
                            </li>
                            <li class="list-group-item">Club : ${player.club}</li>
                            <li class="list-group-item">Kebangsaan : <img src="${player.nationImage}" class="img-fluid"></li>
                        </ul>
                    </div>
                </div>
            </div>`;
}
