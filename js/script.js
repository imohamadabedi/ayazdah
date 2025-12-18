
// --- ۱. منوی همبرگری شیشه‌ای (Glass Mobile Menu) ---
function setupMobileMenu() {
    const menuIcon = document.querySelector('img[alt="menu"]');
    const overlay = document.getElementById('glassOverlay');
    const closeBtn = document.getElementById('closeMenuBtn');
    const menuLinks = document.querySelectorAll('.glass-menu-content a');

    if (!menuIcon || !overlay || !closeBtn) return;

    // باز کردن منو
    menuIcon.addEventListener('click', () => {
        overlay.classList.add('open');
    });

    // بستن منو با دکمه ضربدر
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
    });

    // بستن منو و اسکرول نرم هنگام کلیک روی لینک‌ها
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 1. همیشه منو را ببند
            overlay.classList.remove('open');

            // 2. اگر لینک به یک ID داخل همین صفحه اشاره می‌کند (مثل #services)
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault(); // از پرش ناگهانی مرورگر جلوگیری می‌کند
                const targetId = href.substring(1); // حذف کاراکتر '#'
                const targetElement = document.getElementById(targetId);

                // 3. اگر المنت مورد نظر وجود داشت، به آن اسکرول نرم کنیم
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth', // ایجاد اسکرول نرم
                        block: 'start'      // المنت در بالای صفحه قرار گیرد
                    });
                }
            }
            // اگر لینک به صفحه دیگری (مثل AboutUs.html) می‌رود، مرورگر به صورت عادی عمل می‌کند.
        });
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
    
    // اضافه کردن المنت‌های متن
    const logoTitle = document.getElementById('logo-title');
    const logoDescription = document.getElementById('logo-description');
    const logoTeam = document.getElementById('logo-team');
    const logoInspiration = document.getElementById('logo-inspiration');
    const logoMessage = document.getElementById('logo-message');

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

    // افکت fade برای متن‌ها
    const textElements = [logoTitle, logoDescription, logoTeam, logoInspiration, logoMessage];
    window.player = player;
    
    // محو شدن
    textElements.forEach(el => {
        if (el) el.style.opacity = '0';
    });
    
    setTimeout(() => {
        // به‌روزرسانی متن‌ها
        const activeCard = thumbCards[currentIndex];
        
        if (logoTitle && activeCard.getAttribute('data-title')) {
            logoTitle.textContent = activeCard.getAttribute('data-title');
        }
        
        if (logoDescription && activeCard.getAttribute('data-desc')) {
            logoDescription.textContent = activeCard.getAttribute('data-desc');
        }
        
        if (logoTeam && activeCard.getAttribute('data-team')) {
            logoTeam.textContent = activeCard.getAttribute('data-team');
        }
        
        if (logoInspiration && activeCard.getAttribute('data-inspiration')) {
            logoInspiration.textContent = activeCard.getAttribute('data-inspiration');
        }
        
        if (logoMessage && activeCard.getAttribute('data-message')) {
            logoMessage.textContent = activeCard.getAttribute('data-message');
        }
        
        // نمایش مجدد
        textElements.forEach(el => {
            if (el) el.style.opacity = '1';
        });
    }, 200);
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


// --- ۴. اجرای تمام توابع پس از لود شدن کامل صفحه ---
document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupPortfolioSlider();
    setupVideoPlayer();
    setupReadMore();
    setupReviews();
    setupContactModal();
    setupSpecialModal();
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

