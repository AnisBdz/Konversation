<template>
    <div class="konversation" :class="{ rtl }">
        <div v-for="item in items" class="konversation-item">
            <Message  v-if="item.type == 'message.bot'"  type="bot"  :content="item.content" :avatar="item.avatar" :attachements="item.attachements"/>
            <Message  v-if="item.type == 'message.user'" type="user" :content="item.content" :avatar="item.avatar" :attachements="item.attachements"/>
            <Question v-if="item.type == 'question'" :content="item.content" :options="item.options" @response="response"/>
        </div>
    </div>
</template>

<script>

import Message from './Message.vue'
import Question from './Question.vue'

export default {
    components: { Message, Question },
    props: ['avatar', 'timeout', 'rtl'],

    name: 'konversation',
    data () {
        return {
            items: [
                // {
                //     type: 'message.bot',
                //     content: 'What is your name?',
                //     avatar: '👨'
                // },
                //
                // {
                //     type: 'question',
                //     content: 'Please type your name: ',
                //     options: {
                //         type: 'text'
                //     }
                // },
                //
                // {
                //     type: 'message.user',
                //     content: 'Anis',
                //     avatar: '👨'
                // },
                //
                // {
                //     type: 'message.bot',
                //     content: 'Thank you',
                //     avatar: '👨'
                // }
            ]
        }
    },

    methods: {

        response(answer) {
            this.$emit('response', answer)
        },

        wait(timeout) {
            return new Promise((resolve, reject) => {
                setTimeout(() => resolve(), timeout)
            })
        },

        say(message, attachements, avatar = this.avatar) {
            return this.wait(this.timeout)
            .then(() => {
                this.items.push({
                    type: 'message.bot',
                    content: message,
                    avatar,
                    attachements
                })

                return Promise.resolve(this)
            })
        },

        ask(question, type = 'text', options) {

            let opts = {
                type
            }

            for (let key in options) {
                opts[key] = options[key]
            }

            return this.wait(this.timeout)
            .then(() => {
                this.items.push({
                    type: 'question',
                    content: question,
                    options: opts
                })

                return new Promise((resolve, reject) => {
                    this.$on('response', answer => {
                        let lastItem = this.items.pop()
                        if (lastItem.type != 'question') this.items.push(lastItem)
                        resolve(answer)
                    })
                })
            })
        },

        respond(message, attachements, avatar = this.avatar) {
            this.items.push({
                type: 'message.user',
                content: message,
                avatar,
                attachements
            })

            return Promise.resolve(this)
        }
    }
}
</script>

<style lang="scss">
    .konversation {
        font-family: monospace;
        padding: 10px;

        .konversation-item {
            margin-bottom: 10px;
        }

        &.rtl {
            direction: rtl;
        }
    }
</style>
