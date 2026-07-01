function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

function toggleSubMenu(subMenuId) {
    const subMenu = document.getElementById(subMenuId);
    subMenu.style.display = subMenu.style.display === "block" ? "none" : "block";
}

const homeLogoMain = document.getElementById("home-logo");
if (homeLogoMain) {
    homeLogoMain.onclick = function() {
        window.location.href = "index.html";
    };
}

function showPopup(popupId) {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });

    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    } else {
        console.error(`النافذة ذات الـ ID ${popupId} غير موجودة.`);
    }
}

function closePopup() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(popup => {
        popup.style.display = 'none';
    });
    document.getElementById('overlay').style.display = 'none';
}

let tasbihCount = 0;

function increaseTasbih() {
    tasbihCount++;
    document.getElementById('tasbih-counter').textContent = tasbihCount;
    if (tasbihCount === 100) {
        document.getElementById('tasbih-counter').classList.add('blink');
        if (navigator.vibrate) {
            navigator.vibrate(200);
        }
    }
}

function resetTasbih() {
    tasbihCount = 0;
    document.getElementById('tasbih-counter').textContent = tasbihCount;
    document.getElementById('tasbih-counter').classList.remove('blink');
}

function updateFontSize(size) {
    const popups = document.querySelectorAll('.popup p');
    popups.forEach(popup => {
        popup.style.fontSize = `${size}px`;
    });
}

function showDuaContent(type) {
    const duaContent = document.getElementById('dua-content');
    let content = '';

    switch (type) {
        case 'quran':
            content = `<h4>أدعية من القرآن</h4>`;
            break;
        case 'sunnah':
            content = `<h4>أدعية من السنة</h4>`;
            break;
        case 'munajat':
            content = `<h4>أدعية ومناجاة</h4>`;
            break;
        case 'selected':
            content = `<h4>أدعية مختارة</h4>`;
            break;
        case 'benefits':
            content = `<h4>فضل الدعاء ومتى يستجاب</h4>`;
            break;
    }

    duaContent.innerHTML = content;
    duaContent.style.display = 'block';
}

const surahList = [
    "الفاتحة", "البقرة", "آل عمران", "النساء", "المائدة", "الأنعام",
    "الأعراف", "الأنفال", "التوبة", "يونس", "هود", "يوسف",
    "الرعد", "إبراهيم", "الحجر", "النحل", "الإسراء", "الكهف",
    "مريم", "طه", "الأنبياء", "الحج", "المؤمنون", "النور",
    "الفرقان", "الشعراء", "النمل", "القصص", "العنكبوت", "الروم",
    "لقمان", "السجدة", "الأحزاب", "سبأ", "فاطر", "يس",
    "الصافات", "ص", "الزمر", "غافر", "فصلت", "الشورى",
    "الزخرف", "الدخان", "الجاثية", "الأحقاف", "محمد", "الفتح",
    "الحجرات", "ق", "الذاريات", "الطور", "النجم", "القمر",
    "الرحمن", "الواقعة", "الحديد", "المجادلة", "الحشر", "الممتحنة",
    "الصف", "الجمعة", "المنافقون", "التغابن", "الطلاق", "التحريم",
    "الملك", "القلم", "الحاقة", "المعارج", "نوح", "الجن",
    "المزمل", "المدثر", "القيامة", "الإنسان", "المرسلات", "النبأ",
    "النازعات", "عبس", "التكوير", "الانفطار", "المطففين", "الانشقاق",
    "البروج", "الطارق", "الأعلى", "الغاشية", "الفجر", "البلد",
    "الشمس", "الليل", "الضحى", "الشرح", "التين", "العلق",
    "القدر", "البينة", "الزلزلة", "العاديات", "القارعة", "التكاثر",
    "العصر", "الهمزة", "الفيل", "قريش", "الماعون", "الكوثر",
    "الكافرون", "النصر", "المسد", "الإخلاص", "الفلق", "الناس"
];

