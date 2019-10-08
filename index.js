'use strict';

const token = "4cc2a2f73075585839a19911d9075d96f70958b8";
const searchURL = "https://api.github.com/search/repositories?q=user:";


function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#userName').val();
        getUserRepos(searchTerm);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (var i=0; i<responseJson.items.length; i++) {
        $('#results-list').append(`<li class="list-item">${responseJson.items[i].name} <a href="https://github.com/${responseJson.items[i].full_name}">Link to repo</a></li>`);
        $('#results').removeClass('hidden');
    }
}

function getUserRepos(userHandle) {
    $('#js-error-message').empty();
    const options = {
        headers: new Headers({
            "Authorization": "token " + token
        })
    };
    const url = searchURL + userHandle;
    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json();
        } throw new Error (response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
    
    

}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
  });