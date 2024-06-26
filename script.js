const api_key = `24b6c0e1869f40dd8c8f1111a3e1e256`;

const MainBlogContainer = document.querySelector('.NewsPortal');
const Search_option = document.querySelector(".search-option input");
const Search_button = document.querySelector(".search-btn");

const fetchData = async () => {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=35&apiKey=${api_key}`;
        console.log(`Fetching data from: ${apiUrl}`);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data);
        return data.articles;
    } catch (error) {
        console.error(`Error fetching random news`, error);
        return [];
    }
};

const fetchNews = async (query) => {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=25&apiKey=${api_key}`;
        console.log(`Fetching data for query "${query}" from: ${apiUrl}`);
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched data for query:', data);
        return data.articles;
    } catch (error) {
        console.error(`Error fetching news with query "${query}"`, error);
        return [];
    }
};

const displayBlogs = (articles) => {
    MainBlogContainer.innerHTML = "";
    if (articles.length === 0) {
        MainBlogContainer.innerHTML = "<p>No news articles found.</p>";
    } else {
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("one_feed");

            const img = document.createElement("img");
            img.src = article.urlToImage || 'no-photo.jpg';
            img.alt = article.title;

            const title = document.createElement("h2");
            const ModifyTitle = article.title.length > 30 ? 
                article.title.slice(0, 30) + "..." : article.title;
            title.textContent = ModifyTitle;

            const description = document.createElement("p");
            description.textContent = article.description;

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
            MainBlogContainer.appendChild(blogCard);
        });
    }
};

Search_button.addEventListener("click", async () => {
    const query = Search_option.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNews(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news with query:", error);
        }
    }
});

(async () => {
    try {
        const articles = await fetchData();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching initial news data:", error);
    }
})();
