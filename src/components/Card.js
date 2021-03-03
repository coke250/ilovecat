export default class Card{
    constructor({$target, data}){
        this.data = data;
        this.card = document.createElement('article');
        this.card.className = 'card';
        this.card.dataset.id = data.id;

        $target.appendChild(this.card);

        this.render();
    }

    render(){
        const {name, origin} = this.data.breeds.length > 0 ? 
            this.data.breeds[0] : {
                name: '정보 없음', 
                origin: '정보 없음'
            }; 

        const cardImage = document.createElement('img');
        cardImage.className = 'card-image';
        cardImage.classList.add('lazy'); // lazyload 클래스
        cardImage.dataset.src = this.data.url;

        const cardInfo =document.createElement('div');
        cardInfo.className = 'card-info';

        const catName = document.createElement('p');
        catName.className = 'cat-name';
        catName.innerText = name;

        const catOrigin = document.createElement('p');
        catOrigin.className = 'cat-origin';
        catOrigin.innerText = origin;

        cardInfo.appendChild(catName);
        cardInfo.appendChild(catOrigin);

        this.card.appendChild(cardImage);
        this.card.appendChild(cardInfo);
    }
}