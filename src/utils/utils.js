import Vue from 'vue'

export function showError(e) {    

    if(e && e.response && e.response.data) {
        console.log('entrei no if: ', e.response.data)
        Vue.toasted.global.defaultError({ msg: e.response.data.payload })
    } else if(typeof e === 'string') {
        console.log('entrei no else if: ', e.response.data)
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()
    }
}

export default { showError }