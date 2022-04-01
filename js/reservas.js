const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'


const tituloEvento=document.querySelector('#titulo');
const dadosTabela =document.querySelector('tbody');
const feedbackModal = document.querySelector('#modal-feedback');
const feedbackH3 = document.querySelector('#feedback');

async function listarEventos() {
    try{
        const parametros = new URLSearchParams(window.location.search).get('id');
        const nomeDoEvento = new URLSearchParams(window.location.search).get('eventName');
        tituloEvento.innerHTML = nomeDoEvento

        const configuracao = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow'
        }   
        const resposta = await fetch(`${BASE_URL}/bookings/event/${parametros}`, configuracao);
        const conteudoResposta = await resposta.json()
        conteudoResposta.forEach(item => {
            dadosTabela.innerHTML += 
            `<tr>
            <th scope="row">${conteudoResposta.indexOf(item)+1}</th>
            <td>${item.owner_name}</td>
            <td>${item.owner_email}</td>
            <td>${item.number_tickets}</td>
            <td>            
                <button reservaID='${item._id}' onclick="deletarReserva(this)" class="btn btn-danger">excluir</button>
            </td>
        </tr>`
        })
    } catch(error){
        console.log(error);
    }
}

listarEventos()

async function deletarReserva(e) {
    try{
        const id = e.getAttribute('reservaID')
        const configuracao = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
            },
            redirect: 'follow',
        }
        const resposta = await fetch(`${BASE_URL}/bookings/${id}`, configuracao);
        if(resposta.status == 204){
            feedbackModal.setAttribute('style', 'display:flex');
            feedbackH3.innerHTML = 'Reserva excluida com sucesso!';
            setTimeout(() => {
                feedbackModal.setAttribute('style', 'display:none')
                location.reload();
            },3000)
        }
        if (resposta.status != 204) {
            feedbackModal.setAttribute('style', 'display:flex');
            feedbackH3.innerHTML = 'Ops... parece que algo deu errado! Tente novamente mais tarde.';
            setTimeout(() => feedbackModal.setAttribute('style', 'display:none'),3000)
        }
    } catch(error){
        console.log(error);
    }
}

