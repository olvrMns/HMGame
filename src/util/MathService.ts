import Coordinate from "../entities/Coordinate";

export default class MathService {

    public static getSlope(c1: Coordinate, c2: Coordinate): number {
        return (c2.y - c1.y)/(c2.x - c1.x);
    }

    public static getInitialY(c1: Coordinate, slope: number): number {
        return c1.y - (slope*c1.x);
    }
    
}