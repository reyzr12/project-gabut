// Ganti dengan API Key Anda dari OpenWeatherMap
const apiKey = "MASUKKAN_API_KEY_ANDA_DI_SINI";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Memilih elemen-elemen HTML yang akan kita manipulasi
const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDisplay = document.querySelector(".weather");
const errorDisplay = document.querySelector(".error");

// Fungsi utama untuk mengambil data cuaca
async function checkWeather(city) {
    // Mengambil data dari API
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    // Cek jika kota tidak ditemukan (error 404)
    if (response.status == 404) {
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
        return; // Hentikan fungsi jika kota tidak ditemukan
    }

    // Ubah response menjadi format JSON
    var data = await response.json();

    console.log(data); // Untuk debugging, bisa dilihat di console browser

    // Update tampilan di halaman web dengan data yang didapat
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Mengganti ikon cuaca sesuai dengan kondisi
    if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "https://i.ibb.co/b3sSg1c/clouds.png";
    } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "https://i.ibb.co/M20X5d3/clear.png";
    } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "https://i.ibb.co/3r0B5s0/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "https://i.ibb.co/RpDDBxJ/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "https://i.ibb.co/VMyPz5w/mist.png";
    }

    // Tampilkan blok cuaca dan sembunyikan blok error
    weatherDisplay.style.display = "block";
    errorDisplay.style.display = "none";
}

// Menambahkan event listener untuk tombol cari
searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Menambahkan event listener untuk tombol "Enter"
searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});