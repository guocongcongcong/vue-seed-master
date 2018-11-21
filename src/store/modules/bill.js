const bill = {
    state: {
       info:[{
        name: "",
        total: "",
        rest: "",
        owe: ""
      }]
    },
    mutations: {
        getBillInfo(info,sums) {
            info.name = sums[0];
            info.total = sums[1];
            info.rest = sums[2];
            info.owe = sums[3];
          },
    }
}

export default bill