// --- ۷. مودال تماس با ما ---
function setupContactModal() {
    const contactTriggers = document.querySelectorAll('.contact-trigger');
    const contactModal = document.getElementById('contactModal');
    const closeModalBtn = document.querySelector('.contact-modal-close');
    const overlay = document.querySelector('.contact-modal-overlay');

    // اگر عناصر وجود ندارند، ادامه نده
    if (!contactTriggers.length || !contactModal || !closeModalBtn || !overlay) {
        console.log('عناصر مودال تماس پیدا نشدند');
        return;
    }

    // باز کردن مودال
    contactTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openContactModal();
        });
    });

    // بستن مودال
    closeModalBtn.addEventListener('click', closeContactModal);
    overlay.addEventListener('click', closeContactModal);

    // کلید ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && contactModal.style.display === 'block') {
            closeContactModal();
        }
    });

    // جلوگیری از بستن با کلیک روی مودال
    contactModal.addEventListener('click', function(e) {
        if (e.target === contactModal) {
            closeContactModal();
        }
    });

    // توابع
    function openContactModal() {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // بستن منو در موبایل (اگر باز است)
        const mobileMenu = document.querySelector('.glass-menu-overlay.open');
        if (mobileMenu) {
            mobileMenu.classList.remove('open');
        }
    }

    function closeContactModal() {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // کپی شماره تلفن
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            navigator.clipboard.writeText(number).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> کپی شد!';
                this.style.background = 'rgba(76, 175, 80, 0.2)';
                this.style.borderColor = 'rgba(76, 175, 80, 0.5)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.borderColor = '';
                }, 2000);
            });
        });
    });

    // کپی لینک
    const copyLinkBtn = document.querySelector('.copy-link');
    if (copyLinkBtn) {
        copyLinkBtn.addEventListener('click', function() {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> لینک کپی شد';
                this.style.background = 'rgba(76, 175, 80, 0.2)';
                this.style.borderColor = 'rgba(76, 175, 80, 0.5)';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.style.borderColor = '';
                }, 2000);
            });
        });
    }

    // اشتراک در واتساپ
    const whatsappShareBtn = document.querySelector('.whatsapp-share');
    if (whatsappShareBtn) {
        whatsappShareBtn.addEventListener('click', function() {
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('به سایت ما سر بزنید!');
            window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
            window.openSpecialModal = openSpecialModal;
        });
    }
}
// --- مودال خاص ترین ما ---
function setupSpecialModal() {
    const specialModal = document.getElementById('specialModal');
    const closeSpecialModal = document.getElementById('closeSpecialModal');
    const specialImages = document.querySelectorAll('[data-special-image]');
    
    // المنت‌های مودال
    const modalImg = document.getElementById('specialModalImg');
    const designerName = document.getElementById('designerName');
    const designerRole = document.getElementById('designerRole');
    const projectDescription = document.getElementById('projectDescription');
    const projectStyle = document.getElementById('projectStyle');
    const projectTime = document.getElementById('projectTime');
    
    if (!specialModal || !closeSpecialModal || specialImages.length === 0) {
        console.log('عناصر مودال خاص ترین پیدا نشدند');
        return;
    }
    
    // باز کردن مودال با کلیک روی عکس
    specialImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            // دریافت اطلاعات از data attributes
            const src = this.getAttribute('src');
            const name = this.getAttribute('data-designer-name');
            const role = this.getAttribute('data-designer-role');
            const desc = this.getAttribute('data-project-desc');
            const style = this.getAttribute('data-project-style');
            const time = this.getAttribute('data-project-time');
            
            // پر کردن اطلاعات مودال
            modalImg.src = src;
            designerName.textContent = name || 'طراح';
            designerRole.textContent = role || 'طراح گرافیک';
            projectDescription.textContent = desc || 'توضیحات ین طرح با الهام از معماری مدرن و خطوط هندسی طراحی شده است. تمرکز اصلی بر سادگی و خوانایی در عین حفظ هویت بصری قوی بوده است. رنگ‌های استفاده شده بیانگر ثبات و اعتماد هستندطرح';
            projectStyle.textContent = style || 'مینیمال';
            projectTime.textContent = time || '۲ هفته';
            
            // نمایش مودال
            openSpecialModal();
        });
    });
    
    // بستن مودال
    closeSpecialModal.addEventListener('click', closeSpecialModalFunc);
    
    // بستن با کلیک روی overlay
    specialModal.addEventListener('click', function(e) {
        if (e.target === specialModal) {
            closeSpecialModalFunc();
        }
    });
    
    // بستن با کلید ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && specialModal.style.display === 'flex') {
            closeSpecialModalFunc();
        }
    });
    
    // توابع باز و بسته کردن
    function openSpecialModal() {
        specialModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // انیمیشن ورود
        setTimeout(() => {
            specialModal.style.opacity = '1';
        }, 10);
    }
    
    function closeSpecialModalFunc() {
        specialModal.style.opacity = '0';
        setTimeout(() => {
            specialModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // برای استفاده در اسکریپت
    window.openSpecialModal = openSpecialModal;
    window.closeSpecialModalFunc = closeSpecialModalFunc;
}
document.addEventListener('DOMContentLoaded', function () {
    const thumbnails = document.querySelectorAll('.thumb-card');

    // عناصری که باید به‌روزرسانی شوند (در داخل portfolio-text-content)
    const largePreview = document.getElementById('largePreview');
    const designerName = document.getElementById('designerName');
    const designerRole = document.getElementById('designerRole');
    const projectDescription = document.getElementById('projectDescription'); // هدف اصلی توضیحات
    const projectStyle = document.getElementById('projectStyle');
    const projectTime = document.getElementById('projectTime');

    // تابع اصلی به‌روزرسانی محتوا
    function updatePortfolio(card) {
        // ... به‌روزرسانی تصویر بزرگ
        if (largePreview) {
            largePreview.src = card.getAttribute('data-img-src');
        }

        // ... جایگزینی متون در portfolio-text-content
        if (designerName) {
            designerName.textContent = card.getAttribute('data-designer');
        }
        if (designerRole) {
            designerRole.textContent = card.getAttribute('data-role');
        }
        
        // **این خط، محتوای متنی تگ P را کاملاً جایگزین می‌کند**
        if (projectDescription) {
            projectDescription.textContent = card.getAttribute('data-desc'); 
        }

        if (projectStyle) {
            projectStyle.textContent = card.getAttribute('data-style');
        }
        if (projectTime) {
            projectTime.textContent = card.getAttribute('data-time');
        }

        // ... مدیریت کلاس 'active'
        thumbnails.forEach(t => t.classList.remove('active'));
        card.classList.add('active');
    }

    // افزودن شنونده کلیک به هر کارت کوچک
    thumbnails.forEach(card => {
        card.addEventListener('click', function() {
            updatePortfolio(this);
        });
    });

    // نمایش محتوای اولین کارت در هنگام بارگذاری صفحه
    const initialActiveCard = document.querySelector('.thumb-card'); 
    if (initialActiveCard) {
        updatePortfolio(initialActiveCard);
    }
});