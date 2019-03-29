<template>
    <div class="konversation-question">
        <transition-group name="fade">
            <label        key="label" v-show="show" class="konversation-question-label">{{ content }}</label>
            <input-text   key="input" v-show="show" v-if="options.type == 'text'"   @response="response"/>
            <input-choice key="input" v-show="show" v-if="options.type == 'choice'" :choices="options.answers" @response="response"/>
            <input-file   key="input" v-show="show" v-if="options.type == 'file'"   :api="options.api" @response="response"/>
        </transition-group>
    </div>
</template>

<script>
import InputText   from './InputText.vue'
import InputChoice from './InputChoice.vue'
import InputFile   from './InputFile.vue'

export default {
    components: { 'input-text': InputText, 'input-choice': InputChoice, 'input-file': InputFile },
    props: ['content', 'options'],

    data() {
        return {
            show: false
        }
    },

    methods: {
        response(answer) {
            this.$emit('response', answer)
        }
    },

    mounted() {
        this.show = true
    }
}
</script>

<style lang="scss">
.konversation {
    .konversation-question {
        .konversation-question-label {
            display: block;
            margin-bottom: 10px;
        }
    }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>
