import Vue from 'vue'

export function showError(e) {    

    if(e && e.response && e.response.data) {
        console.log('entrei no if: ', e.response.data)
        Vue.toasted.global.defaultError({ msg: e.response.data.payload })
    } else if(typeof e === 'string') {
        console.log('entrei no else if: ', e.response.data)
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        console.log('entrei no else: ', e.response.data)
        Vue.toasted.global.defaultError()
    }
}

export function formatDate(date) {
    const dateISO = new Date(date);

    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",  
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };

    const format = new Intl.DateTimeFormat("pt-BR", options);
    const dateBR = format.format(dateISO).replace(",", "");

    return dateBR;
}

export default { showError, formatDate }