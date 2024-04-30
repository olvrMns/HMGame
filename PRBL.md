# Problèmes

## Getting ThresholdCoordinate (on line creation)
1) get the endPoint from the linearRepresentation(ex: (50, -50)).
2) get the level specific attribute that dictates the interception area [distanceFromEndPoint|framesToIntercept] (not determined yet).
3) if (startCoordinate.x == endCoordinate.x) OR (startCoordinate.y == endCoordinate.y), then return thresholdCoordinates with only
   x OR y changed while considering the [Orientation] of the axis.

4) ### ELSE
cases: 
(50, -50) <---- (-250, -300)
(50, 50)  <---- (0, 300)
(0, -70)  <---- (270, -260)

## make a function to see threshold distance

## keyboard events (class?)