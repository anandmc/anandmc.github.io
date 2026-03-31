document.addEventListener("DOMContentLoaded", () => {
    // Force reload once without cache
    if (!sessionStorage.getItem("forceReload")) {
        sessionStorage.setItem("forceReload", "true");
        window.location.reload();
    }
    /* Typing */
    document.querySelectorAll(".typing").forEach(el => {
        const text = el.textContent;
        el.textContent = "";
        let i = 0;

        function type() {
            if (i < text.length) {
                el.textContent += text[i];
                i++;
                setTimeout(type, 0);
            }
        }
        type();
    });

    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");

    /* Stars */
    const stars = [];
    for (let i = 0; i < 150; i++) {
        const star = document.createElement("div");
        star.classList.add("star");
        star.style.left = Math.random() * 100 + "vw";
        star.style.top = Math.random() * 100 + "vh";
        document.body.appendChild(star);
        stars.push(star);
    }

    /* Planes */
    const planes = [];
    for (let i = 0; i < 5; i++) {
        const plane = document.createElement("div");
        plane.classList.add("plane");
        plane.innerHTML = "✈";
        plane.style.top = (10 + Math.random() * 40) + "%";
        plane.style.animationDuration = (8 + Math.random() * 10) + "s";
        document.body.appendChild(plane);
        planes.push(plane);
    }

    function updateScene() {
        const scrollY = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollY / maxScroll, 1);

        /* 🎨 Background */
        const r = 255 - (255 - 60) * progress;
        const g = 255 - (255 - 62) * progress;
        const b = 255 - (255 - 75) * progress;
        document.body.style.background = `rgb(${r}, ${g}, ${b})`;
        /* 📝 Text color transition */
        const textColor = progress > 0.5 ? "#ffffff" : "#111111";
        document.querySelectorAll(".section").forEach(sec => {
            sec.style.color = textColor;
        });

        const arcHeight = 12;
        const baseTop = 25;

        /* ☀️ SUN (0 → 50%) */
        if (progress <= 0.5) {
            const p = progress / 0.5;

            const curve = Math.sin(p * Math.PI);

            const x = p * 80;
            sun.style.left = `${x}%`;
            sun.style.top = `${baseTop - curve * arcHeight}%`;

            sun.style.opacity = 1;
        } else {
            sun.style.opacity = 0;
        }

        /* 🌙 MOON (50% → 100%) */
        if (progress > 0.5) {
            const p = (progress - 0.5) / 0.5;

            const curve = Math.sin(p * Math.PI);

            const x = p * 80;
            moon.style.left = `${x}%`;
            moon.style.top = `${baseTop - curve * arcHeight}%`;

            moon.style.opacity = p;
        } else {
            moon.style.opacity = 0;
        }

        /* ⭐ Stars */
        stars.forEach(star => {
            star.style.opacity = progress;
        });

        /* ✈️ Planes */
        planes.forEach(plane => {
            plane.style.opacity = 1 - progress;
        });
    }

    let ticking = false;

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateScene();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScroll);
    updateScene();

});