function showQuranSurahPopup() {
    const surahListContainer = document.querySelector('#quran-surah-popup .surah-list');
    surahListContainer.innerHTML = surahList.map((surah, index) => `
        <a href="javascript:void(0)" onclick="showSurahContentPopup(${index + 1})">${index + 1}. ${surah}</a>
    `).join('');
    showPopup('quran-surah-popup');
}


function showSurahContentPopup(surahNumber) {
    currentSurahIndex = surahNumber - 1; 
    const surahTitle = surahList[surahNumber - 1];
    document.getElementById('surah-title').textContent = `سورة ${surahTitle}`;

    const surahContent = document.getElementById(`surah-${surahNumber}-content`).innerHTML;
    document.getElementById('surah-text').innerHTML = surahContent;

    updateNavigationButtons(surahNumber);
    showPopup('surah-content-popup');
}

function updateNavigationButtons(surahNumber) {
    document.getElementById('previous-button').style.display = surahNumber === 1 ? 'none' : 'inline-block';
    document.getElementById('next-button').style.display = surahNumber === surahList.length ? 'none' : 'inline-block';
}
const partsList = [
    "جزء 1", "جزء 2", "جزء 3", "جزء 4", "جزء 5", "جزء 6",
    "جزء 7", "جزء 8", "جزء 9", "جزء 10", "جزء 11", "جزء 12",
    "جزء 13", "جزء 14", "جزء 15", "جزء 16", "جزء 17", "جزء 18",
    "جزء 19", "جزء 20", "جزء 21", "جزء 22", "جزء 23", "جزء 24",
    "جزء 25", "جزء 26", "جزء 27", "جزء 28", "جزء 29", "جزء 30","دعاء ختم القرآن"
];


function showQuranPartsPopup() {
    const partsListContainer = document.querySelector('#quran-parts-popup .parts-list');
    partsListContainer.innerHTML = partsList.map((part, index) => `
        <a href="javascript:void(0)" onclick="showPartContentPopup(${index + 1})">${part}</a>
    `).join('');
    showPopup('quran-parts-popup');
}

function showPartContentPopup(partNumber) {
    currentPartIndex = partNumber - 1; // تحديث الفهرس الحالي
    const partTitle = partsList[currentPartIndex];
    document.getElementById('part-title').textContent = partTitle;

    const partContent = document.getElementById(`part-${partNumber}-content`).innerHTML;
    document.getElementById('part-text').innerHTML = partContent;

    updateNavigationButtons(partNumber);
    showPopup('part-content-popup');
}

function showPreviousPart() {
    if (currentPartIndex > 0) {
        showPartContentPopup(currentPartIndex); 
    }
}

function showNextPart() {
    if (currentPartIndex < partsList.length - 1) {
        showPartContentPopup(currentPartIndex + 2); 
    }
}

function updateNavigationButtons(partNumber) {
    // إخفاء زر "السابق" عند الجزء الأول
    document.getElementById('previous-part-button').style.display = partNumber === 1 ? 'none' : 'inline-block';
    // إخفاء زر "التالي" عند الجزء الأخير
    document.getElementById('next-part-button').style.display = partNumber === partsList.length ? 'none' : 'inline-block';
}
let currentPartIndex = 0;
let currentSurahIndex = 0;

function showQuranPartsPopup() {
    const partsListContainer = document.querySelector('#quran-parts-popup .parts-list');
    partsListContainer.innerHTML = partsList.map((part, index) => `
        <a href="javascript:void(0)" onclick="showPartContentPopup(${index + 1})">${part}</a>
    `).join('');
    showPopup('quran-parts-popup');
}

function showPartContentPopup(partNumber) {
    currentPartIndex = partNumber - 1; // تحديث الفهرس الحالي
    const partTitle = partsList[currentPartIndex];
    document.getElementById('part-title').textContent = partTitle;

    const partContent = document.getElementById(`part-${partNumber}-content`).innerHTML;
    document.getElementById('part-text').innerHTML = partContent;

    updateNavigationButtons('part', partNumber);
    showPopup('part-content-popup');
}

