function slider(datas, workspace, inputs) {
    let current = 0;
    inputs[current].checked = true;
    setInterval(() => {
        current++;
        if (current === 4)
            current = 0;
        showCurrent(current, datas, workspace)
        inputs[current].checked = true;
    }, 5000);
    showCurrent(current, datas, workspace);
    return inputs.map(input => {
        input.onclick = () => {
            current = input.value;
            showCurrent(current, datas, workspace);
        };
    });
}

function showCurrent(current, datas, workspace) {
    workspace.style.transition = "all .6s";
    workspace.style.backdropFilter = "blur(50px)";
    workspace.style.backgroundImage = `url(${datas[current]})`;
    workspace.style.backdropFilter = "blur(0px)";
}