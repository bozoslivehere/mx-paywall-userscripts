// ==UserScript==
// @name         ElPais Paywall Remover
// @namespace    http://tampermonkey.net/
// @version      2024-04-05
// @description  Remove paywall from El Pais freemium and premium articles.
// @author       BOZOSLIVEHERE
// @match        https://elpais.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=elpais.com
// @grant        none
// ==/UserScript==



setTimeout(function() {
    'use strict';
    console.log('test message');
    if(localStorage) {
        const serializedArcp = localStorage.getItem('ArcP');
        if (serializedArcp && serializedArcp.length > 0) {
            const arcp = JSON.parse(serializedArcp);
            arcp.anonymous.rc['8'].c = -500;
            localStorage.setItem('ArcP', JSON.stringify(arcp));
        }
    }

    var paywallElement = document.querySelector('#ctn_premium_article, #ctn_freemium_article');
    paywallElement.remove()
    var wall = document.getElementsByClassName("a_b_wall _dn")[0]
    var restOfArticle = Array.from(wall.children)
    wall.remove()
    var articleBody = document.querySelector('.a_c[data-dtm-region="articulo_cuerpo"]');
    var lastParagraph = articleBody.children[articleBody.children.length - 1]
    restOfArticle.forEach(function(child) { lastParagraph.insertBefore(child, lastParagraph.nextSibling)})
}, 5000);