<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dashboard para visualização de temperatura e umidade com dados ao vivo">
    <meta name="author" content="Seu Nome">
    <title href="index.html">Dashboard</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <a class="navbar-brand" href="#">Dashboard</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="../Suport/public/index.html">Suporte</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#configuracoes">Configurações</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#historico">Histórico</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container d-flex flex-column align-items-center justify-content-center min-vh-100">
        <div id="alert-container"></div>

        <div class="row g-4 w-100 text-center">
            <div class="col-12 col-md-6">
                <div class="tracker-block">
                    <div class="tracker-block__icon">
                        <img src="..//public/assets/temperatura.png" alt="Temperature Icon">
                    </div>
                    <div class="tracker-block__content">
                        <h4>Média da Temperatura</h4>
                        <h2>
                            <span class="cases-no temperature">Carregando...</span>
                            <span class="new-no">(Hoje: <span class="today_temperature">Carregando...</span>)</span>
                        </h2>
                    </div>
                </div>
            </div>

            <div class="col-12 col-md-6">
                <div class="tracker-block">
                    <div class="tracker-block__icon">
                        <img src="../public/assets/umidade.png" alt="Humidity Icon">
                    </div>
                    <div class="tracker-block__content">
                        <h4>Média da Umidade</h4>
                        <h2>
                            <span class="cases-no humidity">Carregando...</span>
                            <span class="new-no">(Hoje: <span class="today_humidity">Carregando...</span>)</span>
                        </h2>
                    </div>

                </div>
            </div>
        </div>
    </div>
    <footer class="text-center py-3 text-muted">
        © 2024 Seu Nome - Todos os Direitos Reservados
    </footer>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Custom JS -->
    <script src="scripts.js"></script>
</body>
</html>