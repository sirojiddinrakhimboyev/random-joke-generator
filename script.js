const jokeBox = document.getElementById('joke-box');
const generateBtn = document.getElementById('generate-btn');

const API_URL = 'https://v2.jokeapi.dev/joke/Any?type=single';

async function fetchJoke() {
  generateBtn.disabled = true;
  jokeBox.textContent = 'Loading a joke...';

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error('Unable to fetch joke right now.');
    }

    if (data.type === 'single') {
      jokeBox.textContent = data.joke;
    } else if (data.type === 'twopart') {
      jokeBox.textContent = `${data.setup}\n\n${data.delivery}`;
    } else {
      jokeBox.textContent = 'No joke available right now. Try again.';
    }
  } catch (error) {
    jokeBox.textContent = 'Oops! Something went wrong. Please try again.';
    console.error(error);
  } finally {
    generateBtn.disabled = false;
  }
}

generateBtn.addEventListener('click', fetchJoke);

fetchJoke();
