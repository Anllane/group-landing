document.addEventListener('DOMContentLoaded', () => {
    // ---- Calculator Logic ----
    const areaInput = document.getElementById('area');
    const conditionSelect = document.getElementById('condition');
    const materialSelect = document.getElementById('material');
    const totalPriceEl = document.getElementById('total-price');
    const calcImage = document.getElementById('calc-image');

    function calculate() {
        let area = parseInt(areaInput.value) || 0;
        if (area < 0) area = 0;

        const conditionMultiplier = parseFloat(conditionSelect.value);
        const materialPrice = parseInt(materialSelect.value);
        
        const total = area * materialPrice * conditionMultiplier;
        
        // Format number with spaces
        totalPriceEl.textContent = total.toLocaleString('ru-RU');
    }

    function updateImage() {
        const selectedMaterial = materialSelect.options[materialSelect.selectedIndex];
        const selectedCondition = conditionSelect.options[conditionSelect.selectedIndex];
        
        const mat = selectedMaterial.getAttribute('data-mat');
        const shape = selectedCondition.getAttribute('data-shape');
        
        if (mat && shape && calcImage) {
            const newImgSrc = `img/${mat}_${shape}.png`;
            calcImage.style.opacity = '0.5';
            setTimeout(() => {
                calcImage.src = newImgSrc;
                calcImage.style.opacity = '1';
            }, 150);
        }
    }

    // Event Listeners for calculator
    if (areaInput && conditionSelect && materialSelect) {
        areaInput.addEventListener('input', calculate);
        
        conditionSelect.addEventListener('change', () => {
            calculate();
            updateImage();
        });
        
        materialSelect.addEventListener('change', () => {
            calculate();
            updateImage();
        });

        // Initial calculation
        calculate();
    }


    // ---- Form Submission ----
    const leadForm = document.getElementById('lead-form');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            alert(`Спасибо, ${name}! Ваша заявка успешно отправлена. Наш инженер свяжется с вами.`);
            leadForm.reset();
        });
    }

    // ---- Mobile Menu (Burger) ----
    const burger = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            if (nav.style.display === 'flex') {
                nav.style.display = 'none';
            } else {
                nav.style.display = 'flex';
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.width = '100%';
                nav.style.background = '#fff';
                nav.style.padding = '20px';
                nav.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
            }
        });

        // Close menu on link click (mobile)
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 768) {
                    nav.style.display = 'none';
                }
            });
        });
    }

    // Handle resize for mobile menu reset
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && nav) {
            nav.style.display = 'flex';
            nav.style.position = 'static';
            nav.style.flexDirection = 'row';
            nav.style.padding = '0';
            nav.style.boxShadow = 'none';
        } else if (nav) {
            nav.style.display = 'none';
        }
    });

    // ---- Toggle Calculator Image ----
    const toggleCalcBtn = document.getElementById('toggle-calc-btn');
    const calcWrapper = document.querySelector('.calc-wrapper');
    if (toggleCalcBtn && calcWrapper) {
        toggleCalcBtn.addEventListener('click', () => {
            calcWrapper.classList.toggle('expanded-img');
        });
    }
});
