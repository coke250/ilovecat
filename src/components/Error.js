export default class Error{
    constructor({$target}){
        this.$target = $target;
        this.errorData = null;

        this.render();
    }

    setState(errorData){
        this.errorData = errorData;
        this.render();
    }

    render(){
        if(!this.errorData) return;

        this.$target.innerHTML = '';

        // 에러 섹션
        const errorSection = document.createElement('section');
        errorSection.className = 'error-section';

        // 에러 이미지
        const errorImage = document.createElement('img');
        errorImage.className = 'error-image';
        errorImage.src = '/src/img/squarecat.jpg';

        // 상태 코드
        const statusCode = document.createElement('p');
        statusCode.className = 'status-code';
        statusCode.innerText = this.errorData.status;

        // 에러 메시지
        const errorMessage = document.createElement('p');
        errorMessage.className = 'error-message';
        errorMessage.className = this.errorData.message;

        // 돌아가기 버튼
        const returnBtn = document.createElement('p');
        returnBtn.className = 'return-btn';
        returnBtn.innerText = '돌아가기';
        returnBtn.addEventListener('click', () =>{
            location.reload();
        });

        errorSection.appendChild(errorImage);
        errorSection.appendChild(statusCode);
        errorSection.appendChild(errorMessage);
        errorSection.appendChild(returnBtn);

        this.$target.appendChild(errorSection);


    }
}