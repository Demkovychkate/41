const API = 'https://657ae39d394ca9e4af12f773.mockapi.io';

const form = document.querySelector('.heroes_form');
const btn_add = document.querySelector('.btn_add');
const btn_delete = document.querySelector('.btn_delete');
const heroTableBody = document.querySelector('#heroesTable tbody');

const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
};

async function controller(action, method = METHOD.GET, body) {
    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };

    const request = {
        method,
        headers,
    };

    if (body) request.body = JSON.stringify(body);

    const response = await fetch(`${API}/${action}`, request);
    const data = await response.json();

    return data;
}

async function getUniverses() {
    try {
        const universes = await controller('/universes');
        const select = document.querySelector('[data-name="heroComics"]'); 
        const comicsValueInForm = select.value;

        universes.forEach(universe => {
            const option = document.createElement('option');
            option.value = universe.name;

            if (comicsValueInForm === universe.name) {
                option.selected = true;
            }

            select.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}


async function getSearchHeroProfiles() {
    const heroName = document.querySelector('[data-name="heroName"]').value;

    if (!heroName) {
        alert('Please enter a hero name');
        return;
    }

    try {
        let alreadyAddedHeroes = await controller('/heroes', METHOD.GET);     
            alreadyAddedHeroes = [];      

        if (alreadyAddedHeroes.some(hero => hero.name === heroName)) {
            alert('A hero with this name already add');
            return;
        }

        const heroData = {
            name: heroName,
            comics: document.querySelector('[data-name="heroComics"]').value,
            favourite: document.querySelector('[data-name="heroFavourite"]').checked,
        };

        const newHero = await controller('/heroes', METHOD.POST, heroData);
        const heroTableRow = renderTable(newHero);
        heroTableBody.appendChild(heroTableRow);
    } catch (error) {
        console.error(error);
    }
}

btn_add.addEventListener('click', getSearchHeroProfiles);

function renderTable(hero) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${hero.name}</td>
        <td>${hero.comics}</td>
        <td>${hero.favourite ? 'Yes' : 'No'}</td>
        <td><button class="btn_delete" data-id="${hero.id}">Delete</button></td>
    `;

    row.querySelector('.btn_delete').addEventListener('click', () => deleteHero(hero.id));

    return row;
}

async function deleteHero(heroId) {
    try {
        await controller(`/heroes/${heroId}`, METHOD.DELETE);
        const rowToDelete = document.querySelector(`[data-id="${heroId}"]`);
        rowToDelete.remove();
    } catch (error) {
        console.error(error);
    }
}

btn_delete.addEventListener('click', function () {
    const heroId = this.dataset.id;
    if (confirm('Are you sure you want to delete this hero?')) {
        deleteHero(heroId);
    }
});

form.addEventListener('submit', function (event) {
    event.preventDefault();
    getSearchHeroProfiles();
});

getUniverses();
