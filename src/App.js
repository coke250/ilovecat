import SearchingSection from "./components/SearchingSection.js";
import ResultsSection from "./components/ResultsSection.js";
import DetailModal from "./components/DetailModal.js";
import Loading from "./components/Loading.js";
import Error from "./components/Error.js";

import { api } from "./api/api.js";
import Darkmode from "./util/Darkmode.js";

export default class App {
    constructor($target) {
        const data = sessionStorage.getItem("data")
            ? JSON.parse(sessionStorage.getItem("data"))
            : null;
        const recents = sessionStorage.getItem("recents")
            ? JSON.parse(sessionStorage.getItem("recents"))
            : null;

        const searchingSection = new SearchingSection({
            $target,
            recents,
            onSearch: async keyword => {
                loading.toggle();

                const response = await api.fetchCats(keyword);
                if(!response.isError){
                    const data = response.data;

                    sessionStorage.setItem('data', JSON.stringify(data));
                    resultsSection.setState(data);
                    loading.toggle();
                } else{
                    error.setState(response.data);
                }
            },
            onRandom: async () => {
                loading.toggle();

                const response = await api.fetchRandomCats();
                if(!response.isError){
                    const data = response.data;

                    sessionStorage.setItem('data', JSON.stringify(data));
                    resultsSection.setState(data);
                    loading.toggle();
                } else{
                    error.setState(response.data);
                }
            },
        });

        const resultsSection = new ResultsSection({
            $target,
            data,
            onClick: data => {
                detailModal.setState(data)
            },
            onScroll: async () => {
                loading.toggle();

                const response = await api.fetchRandomCats();
                if(!response.isError){
                    const beforeData = sessionStorage.getItem("data")
                    ? JSON.parse(sessionStorage.getItem("data"))
                    : null;
                    const data = beforeData.concat(response.data);

                    sessionStorage.setItem('data', JSON.stringify(data));
                    resultsSection.setState(data);
                    loading.toggle();
                } else {
                    error.setState(response.data);
                }
            }
        });

        const loading = new Loading({$target});

        const detailModal = new DetailModal({$target});

        const error = new Error({$target});
        
        const darkmode = new Darkmode({$target});
    }
}