function showQuranSurahPopup() {
    const surahListContainer = document.querySelector('#quran-surah-popup .surah-list');
    surahListContainer.innerHTML = surahList.map((surah, index) => `
        <a href="javascript:void(0)" onclick="showSurahContentPopup(${index + 1})">${index + 1}. ${surah}</a>
    `).join('');
    showPopup('quran-surah-popup');
}

function showSurahContentPopup(surahNumber) {
    currentSurahIndex = surahNumber - 1; // تحديث الفهرس الحالي
    const surahTitle = surahList[currentSurahIndex];
    document.getElementById('surah-title').textContent = `سورة ${surahTitle}`;

    const surahContent = document.getElementById(`surah-${surahNumber}-content`).innerHTML;
    document.getElementById('surah-text').innerHTML = surahContent;

    updateNavigationButtons('surah', surahNumber);
    showPopup('surah-content-popup');
}

function showPrevious(type) {
    if (type === 'part') {
        if (currentPartIndex > 0) {
            showPartContentPopup(currentPartIndex); 
        }
    } else if (type === 'surah') {
        if (currentSurahIndex > 0) {
            showSurahContentPopup(currentSurahIndex); 
        }
    }
}

function showNext(type) {
    if (type === 'part') {
        if (currentPartIndex < partsList.length - 1) {
            showPartContentPopup(currentPartIndex + 2); 
        }
    } else if (type === 'surah') {
        if (currentSurahIndex < surahList.length - 1) {
            showSurahContentPopup(currentSurahIndex + 2); 
        }
    }
}

function updateNavigationButtons(type, number) {
    if (type === 'part') {
        document.getElementById('previous-part-button').style.display = number === 1 ? 'none' : 'inline-block';
        document.getElementById('next-part-button').style.display = number === partsList.length ? 'none' : 'inline-block';
    } else if (type === 'surah') {
        document.getElementById('previous-button').style.display = number === 1 ? 'none' : 'inline-block';
        document.getElementById('next-button').style.display = number === surahList.length ? 'none' : 'inline-block';
    }
}
function showPreviousSurah() {
    if (currentSurahIndex > 0) {
        showSurahContentPopup(currentSurahIndex); 
    }
}

function showNextSurah() {
    if (currentSurahIndex < surahList.length - 1) {
        showSurahContentPopup(currentSurahIndex + 2); 
    }
}

function isGregLeapYear(year) {
    return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}

function gregToFixed(year, month, day) {
    var a = Math.floor((year - 1) / 4);
    var b = Math.floor((year - 1) / 100);
    var c = Math.floor((year - 1) / 400);
    var d = Math.floor((367 * month - 362) / 12);
    var e = (month <= 2) ? 0 : (month > 2 && isGregLeapYear(year)) ? -1 : -2;
    return 1 - 1 + 365 * (year - 1) + a - b + c + d + e + day;
}

function Hijri(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.toFixed = hijriToFixed;
    this.toString = hijriToString;
}

function hijriToFixed() {
    return this.day + Math.ceil(29.5 * (this.month - 1)) + (this.year - 1) * 354 +
        Math.floor((3 + 11 * this.year) / 30) + 227015 - 1;
}

function hijriToString() {
    var months = ["محرم", "صفر", "ربيع الأول", "ربيع الثانى", "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", "رمضان", "شوال", "ذو القعدة", "ذو الحجة"];
    return this.day + " " + months[this.month - 1] + " " + this.year;
}
const circle = document.querySelector('.zeeblox');

const isMouseDevice = window.matchMedia('(pointer: fine)').matches;

if (isMouseDevice) {
  let shown = false;

  document.addEventListener('mousemove', (e) => {
    if (!shown) {
      circle.style.opacity = '1';
      shown = true;
    }

    const x = e.clientX;
    const y = e.clientY;
    circle.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
  });
}

