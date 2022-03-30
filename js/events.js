const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'


const modal = document.querySelector('#modal');
const desfoque = document.querySelector('.supreme-container');
const outclick = document.querySelector('.outclick');
const btnReservar = document.querySelector('#btn-reserva');
const listaEventos = document.querySelector('#listaEventos');
const tituloModal = document.querySelector('#tituloModal');
const qtdIngressos = document.querySelector('#qtdIngressos');
const formulario = document.querySelector('form');
const nomeCliente = document.querySelector('#nome');
const emailCliente =  document.querySelector('#email');
const ingressosCliente =  document.querySelector('#lotacao');

const formataData = (data) => {
    let d = data.split('');
    
    let dd = d.slice(8,10).join('') + '/' + d.slice(5,7).join('') + '/' + d.slice(0,4).join('');    
    
    return dd;
};

async function listar10() {
    const configuracao = {
        method: 'GET',
        redirect: 'follow'
    }   
    const resposta = await fetch(`${BASE_URL}/events`, configuracao);
   
    const conteudoResposta = await resposta.json();
    
    const eventos3 = conteudoResposta.slice(0, 10);
    eventos3.forEach(item => {
        listaEventos.innerHTML+=
        `<article class="evento card p-5 m-3">
        <h2>${item.name} - ${formataData(item.scheduled)}</h2>
        <h4>${item.attractions}</h4>
        <p>${item.description}</p>
        
        <button id="btn-reserva" class="btn btn-primary" onclick="exibirModal(this)" eventID="${item._id}">reservar ingresso</butt>
</button>

    </article>`        

    })
}
listar10();


let condition = false;
const exibirModal = async (e) =>{
        const id= e.getAttribute('eventID');
        console.log(id);
        modal.setAttribute('style', 'display:block');
        desfoque.setAttribute('style', 'filter:blur(5px)');
        setTimeout(() =>{
            condition = true;
        }, 200)

        const configuracao = {
            method: 'GET',
            redirect: 'follow'
        }   
        const resposta = await fetch(`${BASE_URL}/events/${id}`, configuracao);
        console.log(resposta);

        const conteudoResposta= await resposta.json();
        console.log(conteudoResposta);

        tituloModal.innerHTML = conteudoResposta.name;
        tituloModal.setAttribute('eventID', id );
        qtdIngressos.innerHTML = `Ingressos disponíveis: ${conteudoResposta.number_tickets}`;

}

desfoque.onclick = () => {
    if (condition) {
        modal.setAttribute('style', 'display:none')
        desfoque.setAttribute('style', 'filter:blur(0px)')
        condition = false
    }
    nomeCliente.value='';
    emailCliente.value='';
    ingressosCliente.value='';
    
} 

formulario.onsubmit = async (event) => {
    event.preventDefault();
    const id= tituloModal.getAttribute('eventID');
    const novaReserva = {
        owner_name: nomeCliente.value,
        owner_email: emailCliente.value,
        number_tickets: ingressosCliente.value,
        event_id:id
    }
    const configuracao = {
        method: 'POST',
        body: JSON.stringify(novaReserva),
        headers: {
            "Content-Type": "application/json",
         },
        redirect: 'follow'
        
    }   
    const resposta = await fetch(`${BASE_URL}/bookings`, configuracao);
    console.log(resposta);
}