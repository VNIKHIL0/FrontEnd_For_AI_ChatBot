const chat = document.getElementById('chat');
const input = document.getElementById('user-input');

function appendMessage(text, className) {
  const message = document.createElement('div');
  message.className = `message ${className}`;
  message.textContent = text;
  chat.appendChild(message);
  chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
  const message = input.value.trim();
  if (!message) return;

  appendMessage(message, 'user-message');
  input.value = '';

  const loader = document.createElement('div');
  loader.className = 'message bot-message loader';
  chat.appendChild(loader);
  chat.scrollTop = chat.scrollHeight;

  try {
    const res = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    loader.remove();
    appendMessage(data.response, 'bot-message');
  } catch (err) {
    loader.remove();
    appendMessage('Error connecting to chatbot.', 'bot-message');
  }
}

input.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') sendMessage();
});
