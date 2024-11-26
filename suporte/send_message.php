<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Coletar dados do formulário
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Definir o e-mail de destino (o e-mail usado para alertas)
    $to = "suportetcc5209@gmail.com"; // Substitua pelo seu e-mail de alerta
    $subject = "Nova Mensagem de Suporte";
    
    // Corpo do e-mail
    $body = "
    Nome: $name\n
    E-mail: $email\n
    Mensagem: \n
    $message
    ";

    // Cabeçalhos do e-mail
    $headers = "From: $email" . "\r\n" .
               "Reply-To: $email" . "\r\n" .
               "Content-Type: text/plain; charset=UTF-8";

    // Enviar o e-mail
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso! Agradecemos pelo seu contato.";
    } else {
        echo "Ocorreu um erro ao enviar sua mensagem. Tente novamente.";
    }
}
?>
