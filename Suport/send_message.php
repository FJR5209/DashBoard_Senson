<?php
header("Content-Type: application/json");

// Verifica se a requisição é POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["error" => "Método não permitido"]);
    exit;
}

// Verifica se os dados de nome, email e mensagem foram enviados
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$message = isset($_POST['message']) ? $_POST['message'] : '';

// Verifica se todos os campos foram preenchidos
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Todos os campos são obrigatórios."]);
    exit;
}

// Teste para garantir que os dados estão sendo recebidos corretamente
file_put_contents("log.txt", "Name: $name, Email: $email, Message: $message\n", FILE_APPEND);

// Configurações do PHPMailer
require 'vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // Servidor SMTP
    $mail->SMTPAuth = true;
    $mail->Username = 'suportetcc5209@gmail.com'; // Seu e-mail
    $mail->Password = 'qvag sqjg mlll gpua'; // Senha ou App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Configuração do e-mail
    $mail->setFrom('suportetcc5209@gmail.com', 'Suporte');
    $mail->addAddress('suportetcc5209@gmail.com');
    $mail->Subject = "Nova mensagem de suporte";
    $mail->Body = "Nome: $name\nE-mail: $email\nMensagem:\n$message";

    // Envia o e-mail
    $mail->send();

    echo json_encode(["message" => "Mensagem enviada com sucesso!"]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao enviar o e-mail: {$mail->ErrorInfo}"]);
}
?>
