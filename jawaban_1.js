function countHandshake(n) {
    var total = 0;
    for (i = 0; i < n; i++) {
        total += n - (i + 1);
    }
    console.log('Total Jabat Tangan: ', total);
}
countHandshake(6);
