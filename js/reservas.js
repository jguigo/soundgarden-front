const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'


const tituloEvento=document.querySelector('#titulo');
const dadosTabela =document.querySelector('tbody');


async function listarEventos() {
    const parametros = new URLSearchParams(window.location.search).get("id");

    const configuracao = {
        method: 'GET',
  
        redirect: 'follow'
    }   
    const resposta = await fetch(`${BASE_URL}/bookings/event/${parametros}`, configuracao);
    console.log(resposta);
    const conteudoResposta = await resposta.json()
    console.log(conteudoResposta);
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
}

listarEventos()

async function deletarReserva(e) {
    const id = e.getAttribute('reservaID')
    const configuracao = {
        method: 'DELETE',
        redirect: 'follow',
    }
    const resposta = await fetch(`${BASE_URL}/bookings/${id}`, configuracao);
    console.log(resposta);

    location.reload();
}

// async function excluirEventos() {
//     
//     }   
//     

//     const conteudoResposta= await resposta.json()
//     console.log(conteudoResposta)

//     inputNome.value = conteudoResposta.name;
//     inputBanner.value = conteudoResposta.poster;
//     inputAtracoes.value = conteudoResposta.attractions;
//     inputDescricao.value = conteudoResposta.description;
//     inputData.value = conteudoResposta.scheduled.split("").slice(0, 16).join("");
//     inputLotacao.value = conteudoResposta.number_tickets;

// }

// excluirEventos()