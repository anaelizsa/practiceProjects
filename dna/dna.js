

const dnaPieces = ["A", "C", "G", "T"];
let sequence = []

// for (i = 0; i < 24; i++){
//     let dnaIndex1 = Math.floor(Math.random() * 4)
//     let dnaIndex2 = Math.floor(Math.random() * 4)
//     let dnaIndex3 = Math.floor(Math.random() * 4)
//     let dnaCodon = dnaPieces[dnaIndex1] + dnaPieces[dnaIndex2] + dnaPieces[dnaIndex3]
//     sequence.push(dnaCodon)
// }
////////////////////////////////////////////////////////////////////////////

while (sequence.length != 24){
    let dnaIndex1 = Math.floor(Math.random() * 4)
    let dnaIndex2 = Math.floor(Math.random() * 4)
    let dnaIndex3 = Math.floor(Math.random() * 4)
    let dnaCodon = dnaPieces[dnaIndex1] + dnaPieces[dnaIndex2] + dnaPieces[dnaIndex3]
    sequence.push(dnaCodon)
}
console.log(sequence);