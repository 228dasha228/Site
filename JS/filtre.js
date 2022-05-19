function filt() {
    let inputs_cost = Array.from(document.querySelectorAll(".filter-cost input"));
    let inputs_brands = Array.from(document.querySelectorAll(".filter-brand input"));
    let filt_products_cost = new Array;
    let filt_products_brand = new Array;
    let isFilter = false;
    let fillCount = new Array;
    inputs_cost.map(input => {
        products = Array.from(document.querySelectorAll(".product"));
        let st = Number(input.parentNode.childNodes[3].childNodes[0].innerText);
        let ends = Number(input.parentNode.childNodes[3].childNodes[2].innerText);
        input.parentNode.parentNode.querySelector(".count-products").innerText = "(" + String(products.filter(product => {
            return product.querySelector(".cost").innerText >= st && product.querySelector(".cost").innerText <= ends;
        }).length) + ")";
        input.onclick = () => {
            let choose = false;
            let start = Number(input.parentNode.childNodes[3].childNodes[0].innerText);
            let end = Number(input.parentNode.childNodes[3].childNodes[2].innerText);
            if (input.checked) {
                choose = true;
                filt_products_cost = filt_products_cost.concat(products.filter(product => {
                    return Number(product.querySelector(".cost").innerText) >= start && Number(product.querySelector(".cost").innerText) <= end;
                }));
            } else {
                filt_products_cost = filt_products_cost.filter(product => {
                    return Number(product.querySelector(".cost").innerText) < start || Number(product.querySelector(".cost").innerText) > end;
                });
            }
            products.map(product => {
                product.style.display = "none";
            });
            filtration();
        };
    });

    inputs_brands.map(input => {
        products = Array.from(document.querySelectorAll(".product"));
        input.parentNode.parentNode.querySelector(".count-products").innerText = "(" + String(products.filter(product => {
            return product.querySelector(".product-title").innerText.includes(input.parentNode.querySelector("span").innerText);
        }).length) + ")";
        input.onclick = () => {
            let choose = false;
            if (input.checked) {
                choose = true;
                filt_products_brand = filt_products_brand.concat(products.filter(product => {
                    return product.querySelector(".product-title").innerText.includes(input.parentNode.querySelector("span").innerText);
                }));
            } else {
                filt_products_brand = filt_products_brand.filter(product => {
                    return !product.querySelector(".product-title").innerText.includes(input.parentNode.querySelector("span").innerText);
                });
            }
            products.map(product => {
                product.style.display = "none";
            });
            filtration();
        };
    });

    function filtration() {
        let filtered_prods = new Array;
        products.map(product => {
            product.style.display = "none";
        });
        pages = Array.from(document.querySelectorAll(".page"));
        if (filt_products_brand.length === 0 && filt_products_cost.length === 0) {
            pagination(products, 4, workspace, pages);
        } else if (filt_products_cost.length === 0) {
            pagination(filt_products_brand, 4, workspace, pages);
        } else if (filt_products_brand.length === 0) {
            pagination(filt_products_cost, 4, workspace, pages);
        } else {
            for (let i = 0; i < filt_products_cost.length; i++) {
                if (filt_products_brand.includes(filt_products_cost[i])) {
                    filtered_prods.push(filt_products_cost[i]);
                }
            }
            pagination(filtered_prods, 4, workspace, pages);
        }
    }
}