// ==UserScript==
// @name        Robot-bypass for NotPixel
// @author       madrik1337
// @match        https://web.telegram.org/*
// @match        https://notpx.app/*
// @match        https://app.notpx.app/*
// @grant       none
// @version     1.0
// @description Убирает табличку с роботом на забаненых аккаунтах в NP.
// @downloadURL  https://github.com/madrik1337/bypassnp/raw/main/robot-bypass.user.js
// @updateURL    https://github.com/madrik1337/bypassnp/raw/main/robot-bypass.user.js
// @homepage     https://github.com/madrik1337/bypassnp
// ==/UserScript==

(function () {
    'use strict';

    // удаление робота
    function removeRobotSection() {
        const robotSection = document.querySelector('div._layout_1i63b_1');
        if (robotSection) {
            robotSection.remove();
            observer.disconnect();
            showNotification();
        }
    }

    // уведы
    function showNotification() {
        const notification = document.createElement('div');
        notification.style.position = 'fixed';
        notification.style.top = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = 'black';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        notification.style.fontSize = '16px';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '9999';
        notification.style.textAlign = 'center';

        // текст
        notification.innerHTML = `&#10003; Bypass Robot activated! Made by <a href="https://t.me/madrik1337" target="_blank" style="color: #00bfff; text-decoration: none; font-weight: bold;">madrik1337</a>`;

        document.body.appendChild(notification);

        // кд увед
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    removeRobotSection();

    const observer = new MutationObserver(() => {
        removeRobotSection();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
