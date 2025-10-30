// ==UserScript==
// @name         Diep.io Tools
// @version      1.0
// @description  Diep.io keybindings and antiAFK
// @author       David Li
// @match        https://diep.io/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=diep.io
// @grant        none
// ==/UserScript==

// Copyright 2023 David Li
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function() {
    'use strict';

    const reloadLevel = 7;

    let toggler = 'OFF';

    function keyPress(key, upDown) {
        const eventObj = document.createEvent('Events');
        eventObj.initEvent(upDown ? 'keydown' : 'keyup', true, true);
        eventObj.keyCode = key;
        window.dispatchEvent(eventObj);
    }

    setInterval(() => {
        if(toggler === 'OFF') {
            return;
        }

        const keyW = 87;
        keyPress(keyW, 1);
        setTimeout(() => {
            keyPress(keyW, 0);
        }, 200);

        const keyS = 83;
        setTimeout(() => {
            keyPress(keyS, 1);
        }, 2000);
        setTimeout(() => {
            keyPress(keyS, 0);
        }, 2200);
    }, 4000);

    const menu = document.createElement('div');
    menu.style.position = 'absolute';
    menu.style['background-color'] = '#0005';
    setInterval(() => {
        menu.innerHTML = `
Anti-AFK = ${toggler} [F]<br>
esc: toggle menu<br>
z: overlord build (01277727)<br>
x: ram build (57700077)<br>
b: anti ram build (07776600)<br>
g: glass build (00077676)<br>
, : ssp build for booster (02307777)<br>
. : anti ram for hybrid/anni (17747700)<br>
n: predator stack (7 reload)<br>
p: twin stack (7 reload; finicky)
`;
    }, 100);
    document.body.appendChild(menu);

    // shows latency and health numbers
    function f(e) {
        const a = new KeyboardEvent('keydown', {
            bubbles: true,
            cancelable: true,
            shiftKey: false
        });
        Object.defineProperty(a, 'keyCode', {
            'value': 76
        });
        dispatchEvent(a);

        window.input.set_convar('ren_raw_health_values', true);
    }

    for (const i of ['focus', 'blur', 'keyup']) {
        addEventListener(i, f);
    }

    addEventListener('keydown', function (e) {
        if (!e.isTrusted) {
            return;
        }

        function fire(itvl) {
            setTimeout(function () {
                window.input.keyDown(32);
            }, itvl[0]);
            setTimeout(function () {
                window.input.keyUp(32);
            }, itvl[0] + itvl[1]);
        }

        const predator_auto_delays = [3750, 3600, 3500, 3300, 3100, 3000, 2500, 2000];
        switch (e.key) {
            case 'Escape':
                menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
                break;

            case 'f':
                toggler = toggler === 'OFF' ? 'ON' : 'OFF';
                break;

            case 'z':
                window.input.execute('game_stats_build 565656565656564848484848484877332');
                break;

            case 'x':
                window.input.execute('game_stats_build 232323888238238238238117777777111');
                break;

            case 'b':
                window.input.execute('game_stats_build 565656565656444444432323232323232');
                break;

            case 'g':
                window.input.execute('game_stats_build 565656565656547474747474774888888');
                break;

            case ',':
                window.input.execute('game_stats_build 565656565656567878787878787833322');
                break;

            case '.':
                window.input.execute('game_stats_build 565656565656564444232323232323231');
                break;

            case 'n':
                fire([0, 100]);
                fire([
                    [1460, 450],
                    [1330, 500],
                    [1220, 500],
                    [1120, 400],
                    [1000, 350],
                    [900, 300],
                    [850, 250],
                    [750, 200]
                ][reloadLevel]);
                fire([
                    [2900, 1200],
                    [2650, 1200],
                    [2400, 1000],
                    [2220, 900],
                    [2040, 800],
                    [1830, 750],
                    [1750, 750],
                    [1500, 750]
                ][reloadLevel]);
                setTimeout(function () {
                    window.input.keyDown(69);
                }, predator_auto_delays[reloadLevel]);
                setTimeout(function () {
                    window.input.keyUp(69);
                }, predator_auto_delays[reloadLevel] + 1);
                break;

            case 'p':
                fire([0, 100]);
                setTimeout(function () {
                    window.input.keyDown(69);
                }, 150);
                setTimeout(function () {
                    window.input.keyUp(69);
                }, 151);
                break;
        }
    });
}());
