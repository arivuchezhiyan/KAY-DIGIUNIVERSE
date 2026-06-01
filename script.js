// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Header Scroll Effect
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Sticky Bar Visibility (Show after scrolling 1000px)
const stickyBar = document.querySelector('.sticky-bar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 1000) {
        stickyBar.classList.add('visible');
    } else {
        stickyBar.classList.remove('visible');
    }
});

// Initialize DataLayer for GTM tracking
window.dataLayer = window.dataLayer || [];

// Form Submission handling with GTM Tracking
const forms = document.querySelectorAll('form');
// TODO: Replace this URL with your actual Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbwu3zTagkbxekAU_ft8zHos4BmFr0BsjK42bfxyJ5rJHExwXYizetvPFla0wB_B6k1-Gw/exec'; 

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerHTML;

        btn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;

        // Push event to DataLayer for GTM tracking
        window.dataLayer.push({
            'event': 'lead_form_submitted',
            'form_id': form.id || 'unknown_form',
            'form_name': form.getAttribute('name') || 'Lead Form'
        });

        // Map form fields to the keys expected by Google App Script
        const formData = new FormData(form);
        const mappedData = new FormData();
        mappedData.append('username', formData.get('name') || '');
        mappedData.append('phone', formData.get('phone') || '');
        mappedData.append('email', formData.get('email') || '');
        mappedData.append('message', formData.get('message') || 'Enquiry from KAY Landing Page');

        // Submit via Fetch API
        fetch(scriptURL, { method: 'POST', body: mappedData })
            .then(response => {
                btn.innerHTML = 'Success! <i class="fas fa-check"></i>';
                btn.style.backgroundColor = '#25D366';
                
                // Redirect to Thank You page
                setTimeout(() => {
                    window.location.href = 'thankyou.html';
                }, 1000);
            })
            .catch(error => {
                console.error('Error!', error.message);
                btn.innerHTML = 'Error. Try Again';
                btn.style.backgroundColor = '#e31e24';
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = '';
                }, 3000);
            });
    });
});

// Dashboard Tab Logic
window.showDashTab = function(event, tabId) {
    if(event) event.preventDefault();
    const panes = document.querySelectorAll('.dash-pane');
    const tabs = document.querySelectorAll('.dash-tab');
    panes.forEach(pane => pane.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    const selectedPane = document.getElementById(tabId);
    if(selectedPane) selectedPane.classList.add('active');
    if(event && event.currentTarget) event.currentTarget.classList.add('active');
};

// Services Tab Logic
window.showServiceTab = function(event, tabId) {
    if(event) event.preventDefault();
    const panes = document.querySelectorAll('.service-pane');
    const tabs = document.querySelectorAll('.service-tab-btn');
    panes.forEach(pane => pane.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    const selectedPane = document.getElementById(tabId);
    if(selectedPane) selectedPane.classList.add('active');
    if(event && event.currentTarget) event.currentTarget.classList.add('active');
};

// FAQ Accordion Toggle
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all other items
        faqItems.forEach(otherItem => otherItem.classList.remove('active'));

        // If it wasn't active, open it
        if (!isActive) {
            item.classList.add('active');
        }
    });
});
