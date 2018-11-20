const bill = {
    state: {
       total:[{
        name: "支付宝借呗",
        total: "39500",
        rest: "27500",
        owe: "12000"
      }]
    },
    mutations: {
        getTotals(state) {
            state.total = !state.total
        }
    }
}

export default bill
