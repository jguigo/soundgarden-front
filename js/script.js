const BASE_URL = 'https://xp41-soundgarden-api.herokuapp.com'

const pathName = window.location.pathname;

const formEventos = document.querySelector('form');
const inputNome = document.querySelector('#nome');
const inputBanner = document.querySelector('#banner');
const inputAtracoes = document.querySelector('#atracoes');
const inputDescricao = document.querySelector('#descricao');
const inputData = document.querySelector('#data');
const inputLotacao = document.querySelector('#lotacao');
const feedbackModal = document.querySelector('#modal-feedback');
const feedbackH3 = document.querySelector('#feedback');
const desfoco = document.querySelector('.container-fluid')

const formataData = (data) => {
    let d = data.split('');
    let dd = d.slice(8,10).join('') + '/' + d.slice(5,7).join('') + '/' + d.slice(0,4).join('');
    let dt = d.slice(11,16).join('')
    return `${dd} ${dt}`
};


if (pathName === '/admin.html' || pathName === '/soundgarden-front/admin.html' ){

    const tabela = document.querySelector('tbody')
    console.log(tabela.innerHTML);
    async function listarEventos() {
        try{
        const configuracao = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
             },
            redirect: 'follow'
        }   
        const resposta = await fetch(`${BASE_URL}/events`, configuracao);
        const conteudoResposta = await resposta.json()
        conteudoResposta.forEach(item => {
            tabela.innerHTML += 
            `<tr>
            <th id="posicao" scope="row">${conteudoResposta.indexOf(item)+1}</th>
            <td>${formataData(item.scheduled)}</td>
            <td>${item.name}</td>
            <td id="atracoes">${item.attractions}</td>
            <td>
                <a href="reservas.html?id=${item._id}&eventName=${item.name}" class="btn btn-dark">ver reservas</a>
                <a href="editar-evento.html?id=${item._id}" class="btn btn-secondary">editar</a>
                <a href="excluir-evento.html?id=${item._id}" class="btn btn-danger">excluir</a>

            </td>
            </tr>`


        })
        }catch(error){
            console.log('RequestInfo errada');
        } 
        
    }

listarEventos()

}

if (pathName==="/cadastro-evento.html" || pathName === '/soundgarden-front/cadastro-evento.html') {

    formEventos.onsubmit = async(evento) => {
        evento.preventDefault()
        try{
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
            if(resposta.status == 201){
                feedbackModal.setAttribute('style', 'display:flex');
                feedbackH3.innerHTML = 'Cadastro realizado com sucesso!';
                formEventos.value = '';
                inputNome.value = '';
                inputBanner.value = '';
                inputAtracoes.value = '';
                inputDescricao.value = '';
                inputData.value = '';
                inputLotacao.value = '';
                setTimeout(() => feedbackModal.setAttribute('style', 'display:none'),3000)
            }
            if (resposta.status != 201) {
                feedbackModal.setAttribute('style', 'display:flex');
                feedbackH3.innerHTML = 'Ops... algo deu errado! Favor preencher todos os campos corretamente.'
                setTimeout(() => feedbackModal.setAttribute('style', 'display:none'),3000)
            }
        } catch(err){
            console.log(err)
        }
        
    }    
    

}

if(pathName === "/editar-evento.html" || pathName === '/soundgarden-front/editar-evento.html') {

    const parametros = new URLSearchParams(window.location.search).get("id");
    
    async function editarEventos() {
        const configuracao = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
             },
            redirect: 'follow'
        }   
        const resposta = await fetch(`${BASE_URL}/events/${parametros}`, configuracao);
        const conteudoResposta= await resposta.json();
        inputNome.value = conteudoResposta.name;
        inputBanner.value = conteudoResposta.poster;
        inputAtracoes.value = conteudoResposta.attractions;
        inputDescricao.value = conteudoResposta.description;
        inputData.value = conteudoResposta.scheduled.split("").slice(0, 16).join("");
        inputLotacao.value = conteudoResposta.number_tickets;

    }

    editarEventos()

    formEventos.onsubmit = async (evento) => {
        evento.preventDefault();

        const editarEvento = {
            name: inputNome.value,
            poster:inputBanner.value,
            attractions:inputAtracoes.value.split(","),
            description:inputDescricao.value,
            scheduled:inputData.value,
            number_tickets:inputLotacao.value
        };
        
        const configuracao = {
            method: "PUT",
            body: JSON.stringify(editarEvento),
            headers : {
                "Content-Type" : "application/json"
            },
            redirect: "follow"
        };
        try{
            const resposta = await fetch (`${BASE_URL}/events/${parametros}`, configuracao);
            if(resposta.status == 200){
                feedbackModal.setAttribute('style', 'display:flex');
                feedbackH3.innerHTML = 'Edi????o realizada com sucesso!';
                setTimeout(() => feedbackModal.setAttribute('style', 'display:none'),3000)
            }
            if (resposta.status != 200) {
                feedbackModal.setAttribute('style', 'display:flex');
                feedbackH3.innerHTML = 'Ops... algo deu errado! Favor preencher todos os campos corretamente.'
                setTimeout(() => feedbackModal.setAttribute('style', 'display:none'),3000)
            }
        } catch(erro){
            console.log(erro);
        }
    }


}


if(pathName === "/excluir-evento.html" || pathName === '/soundgarden-front/excluir-evento.html') {

    const parametros = new URLSearchParams(window.location.search).get("id");

    async function excluirEventos() {
        const configuracao = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
             },
            redirect: 'follow'
        }   
        const resposta = await fetch(`${BASE_URL}/events/${parametros}`, configuracao);
        const conteudoResposta= await resposta.json()

        inputNome.value = conteudoResposta.name;
        inputBanner.value = conteudoResposta.poster;
        inputAtracoes.value = conteudoResposta.attractions;
        inputDescricao.value = conteudoResposta.description;
        inputData.value = conteudoResposta.scheduled.split("").slice(0, 16).join("");
        inputLotacao.value = conteudoResposta.number_tickets;

    }

    excluirEventos()

    formEventos.onsubmit = async (evento) => {
        evento.preventDefault();
        
        const configuracao = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            redirect: "follow"
        };
        try{
            const resposta = await fetch (`${BASE_URL}/events/${parametros}`, configuracao);
            if(resposta.status == 204){
                feedbackModal.setAttribute('style', 'display:flex');
                feedbackH3.innerHTML = 'Evento excluido com sucesso!';
                setTimeout(() => {
                    feedbackModal.setAttribute('style', 'display:none')
                    window.location.href = document.referrer
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


}
