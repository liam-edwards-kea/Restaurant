/*MODAL*/
const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});
/* 1.fetch data

2. cloning, set content*/

fetch("http://kea-alt-del.dk/t5/api/categories").then(res => res.json()).then(function (data) {
    data.forEach(buildCategory)
    getProducts();
})

function buildCategory(data) {
    const section = document.createElement("section");
    const header = document.createElement("h1");
    header.textContent = data;
    section.setAttribute("id", data)
    section.appendChild(header);
    document.querySelector("main").appendChild(section);
}

function getProducts() {
    fetch("http://kea-alt-del.dk/t5/api/productlist").then(function (response) {
        return response.json()
    }).then(function (data) {
        data.forEach(showDish)
    })
}

function showDish(dish) {
    console.log(dish)
    const template = document.querySelector("template").content;
    const copy = template.cloneNode(true);
    copy.querySelector(".name").textContent = dish.name;
    copy.querySelector(".price").textContent = dish.price;


    if (dish.discount) {
        copy.querySelector(".price").classList.add("Thediscount");
        copy.querySelector(".Thediscount").textContent = Math.round(dish.price - dish.discount / 100 * dish.price)

    } else {
        copy.querySelector(".discount").remove();
    }

    if (dish.soldout) {} else {
        copy.querySelector(".soldOut").remove()
    }

    if (dish.discount) {} else {
        copy.querySelector(".discountTag").remove()
    }
    copy.querySelector(".shortDescription").textContent = dish.shortdescription;

    copy.querySelector(
        ".shadow").src = `imgs/medium/${dish.image}-md.jpg`;
    /*MODAL*/
    copy.querySelector("button").addEventListener("click", () => {

        fetch(`https://kea-alt-del.dk/t5/api/product?id=${dish.id}`)
            .then(res => res.json())
            .then(showDetails);
    });
    /*MODAL*/

    document.querySelector("#" + dish.category).appendChild(copy);

}
/*MODAL*/
function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.classList.remove("hide");
    if (dish.vegetarian) {} else {
        copy.querySelector(".vegetarian").remove()
    }
    if (dish.alcohol) {} else {
        copy.querySelector(".alcohol").remove()
    }
}
/*MODAL*/