function fixedToHijri(f) {
    var i = new Hijri(1100, 1, 1);
    i.year = Math.floor((30 * (f - 227015) + 10646) / 10631);
    var i2 = new Hijri(i.year, 1, 1);
    var m = Math.ceil((f - 29 - i2.toFixed()) / 29.5) + 1;
    i.month = Math.min(m, 12);
    i2.year = i.year;
    i2.month = i.month;
    i2.day = 1;
    i.day = f - i2.toFixed() + 1;
    return i;
}

function showHijriDatePopup() {
    const tod = new Date();
    const weekday = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    const monthname = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
    const y = tod.getFullYear();
    const m = tod.getMonth();
    const d = tod.getDate();
    const dow = tod.getDay();

    const gregorianDate = `${weekday[dow]} ${d} ${monthname[m]} ${y}`;
    const fixd = gregToFixed(y, m + 1, d);
    const h = fixedToHijri(fixd);
    const hijriDate = h.toString();

    document.getElementById('hijri-date-content').innerHTML = `
        <div style="text-align: center; font-size: 24px; color: #2E7D32; margin-bottom: 20px;">
            <p style="margin: 10px 0;">التاريخ الميلادي: <strong>${gregorianDate}</strong></p>
            <p style="margin: 10px 0;">التاريخ الهجري: <strong>${hijriDate}</strong></p>
        </div>
    `;

    showPopup('hijri-date-popup');
}

function updateCurrentTime() {
    const currentTimeElement = document.getElementById('current-time');
    if (!currentTimeElement) return;

    const now = new Date();
  const selectedFormat = document.querySelector('input[name="time-format"]:checked');
  const timeFormat = selectedFormat ? selectedFormat.value : "12";
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    let ampm = '';

    if (timeFormat === '12') {
        ampm = hours >= 12 ? 'م' : 'ص';
        hours = hours % 12 || 12; 
    }

    const formattedTime = timeFormat === '12' 
        ? `${hours}:${minutes} ${ampm}` 
        : `${String(hours).padStart(2, '0')}:${minutes}`;

    currentTimeElement.textContent = formattedTime;
}

setInterval(updateCurrentTime, 60000);
updateCurrentTime(); 

document.querySelectorAll('input[name="time-format"]').forEach(input => {
    input.addEventListener('change', updateCurrentTime);
});

function showDuaPopup(type) {
    const popupId = `dua-${type}-popup`;
    const popup = document.getElementById(popupId);

    if (popup) {
        popup.style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    } else {
        console.error(`النافذة ذات الـ ID ${popupId} غير موجودة.`);
    }
}

function searchSurah() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const surahListContainer = document.querySelector('#quran-surah-popup .surah-list');
    const surahLinks = surahListContainer.getElementsByTagName('a');

    for (let i = 0; i < surahLinks.length; i++) {
        const surahText = surahLinks[i].textContent.toLowerCase();
        surahLinks[i].style.display = surahText.includes(input) ? 'block' : 'none';
    }
}
const openQiblaLink = document.getElementById("openQibla");
if (openQiblaLink) {
    openQiblaLink.addEventListener("click", function() {
        showPopup('qibla-alert-popup');
    });
}
let wakeLock = null;

async function keepAwake() {
  try {
    wakeLock = await navigator.wakeLock.request('screen');
    console.log('Screen Wake Lock active');
  } catch (err) {
    console.log(err);
  }
}

keepAwake();



