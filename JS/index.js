let products = Array.from(document.querySelectorAll(".product"));
let workspace = document.querySelector(".products");
let pages = Array.from(document.querySelectorAll(".page"));
let count = 4;

createProds();
products = Array.from(document.querySelectorAll(".product"));
filt();
pagination(products, count, workspace, pages);

products.forEach(product => {
    product.onclick = () => {
        moveToProd(product);
    }
});

function pagination(products, count, workspace, pages, page = 1) {
    let count_pages = Math.ceil(products.length / count);
    if (count_pages !== 0) {
        pages = build_page(count_pages, pages);
        move_to_page(page, products, count);
        pages.forEach(page_item => {
            page_item.style.cursor = "pointer";
            page_item.onclick = () => {
                page = page_item.innerText;
                move_to_page(page, products, count);
            };
        });
    }
}

function build_page(count_pages, pages) {
    let wrapper = pages[0].parentNode;
    wrapper.innerHTML = "";
    for (let i = 1; i <= count_pages; i++) {
        wrapper.innerHTML += `<span class="page">${i}</span>`;
    }
    pages = Array.from(document.querySelectorAll(".page"));
    return pages;
}

function move_to_page(page, products, cnt) {
    let start = page * cnt - cnt;
    let end = start + cnt;
    let new_prods = products.slice(start, end);
    products.forEach(product => {
        return product.style.display = "none";
    });
    new_prods.forEach(product => {
        return product.style.display = "flex";
    });
}

function createProds() { // Заполняем данными данными из XML документа
    let products = xmlDoc.querySelectorAll("product");
    let wrapper = document.querySelector(".products");
    let name;
    let cost;
    let img;
    wrapper.innerHTML = "";
    products.forEach(product => {
        wrapper.innerHTML += `
            <div class="product">
                    <img src="` + product.querySelector("img").textContent + `" alt="" class="product-img">
                    <div class="about-product">
                        <span class="product-title">` + product.querySelector("name").textContent + `</span>
                        <span class="product-price">Цена: <span class="cost">` + product.querySelector("price").textContent + `</span> р.</span>
                    </div>
            </div>`;
    })
}

document.querySelector(".toBack").onclick = () => {
    if (document.querySelector(".homepage").style.display == "none")
        moveToMain();
    else window.history.back();
}

function moveToProd(prod) {
    let pagehome = document.querySelector(".homepage");
    let productpage = document.querySelector(".productpage");
    pagehome.style.display = "none";
    productpage.style.display = "flex";
    let prodsXML = Array.from(xmlDoc.querySelectorAll("product"));
    let prodXML = prodsXML.find(product => product.querySelector("name").textContent === prod.querySelector(".product-title").textContent);
    let product_wrapper = document.querySelector(".product-wrapper");
    let type = prodXML.querySelector("type").textContent;
    let wrapper_sibl_prods = document.querySelector(".wrapper-sibling-prods");
    wrapper_sibl_prods.innerHTML = "";

    prodsXML.forEach(product => {
        if (product.querySelector("type").textContent === type && product.querySelector("name").textContent !== prod.querySelector(".product-title").textContent) {
            wrapper_sibl_prods.innerHTML += `
            <div class="sibling-prod">
                <img src="` + product.querySelector("img").textContent + `" alt="" class="sibling-img">
                <div class="name-and-cost">
                    <span class="name-sibl">` + product.querySelector("name").textContent + `</span>
                    <span class="content-cost-sibl">Цена: <span class="sibl-cost">` + product.querySelector("price").textContent + `</span> р.</span>
                </div>
            </div>
            `;
        }
    });

    if (wrapper_sibl_prods.innerHTML === "") {
        let i = 0;
        wrapper_sibl_prods.parentNode.querySelector(".sibling-text").innerHTML = "Другие типы товаров";
        prodsXML.forEach(product => {
            if (i++ < 6) {
                wrapper_sibl_prods.innerHTML += `
                <div class="sibling-prod">
                    <img src="` + product.querySelector("img").textContent + `" alt="" class="sibling-img">
                    <div class="name-and-cost">
                        <span class="name-sibl">` + product.querySelector("name").textContent + `</span>
                        <span class="content-cost-sibl">Цена: <span class="sibl-cost">` + product.querySelector("price").textContent + `</span> р.</span>
                    </div>
                </div>
                `;
            }
        });
    }

    product_wrapper.querySelector(".product-img").src = prodXML.querySelector("img").textContent;
    product_wrapper.querySelector(".colors").innerHTML = "";
    let colors = prodXML.querySelectorAll("color");
    colors.forEach(color => {
        product_wrapper.querySelector(".colors").innerHTML += `
            <div class="color" style="background-color: ` + color.textContent + `>
            </div>`;
    });
    product_wrapper.querySelector(".cost").innerHTML = prodXML.querySelector("price").textContent;
    product_wrapper.querySelector(".desc").innerHTML = "";
    prodXML.querySelectorAll("desc").forEach(el => {
        product_wrapper.querySelector(".desc").innerHTML += `
            <span class="plus">` + el.textContent + `</span>`;
    });
}

function moveToMain() {
    let pagehome = document.querySelector(".homepage");
    let productpage = document.querySelector(".productpage");
    pagehome.style.display = "flex";
    productpage.style.display = "none";
}