var video = '';
var Status = '';
var objects = [];

function preload()
{
    video = createVideo('RoadToFuture.mp4');
    video.hide();
}

function setup()
{
    canvas = createCanvas(500, 400);
    canvas.center();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = 'Status: Object Detection has started';
}

function modelLoaded()
{
    console.log('model has been loaded')
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function draw()
{
    image(video, 0, 0, 500, 400);

    if(Status != '')
    {
        objectDetector.detect(video, gotResults);

        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("num_of_objects").innerHTML = "The number of objects being detected is " + objects.length;
            document.getElementById("status").innerHTML = 'COCOSSD is working hard right now...';

            fill('#fcc203')
            text(objects[i].label, objects[i].x+15, objects[i].y+15)
            noFill()
            stroke('#fcc203')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
        }
    }
}

function gotResults(error, results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);

    objects = results;
}