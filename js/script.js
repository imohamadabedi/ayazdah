/**
 * Eleven Team Website Scripts
 * Optimized for Performance and Readability
 */

document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupPortfolioSlider();
    setupVideoPlayer();
    setupReadMore();
    setupReviews();
    setupContactModal();
    setupSpecialModal();
});

// --- ۱. منوی همبرگری شیشه‌ای (Mobile Menu) ---
function setupMobileMenu() {
    const menuIcon = document.querySelector('img[alt="منوی اصلی"]'); // Updated selector based on new ALT
    const overlay = document.getElementById('glassOverlay');
    const closeBtn = document.getElementById('closeMenuBtn');
    const menuLinks = document.querySelectorAll('.glass-menu-content a');

    // Fallback selector if ALT hasn't updated in cache yet
    const safeMenuIcon = menuIcon || document.querySelector('img[alt="menu"]');

    if (!safeMenuIcon || !overlay || !closeBtn) return;

    safeMenuIcon.addEventListener('click', () => overlay.classList.add('open'));
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            overlay.classList.remove('open');
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.getElementById(href.substring(1));
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
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

    // Text Elements
    const logoTitle = document.getElementById('logo-title');
    const logoDescription = document.getElementById('logo-description');
    const logoTeam = document.getElementById('logo-team');
    const logoInspiration = document.getElementById('logo-inspiration');
    const logoMessage = document.getElementById('logo-message');

    if (!previewImg || thumbCards.length === 0) return;

    let currentIndex = 0;
    const totalSlides = thumbCards.length;

    if (totalSlideNum) totalSlideNum.textContent = String(totalSlides).padStart(2, '0');

    function updateSlider(newIndex) {
        currentIndex = (newIndex + totalSlides) % totalSlides; // Simplified Logic

        // Update Image
        const imgElement = thumbCards[currentIndex].querySelector('img');
        if (imgElement) {
            previewImg.setAttribute('src', imgElement.getAttribute('src'));
            // SEO: Update Alt text of large image
            previewImg.setAttribute('alt', imgElement.getAttribute('alt') || 'نمونه کار');
        }

        // Update Active Class
        thumbCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });

        // Update Numbers & Progress
        if (currentSlideNum) currentSlideNum.textContent = String(currentIndex + 1).padStart(2, '0');
        if (progressFill) progressFill.style.width = `${((currentIndex + 1) / totalSlides) * 100}%`;

        // Update Text with Fade Effect
        const textElements = [logoTitle, logoDescription, logoTeam, logoInspiration, logoMessage];
        textElements.forEach(el => { if (el) el.style.opacity = '0'; });

        setTimeout(() => {
            const activeCard = thumbCards[currentIndex];
            const dataMap = {
                'data-title': logoTitle,
                'data-desc': logoDescription,
                'data-team': logoTeam,
                'data-inspiration': logoInspiration,
                'data-message': logoMessage
            };

            for (const [attr, element] of Object.entries(dataMap)) {
                if (element && activeCard.hasAttribute(attr)) {
                    element.textContent = activeCard.getAttribute(attr);
                }
            }
            
            textElements.forEach(el => { if (el) el.style.opacity = '1'; });
        }, 200);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentIndex + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentIndex - 1));
    
    thumbCards.forEach((card, index) => {
        card.addEventListener('click', () => updateSlider(index));
    });

    updateSlider(0);
}

// --- ۳. پخش کننده ویدیو ---
function setupVideoPlayer() {
    if (document.getElementById('player')) {
        window.player = new Plyr('#player', { /* Options */ });
    }
}

// --- ۴. دکمه نمایش بیشتر (Read More) ---
function setupReadMore() {
    const btn = document.getElementById('read-more-btn');
    const moreText = document.getElementById('more-text');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');

    if (!btn || !moreText) return;

    btn.addEventListener('click', () => {
        const isHidden = moreText.style.display === "none";
        moreText.style.display = isHidden ? "inline" : "none";
        btnText.textContent = isHidden ? "نمایش کمتر" : "نمایش بیشتر";
        
        if (btnIcon) {
            btnIcon.className = isHidden ? 'fas fa-angle-up' : 'fas fa-angle-down';
        }
    });
}

