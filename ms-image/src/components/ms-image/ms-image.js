import Happy from './1.jpg';
import './ms-image.scss';

class MsImage{
    render() {
        const img = document.createElement('img');
        img.src = Happy;
        img.alt = 'Happy';
        img.classList.add('ms-image');

        const bodyDomElement = document.querySelector('body');   
        bodyDomElement.appendChild(img)
    }
}

export default MsImage;