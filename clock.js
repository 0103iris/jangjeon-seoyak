/* 글(article) 페이지 상단의 실시간 KST 시계 — index.html의 시계 로직과 별개로 가볍게 재사용 */
(function () {
  "use strict";

  function getZonedParts(date, timeZone) {
    var dtf = new Intl.DateTimeFormat('en-US', {
      timeZone: timeZone, hour12: false,
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
    var parts = dtf.formatToParts(date).reduce(function (a, p) {
      if (p.type !== 'literal') a[p.type] = p.value;
      return a;
    }, {});
    return { hour: parts.hour === '24' ? '00' : parts.hour, minute: parts.minute, second: parts.second };
  }

  function tickClock() {
    var timeEl = document.getElementById('clockTime');
    var dateEl = document.getElementById('clockDate');
    if (!timeEl) return;
    var now = new Date();
    timeEl.textContent = new Intl.DateTimeFormat('ko-KR', {
      timeZone: 'Asia/Seoul', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(now) + ' KST';
    if (dateEl) {
      dateEl.textContent = new Intl.DateTimeFormat('ko-KR', {
        timeZone: 'Asia/Seoul', month: 'long', day: 'numeric', weekday: 'short'
      }).format(now);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.getElementById('clockTime')) return;
    tickClock();
    setInterval(tickClock, 1000);
  });
})();
