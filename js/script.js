
// --- ۱. منوی همبرگری موبایل (Mobile Menu Toggle) ---
function setupMobileMenu() {
    const menuIcon = document.querySelector('img[alt="menu"]');
    const header = document.querySelector('header');

    if (!menuIcon || !header) return;

    menuIcon.addEventListener('click', () => {
        header.classList.toggle('menu-open');
        console.log("Menu Toggled"); 
    });
}


// --- ۲. اسلایدر لوگوها (Portfolio Slider) ---
function setupPortfolioSlider() {
    const previewImg = document.querySelector('.large-preview-img');
    const thumbCards = document.querySelectorAll('.thumb-card');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const currentSlideNum = document.getElementById('currentSlideNum');
    const totalSlideNum = document.getElementById('totalSlideNum');
    const progressFill = document.getElementById('progressFill');

    if (!previewImg || thumbCards.length === 0 || !nextBtn || !prevBtn || !currentSlideNum || !totalSlideNum || !progressFill) return;

    let currentIndex = 0;
    const totalSlides = thumbCards.length;

    // Set total slides number
    totalSlideNum.textContent = String(totalSlides).padStart(2, '0');

    function updateSlider(newIndex) {
        // Update index
        currentIndex = newIndex;

        // Loop around if necessary
        if (currentIndex < 0) {
            currentIndex = totalSlides - 1;
        } else if (currentIndex >= totalSlides) {
            currentIndex = 0;
        }

        // Update large image
        const newSrc = thumbCards[currentIndex].querySelector('img').getAttribute('src');
        previewImg.setAttribute('src', newSrc);

        // Update active thumbnail
        thumbCards.forEach((card, index) => {
            if (index === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        // Update numbers
        currentSlideNum.textContent = String(currentIndex + 1).padStart(2, '0');

        // Update progress bar
        const progressPercentage = ((currentIndex + 1) / totalSlides) * 100;
        progressFill.style.width = `${progressPercentage}%`;
    }

    nextBtn.addEventListener('click', () => {
        updateSlider(currentIndex + 1);
    });

    prevBtn.addEventListener('click', () => {
        updateSlider(currentIndex - 1);
    });

    thumbCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            updateSlider(index);
        });
    });

    // Initial update
    updateSlider(0);
}


// --- ۳. پخش کننده ویدیو (Video Player Toggle) ---
function setupVideoPlayer() {
    const player = new Plyr('#player', {
        
    });

    // Expose player so it can be used from the console
    window.player = player;
}



// --- ۵. دکمه نمایش بیشتر (Read More Toggle) ---
function setupReadMore() {
    const btn = document.getElementById('read-more-btn');
    const moreText = document.getElementById('more-text');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    if (!btn || !moreText) return;

    btn.addEventListener('click', () => {
        if (moreText.style.display === "none") {
            // نمایش متن
            moreText.style.display = "inline";
            btnText.textContent = "نمایش کمتر";
            btnIcon.classList.remove('fa-angle-down');
            btnIcon.classList.add('fa-angle-up');
        } else {
            // مخفی کردن متن
            moreText.style.display = "none";
            btnText.textContent = "نمایش بیشتر";
            btnIcon.classList.remove('fa-angle-up');
            btnIcon.classList.add('fa-angle-down');
        }
    });
}

// این تابع را هم به لیست توابع DOMContentLoaded اضافه کنید
document.addEventListener('DOMContentLoaded', () => {
    // ... سایر توابع ...
    setupReadMore();
});
// --- ۴. اجرای تمام توابع پس از لود شدن کامل صفحه ---
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupPortfolioSlider();
    setupVideoPlayer();
});
// --- ۶. اسلایدر نظرات مشتریان (Customer Reviews) ---
function setupReviews() {
    // 1. لیست نظرات (دیتای خود را اینجا وارد کنید)
    const reviewsData = [
        {
            name: "محمد کریم آبادی",
            text: "افتخار آشنایی با تیم قوی و خلاق رو داشتم که نظم، دیسیپلین و حرفه ای بودن رو برای من دوباره به تصویر کشیدن."
        },
        {
            name: "سارا رادمنش",
            text: "تجربه‌ای فوق‌العاده با تیم یازده داشتم. سرعت عمل بالا و کیفیت بی‌نظیر تدوین‌ها واقعاً من را شگفت‌زده کرد."
        },
        {
            name: "علی حسینی",
            text: "خلاقیت در طراحی لوگو دقیقاً همان چیزی بود که برند ما نیاز داشت. ممنون از توجه شما به جزئیات."
        },
        {
            name: "مهدی احمدی",
            text: "پشتیبانی عالی و برخورد حرفه‌ای. قطعاً برای پروژه‌های بعدی هم با همین تیم کار خواهم کرد."
        },
        {
            name: "محمد عابدی",
            text: "از همکاری با تیم یازده بسیار راضی هستم. آن‌ها توانستند ایده‌های ما را به بهترین شکل ممکن به تصویر بکشند."
        }
    ];

    // 2. انتخاب المنت‌ها از HTML
    const nameEl = document.getElementById('review-name');
    const textEl = document.getElementById('review-text');
    const nextBtn = document.getElementById('review-next');
    const prevBtn = document.getElementById('review-prev');

    // اگر المنت‌ها در صفحه نبودند، کد اجرا نشود (برای جلوگیری از ارور)
    if (!nameEl || !textEl || !nextBtn || !prevBtn) return;

    let currentReviewIndex = 0;
   
    // 3. تابع آپدیت کردن متن‌ها
    function updateReview(index) {
        // افکت محو شدن کوتاه برای زیبایی (اختیاری)
        textEl.style.opacity = 0;
        nameEl.style.opacity = 0;

        setTimeout(() => {
            nameEl.textContent = reviewsData[index].name;
            textEl.textContent = reviewsData[index].text;
            
            textEl.style.opacity = 1;
            nameEl.style.opacity = 1;
        }, 200); // بعد از 0.2 ثانیه متن عوض شود
    }

    // 4. رویداد کلیک دکمه بعدی (فلش چپ)
    nextBtn.addEventListener('click', () => {
        currentReviewIndex++;
        if (currentReviewIndex > reviewsData.length - 1) {
            currentReviewIndex = 0; // برگشت به اول
        }
        updateReview(currentReviewIndex);
    });

    // 5. رویداد کلیک دکمه قبلی (فلش راست)
    prevBtn.addEventListener('click', () => {
        currentReviewIndex--;
        if (currentReviewIndex < 0) {
            currentReviewIndex = reviewsData.length - 1; // رفتن به آخر
        }
        updateReview(currentReviewIndex);
    });
}
 //تابع باز بسته شدن لیست
    function toggleMenu() {
      const menu = document.getElementById('mainMenu');
      menu.classList.toggle('active');
    }

// اضافه کردن تابع به لیست اجرا
document.addEventListener('DOMContentLoaded', () => {
    // ... سایر توابع شما ...
    setupReviews();
});