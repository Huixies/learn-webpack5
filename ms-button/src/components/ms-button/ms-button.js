import './ms-button.scss';

class MsButton{
    //自定义 类属性
    buttonCssClass = 'ms-button'

    render() {
        const button = document.createElement('button');
        button.innerHTML = 'MSButton';
        button.classList.add(this.buttonCssClass);
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