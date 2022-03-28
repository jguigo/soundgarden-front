const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'

const pathName = window.location.pathname;

const formEventos = document.querySelector('form')
const inputNome = document.querySelector('#nome')
const inputBanner = document.querySelector('#banner')
const inputAtracoes = document.querySelector('#atracoes')
const inputDescricao = document.querySelector('#descricao')
const inputData = document.querySelector('#data')
const inputLotacao = document.querySelector('#lotacao')

if (pathName==='/admin.html'){
    const tabela = document.querySelector('tbody')
    console.log(tabela.innerHTML);
    async function listarEventos() {
        const configuracao = {
            method: 'GET',
            redirect: 'follow'
        }   
        const resposta = await fetch(`${BASE_URL}/events`, configuracao);
        console.log(resposta);
        const conteudoResposta = await resposta.json()
        console.log(conteudoResposta);
        conteudoResposta.forEach(item => {
            tabela.innerHTML += 
            `<tr>
            <th scope="row">${conteudoResposta.indexOf(item)+1}</th>
            <td>${item.scheduled}</td>
            <td>${item.name}</td>
            <td>${item.attractions}</td>
            <td>
                <a href="reservas.html" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html" class="btn btn-danger">excluir</a>
            </td>
        </tr>`


        })
    }

listarEventos()

}

if (pathName==="/cadastro-evento.html") {

    formEventos.onsubmit = async(evento) => {
        evento.preventDefault()
        const novoEvento = {
            name: inputNome.value,
            poster:inputBanner.value,
            attractions:inputAtracoes.value.split(","),
            description:inputDescricao.value,
            scheduled:inputData.value,
            number_tickets:inputLotacao.value
        }
        const configuracao = {
            method: "POST",
         body: JSON.stringify(novoEvento),
         headers: {
            "Content-Type": "application/json",
         },
         redirect: "follow",

            
        } 
        const resposta = await fetch(`${BASE_URL}/events`, configuracao);
        window.location.href= 'admin.html'
        console.log(resposta);
        const conteudoResposta = await resposta.json()
        console.log(conteudoResposta);
    }    


}
