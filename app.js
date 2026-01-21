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

        let output = "";

        for (let j = 1; j <= qtdJogos; j++) {
            let numeros;
            do {
                numeros = gerarNumeros(qtdNums);
            } while (!passaFiltros(numeros, sumMin, sumMax, pares, tol));

            output += `JOGO ${j}\n`;
            output += numeros.map(n => n.toString().padStart(2, "0")).join(" ") + "\n";

            if (desd && qtdNums > 6) {
                output += "Desdobramento:\n";
                combinacoes(numeros, 6).forEach((c, i) => {
                    output += `  ${i + 1}: ${c.map(n => n.toString().padStart(2, "0")).join(" ")}\n`;
                });
            }

            output += "\n";
        }

        resultado.textContent = output;
    }

    function gerarNumeros(qtd) {
        const nums = new Set();
        while (nums.size < qtd) {
            nums.add(Math.floor(Math.random() * 60) + 1);
        }
        return [...nums].sort((a, b) => a - b);
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

    function combinacoes(arr, k) {
        if (k === 0) return [[]];
        if (arr.length < k) return [];

        const [head, ...tail] = arr;
        return [
            ...combinacoes(tail, k - 1).map(c => [head, ...c]),
            ...combinacoes(tail, k)
        ];
    }

    function copiar() {
        if (!resultado.textContent.trim()) {
            alert("Não há jogos para copiar.");
            return;
        }

        navigator.clipboard.writeText(resultado.textContent)
            .then(() => alert("Jogos copiados!"))
            .catch(() => alert("Falha ao copiar."));
    }
});
