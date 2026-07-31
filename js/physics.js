const engine = Matter.Engine.create();
const world  = engine.world;

const render = Matter.Render.create({
    element: document.getElementById("physics-playground"),
    engine: engine,
    options: {
        width: 600,
        height: 400,
        wireframes: false,
        background: "transparent"
    }
});

const goober = Matter.Bodies.rectangle(
    300,
    100,
    80,
    80,
    {
        render: {
            sprite: {
                texture: "assets/goober.png",
                xScale: 0.12,
                yScale: 0.12
            }
        }
    }
);

Matter.Composite.add(world, goober);

const tankWidth     = 600;
const tankHeight    = 400;
const wallThickness = 30;

const wallOptions = {
    isStatic: true,
    render: { visible: false }
};

const floor  = Matter.Bodies.rectangle(
    tankWidth / 2,
    tankHeight - wallThickness / 2,
    tankWidth,
    wallThickness,
    wallOptions
);

const ceiling = Matter.Bodies.rectangle(
    tankWidth / 2,
    wallThickness / 2,
    tankWidth,
    wallThickness,
    wallOptions
);

const leftWall = Matter.Bodies.rectangle(
    wallThickness / 2,
    tankHeight / 2,
    wallThickness,
    tankHeight,
    wallOptions
);

const rightWall = Matter.Bodies.rectangle(
    tankWidth - wallThickness / 2,
    tankHeight / 2,
    wallThickness,
    tankHeight,
    wallOptions
);

Matter.Composite.add(world, [
    floor,
    ceiling,
    leftWall,
    rightWall
]);

Matter.Render.run(render);

const runner = Matter.Runner.create();
Matter.Runner.run(runner, engine);

const mouse           = Matter.Mouse.create(render.canvas);

const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.8,
        damping: 0.2,
        render: {
            visible: false
        }
    }
});

render.mouse = mouse;

Matter.Composite.add(world, mouseConstraint);

Matter.Events.on(engine, "beforeUpdate", function() {
    const halfWidth  = 40;
    const halfHeight = 40;

    const minX = wallThickness + halfWidth;
    const maxX = tankWidth - wallThickness - halfWidth;
    const minY = wallThickness + halfHeight;
    const maxY = tankHeight - wallThickness - halfHeight

    Matter.Body.setPosition(goober, {
        x: Math.max(minX, Math.min(maxX, goober.position.x)),
        y: Math.max(minY, Math.min(maxY, goober.position.y))
    });
});
