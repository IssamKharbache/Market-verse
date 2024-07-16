export const formatMoney = (amount:number) => {
    return ` $${Intl.NumberFormat("US",{currency:"USD"}).format(amount)}`

}