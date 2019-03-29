<template>
    <div class="konversation-question-input-choice">
        <button v-for="choice in choices" class="konversation-question-input-choice-button" type="button" name="button" @click="choose(choice)">{{ choice.label }}</button>
    </div>
</template>

<script>
export default {
    props: ['choices'],

    methods: {
        choose(choice) {
            this.$emit('response', choice)
        }
    }
}
</script>

<style lang="scss">
.konversation {
    .konversation-question {
        .konversation-question-input-choice-button {
            padding: 10px;
            background: white;
            border: 2px solid #ddd;
            color: #888;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;

            &:focus {
                outline: none;
            }

        }
    }
}
</style>
