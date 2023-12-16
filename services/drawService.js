const ctx = document.querySelector('#canvas')?.getContext('2d')


class DrawService {

    drawPoint = (x, y, {color = 'green', size = 1, angleGrad = 0}) => {

        const angle = Math.PI / 180 * angleGrad
        let rotatedX = x * Math.cos(angle) - y * Math.sin(angle)
        let rotatedY = x * Math.sin(angle) + y * Math.cos(angle)


        if (!ctx) return
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(rotatedX, rotatedY, size, size);
        ctx.fill();
    }


    drawLine = (x1, y1, x2, y2, color = 'red', angleGrad = 0) => {
        // рассчитываем разницу между координатами начальной и конечной точек по осям X и Y
        let dx = x2 - x1;
        let dy = y2 - y1;

        // определяем направление роста координат
        let sx = (dx > 0) ? 1 : -1;
        let sy = (dy > 0) ? 1 : -1;

        // выбираем начальную точку и проверяем, какая координата ближе к следующей точке: X или Y
        let x = x1;
        let y = y1;
        if (Math.abs(dx) > Math.abs(dy)) {
            let e = (dy / dx) * 0.5;
            for (let i = 0; i < Math.abs(dx); i++) {
                this.drawPoint(x, y, {color, angleGrad});
                x += sx;
                e += Math.abs(dy) / Math.abs(dx);
                if (e >= 0.5) {
                    y += sy;
                    e -= 1;
                }
            }
        } else {
            let e = (dx / dy) * 0.5;
            for (let i = 0; i < Math.abs(dy); i++) {
                this.drawPoint(x, y, {color, angleGrad});
                y += sy;
                e += Math.abs(dx) / Math.abs(dy);
                if (e >= 0.5) {
                    x += sx;
                    e -= 1;
                }
            }
        }
    }

    drawEllipse(rx, ry, xc, yc, color = 'red', angleGrad) {
        let dx, dy, d1, d2, x, y;
        x = 0;
        y = ry;

        // Initial decision parameter of region 1
        d1 = (ry * ry) - (rx * rx * ry) +
            (0.25 * rx * rx);
        dx = 2 * ry * ry * x;
        dy = 2 * rx * rx * y;

        // For region 1
        while (dx < dy) {

            // Print points based on 4-way symmetry
            this.drawPoint(x + xc, y + yc, {color, size: 2, angleGrad})
            this.drawPoint(-x + xc, y + yc, {color, size: 2, angleGrad})
            this.drawPoint(x + xc, -y + yc, {color, size: 2, angleGrad})
            this.drawPoint(-x + xc, -y + yc, {color, size: 2, angleGrad})


            // Checking and updating value of
            // decision parameter based on algorithm
            if (d1 < 0) {
                x++;
                dx = dx + (2 * ry * ry);
                d1 = d1 + dx + (ry * ry);
            } else {
                x++;
                y--;
                dx = dx + (2 * ry * ry);
                dy = dy - (2 * rx * rx);
                d1 = d1 + dx - dy + (ry * ry);
            }
        }

        // Decision parameter of region 2
        d2 = ((ry * ry) * ((x + 0.5) * (x + 0.5))) +
            ((rx * rx) * ((y - 1) * (y - 1))) -
            (rx * rx * ry * ry);

        // Plotting points of region 2
        while (y >= 0) {


            this.drawPoint(x + xc, y + yc, {color, size: 2, angleGrad})
            this.drawPoint(-x + xc, y + yc, {color, size: 2, angleGrad})
            this.drawPoint(x + xc, -y + yc, {color, size: 2, angleGrad})
            this.drawPoint(-x + xc, -y + yc, {color, size: 2, angleGrad})

            // Checking and updating parameter
            // value based on algorithm
            if (d2 > 0) {
                y--;
                dy = dy - (2 * rx * rx);
                d2 = d2 + (rx * rx) - dy;
            } else {
                y--;
                x++;
                dx = dx + (2 * ry * ry);
                dy = dy - (2 * rx * rx);
                d2 = d2 + dx - dy + (rx * rx);
            }
        }
    }

    drawCircle(X1, Y1, R, color = 'red', angleGrad) {
        // R - радиус, X1, Y1 - координаты центра, C - цвет
        var x = 0, y = R;
        var delta = 1 - 2 * R;
        var error = 0;
        while (y >= 0) {
            this.drawPoint(X1 + x, Y1 + y, {color, angleGrad})
            this.drawPoint(X1 + x, Y1 - y, {color, angleGrad})
            this.drawPoint(X1 - x, Y1 + y, {color, angleGrad})
            this.drawPoint(X1 - x, Y1 - y, {color, angleGrad})
            error = 2 * (delta + y) - 1;
            if (delta < 0 && error <= 0) {
                delta += 2 * ++x + 1;
                continue
            }
            error = 2 * (delta - x) - 1;
            if (delta > 0 && error > 0) {
                delta += 1 - 2 * --y;
                continue;
            }
            x++;
            delta += 2 * (x - y);
            y--;
        }
    }

}


export const drawService = new DrawService()