var db = chrome.storage.sync;
if(db==null) db=chrome.storage.local;

function save_options() {
  var newid = document.getElementById('userid').value;
  db.set({
    userid: newid
  }, function() {});
}

function restore_options() {
  db.get({
    userid: '0'
  }, function(items) {
    document.getElementById('userid').value = items.userid;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);