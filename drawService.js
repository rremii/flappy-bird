const ctx = document.querySelector('#canvas')?.getContext('2d')


class DrawService {

    drawPoint = (x, y, color = 'green') => {
        // debugger
        if (!ctx) return
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
        ctx.fill();
    }

    fillRect = (x1,y1,x2,y2,color = 'red') =>{
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1, color);
    }

    drawLine = (x1, y1, x2, y2, color = 'red') => {
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
                this.drawPoint(x, y, color);
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
                this.drawPoint(x, y, color);
                y += sy;
                e += Math.abs(dx) / Math.abs(dy);
                if (e >= 0.5) {
                    x += sx;
                    e -= 1;
                }
            }
        }
    }

    drawCircle(X1, Y1, R, color = 'red') {
        // R - радиус, X1, Y1 - координаты центра, C - цвет
        var x = 0, y = R;
        var delta = 1 - 2 * R;
        var error = 0;
        while (y >= 0) {
            this.drawPoint(X1 + x, Y1 + y, color)
            this.drawPoint(X1 + x, Y1 - y, color)
            this.drawPoint(X1 - x, Y1 + y, color)
            this.drawPoint(X1 - x, Y1 - y, color)
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