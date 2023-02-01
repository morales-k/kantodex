import { voiceLight, blackButton } from "./CirclesVM";

// References passed circle object & draws it on canvas.
export function drawCircle(ctx, circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.bgColor;
    ctx.fill();
    ctx.lineWidth = circle.lineWidth;
    ctx.strokeStyle = circle.lineColor;
    ctx.stroke();
};

// Draws a single line with passed params.
export const drawLine = (ctx, xMove, xTo, y, color, width) => {
    ctx.beginPath();
    ctx.moveTo(xMove, y);
    ctx.lineTo(xTo, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
};


// Draws the voice light & glare.
export function voiceLightCircle(ctx) {
    drawCircle(ctx, voiceLight);
    voiceLightGlare(ctx, 32, 24, 11);
    voiceLightGlare(ctx, 15, 22, 4);
    voiceLightGlare(ctx, 16, 34, 4);
}

// Draws sunspot glares on power light by lowering global alpha.
function voiceLightGlare(ctx, x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.globalAlpha = 1;
};

// Detail line beneath the lights.
export function detailLine(ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.lineTo(160, 60);
    ctx.lineTo(180, 40);
    ctx.lineTo(320, 40);
    ctx.strokeStyle = "#707070";
    ctx.stroke();
}

export function screenBackground(ctx) {
    ctx.beginPath();
    ctx.moveTo(20, 80);
    ctx.lineTo(300, 80); // top
    ctx.lineTo(300, 290); // right
    ctx.lineTo(60, 290); // bottom
    ctx.lineTo(20, 260); // corner slant
    ctx.lineTo(20, 80); // left
    ctx.fillStyle = "#EFEFEF";
    ctx.strokeStyle = "#707070";
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.stroke();
}

export function screenDisplay(ctx) {
    ctx.beginPath();
    ctx.moveTo(40, 100);
    ctx.lineTo(280, 100); // top
    ctx.lineTo(280, 250); // right
    ctx.lineTo(65, 250); // bottom
    ctx.lineTo(40, 230); // corner slant
    ctx.lineTo(40, 100); // left
    ctx.fillStyle = "#A3E1F8";
    ctx.strokeStyle = "#707070";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.lineJoin = "round";
    ctx.stroke();
};

export const drawSpeaker = (ctx) => {
    let y = 260;

    for (let i = 0; i < 4; i++) {
        drawLine(ctx, 250, 280, y, "#707070", 2);
        y += 5;
    }
};

export const drawButtonGroup = (ctx) => {
    drawCircle(ctx, blackButton);

    // Red and black lines.
    drawLine(ctx, 80, 120, 350, "#9A0000", 4);
    drawLine(ctx, 130, 170, 350, "#131313", 4);

    // Green rectangle button
    ctx.beginPath();
    ctx.rect(85, 370, 80, 45);
    ctx.fillStyle = "#60B571";
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.stroke();
};

export const thumbPad = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(250, 335);
    ctx.lineTo(275, 335); // top top side
    ctx.lineTo(275, 365); // top right side
    ctx.lineTo(305, 365); // right top side
    ctx.lineTo(305, 390); // right right side
    ctx.lineTo(275, 390); // right bottom side
    ctx.lineTo(275, 420); // bottom right side
    ctx.lineTo(250, 420); // bottom bottom side
    ctx.lineTo(250, 390); // bottom left side
    ctx.lineTo(220, 390); // left bottom side
    ctx.lineTo(220, 365); // left left side
    ctx.lineTo(250, 365); // left top side
    ctx.lineTo(250, 335); // top left side
    ctx.fillStyle = "#131313";
    ctx.fill();
    ctx.strokeStyle = "#131313";
    ctx.stroke();
};