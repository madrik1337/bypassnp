// ==UserScript==
// @name        Version-bypass for NotPixel
// @author       madrik1337
// @match        https://web.telegram.org/*
// @match        https://notpx.app/*
// @grant       none
// @version     1.0
// @description Обходит табличку с неподходящей версией Telegram для Web Telegram K в NP.
// @downloadURL  https://github.com/madrik1337/bypassnp/raw/main/version-bypass.user.js
// @updateURL    https://github.com/madrik1337/bypassnp/raw/main/version-bypass.user.js
// @homepage     https://github.com/madrik1337/bypassnp
// ==/UserScript==

(function () {
    'use strict';

    function updateIframeParams(iframe) {
        if (iframe && iframe.src.includes('tgWebAppData')) {
            console.log('Найден iframe:', iframe);
            const src = iframe.src;
            const tgWebAppVersionRegex = /tgWebAppVersion=[^&]+/;
            const tgWebAppPlatformRegex = /tgWebAppPlatform=[^&]+/;

            let updatedSrc = src;
            let versionUpdated = false;
            let platformUpdated = false;

            if (tgWebAppVersionRegex.test(src)) {
                updatedSrc = updatedSrc.replace(tgWebAppVersionRegex, 'tgWebAppVersion=8.0');
                versionUpdated = true;
            }
            if (tgWebAppPlatformRegex.test(src)) {
                updatedSrc = updatedSrc.replace(tgWebAppPlatformRegex, 'tgWebAppPlatform=ios');
                platformUpdated = true;
            }

            if (versionUpdated || platformUpdated) {
                iframe.src = updatedSrc;
                console.log('yes', updatedSrc);
                showNotification(updatedSrc);
            } else {
                console.log('fail');
            }
        } else {
            console.log('fail');
        }
    }

    function showNotification(updatedSrc) {
        const isRussian = navigator.language.startsWith('ru');
        const notificationBackground = document.createElement('div');
        notificationBackground.style.position = 'fixed';
        notificationBackground.style.top = '0';
        notificationBackground.style.left = '0';
        notificationBackground.style.width = '100vw';
        notificationBackground.style.height = '100vh';
        notificationBackground.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        notificationBackground.style.zIndex = '9998';
        notificationBackground.style.display = 'flex';
        notificationBackground.style.alignItems = 'center';
        notificationBackground.style.justifyContent = 'center';

        const notification = document.createElement('div');
        notification.style.backgroundColor = '#212121';
        notification.style.color = 'white';
        notification.style.padding = '20px 40px';
        notification.style.borderRadius = '8px';
        notification.style.fontSize = '14px';
        notification.style.fontWeight = 'bold';
        notification.style.textAlign = 'center';
        notification.style.maxWidth = '80%';
        notification.style.boxSizing = 'border-box';

        const questionText = isRussian ? 'Вы хотите открыть NP в отдельном окне?' : 'Do you want to open NP in a new window?';
        const yesText = isRussian ? 'Да' : 'Yes';
        const noText = isRussian ? 'Нет' : 'No';

        notification.innerHTML = `
            ${questionText}<br><br>
            <button id="yesButton" style="background-color: green; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">${yesText}</button>
            <button id="noButton" style="background-color: red; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;">${noText}</button>
        `;

        notificationBackground.appendChild(notification);
        document.body.appendChild(notificationBackground);

        document.getElementById('yesButton').addEventListener('click', () => {
            window.open(updatedSrc, '_blank');
            notificationBackground.remove();
        });

        document.getElementById('noButton').addEventListener('click', () => {
            notificationBackground.remove();
        });
    }

    // Задержка перед выполнением замены версии
    setTimeout(() => {
        const existingIframes = document.querySelectorAll('iframe');
        existingIframes.forEach((iframe) => updateIframeParams(iframe));
    }, 1000);

    const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === 'IFRAME') {
                    console.log('yes');
                    updateIframeParams(node);
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
