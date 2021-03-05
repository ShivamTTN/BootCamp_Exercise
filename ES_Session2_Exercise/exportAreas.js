const PI = 3.14;
export function circleArea(r)
{
    return PI * r * r; 

}
export function rectArea(l,b)
{
    return l * b;
}
export function cylinArea(r,h)
{
    return (2 * PI * r * h) + (2 * PI * r * r); 
}