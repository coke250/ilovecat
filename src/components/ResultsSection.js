import Card from "./Card.js";

export default class ResultsSection {
    constructor({ $target, data, onClick, onScroll }) {
        this.data = data;
        this.onClick = onClick;
        this.onScroll = onScroll;
        this.section = document.createElement("section");
        this.section.className = "results-section";

        $target.appendChild(this.section);

        this.render();
        this.lazyLoadImage();
        this.lazyLoadScroll(this.onScroll);
    }

    lazyLoadImage() {
        if ("IntersectionObserver" in window) {
            const lazyImages = document.querySelectorAll("img.lazy");

            const lazyImageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            let lazyImage = entry.target;
                            lazyImage.src = lazyImage.dataset.src;
                            lazyImage.classList.remove("lazy");
                            observer.unobserve(lazyImage);
                        }
                    });
                },
                { threshold: 0.1 }
            );

            // 모든 이미지에 대해 관찰 시작
            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });
        }
    }

    lazyLoadScroll(onScroll) {
        if ("IntersectionObserver" in window) {
            const lazyScrollObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            onScroll();
                            observer.unobserve(entry.target);

                            // 정보를 다 출력한 후에 마지막 카드 컨테이너를 관찰하게 변경
                            setTimeout(() => {
                                this.observeLastChild(observer);
                            }, 1000);
                        }
                    });
                },
                { threshold: 1.0 }
            );

            this.observeLastChild(lazyScrollObserver);
        }
    }

    observeLastChild(observer) {
        const cardContainer = document.querySelector(".card-container");

        if (cardContainer) {
            const lastChild = cardContainer.lastChild; // 마지막 카드 컨테이너 가져옴
            
            if (lastChild) {
                observer.observe(lastChild); // 마지막 카드 컨테이너 관찰 시작
            }
        }
    }

    setState(data) {
        this.data = data;
        this.render();
        this.lazyLoadImage();
        this.lazyLoadScroll(this.onScroll);
    }

    render() {
        if (!this.data) return;

        this.section.innerHTML = "";

        if (this.data.length > 0) {
            const cardContainer = document.createElement("div");
            cardContainer.className = "card-container";
            cardContainer.addEventListener("click", (e) => {
                const path = e.path;
                const card = path.find((comp) => comp.className === "card");

                if (card) {
                    const id = card.dataset.id;
                    const catInfo = this.data.find((cat) => cat.id === id);
                    this.onClick(catInfo);
                }
            });
            
            this.data.forEach((cat) => {
                new Card({
                    $target: cardContainer,
                    data: cat,
                });
            });

            this.section.appendChild(cardContainer);
        } else {
            // 검색 결과 없음
            const noticeSection = document.createElement("section");
            noticeSection.className = "notice-section";

            const notice = document.createElement("h2");
            notice.className = "notice";
            notice.innerText = "검색 결과가 없습니다.";

            const noticeImage = document.createElement("img");
            noticeImage.className = "notice-image";
            noticeImage.src = "./src/img/emptybox.png";

            noticeSection.appendChild(notice);
            noticeSection.appendChild(noticeImage);
            this.section.appendChild(noticeSection);
        }
    }
}