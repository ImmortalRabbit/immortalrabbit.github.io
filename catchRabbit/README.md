Class RabbitHole{
    x, y, active = false
}

Class Game {
    grid 5x5
        render 25 objects

    holes List<Rabbit>
    CurrentActiveHole
    score
    record

    functions 
        random current active hole each every 3 seconds 
        click event to count score and to create a new active hole
        render
        
}