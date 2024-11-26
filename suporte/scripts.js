// scripts.js
document.getElementById("supportForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Impede o envio padrão do formulário

    // Coletar dados do formulário
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Por favor, preencha todos os campos.");
    } else {
        // Enviar os dados para o backend
        this.submit();  // Se tudo estiver correto, envia o formulário
    }
});
