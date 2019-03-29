<template>
    <button type="button" class="konversation-question-send-button" @click="send">Send</button>
</template>

<script>
export default {
    methods: {
        send() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.konversation {
    .konversation-question {
        .konversation-question-send-button {
            padding: 10px;
            background: white;
            border: 2px solid #ddd;
            color: #888;
            border-radius: 5px;
            cursor: pointer;

            &:focus {
                outline: none;
            }
        }
    }
}
</style>
