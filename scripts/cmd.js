
/*if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

var userid = null;
chrome.cookies.get(
  {url:'.crunchyroll.com', name:'c_userid'},
  function(c){userid = c.Value;}
);  */
var userid = ; /*DO NOT COMMIT THIS*/

var DEVICE = 'com.crunchyroll.manga.android';
var VER = '1.0';
var CONTENT = 'jp_manga'
var API = 'http://api-manga.crunchyroll.com/';
var GET = '?method=get&device_type='+DEVICE+'&api_ver='+VER+'&content_type='+CONTENT+'&user_id='+userid;
var MANGA_PREFIX = 'http://www.crunchyroll.com/comics/manga';
var MANGA_SUFFIX = '/volumes';

var UL_FAV_ID = 'cmdFavs';
var BOOKS_BOX_ID = 'cmdBooks';

var UL_FAV_JQ = '#'+UL_FAV_ID;
var BOOKS_BOX_JQ = '#'+BOOKS_BOX_ID;
var CR_FAV_CONT_JQ = '#main_content';
var SIDEBAR_JQ = '#sidebar_elements';

var getFavs = API+'favorite'+GET;
var getBooks = API+'bookmark'+GET;

var MANGA_HOME = 'http://www.crunchyroll.com/comics/manga';

function ShowFavs(data){
    var favs = JSON.parse(data);
    $('<p class="medium-margin-bottom"></p>').prependTo(CR_FAV_CONT_JQ);
    $('<hr />').prependTo(CR_FAV_CONT_JQ);
    $('<ul id="'+UL_FAV_ID+'" class="portrait-grid cf"></ul>').prependTo(CR_FAV_CONT_JQ);
    $('<h3>Favourites</h3>').appendTo(UL_FAV_JQ);
    if(favs.error){
        $('<p class="medium-margin-bottom">Looks like you dont have any favourites yet.</p>').appendTo(UL_FAV_JQ);
    } else {
        for(var i = 0; i < favs.length; i++){
            AddFavItem(favs[i]);
        }
    }
}

function AddFavItem(fav){
    var mangaName = fav.locale.enUS.name;
    var mangaImg = fav.locale.enUS.thumb_url;
    var mangaDir = MANGA_PREFIX + fav.url + MANGA_SUFFIX;
    var item = '<li class="hover-bubble group-item">'+
    '<div class="wrapper hover-toggle-queue container-shadow hover-classes" data-classes="container-shadow-dark">'+
    '<a token="shows-portraits" itemprop="url" href="'+mangaDir+'" class="portrait-element block-link titlefix">'+
    '<span class="img-holder"><img itemprop="photo" alt="'+mangaName+'" src="'+mangaImg+'" class="portrait"></span>'+
    '<span itemprop="name" class="series-title block ellipsis" dir="auto">'+mangaName+'</span>'+
    '</a></div></li>';
    $(item).appendTo(UL_FAV_JQ);
}

function ShowBooks(data){
    var books = JSON.parse(data);
    $('<li class="large-margin-bottom" id="'+BOOKS_BOX_ID+'"></li>').prependTo(SIDEBAR_JQ);
    $('<h3>Bookmarks</h3>').appendTo(BOOKS_BOX_JQ);
    if(books.error){
        $('<p class="medium-margin-bottom">Looks like you dont have any bookmarks yet.</p>').appendTo(BOOKS_BOX_JQ);
    } else {
        for(var i = 0; i < books.length; i++){
            AddBookmarkItem(books[i]);
        }
    }
}

function AddBookmarkItem(book){
    var bookName = book.series_data.locale.enUS.name;
    var chapNo = book.chapter_data.number;
    var pageNo = book.page_num;
    var item = '<div class="cmdBookmarkItem wrapper hover-toggle-queue container-shadow hover-classes" data-classes="container-shadow-dark">'+
    '<span class="cmdBookTitle">' + bookName + '</span> - Ch. ' + chapNo + ', P.' + pageNo +
    '</div>';
    $(item).appendTo(BOOKS_BOX_JQ);
}

if(window.location.href==MANGA_HOME){
$.get(getFavs, ShowFavs);
$.get(getBooks, ShowBooks);
}