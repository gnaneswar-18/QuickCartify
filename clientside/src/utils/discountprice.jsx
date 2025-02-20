export const discountprice=(price,dis)=>{
    return Math.floor(Number(price)-(Number(price)*Math.abs(Number(dis)))/100)
}