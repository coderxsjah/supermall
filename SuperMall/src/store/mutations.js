const mutations = {
  //已经添加过的商品，添加数量
  addCount(state,product){
    product.count ++;
  },
  //未添加过的商品，添加到队列
  addCartList(state,product){
    state.cartList.push(product)
  },
}

export default mutations

