function generate(jumlah) {
    // param jumlah untuk menentukan total yang digenerate
    var hasil = '';
    var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var serialKeys = [];
    var totalDigit = 16;
    var digitPerBaris = 4;

    for (i = 0; i < jumlah; i++) {
        var totalString = 0;
        for (j = 0; j < totalDigit; j++) {
            totalString++;
            hasil += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            if (totalString === digitPerBaris) {
                if (j !== (totalDigit - 1)) hasil += "-";
                totalString = 0;
            }
        }
        serialKeys.push(hasil);
        hasil = '';
    }

    serialKeys.map((sk, i) => {
        console.log((i + 1) + ". " + sk);
    });
}

generate(3);