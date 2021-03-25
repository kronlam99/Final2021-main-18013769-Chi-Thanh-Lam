let news = document.querySelector(".container > .news");

let params = {
    iD: 0,
    start: 0,
    limit: 12,
};
let numArticles = 0;
// on page load get number of articles for pager
if (numArticles == 0) {
    countNumArticles();
}
// Count Articles XMLHttpRequest
function countNumArticles() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://fakestoreapi.com/products", true);
    xhr.onload = function () {
        if (this.status == 200) {
            numArticles = JSON.parse(this.responseText).length;
            console.log(numArticles);
            getArticles(params);
            outputPager();
        }
    };
    xhr.send();
}

function outputPager() {
    console.log("Pager started");
    console.log(numArticles);
    let numpagerbtns = Math.ceil(numArticles / 12);
    console.log(numpagerbtns);
    let output = "";
    for (var i = 0; i < numpagerbtns; i++) {
        output +=
            '<li class="page-item"><a class="page-link" href="#" data-page="' +
            i +
            '">' +
            (i + 1) +
            "</a></li>";
    }
    let pagerchild = document.querySelector("ul.pagination");
    pagerchild.children[0].insertAdjacentHTML("afterend", output);

    console.log(output);
}

// Get Articles XMLHttpRequest
function getArticles(params) {
    let request = "";
    let count = 0;
    if (params.iD == 0) {
        request = "limit=" + params.limit;
    }
    let xhr = new XMLHttpRequest();
    xhr.open(
        "GET",
        "https://fakestoreapi.com/products?" + request,
        true
    );

    xhr.onreadystatechange = function () {
        console.log(this.readyState);
        console.log(this.status);

        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
            console.log(response);
            let output = "";
            response.forEach(function (item) {
                if (item.id > params.start && count <= 4) {

                    output += "<div class='col-md-3'>";
                    output += "<div class='we_box'>";
                    output += "<div class='card'>";
                    output += "<div class='card'>";
                    output += "  <img class='card-img-top' src='" + item.image + "' alt='Card image' style='width:100%'>";
                    output += "  <div class='card-body text-center'>";
                    output += "    <h5>" + item.title + "</h5>";
                    output += "    <p class='small text-muted text-uppercase mb-2'>" + item.category + "</p>";
                    output += "    <ul class='rating'>";
                    output += "     <li>";
                    output += "       <i class='fas fa-star fa-sm text-primary'></i>";
                    output += "      </li>";
                    output += "     <li>";
                    output += "        <i class='fas fa-star fa-sm text-primary'></i>";
                    output += "      </li>";
                    output += "     <li>";
                    output += "        <i class='fas fa-star fa-sm text-primary'></i>";
                    output += "      </li>";
                    output += "      <li>";
                    output += "        <i class='fas fa-star fa-sm text-primary'></i>";
                    output += "      </li>";
                    output += "      <li>";
                    output += "        <i class='far fa-star fa-sm text-primary'></i>";
                    output += "      </li>";
                    output += "    </ul>";
                    output += "    <hr>";
                    output += "    <h6 class='mb-3'>";
                    output += "      <span class='text-danger mr-1'>" + item.price + "</span>";
                    output += "      <span class='text-grey'><s>$36.99</s></span>";

                    output += "    </h6>";

                    output += "    <button type='button' class='btn btn-primary btn-sm mr-1 mb-2'>";
                    output += "      <i class='fas fa-shopping-cart pr-2'></i>Add to cart";
                    output += "    </button>";
                    output += "    <button type='button' class='btn btn-light btn-sm mr-1 mb-2'>";
                    output += "      <i class='fas fa-info-circle pr-2'></i>Details";
                    output += "    </button>";
                    output += "    <button type='button' class='btn btn-danger btn-sm px-3 mb-2 material-tooltip-main' data-toggle='tooltip' data-placement='top' title='Add to wishlist'>";
                    output += "      <i class='far fa-heart'></i>";
                    output += "    </button>";
                    output += "  </div>";
                    output += "</div>";
                    output += "</div>";
                    output += "</div>";
                    output += "</div>";
                    count++;
                }
                count = 0;
            });
            news.innerHTML = output;
            params.start = params.limit;
        }
    };
    xhr.send();
}

let pager = document.querySelector(".pagination");
pager.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.hasAttribute("data-page") == true) {
        console.log(e.target.dataset.page);
        params.limit = e.target.dataset.page * 12;
        getArticles(params);
    }
});


