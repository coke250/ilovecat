export default class SearchingSection{
    // 타겟 엘리먼트, 최근 검색어, 검색 이벤트, 랜덤 검색 이벤트
    constructor({$target, recents, onSearch, onRandom}){
        this.recents = recents ? recents : [];
        this.onSearch = onSearch;
        this.onRandom = onRandom;
        this.section = document.createElement('section');
        this.section.className = 'searching-section';

        $target.appendChild(this.section);

        this.render();
    }

    searchByKeywords(keyword){
        if(!keyword) return;

        this.addRecentKeyword(keyword);
        this.onSearch(keyword);
    }

    addRecentKeyword(keyword){
        if(this.recents.includes(keyword)) return;
        if(this.recents.length >= 5) this.recents.shift();

        this.recents.push(keyword);
        sessionStorage.setItem('recents', JSON.stringify(this.recents));

        const recentKeywords = this.section.querySelector('.recent-keywords');
        recentKeywords.innerHTML = '';
        this.recents.forEach(keyword => {
            const link = document.createElement('span');
            link.className = "keyword";
            link.innerText = keyword;
            recentKeywords.appendChild(link);
        });
    }

    render(){
        this.section.innerHTML = '';

        const randomBtn = document.createElement('button');
        randomBtn.className='random-btn';
        randomBtn.innerText = '🐱';
        randomBtn.addEventListener('click', this.onRandom);

        const wrapper = document.createElement('div');
        wrapper.className = 'search-box-wrapper';

        const searchBox = document.createElement('input');
        searchBox.className = 'search-box';
        searchBox.placeholder = '고양이를 검색하세요.';
        searchBox.addEventListener('keyup', e => {
            if(e.key === 'Enter'){
                this.searchByKeywords(searchBox.value);
            }
        });

        const recentKeywords = document.createElement('div');
        recentKeywords.className = 'recent-keywords';
        recentKeywords.addEventListener('click', (e) => {
            const target = e.target;
            const keyword = target.innerText;

            if(target.className == "keyword"){
                searchBox.value = keyword;
                this.onSearch(keyword);
            }
        });

        if(this.recents){
            this.recents.forEach(keyword => {
                const link = document.createElement('span');
                link.className = "keyword";
                link.innerText = keyword;
                recentKeywords.appendChild(link);
            });
        }

        wrapper.appendChild(searchBox);
        wrapper.appendChild(recentKeywords);

        this.section.appendChild(randomBtn);
        this.section.appendChild(wrapper);
    }
}