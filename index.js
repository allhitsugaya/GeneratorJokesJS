const btn = document.getElementById('btn');

async function JokeGenerator() {
    try{
        let result;
        const jokeGen = await fetch('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,racist,sexist,explicit');
        const joke = await jokeGen.json();
        if (!joke) return;
        result = joke || [];
        console.log(result);
        const randomJoke = {
            category: joke.category,
            setup: joke.type === 'twopart' ? joke.setup : null,
            delivery: joke.type === 'twopart' ? joke.delivery : joke.joke,
            joke: joke.type === 'single' ? joke.joke : null
        }
        renderJoke(randomJoke.category, randomJoke.setup, randomJoke.delivery, randomJoke.joke);
    }
    catch(error){
        console.log(error);
    }
    function renderJoke(category, setup, delivery, joke) {
        if (joke){
            document.querySelector("#theme").textContent = `Theme: ${category}`;
            document.querySelector("#joke").textContent = `Joke: ${joke}`;
            document.querySelector("#answer").textContent = ``;
        }
        else {
            document.querySelector("#theme").textContent = `Theme: ${category}`;
            document.querySelector("#joke").textContent = `Joke: ${setup}`;
            document.querySelector("#answer").textContent = `Answer: ${delivery}`;
        }
    }
}
JokeGenerator();

btn.addEventListener("click", () => {
    JokeGenerator();
});