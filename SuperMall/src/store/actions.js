const actions = {
  addCart(context,product){
    return new Promise(((resolve, reject) => {
      // 1.查看是否添加过
      // const oldInfo = state.cartList.find(item => item.iid === info.iid)
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === product.iid){
          oldProduct = item;
        }
      }

      // 2.+1或者新添加
      if (oldProduct) {
        context.commit("addCount",oldProduct)
        resolve("当前商品数量加1")
      } else {
        product.count = 1
        product.checked = true
        context.commit("addCartList",product)
        resolve("选购此商品")
      }
    }))

  }
}

export default actions

