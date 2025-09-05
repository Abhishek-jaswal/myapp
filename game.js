const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Game settings
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 100;
const BALL_RADIUS = 10;
const PADDLE_MARGIN = 20;
const PLAYER_SPEED = 5;
const AI_SPEED = 3.5;

// Game state
let playerY = canvas.height/2 - PADDLE_HEIGHT/2;
let aiY = canvas.height/2 - PADDLE_HEIGHT/2;
let ballX = canvas.width/2;
let ballY = canvas.height/2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);

// Mouse control for player paddle
canvas.addEventListener('mousemove', function(evt) {
    const rect = canvas.getBoundingClientRect();
    let mouseY = evt.clientY - rect.top;
    playerY = mouseY - PADDLE_HEIGHT/2;
    // Clamp paddle within canvas
    if (playerY < 0) playerY = 0;
    if (playerY + PADDLE_HEIGHT > canvas.height) playerY = canvas.height - PADDLE_HEIGHT;
});

// Draw everything
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw middle line
    ctx.strokeStyle = '#fff3';
    ctx.setLineDash([8, 16]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw paddles
    ctx.fillStyle = '#fff';
    ctx.fillRect(PADDLE_MARGIN, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(canvas.width - PADDLE_MARGIN - PADDLE_WIDTH, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, BALL_RADIUS, 0, Math.PI*2);
    ctx.fill();
}

// Update game state
function update() {
    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top/bottom walls
    if (ballY - BALL_RADIUS < 0) {
        ballY = BALL_RADIUS;
        ballSpeedY *= -1;
    }
    if (ballY + BALL_RADIUS > canvas.height) {
        ballY = canvas.height - BALL_RADIUS;
        ballSpeedY *= -1;
    }

    // Ball collision with player paddle
    if (
        ballX - BALL_RADIUS < PADDLE_MARGIN + PADDLE_WIDTH &&
        ballY > playerY &&
        ballY < playerY + PADDLE_HEIGHT
    ) {
        ballX = PADDLE_MARGIN + PADDLE_WIDTH + BALL_RADIUS;
        ballSpeedX *= -1;
        // Add a bit of randomness
        ballSpeedY += (Math.random() - 0.5) * 2;
    }

    // Ball collision with AI paddle
    if (
        ballX + BALL_RADIUS > canvas.width - PADDLE_MARGIN - PADDLE_WIDTH &&
        ballY > aiY &&
        ballY < aiY + PADDLE_HEIGHT
    ) {
        ballX = canvas.width - PADDLE_MARGIN - PADDLE_WIDTH - BALL_RADIUS;
        ballSpeedX *= -1;
        // Add a bit of randomness
        ballSpeedY += (Math.random() - 0.5) * 2;
    }

    // Ball out of bounds - reset
    if (ballX < 0 || ballX > canvas.width) {
        reset();
    }

    // AI paddle movement (simple: follow the ball)
    if (aiY + PADDLE_HEIGHT/2 < ballY - 15) {
        aiY += AI_SPEED;
    } else if (aiY + PADDLE_HEIGHT/2 > ballY + 15) {
        aiY -= AI_SPEED;
    }
    // Clamp AI paddle within canvas
    if (aiY < 0) aiY = 0;
    if (aiY + PADDLE_HEIGHT > canvas.height) aiY = canvas.height - PADDLE_HEIGHT;
}

// Reset ball and paddles
function reset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
    // Ball direction is random
    ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
    aiY = canvas.height/2 - PADDLE_HEIGHT/2;
}

// Main game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();