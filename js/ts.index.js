"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search-form > form");
const input = document.querySelector("#input-localizacao");
const sectionTempoInfo = document.querySelector("#tempo-info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("Localização precisa ter, pelo menos, 3 carácteres.");
        return;
    }
    const apiKey = "e7f88cb25343c48a3a7e58cba0d03188";
    const reponse = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=${apiKey}&lan=pt_br&units=metric`);
    const data = yield reponse.json();
    console.log(data);
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
}));
