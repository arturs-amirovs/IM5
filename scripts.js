var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
        }
    };
    xhr.send();
};

var name, summary, status, premiered, rating, bgimg;
var genres;
document.addEventListener("DOMContentLoaded", function(event) {
    if(window.location.hash.substring(1) !== '') {
        getData(window.location.hash.substring(1));
    }
});

function searchButton(){
    var search = document.getElementById('inputSearch').value;
    if(search === '')
        alert('Please enter shows name');
    else
        window.location = 'result.html' + '#' + search;
}

function getData(search) {
    getJSON('http://api.tvmaze.com/singlesearch/shows?q=' + search,
        function (err, data) {
            if (err != null) {
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
                console.log(data.summary)
                name = data.name;
                summary = data.summary;
                status = data.status;
                image = data.image.medium;
                genres = data.genres;
                premiered = data.premiered;
                rating = data.rating.average;
                bgimg = data.image.original;
                setPage();
            }
        });
}

function setPage() {
    document.getElementById("result-name").innerHTML = name;
    document.getElementById("result-description").innerHTML = summary;
    document.getElementById("result-status").innerHTML = status;
    document.getElementById("result-img").src= image;
    var list = ["genres-1", "genres-2", "genres-3"];''
    for(var i=0; i<3; i++)
        document.getElementById(list[i]).innerHTML = genres[i];
    document.getElementById("result-premiered").innerHTML = premiered;
    document.getElementById("result-rating").innerHTML = rating;
    if(status === 'Running')
        document.getElementById("result-status").style.color = '#00FF00';
    else
        document.getElementById("result-status").style.color = 'rgb(231, 21, 44)';

    switch(true) {
        case (rating > '8'):
            document.getElementById("result-rating").style.color = '#0EFDFD';
            break;
        case (rating > '6' && rating <= '8'):
            document.getElementById("result-rating").style.color = 'green';
            break;
        case (rating > '4' && rating <= '6'):
            document.getElementById("result-rating").style.color = 'yellow';
            break;
        case (rating > '2' && rating <= '4'):
            document.getElementById("result-rating").style.color = 'orange';
            break;
        case (rating <= '2'):
            document.getElementById("result-rating").style.color = 'red';
            break;
        default:
            document.getElementById("result-rating").style.color = 'white';
            break;
    }

}