/* تحسينات عامة بدون تقسيم ملف السكربت */
(function () {
  function safe(id) { return document.getElementById(id); }

  function renderPrayerTodayDate() {
    const dateBox = document.getElementById('prayer-today-date');
    if (!dateBox) return;

    const now = new Date();
    let hijriDate = '';

    try {
      hijriDate = new Intl.DateTimeFormat('ar-SA-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(now);
    } catch (error) {
      hijriDate = now.toLocaleDateString('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }

    dateBox.textContent = 'هجري: ' + hijriDate;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const logo = safe('home-logo');
    if (logo && !logo.dataset.boundHome) {
      logo.dataset.boundHome = 'true';
      logo.addEventListener('click', function () { window.location.href = 'index.html'; });
    }

    const qibla = safe('openQibla');
    if (qibla) {
      qibla.addEventListener('click', function () { showPopup('qibla-alert-popup'); });
    }

   

//    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
//      navigator.serviceWorker.register('sw.js').catch(function () {});
 //   }
  });

  const oldOpenSidebar = window.openSidebar;
  window.openSidebar = function () {
    const sidebar = safe('sidebar');
    if (!sidebar) return;
    if (oldOpenSidebar) oldOpenSidebar();
    sidebar.style.width = '250px';
    sidebar.style.display = 'block';
    document.body.classList.add('sidebar-open');
  };

  const oldCloseSidebar = window.closeSidebar;
  window.closeSidebar = function () {
    const sidebar = safe('sidebar');
    if (!sidebar) return;
    if (oldCloseSidebar) oldCloseSidebar();
    sidebar.style.width = '0';
    document.body.classList.remove('sidebar-open');
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (typeof closePopup === 'function') closePopup();
      if (typeof closeSidebar === 'function') closeSidebar();
    }
  });
})();

/* تم حذف قسم AlAdhan والأذان لأن النسخة الحالية تستخدم iframe القديم للمواقيت. */

/* تحسينات تحميل النصوص الطويلة من JSON عند الطلب */
const ahlahJsonCache = {};

async function getAhlahJson(fileName) {
    if (ahlahJsonCache[fileName]) return ahlahJsonCache[fileName];
    const response = await fetch(fileName);
    if (!response.ok) throw new Error('فشل تحميل ' + fileName);
    const data = await response.json();
    ahlahJsonCache[fileName] = data;
    return data;
}

async function loadJsonContent(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const jsonFile = target.dataset.json;
    const jsonKey = target.dataset.key;
    if (!jsonFile || !jsonKey) return;

    if (target.dataset.loaded === 'true') return;
    target.innerHTML = 'جارٍ التحميل...';

    try {
        const data = await getAhlahJson(jsonFile);
        target.innerHTML = data[jsonKey] || 'النص غير موجود.';
        target.dataset.loaded = 'true';
    } catch (error) {
        console.error(error);
        target.innerHTML = 'حدث خطأ أثناء تحميل النص.';
    }
}

/* القرآن الآن يُقرأ من quran.json بدل النصوص المخفية داخل index.html */
async function showSurahContentPopup(surahNumber) {
    currentSurahIndex = surahNumber - 1;
    const surahTitle = surahList[currentSurahIndex];
    const title = document.getElementById('surah-title');
    const text = document.getElementById('surah-text');
    if (title) title.textContent = `سورة ${surahTitle}`;
    if (text) text.innerHTML = 'جارٍ التحميل...';

    try {
        const data = await getAhlahJson('quran.json');
        if (text) text.innerHTML = data.surahs[String(surahNumber)] || 'النص غير موجود.';
    } catch (error) {
        console.error(error);
        if (text) text.innerHTML = 'حدث خطأ أثناء تحميل السورة.';
    }

    if (typeof updateNavigationButtons === 'function') updateNavigationButtons('surah', surahNumber);
    showPopup('surah-content-popup');
}

async function showPartContentPopup(partNumber) {
    currentPartIndex = partNumber - 1;
    const partTitle = partsList[currentPartIndex];
    const title = document.getElementById('part-title');
    const text = document.getElementById('part-text');
    if (title) title.textContent = partTitle;
    if (text) text.innerHTML = 'جارٍ التحميل...';

    try {
        const data = await getAhlahJson('quran.json');
        if (text) text.innerHTML = data.parts[String(partNumber)] || 'النص غير موجود.';
    } catch (error) {
        console.error(error);
        if (text) text.innerHTML = 'حدث خطأ أثناء تحميل الجزء.';
    }

    if (typeof updateNavigationButtons === 'function') updateNavigationButtons('part', partNumber);
    showPopup('part-content-popup');
}

/* تحديث سنة الفوتر تلقائياً */
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('#currentYear').forEach(function (el) {
        el.textContent = new Date().getFullYear();
    });
});
