export default class Loading{
    constructor({$target}){
        this.loadingWrapper = document.createElement('div');
        this.loadingWrapper.className = 'loading-wrapper';
        this.loadingWrapper.classList.add('hidden');

        $target.appendChild(this.loadingWrapper);

        this.render();
    }

    toggle(){
        this.loadingWrapper.classList.toggle('hidden');
    }

    render(){
        const loadingImage = document.createElement('img');
        loadingImage.className = 'loading-image';
        loadingImage.src = 'src/img/loading.gif';

        this.loadingWrapper.appendChild(loadingImage);
    }
}