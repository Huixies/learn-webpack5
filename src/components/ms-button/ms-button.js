import './ms-button.scss';

class MsButton{
    render() {
        const button = document.createElement('button');
        button.innerHTML = 'MSButton';
        button.classList.add('ms-button');
        const body = document.querySelector('body');

        body.onclick = function () {
            const p = document.createElement('p');
            p.innerHTML = '写代码';
            p.classList.add('ms-text')
            body.appendChild(p)
        }
        body.appendChild(button)
    }
}

export default MsButton;