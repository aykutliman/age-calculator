// getInputValues kullanıcının bilgilerini alır.
function getInputValues() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    return { day, month, year };
}

function calculateAge(day, month, year) {
    const today = new Date();
    const birthDate = new Date(year, month - 1, day); // js de aylar 0 dan başladığı için 1 çıkarıyoruz. 

    let ageYears = today.getFullYear() - birthDate.getFullYear(); // hesaplama yapıyoruz.
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();

    // basamak almalı işlem.

    if (ageDays < 0) {
        ageMonths -= 1;
        ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    // basamak almalı işlem.

    if (ageMonths < 0) {
        ageYears -= 1;
        ageMonths += 12;
    }

    return { ageYears, ageMonths, ageDays }; // hesaplanan yaş, ay ve gün geri döndürülür.
}

// yıl ay gün güncellenir.
function updateDOM(age) {
    document.getElementById('result-years').textContent = `${age.ageYears} years`; 
    document.getElementById('result-months').textContent = `${age.ageMonths} months`;
    document.getElementById('result-days').textContent = `${age.ageDays} days`;
}

// butona tıklandığında çalışacak fonk. ve bu fonkun içine event parametresini veriyoruz sebebi hesaplamanın gözükmesi için
function onCalculateButtonClick(event) {
    event.preventDefault(); // formun submit olmasını engeller.
    const { day, month, year } = getInputValues(); // kullanıcıdan bilgiler alınır.
    if (day && month && year) {
        const age = calculateAge(day, month, year);
        updateDOM(age); // alınan değerler geçerliyse sonuçlar ekrana yazılır.
    } else {
        alert("Please enter a valid date");
    }
}

// hesapla butonuna tıklandığında onCalculateButtonClick fonkunu çalıştırır.
document.getElementById('age-form').addEventListener('submit', onCalculateButtonClick);
