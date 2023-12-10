var brojevi = "";
var djeljiv = 0;
var nedjeljiv = 0;
var neponavljaju = false;
var znamenke = 0;
var prost = 0;
var ntikorijen = 0;
var z1 = 0;
var z2 = 0;
var skupZnamenki = [];

function izracun() {
    document.getElementById("racuna").style.backgroundColor = "Red";
    setTimeout(racunaj, 0);
}

function racunaj() {
    znamenke = 0;
    if (document.getElementById("4").checked)
        znamenke = 4;
    if (document.getElementById("5").checked)
        znamenke = 5;
    if (document.getElementById("6").checked)
        znamenke = 6;
    if (znamenke == 0) {
        window.alert("Korisnik je majmun i nije postavio uvjete!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }

    djeljiv = 1;
    if (document.getElementById("djeljiv").value != "")
        djeljiv = document.getElementById("djeljiv").value;
    if (djeljiv == 0) {
        window.alert("Korisnik je majmun i pokusava dijeliti s nulom!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }
    if (Math.floor(djeljiv) != djeljiv) {
        window.alert("Korisnik je majmun i pokusava djeliti s decimalnim brojem!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }
    ntikorijen = 1;
    if (document.getElementById("korijen").value != "")
        ntikorijen = document.getElementById("korijen").value;
    if (ntikorijen == 0) {
        window.alert("Korisnik je majmun i pokusava izracunati nulti korijen!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }
    if (Math.floor(ntikorijen) != ntikorijen) {
        window.alert("Korisnik je majmun i pokusava izracunati decimalni korijen!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }
    if (ntikorijen < 0) {
        window.alert("Korisnik je majmun i pokusava izracunati negativni korijen!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }
    nedjeljiv = 0;
    if (document.getElementById("nedjeljiv").value != "")
        nedjeljiv = document.getElementById("nedjeljiv").value;
    if (Math.floor(nedjeljiv) != nedjeljiv) {
        window.alert("Korisnik je majmun i pokusava djeliti s decimalnim brojem!");
        document.getElementById("racuna").style.backgroundColor = "";
        return;
    }

    z1 = -1;
    if (document.getElementById("z1").value != "")
        z1 = document.getElementById("z1").value;

    z2 = -1;
    if (document.getElementById("z2").value != "")
        z2 = document.getElementById("z2").value;

    var zn = document.getElementById("skup").value;
    skupZnamenki = [];
    var offset = 0;
    for (var i = 0; i < zn.length; i++) {
        if (zn[i].charCodeAt(0) >= "0".charCodeAt(0) && zn.charCodeAt(0) <= "9".charCodeAt(0)) {
            skupZnamenki[offset] = zn[i];
            offset++;
        }
    }


    neponavljaju = document.getElementById("zsnp").checked;
    prost = document.getElementById("prost").checked;
    var prebroji = 0;
    brojevi = "";

    for (var i = Math.pow(10, znamenke - 1); i < Math.pow(10, znamenke); i++) {
        if (i % djeljiv == 0 && (nedjeljiv == 0 || nedjeljiv != 0 && i % nedjeljiv != 0)) {
            var prostiBroj = true;
            var istaZnamenka = false;
            var korijenizacija = true;
            var znamenkaJednaDoDruge = true;
            var znamenkeIzSkupa = true;
            if (ntikorijen > 1) {
                var num = Math.round(Math.pow(i, 1 / ntikorijen) * 100000) / 100000;
                if (num != Math.floor(num))
                    korijenizacija = false;
            }
            if (prost) {
                for (var j = 2; j < i - 1; j++) {
                    if (Math.floor(i / j) == i / j) {
                        prostiBroj = false;
                        break;
                    }
                }
            }
            if (neponavljaju) {
                var str = i.toString(10);
                for (var j = 0; j < str.length; j++) {
                    for (var k = 0; k < j; k++) {
                        if (str[j] == str[k]) {
                            istaZnamenka = true;
                            break;
                        }
                    }
                }
            }
            if (z1 != -1 && z2 != -1) {
                znamenkaJednaDoDruge = false;
                var str = i.toString(10);
                for (var j = 0; j < str.length - 1; j++) {
                    if (str[j] == z1 && str[j + 1] == z2 || str[j] == z2 && str[j + 1] == z1) {
                        znamenkaJednaDoDruge = true;
                        break;
                    }
                }
            }
            if (skupZnamenki.length != 0) {
                var str = i.toString(10);
                for (var j = 0; j < str.length; j++) {
                    var pronaden = false;
                    for (var k = 0; k < skupZnamenki.length; k++) {
                        if (skupZnamenki[k] == str[j]) {
                            pronaden = true;
                            break;
                        }
                    }
                    if (pronaden == false) {
                        znamenkeIzSkupa = false;
                        break;
                    }
                }
            }

            if (!istaZnamenka && prostiBroj && korijenizacija && znamenkaJednaDoDruge && znamenkeIzSkupa) {
                brojevi += i.toString(10) + "<br>";
                prebroji++;
            }
        }
    }
    if (prost && djeljiv == 69 && nedjeljiv == 420) {
        brojevi += "Korisnik pokušava biti prost! No korisnik zna da bi ga Josip izbacio kroz prozor zbog toga.<br>";
        prebroji++;
    }
    document.getElementById("broj").innerHTML =
        prebroji + " brojeva zadovoljava uvjete";
    document.getElementById("racuna").style.backgroundColor = "";
}
function ispis() {
    document.getElementById("ispisuje").style.backgroundColor = "Red";
    setTimeout(ispisi, 0);
}
function ispisi() {
    document.getElementById("ispisuje").style.backgroundColor = "Red";
    if (znamenke == 0) {
        window.alert("Korisnik je majmun i nije izracunao!");
        document.getElementById("ispisuje").style.backgroundColor = "";
        return;
    }
    document.getElementById("ispis").innerHTML =
        "Brojevi koji popunjavaju ove uvjete: <br>" +
        "Broj znamenaka: " + znamenke + "<br>" +
        "Broj je prost: " + (prost ? "da" : "ne") + "<br>" +
        (djeljiv == 1 ? "" : "Broj je djeljiv sa: " + djeljiv + "<br>") +
        (nedjeljiv == 0 ? "" : "Broj nije djeljiv sa: " + nedjeljiv + "<br>") +
        "Znamenke se ponavljaju: " + (neponavljaju ? "ne" : "da") + "<br>" +
        (ntikorijen == 1 ? "" : (ntikorijen + ". korijen iz broja je cijeli broj") + "<br>") +
        (z1 != -1 && z2 != -1 ? ("Znamenke " + z1 + " i " + z2 + " su jedna do druge" + "<br>") : "") +
        brojevi;
    document.getElementById("ispis2").innerHTML = "80085";

    document.getElementById("ispisuje").style.backgroundColor = "";
}