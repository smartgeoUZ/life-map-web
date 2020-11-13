let errorTemp = null

export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.prototype.$message = function (html) {
            // console.log(html)
            this.$toast.success(html)
        }

        Vue.prototype.$error = function (html) {
            // console.log(this.$t('message.hello'))
            // console.log(html.message)
            if(html.message != errorTemp){
                if('Network Error' === html.message){
                    this.$toast.error(this.$t('error.network'))
                }else {
                    this.$toast.error(html)
                }
                errorTemp = html.message
            }
        }

        Vue.prototype.$warning = function (html) {
            // console.log(html)
            this.$toast.error(html)
        }

        Vue.prototype.$notification = function (html) {
            // console.log(html)
            this.$toast.info(html)
        }
    }
}
