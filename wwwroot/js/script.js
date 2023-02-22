/* evidence ids:
1 - emf
2 - fingerprints
3 - writing
4 - temperature
5 - dots
6 - orb
7 - spirit
*/
var evidenceFound = []

const ghostTypes = [
    { name: "Spirit", evidence: [2, 3, 7] },
    { name: "Poltergeist", evidence: [2, 6, 7] },
    { name: "Mare", evidence: [3, 6, 7] },
    { name: "Demon", evidence: [3, 4, 7] },
    { name: "Yokai", evidence: [5, 6, 7] },
    { name: "Myling", evidence: [1, 2, 3] },
    { name: "Raiju", evidence: [1, 5, 6] },
    { name: "Moroi", evidence: [] },
    { name: "Wraith", evidence: [2, 4, 7] },
    { name: "Banshee", evidence: [2, 5, 6] },
    { name: "Revenant", evidence: [3, 4, 6] },
    { name: "Yurei", evidence: [4, 5, 6] },
    { name: "Hantu", evidence: [2, 4, 6] },
    { name: "Onryo", evidence: [4, 6, 7] },
    { name: "Obake", evidence: [1, 2, 6] },
    { name: "Deogen", evidence: [] },
    { name: "Phantom", evidence: [2, 5, 7] },
    { name: "Jinn", evidence: [1, 2, 4] },
    { name: "Shade", evidence: [1, 3, 4] },
    { name: "Oni", evidence: [1, 4, 5] },
    { name: "Goryo", evidence: [1, 2, 5] },
    { name: "The Twins", evidence: [1, 4, 7] },
    { name: "The Mimic", evidence: [] },
    { name: "Thaye", evidence: [] }
]

const evidences = ["EMF Level 5", "Fingerprints", "Ghost Writing", "Freezing Temperatures", "D.O.T.S Projector", "Ghost Orb", "Spirit Box"]

window.onload = (
    renderPage()
)

function renderPage() {
    for (let i = 0; i < evidences.length; i++) {
        $('.grid').append(
            `
            <button evId="${i + 1}">${evidences[i]}</button>
            `
        )
    }
    for (let i = 0; i < ghostTypes.length; i++) {
        $('.ghosts ul').append(
            `
            <li id="g${i}" design="0">${ghostTypes[i].name}</li>
            `
        )
        $('#g' + i).addClass('list')
    }
}

$('button').on('click', function () {
    let evidenceId = $(this).attr('evId')
    $(this).toggleClass('checked')
    appendEvidence($(this).hasClass('checked'), evidenceId)
    if (evidenceFound.length > 0) {
        filterGhosts()
    } else {
        for (let j = 0; j < ghostTypes.length; j++) {
            $('#g' + j).addClass('list')
        }
    }
})

$('.ghosts ul li').on('click', function () {
    let clickDesign = parseInt($(this).attr('design'))
    if (clickDesign != 2) {
        clickDesign++
    } else {
        clickDesign = 0
    }
    $(this).attr('design', clickDesign)
})

function appendEvidence(a, b) {
    if (a) {
        evidenceFound.push(parseInt(b))
    } else {
        let index = evidenceFound.indexOf(parseInt(b));
        if (index > -1) {
            evidenceFound.splice(index, 1)
        }
    }
}

function filterGhosts() {
    for (let j = 0; j < ghostTypes.length; j++) {
        $('#g' + j).removeClass('list')
        let count = 0
        for (let i = 0; i < evidenceFound.length; i++) {
            if (ghostTypes[j].evidence.includes(evidenceFound[i])) {
                count++
                if (count == evidenceFound.length) {
                    // console.log(ghostTypes[j].name)
                    $('#g' + j).addClass('list')
                } else {
                    $('#g' + j).removeClass('list')
                }
            }
        }
    }
}