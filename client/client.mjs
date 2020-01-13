import * as alt from 'alt';
import * as native from 'natives';

let electric = [
    2445973230,// neon
    1560980623,// airtug
    1147287684,// caddy
    3164157193,// dilettante
    2400073108,// surge
    544021352,// khamelion 
    2672523198,// voltic
    1031562256,// tezeract
    1392481335,// cyclone
    2765724541// raiden
];

let webView = null;
alt.everyTick(() => {
    let vehicle = alt.Player.local.vehicle;
    if (vehicle) {
        if (!webView) {
            webView = new alt.WebView('http://resource/client/html/speedometer.html');
            webView.focus();
        } else {
            webView.emit('speedometer:data', {
                gear: parseInt(vehicle.gear),
                rpm: parseInt((vehicle.rpm * 10000).toFixed(0)),
                speed: parseInt((native.getEntitySpeed(vehicle.scriptID) * 3.6).toFixed(0)),
                isElectric: electric.includes(vehicle.model)
            });
        }
    } else {
        if (webView) {
            webView.destroy();
            webView = null;
        }
    }
});