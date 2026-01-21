document.addEventListener("DOMContentLoaded", () => {

    const btnGerar = document.getElementById("btnGerar");
    const btnCopiar = document.getElementById("btnCopiar");
    const resultado = document.getElementById("resultado");

    btnGerar.addEventListener("click", gerar);
    btnCopiar.addEventListener("click", copiar);

    function gerar() {
        const qtdJogos = Number(document.getElementById("qtdJogos").value);
        const qtdNums  = Number(document.getElementById("qtdNumeros").value);
        const sumMin   = Number(document.getElementById("sumMin").value);
        const sumMax   = Number(document.getElementById("sumMax").value);
        const pares    = Number(document.getElementById("pares").value);
        const tol      = Number(document.getElementById("tolerancia").value);
        const desd     = document.getElementById("desdobramento").checked;

        let texto = "";

        for (let j = 1; j <= qtdJogos; j++) {
            let nums;
            do {
                nums = gerarNumeros(qtdNums);
            } while (!passaFiltros(nums, sumMin, sumMax, pares, tol));

            texto += `JOGO ${j}\n`;
            texto += nums.map(n => n.toString().padStart(2, "0")).join(" ") + "\n";

            if (desd && qtdNums > 6) {
                texto += "Desdobramento:\n";
                gerarCombinacoes(nums, 6).forEach((c, i) => {
                    texto += `  ${i + 1}: ${c.map(n => n.toString().padStart(2,"0")).join(" ")}\n`;
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
        return Array.from(set).sort((a, b) => a - b);
    }

    function passaFiltros(nums, min, max, pares, tol) {
        const soma = nums.reduce((a, b) => a + b, 0);
        const qtdPares = nums.filter(n => n % 2 === 0).length;

        return (
            soma >= min &&
            soma <= max &&
            qtdPares >= pares - tol &&
            qtdPares <= pares + tol
        );
    }

    function gerarCombinacoes(arr, k) {
        if (k === 0) return [[]];
        if (arr.length < k) return [];

        const [primeiro, ...resto] = arr;

        return [
            ...gerarCombinacoes(resto, k - 1).map(c => [primeiro, ...c]),
            ...gerarCombinacoes(resto, k)
        ];
    }

    function copiar() {
        if (!resultado.textContent.trim()) {
            alert("Nenhum jogo para copiar.");
            return;
        }

        navigator.clipboard.writeText(resultado.textContent)
            .then(() => alert("Jogos copiados!"))
            .catch(() => alert("Erro ao copiar."));
    }
});
