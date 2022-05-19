let datas = ["IMG/slide1.jpg", "IMG/slide2.jpg", "IMG/slide3.jpg", "IMG/slide4.jpg"];
let workspace = document.querySelector(".slider");
let inputs = Array.from(document.querySelectorAll(".slides input"));
let catalogs = Array.from(document.querySelectorAll(".catalog"));
slider(datas, workspace, inputs);

catalogs.map(catalog => {
    catalog.style.cursor = "pointer";
    return catalog.onclick = () => {
        document.location.href = "index.html";
    }
});