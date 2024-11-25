const apiUrl = 'https://api.thingspeak.com/channels/2756218/feeds.json'; // Substitua pelo seu ID
            const apiKey = '640JATNQ9A7K8ZN7'; // Chave de leitura válida
            const results = 10; // Quantidade de registros a serem recuperados
    
            async function fetchData() {
                try {
                    const response = await fetch(`${apiUrl}?api_key=${apiKey}&results=${results}`);
                    if (!response.ok) throw new Error('Erro na API');
                    const data = await response.json();
    
                    if (data && data.feeds) {
                        updateDashboard(data.feeds);
                    } else {
                        console.error('Dados não encontrados!');
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados:', error.message);
                }
            }
    
            function updateDashboard(feeds) {
                const temperatureValues = feeds.map(feed => parseFloat(feed.field1)).filter(value => !isNaN(value));
                const humidityValues = feeds.map(feed => parseFloat(feed.field2)).filter(value => !isNaN(value));
    
                if (temperatureValues.length > 0) {
                    const avgTemperature = (temperatureValues.reduce((a, b) => a + b, 0) / temperatureValues.length).toFixed(1);
                    document.querySelector('.temperature').textContent = `${avgTemperature} °C`;
                }
    
                if (humidityValues.length > 0) {
                    const avgHumidity = (humidityValues.reduce((a, b) => a + b, 0) / humidityValues.length).toFixed(1);
                    document.querySelector('.humidity').textContent = `${avgHumidity} %`;
                }
    
                const lastTemperature = temperatureValues[temperatureValues.length - 1] || 0;
                const lastHumidity = humidityValues[humidityValues.length - 1] || 0;
    
                document.querySelector('.today_temperature').textContent = `${lastTemperature.toFixed(1)} °C`;
                document.querySelector('.today_humidity').textContent = `${lastHumidity.toFixed(1)} %`;
            }
    
            document.addEventListener('DOMContentLoaded', fetchData);