const api_key = `24b6c0e1869f40dd8c8f1111a3e1e256`;

const MainBlogContainer = document.querySelector('.NewsPortal');
const Search_option = document.querySelector(".search-option    input")

const Search_button = document.querySelector(".search-btn")

const fetchData = async () => {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=35&apiKey=${api_key}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error(`Error fetching random news`, error);
        return [];
    }
}

const displayBlogs = (articles) => {
    MainBlogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("one_feed");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'no-photo.jpg';
        img.alt = article.title;

        const title = document.createElement("h2");
        const ModyfiyTitle = article.title.length>30? 
            article.title.slice(0,30) + "...": article.title;
        title.textContent = ModyfiyTitle;

        const description = document.createElement("p");
        
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url, "_blank");
        })
        MainBlogContainer.appendChild(blogCard);
    });
}



Search_button.addEventListener("click",async ()=>{
    const query = Search_option.value.trim()
    if (query!==""){
        try{
            const articles = await fetchNews(query);
            displayBlogs(articles);
        }catch(error){
            console.log("this error from query",error);
        }
    }
})
//now create fetch news function 
const fetchNews= async (query)=>{
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=25&apiKey=${api_key}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error(`Error fetching random news`, error);
        return [];
    }
}

(async () => {
    try {
        const articles = await fetchData();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random data");
    }
})();
