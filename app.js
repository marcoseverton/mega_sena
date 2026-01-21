document.addEventListener("DOMContentLoaded", () => {

    const btnGerar = document.getElementById("btnGerar");
    const btnCopiar = document.getElementById("btnCopiar");
    const resultado = document.getElementById("resultado");
    const btnTema = document.getElementById("btnTema");

    btnTema.onclick = () => {
        document.body.classList.toggle("dark");
    };

    function gerarJogo(qtd) {
        const nums = new Set();
        while (nums.size < qtd) {
            nums.add(Math.floor(Math.random() * 60) + 1);
        }
        return Array.from(nums).sort((a, b) => a - b);
    }

    btnGerar.onclick = () => {
        const qtdJogos = Number(document.getElementById("qtdJogos").value);
        const qtdNums  = Number(document.getElementById("qtdNumeros").value);

        let texto = "";

        for (let i = 1; i <= qtdJogos; i++) {
            const jogo = gerarJogo(qtdNums)
                .map(n => n.toString().padStart(2, "0"))
                .join(" ");

            texto += `Jogo ${i.toString().padStart(2, "0")}: ${jogo}\n`;
        }

        resultado.textContent = texto.trim();
        resultado.style.display = "block";
    };

    btnCopiar.onclick = () => {
        if (!resultado.textContent) return;
        navigator.clipboard.writeText(resultado.textContent);
        alert("Jogos copiados!");
    };

});
