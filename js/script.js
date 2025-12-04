// --- ۱. منوی همبرگری موبایل (Mobile Menu Toggle) ---
function setupMobileMenu() {
    const menuIcon = document.querySelector('img[alt="menu"]');
    const header = document.querySelector('header');

    if (!menuIcon || !header) return;

    // تعریف یک المان برای منوی ناوبری که قرار است باز شود
    // در این مثال، ما از خود هدر (header) استفاده می کنیم و یک کلاس برای باز شدن به آن اضافه می کنیم
    
    menuIcon.addEventListener('click', () => {
        // افزودن/حذف کلاس 'menu-open' به هدر
        header.classList.toggle('menu-open');
        
        // اگر بخواهید آیکون هم تغییر کند (مثل تبدیل همبرگر به ضربدر)
        // می توانید از FontAwesome در آینده استفاده کنید یا یک کلاس به آیکون اضافه کنید.
        console.log("Menu Toggled"); 
    });
}


// --- ۲. اسلایدر لوگوها (Portfolio Slider) ---
function setupPortfolioSlider() {
    const previewImg = document.querySelector('.large-preview-img');
    const thumbCards = document.querySelectorAll('.thumb-card');

    if (!previewImg || thumbCards.length === 0) return;

    thumbCards.forEach(card => {
        card.addEventListener('click', function() {
            // حذف کلاس فعال از همه کارت‌ها
            thumbCards.forEach(t => t.classList.remove('active'));
            
            // فعال کردن کارت کلیک شده
            this.classList.add('active');
            
            // تغییر عکس بزرگ اصلی
            const newSrc = this.querySelector('img').getAttribute('src');
            previewImg.setAttribute('src', newSrc);
            
            // در اینجا می توانید متن توضیحات (portfolio-text-content) را نیز بر اساس هر عکس تغییر دهید
            // (که نیاز به یک آرایه داده‌ای دارد که در این کد وجود ندارد)
        });
    });
    
    // شما می توانید منطق کلیک روی فلش ها (angle-left/right) را نیز اینجا اضافه کنید
}


// --- ۳. پخش کننده ویدیو (Video Player Toggle) ---
function setupVideoPlayer() {
    const videoWrapper = document.querySelector('.video-player-col');
    const playIcon = document.querySelector('.play-icon');
    const videoCover = document.querySelector('.video-player-col img');
    
    // فرض می‌کنیم که شما تگ <iframe> یا <video> واقعی را جایگزین خواهید کرد
    // در حال حاضر فقط کاور را پنهان می‌کنیم.
    
    if (!videoWrapper || !playIcon) return;

    playIcon.addEventListener('click', () => {
        // پنهان کردن کاور و آیکون پخش
        if (videoCover) {
            videoCover.style.display = 'none';
        }
        playIcon.style.display = 'none';
        
        // **نکته:** در این قسمت باید کد واقعی لود شدن پخش کننده ویدیو (مثلاً یک iframe یوتیوب) اضافه شود.
        // فعلاً تنها تغییر بصری را اعمال می‌کنیم.
        console.log("Video Started Playback (Placeholder)");
    });
}


// --- ۴. اجرای تمام توابع پس از لود شدن کامل صفحه ---
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupPortfolioSlider();
    setupVideoPlayer();
});