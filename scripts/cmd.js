var userid = cookie.c_userid

var favs = ajax "http://api-manga.crunchyroll.com/favorite?method=get&device_type=com.crunchyroll.manga.android&api_ver=1.0&content_type=jp_manga&user_id="+userid


$("#tabs").after
    insert $("ul.portrait-grid.cf")
    
foreach(fav in favs)
  create a
 <li id="SOME_ID" class="hover-bubble group-item">
    <div class="wrapper hover-toggle-queue container-shadow hover-classes" data-classes="container-shadow-dark">
      <a token="shows-portraits" itemprop="url" href="LINK-GOES-HERE" class="portrait-element block-link titlefix">
        <span class="img-holder">
            <img itemprop="photo" alt="NAMEGOESHERE" src="IMAGEGOESHERE" class="portrait">
        </span>
        <span itemprop="name" class="series-title block ellipsis" dir="auto">NAMEGOESHERE</span>
      </a>
    </div>
</li>

add it to the new list



on a volumes page
request the status of chapters
add a continue link at the top