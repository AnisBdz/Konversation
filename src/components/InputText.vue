<template>
    <div class="konversation-question-input-text">
        <input type="text" class="konversation-question-input-text-input" v-model="input" @keyup.enter="done" ref="input">
        <SendButton @click="done"/>
    </div>
</template>

<script>
import SendButton from './SendButton.vue'

export default {
    components: { SendButton },
    props: ['value'],

    data() {
        return {
            input: ''
        }
    },

    methods: {
        done() {
            this.$emit('response', this.input)
        }
    }
}
</script>

<style lang="scss">
.konversation {
    .konversation-question {
        .konversation-question-input-text {
            .konversation-question-input-text-input {
                box-sizing: border-box;
                height: 38px;
                border-radius: 5px;
                border: 2px solid #ddd;
                padding: 5px 10px;

                &:focus {
                    outline: none;
                }
            }
        }
    }
}

</style>
