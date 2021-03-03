export default class DetailModal {
    constructor({ $target }) {
        this.data = null;
        this.modalWrapper = document.createElement('div');
        this.modalWrapper.className = 'modal-wrapper';
        this.modalWrapper.classList.add('hidden');

        $target.appendChild(this.modalWrapper);
    }

    setState(data) {
        this.data = data;
        this.modalWrapper.classList.remove('hidden');
        this.render();
    }

    onClose() {
        this.modalWrapper.classList.add('hidden');
        this.modalWrapper.innerHTML = '';
    }

    render() {

        const { url } = this.data;
        const { name, origin, temperament } = this.data.breeds[0]
            ? this.data.breeds[0]
            : {
                  name: "정보 없음",
                  origin: "정보 없음",
                  temperament: "정보 없음",
              };
        const { imperial, metric } = this.data.breeds[0]
            ? this.data.breeds[0].weight
            : { imperial: "정보없음", metric: "정보없음" };
        
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.addEventListener('click', () => {this.onClose()});

        const modalContents = document.createElement('section');
        modalContents.className='modal-contents';

        const modalHeader = document.createElement('header');
        modalHeader.className = 'modal-header';

        const modalTitle = document.createElement('p');
        modalTitle.className = 'modal-title';
        modalTitle.innerText = name;

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerText = 'X';
        closeBtn.addEventListener('click', () => {this.onClose()});

        const modalImage = document.createElement('img');
        modalImage.className = 'modal-image';
        modalImage.src = url;

        const modalInfo = document.createElement('article');
        modalInfo.className= 'modal-info';

        const catOrigin = document.createElement('p');
        catOrigin.className = 'cat-origin';
        catOrigin.innerText = origin;

        const catTemperament = document.createElement('p');
        catTemperament.classList = 'cat-temperament';
        catTemperament.innerText = temperament;

        const catWeight = document.createElement('p');
        catWeight.className = 'cat-weight';
        catWeight.innerText = `${imperial} (imperial) / ${metric} (metric)`;

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);

        modalInfo.appendChild(catOrigin);
        modalInfo.appendChild(catTemperament);
        modalInfo.appendChild(catWeight);

        modalContents.appendChild(modalHeader);
        modalContents.appendChild(modalImage);
        modalContents.appendChild(modalInfo);

        this.modalWrapper.appendChild(overlay);
        this.modalWrapper.appendChild(modalContents);
    }
}
