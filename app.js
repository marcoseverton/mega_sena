document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const btnTema = document.getElementById("btnTema");
    const resultado = document.getElementById("resultado");

    // ===== TEMA =====
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "dark") {
        body.classList.add("dark");
        btnTema.textContent = "☀️";
    }

    btnTema.addEventListener("click", () => {
        body.classList.toggle("dark");
        const dark = body.classList.contains("dark");
        localStorage.setItem("tema", dark ? "dark" : "light");
        btnTema.textContent = dark ? "☀️" : "🌙";
    });

    // ===== BOTÕES =====
    document.getElementById("btnGerar").addEventListener("click", gerar);
    document.getElementById("btnCopiar").addEventListener("click", copiar);

    function gerar() {
        const qtdJogos = +qtdJogos.value;
        const qtdNums  = +qtdNumeros.value;
        const sumMin   = +sumMin.value;
        const sumMax   = +sumMax.value;
        const pares    = +pares.value;
        const tol      = +tolerancia.value;
        const desd     = desdobramento.checked;

        let texto = "";

        for (let j = 1; j <= qtdJogos; j++) {
            let nums;
            do {
                nums = gerarNumeros(qtdNums);
            } while (!passaFiltros(nums, sumMin, sumMax, pares, tol));

            texto += `JOGO ${j}\n`;
            texto += nums.map(n => n.toString().padStart(2,"0")).join(" ") + "\n";

            if (desd && qtdNums > 6) {
                texto += "Desdobramento:\n";
                gerarCombinacoes(nums, 6).forEach((c, i) => {
                    texto += `  ${i+1}: ${c.map(n => n.toString().padStart(2,"0")).join(" ")}\n`;
                });
            }

            texto += "\n";
        }

        resultado.textContent = texto;
    }

    function gerarNumeros(qtd) {
        const set = new Set();
        while (set.size < qtd) {
            set.add(Math.floor(Math.random() * 60) + 1);
        }
        return [...set].sort((a,b) => a-b);
    }

    function passaFiltros(nums, min, max, pares, tol) {
        const soma = nums.reduce((a,b)=>a+b,0);
        const qtdPares = nums.filter(n => n % 2 === 0).length;

        return soma >= min &&
               soma <= max &&
               qtdPares >= pares - tol &&
               qtdPares <= pares + tol;
    }

    function gerarCombinacoes(arr, k) {
        if (k === 0) return [[]];
        if (arr.length < k) return [];
        const [x, ...xs] = arr;
        return [
            ...gerarCombinacoes(xs, k - 1).map(c => [x, ...c]),
            ...gerarCombinacoes(xs, k)
        ];
    }

    function copiar() {
        if (!resultado.textContent.trim()) {
            alert("Nenhum jogo para copiar.");
            return;
        }
        navigator.clipboard.writeText(resultado.textContent);
        alert("Jogos copiados!");
    }
});
