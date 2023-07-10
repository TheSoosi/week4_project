export class App {
    async loadData(show) {
        const response = await fetch("https://api.tvmaze.com/search/shows?q=" + show);
        const showdData = await response.json();
        
        return showdData.map(function(row) {
            return {
                name: row.show.name,
                summary: row.show.summary,
                imageSrc: row.show.image?.medium,
            };
        });
    }

    run() {
        const submitButton = document.getElementById("submit-data");
        const form = document.getElementById("form-shows");

        form.onkeydown = (event) =>  {
            if (event.key == "Enter") {
                submitButton.click();
                event.preventDefault();
            }
        };

        submitButton.onclick = async () => {
            const searchField = document.getElementById("input-show");
            const data = await this.loadData(searchField.value);
            console.log(data);
        
            this.displayData(data);
        };    
    }

    displayData(data) {
        const main = document.getElementById("main");

        main.innerHTML = "";

        data.forEach(element => {
            const divShowData = document.createElement("div");
            divShowData.className = "show-data";
            const image = document.createElement("img");
            image.src = element.imageSrc;
            const divInfo = document.createElement("div");
            divInfo.className = "show-info";

            divInfo.innerHTML = `<h1>${element.name}</h1>${element.summary}`; 

            divShowData.appendChild(image);
            divShowData.appendChild(divInfo);

            main.appendChild(divShowData);
        });

    }


}
