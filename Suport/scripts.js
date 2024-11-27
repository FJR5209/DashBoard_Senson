document.getElementById("support-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Impede o envio convencional do formulário

    // Desabilita a validação HTML do formulário (para evitar o comportamento padrão)
    const form = document.getElementById("support-form");
    form.noValidate = true;

    const formData = new FormData(event.target);

    // Log para verificar os dados que estão sendo enviados
    console.log("Form Data: ", formData);

    // Envia via fetch com método POST
    fetch('send_message.php', {  // Ajuste a URL para o caminho correto
        method: 'POST',
        body: formData,
    })
    .then(response => {
        // Verifica se a resposta do servidor é ok
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
        // Caso ocorra um erro com o fetch
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Erro ao enviar a mensagem: ' + error.message,
            confirmButtonText: 'Ok'
        });
    });
});
