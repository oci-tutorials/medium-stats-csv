// Run Inspector Console in chrome and copy and paste the following code in the /stats/stories view

function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}

content = "mediumID|title|link|publication|mins|views|reads|readRatio|fans|pubDate|liveDate\n";
rows = document.querySelectorAll(".sortableTable-row.js-statsTableRow")
rows.forEach(function(row) {
  mediumID = row.getAttribute("data-action-value")
  title = row.querySelectorAll(".sortableTable-title")[0].innerText
  link = row.querySelectorAll(".sortableTable-text a")[0].href
  publication = "Not in publication";
  if(row.querySelectorAll(".sortableTable-text a").length == 3) {
    publication = row.querySelectorAll(".sortableTable-text a")[0].innerText
	link = row.querySelectorAll(".sortableTable-text a")[1].href
  }
  mins = row.querySelectorAll(".sortableTable-text")[0].querySelector(".readingTime").getAttribute("title")
  values = row.querySelectorAll(".sortableTable-value")
  views = values[1].innerText
  reads = values[2].innerText
  readRatio = values[3].innerText
  fans = values[4].innerText
  pubDate = "1970-01-01"
  liveDate = "1970-01-01"
  
  content += mediumID + "|" + title + "|" + link + "|" + publication + "|" + mins + "|" + views + "|" + reads + "|" + readRatio + "|" + fans + "|" + pubDate + "|" + liveDate + "\n"
});

download("medium-metrics-" + new Date().toISOString().slice(0, 10) + ".csv", content)




