const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function getRandomAirQuality() {
  return Math.random() * 1000.0;
}

function generateAirQualityData() {
  const cities = [
    'New York', 'Los Angeles', 'London', 'Tokyo', 'Paris', 'Sydney', 'Beijing', 'Berlin',
    'Seoul', 'Rome', 'Moscow', 'Cairo', 'Delhi', 'Mumbai', 'Toronto', 'Madrid', 'Bangkok',
    'Dubai', 'Stockholm', 'Oslo', 'Amsterdam', 'Singapore', 'Jakarta', 'Helsinki', 'Lisbon',
    'Vienna', 'Athens', 'Prague', 'Brussels', 'Budapest', 'Warsaw', 'Dublin', 'Wellington',
    'Copenhagen', 'Brasilia', 'Lima', 'Hanoi', 'Zurich', 'Nairobi', 'Lisbon', 'Buenos Aires',
    'Mexico City', 'San Francisco', 'Washington D.C.', 'Ottawa', 'Cape Town', 'Helsinki'
  ];

  const airQualityData = cities.map((city) => ({
    city,
    value: getRandomAirQuality(),
  }));

  return JSON.stringify(airQualityData);
}

function sendAirQualityData() {
  const jsonData = generateAirQualityData();

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(jsonData);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('A client connected.');

  ws.on('message', (message) => {
    console.log('Received:', message);
    // You can process the incoming message here and respond accordingly.
    // For example, you can broadcast the message to all connected clients using wss.clients.forEach(client => client.send(message)).
  });

  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

// Send air quality data every 5 seconds (adjust the interval as needed).
setInterval(sendAirQualityData, 5000);