// --- ۵. اسلایدر نظرات (Reviews) ---
function setupReviews() {
    const reviewsData = [
        { name: "محمد کریم آبادی", text: "افتخار آشنایی با تیم قوی و خلاق رو داشتم که نظم، دیسیپلین و حرفه ای بودن رو برای من دوباره به تصویر کشیدن." },
        { name: "سارا رادمنش", text: "تجربه‌ای فوق‌العاده با تیم یازده داشتم. سرعت عمل بالا و کیفیت بی‌نظیر تدوین‌ها واقعاً من را شگفت‌زده کرد." },
        { name: "علی حسینی", text: "خلاقیت در طراحی لوگو دقیقاً همان چیزی بود که برند ما نیاز داشت. ممنون از توجه شما به جزئیات." },
        { name: "مهدی احمدی", text: "پشتیبانی عالی و برخورد حرفه‌ای. قطعاً برای پروژه‌های بعدی هم با همین تیم کار خواهم کرد." },
        { name: "محمد عابدی", text: "از همکاری با تیم یازده بسیار راضی هستم. آن‌ها توانستند ایده‌های ما را به بهترین شکل ممکن به تصویر بکشند." }
    ];

    const nameEl = document.getElementById('review-name');
    const textEl = document.getElementById('review-text');
    const nextBtn = document.getElementById('review-next');
    const prevBtn = document.getElementById('review-prev');

    if (!nameEl || !textEl || !nextBtn || !prevBtn) return;

    let currentReviewIndex = 0;

    function updateReview(index) {
        textEl.style.opacity = 0;
        nameEl.style.opacity = 0;
        setTimeout(() => {
            nameEl.textContent = reviewsData[index].name;
            textEl.textContent = reviewsData[index].text;
            textEl.style.opacity = 1;
            nameEl.style.opacity = 1;
        }, 200);
    }

    nextBtn.addEventListener('click', () => {
        currentReviewIndex = (currentReviewIndex + 1) % reviewsData.length;
        updateReview(currentReviewIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentReviewIndex = (currentReviewIndex - 1 + reviewsData.length) % reviewsData.length;
        updateReview(currentReviewIndex);
    });
}

// --- ۶. مودال تماس (Contact Modal) ---
function setupContactModal() {
    const contactModal = document.getElementById('contactModal');
    const triggers = document.querySelectorAll('.contact-trigger');
    const closeBtn = document.querySelector('.contact-modal-close');
    const overlay = document.querySelector('.contact-modal-overlay');

    if (!contactModal) return;

    function openModal() {
        contactModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        document.querySelector('.glass-menu-overlay')?.classList.remove('open');
    }

    function closeModal() {
        contactModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    triggers.forEach(t => t.addEventListener('click', (e) => { e.preventDefault(); openModal(); }));
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal.style.display === 'block') closeModal();
    });

    // Copy to Clipboard Functionality
    document.querySelectorAll('.copy-btn, .copy-link').forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.dataset.number || window.location.href;
            const originalHTML = this.innerHTML;
            
            navigator.clipboard.writeText(content).then(() => {
                // UI Feedback (Fake Alert)
                this.innerHTML = '<span style="font-size:0.9em">کپی شد! ✓</span>';
                this.classList.add('copied-success'); // Add css class for styling
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                    this.classList.remove('copied-success');
                }, 2000);
            }).catch(err => {
                console.error('Copy failed', err);
            });
        });
    });

    // Whatsapp Share
    document.querySelector('.whatsapp-share')?.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent('به سایت ما سر بزنید!');
        window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    });
}

// --- ۷. مودال تصاویر خاص (Special Modal) ---
function setupSpecialModal() {
    const specialModal = document.getElementById('specialModal');
    const closeBtn = document.getElementById('closeSpecialModal');
    const images = document.querySelectorAll('[data-special-image]');
    
    // Elements to update
    const modalImg = document.getElementById('specialModalImg');
    const designerName = document.getElementById('designerName');
    const designerRole = document.getElementById('designerRole');
    const projectDesc = document.getElementById('projectDescription');
    const projectStyle = document.getElementById('projectStyle');
    const projectTime = document.getElementById('projectTime');

    if (!specialModal || !images.length) return;

    function closeModal() {
        specialModal.style.opacity = '0';
        setTimeout(() => {
            specialModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    images.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (modalImg) modalImg.src = this.src;
            if (designerName) designerName.textContent = this.dataset.designerName || '-';
            if (designerRole) designerRole.textContent = this.dataset.designerRole || '-';
            if (projectDesc) projectDesc.textContent = this.dataset.projectDesc || '-';
            if (projectStyle) projectStyle.textContent = this.dataset.projectStyle || '-';
            if (projectTime) projectTime.textContent = this.dataset.projectTime || '-';
            
            specialModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            // Small delay to allow display:flex to apply before opacity transition
            requestAnimationFrame(() => {
                specialModal.style.opacity = '1';
            });
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    specialModal.addEventListener('click', (e) => { if(e.target === specialModal) closeModal(); });
    document.addEventListener('keydown', (e) => { if(e.key === 'Escape' && specialModal.style.display === 'flex') closeModal(); });
}