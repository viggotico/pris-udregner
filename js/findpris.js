const prices = [];
const cards = document.querySelectorAll(".find-pris-kategorier li");
var estPrice = document.querySelector(".find-pris-est-pris p");
var minPrice = 0;

const fravælgButton = document.getElementById("find-pris-est-pris-button-fravælg");
const fortsætButton = document.getElementById("find-pris-est-pris-button-fortsæt");

fravælgButton.addEventListener("click", () => {
    cards.forEach(card => {
        if (card.classList.contains('selected')) {
            card.click();
        }
    });
});

fortsætButton.addEventListener("click", () => {
    alert("lader som om vi fortsætter til næste side...");
});

cards.forEach((card, i) => {
    getCardData(card, i, false);
    card.addEventListener("click", () => {
        getCardData(card, i, true);
    });
});

function getCardData(card, i, toggleCard) {
    if (toggleCard) {
        card.classList.toggle("selected");
    }
    if (card.classList.contains('selected')) {
        var priceRange = card.children[1].innerHTML.split(' - ');
        var realPrice = priceRange.length > 1 ? gennemsnit(priceRange).toString() : parseFloat(priceRange[0].replace(/\D/g,'').toString());
        var currentMinPrice = priceRange[0].replace(/\D/g,'');
        var currentMaxPrice = priceRange.length > 1 ? priceRange[1].replace(/\D/g,'') : 0;
        minPrice += parseFloat(currentMinPrice);
        prices.push({
            id: i,
            value: realPrice,
            minValue: currentMinPrice,
            maxValue: currentMaxPrice
        });
    }
    else {
        prices.forEach((item, index) => {
            if (item.id === i) {
                prices.splice(index, 1);
                minPrice = Math.abs(minPrice - parseFloat(item.minValue));
                console.log(item.minValue);
                return;
            }
        });
    }

    var estimatedPrice = 0;
    prices.forEach(price => {
        estimatedPrice += parseFloat(price.value);
    });
    if (prices.length > 0) {
        estPrice.innerHTML = "DKK " + minPrice.toString() + " - " + numberWithCommas(estimatedPrice).toString() + ",-";
    }
    else {
        estPrice.innerHTML = "DKK " + numberWithCommas(estimatedPrice).toString() + ",-";
    }
}

function gennemsnit(arr) {
    var number = 0;
    arr.forEach(n => {
        number += parseFloat(n.replace(/\D/g,''));
    });
    return (number / 2);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}