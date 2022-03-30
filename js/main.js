const modal = document.querySelector('#modal');
const blur = document.querySelector('.supreme-container');
const outclick = document.querySelector('.outclick');
const btnReservar = document.querySelector('#btn-reserva')

let condition = false
btnReservar.onclick = (e) =>{
        e.preventDefault();
        console.log(e.target);
        modal.setAttribute('style', 'display:block')
        blur.setAttribute('style', 'filter:blur(5px)')
        setTimeout(() =>{
            condition = true
        }, 200)
}

window.onclick = () => {
    if (condition) {
        modal.setAttribute('style', 'display:none')
        blur.setAttribute('style', 'filter:blur(0px)')
        condition = false
    }
}  