const API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = async url => {
    try{
        const response = await fetch(url);

        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            const errorData = await response.json();
            return errorData;
        }
    }catch(e){
        throw {
            message: e.message,
            status: e.status,
        };
    }
};

const api = {
    // 키워드로 고양이 검색
    fetchCats: async keyword => {
        try{
            const breeds = await request(`${API_ENDPOINT}/breeds/search?q=${keyword}`);
            const images = breeds.map(async breed => {
                return await request(`${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`);
            });

            const responses = await Promise.all(images);
            const result = Array.prototype.concat.apply([], responses);

            return {
                isError: false,
                data: result,
            }
        }catch(e){
            return {
                isError: true,
                data: e
            }
        }
    },
    // 랜덤으로 고양이 검색
    fetchRandomCats: async () => {
        try{
            const result = await request(`${API_ENDPOINT}/images/search?limit=20`);

            return{
                isError: false,
                data: result,
            }
        }
        catch(e){
            return {
                isError: true,
                data: e,
            }
        }
    }
}

export { api };