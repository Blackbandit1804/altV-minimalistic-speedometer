$(() => {
    // speedometer
    if ($("#speedometer").length) {
        alt.on('speedometer:data', (data) => {
            let speed = data.speed;
            let gear = data.gear;
            let rpm = data.rpm;
            let isElectric = data.isElectric;

            let gearCurrent = gear;
            let gearNext = 0;
            let gearBefore = 0;

            let gearOrder = ['R', 'P', 1, 2, 3, 4, 5, 6];
            if (isElectric) gearOrder = ['R', 'P', 1];
            let gearIndex = 0;

            if (speed === 0) {// parking
                gearIndex = 1;
            } else if (gearCurrent === 0 && speed > 0) {// backwards
                gearIndex = 0;
            } else if (gearCurrent === 1) {// first gear
                gearIndex = 2;
            } else if (gearCurrent === 6) {// last gear
                gearIndex = 7;
            } else {
                gearNext = gear + 1;
                gearBefore = gear - 1;
                gearIndex = gear + 1;
            }

            gearCurrent = gearOrder[gearIndex];
            gearNext = gearOrder[gearIndex + 1] !== undefined ? gearOrder[gearIndex + 1] : '';
            gearBefore = gearOrder[gearIndex - 1] !== undefined ? gearOrder[gearIndex - 1] : '';
            
            let rpmPercent = (rpm / 10000 * 100).toFixed(0);
            let rpmColor = rpmPercent < 90 ? 'green' : 'orange';

            let displayShiftUp = rpmPercent < 90 ? 'none' : 'block';
            if (gearCurrent === 'R' || gearCurrent === 'P' || gearCurrent === 6) displayShiftUp = 'none';
            if (isElectric) if (gearCurrent > 0) displayShiftUp = 'none';

            $("#gearNext").text(gearNext);
            $("#gearCurrent").text(gearCurrent);
            $("#gearBefore").text(gearBefore);
            $("#rpm").children("div").css({ "width": rpmPercent + "%", "background-color": rpmColor });
            $("#shift").css("display", displayShiftUp);
            $("#speed").text(speed);
        });
    }
});