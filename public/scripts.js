const apiUrl = 'https://api.thingspeak.com/channels/2756218/feeds.json';
const apiKey = '640JATNQ9A7K8ZN7'; // Substitua pela sua chave de leitura válida
const results = 10; // Número de registros para recuperar

// Função principal para buscar dados e monitorar temperatura
async function fetchData() {
    try {
        // Requisição para buscar dados na API do Thingspeak
        const response = await fetch(`${apiUrl}?api_key=${apiKey}&results=${results}`);
        if (!response.ok) throw new Error('Erro ao acessar a API Thingspeak');

        const data = await response.json();

        if (!data || !data.feeds) {
            console.error('Nenhum dado retornado da API.');
            return;
        }

        // Processa os feeds retornados pela API
        for (const feed of data.feeds) {
            if (!feed.field1) continue; // Ignora se não houver temperatura registrada

            const temperature = parseFloat(feed.field1.replace(" °C", ""));
            if (isNaN(temperature)) continue; // Ignora valores inválidos

            // Exibe alerta caso a temperatura esteja alta
            if (temperature >= 30.0) {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'warning',
                    title: `Alta Temperatura: ${temperature.toFixed(1)} °C`,
                    showConfirmButton: false,
                    timer: 5000,
                    timerProgressBar: true,
                });

                // Envia alerta por e-mail
                sendEmailAlert(temperature);
            }
        }

        // Atualiza painel com os dados retornados
        updateDashboard(data.feeds);

    } catch (error) {
        console.error('Erro ao buscar dados:', error.message);
    }
}

// Função para enviar alertas por e-mail
async function sendEmailAlert(temperature) {
    const url = `http://localhost:3001/send-email?temperature=${encodeURIComponent(temperature)}`;
    try {
        const response = await fetch(url, { method: 'GET' });
        if (!response.ok) throw new Error(`Erro no envio do alerta. Status: ${response.status}`);
        
        const result = await response.json();
        console.log('Mensagem enviada por e-mail:', result);
    } catch (error) {
        console.error('Erro ao enviar alerta por e-mail:', error.message);
    }
}

// Função para atualizar o painel de temperatura e umidade
function updateDashboard(feeds) {
    const temperatureValues = feeds
        .map(feed => parseFloat(feed.field1))
        .filter(value => !isNaN(value));

    const humidityValues = feeds
        .map(feed => parseFloat(feed.field2))
        .filter(value => !isNaN(value));

    // Calcula a temperatura média
    if (temperatureValues.length > 0) {
        const avgTemperature = (temperatureValues.reduce((a, b) => a + b, 0) / temperatureValues.length).toFixed(1);
        document.querySelector('.temperature').textContent = `${avgTemperature} °C`;
    }

    // Calcula a umidade média
    if (humidityValues.length > 0) {
        const avgHumidity = (humidityValues.reduce((a, b) => a + b, 0) / humidityValues.length).toFixed(1);
        document.querySelector('.humidity').textContent = `${avgHumidity} %`;
    }

    // Atualiza os valores mais recentes
    const lastTemperature = temperatureValues[temperatureValues.length - 1] || 0;
    const lastHumidity = humidityValues[humidityValues.length - 1] || 0;

    document.querySelector('.today_temperature').textContent = `${lastTemperature.toFixed(1)} °C`;
    document.querySelector('.today_humidity').textContent = `${lastHumidity.toFixed(1)} %`;
}

// Executa a função fetchData quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', fetchData);
