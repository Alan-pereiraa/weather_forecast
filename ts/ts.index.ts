const form = document.querySelector("#search-form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("Localização precisa ter, pelo menos, 3 carácteres.");
    return;
  }

  const apiKey = "e7f88cb25343c48a3a7e58cba0d03188";

  try {
    const reponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=${apiKey}&lan=pt_br&units=metric`
    );

    const data = await reponse.json();

    const infos = {
      temperatura: Math.round(data.main.temp),
      local: data.name,
      icone: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    sectionTempoInfo.innerHTML = `
      <div class="tempo-dados">
          <h2>${infos.local}</h2>
  
          <span>${infos.temperatura}°C</span>
                  
      </div>
  
      <img src= "${infos.icone}"/>
    `;
  } catch (erro) {
    console.log(`Deu um erro, ${erro}.`);
  }
});
