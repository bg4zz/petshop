// выпадающий список
const dropdowns = document.querySelectorAll('.custom-dropdown');

dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.custom-dropdown-toggle');
    const menu = dropdown.querySelector('.custom-dropdown-menu');

    dropdown.addEventListener('mouseenter', () => {
        menu.classList.add('active');
    });

    dropdown.addEventListener('mouseleave', () => {
        menu.classList.remove('active');
    });

    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            menu.classList.remove('active');
        }
    });

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        menu.classList.toggle('active');
    });
});