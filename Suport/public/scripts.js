document.getElementById("support-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio convencional do formulário

    // Desabilita a validação HTML do formulário
    const form = document.getElementById("support-form");
    form.noValidate = true;

    const formData = new FormData(event.target);

    // Verifique se os dados do FormData estão corretos
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }

    // Envia via fetch com método POST
    fetch('http://localhost:8000/send_message.php', {  // Ajuste a URL para o caminho correto
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro na resposta da requisição');
        }
        return response.json();
    })
    .then(data => {
        if (data.message) {
            // Exibe o alerta de sucesso usando SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Boa!',
                text: 'Mensagem enviada com sucesso!',
                confirmButtonText: 'Ok'
            }).then(() => {
                // Limpa os campos do formulário
                document.getElementById("support-form").reset();
            });
        } else if (data.error) {
            // Exibe o alerta de erro usando SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Oh no...',
                text: 'Algo deu errado: ' + data.error,
                confirmButtonText: 'Ok'
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao enviar a mensagem: ' + error.message,
            confirmButtonText: 'Ok'
        });
    });
});
