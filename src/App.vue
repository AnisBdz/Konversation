<template>
    <div class="chat" >
        <Konversation ref="conversation" :rtl="true" avatar="👨" timeout="300"/>
    </div>
</template>

<script>

import Konversation from './components/Konversation.vue'

export default {
    components: { Konversation },

    computed: {
        chat() {
            return this.$refs.conversation
        }
    },

    mounted() {

            this.chat
            .say('Hello')
            .then(() =>   this.chat.say('Can i see you?'))
            .then(() =>   this.chat.ask('Please upload a picture of you', 'file', { api: 'http://localhost:3000/profile' }))
            .then(file => this.chat.respond('Here is the file requested', [{ label: '😃 Profile picture', href: file }]))
            .then(() =>   this.chat.say('What is your name?'))
            .then(() =>   this.chat.ask('Please type your name'))
            .then(name => this.chat.respond(`My name is ${name}`))
            .then(() =>   this.chat.say('Nice to meet you!'))
            .then(() =>   this.chat.say('What is your gender?'))
            .then(() =>   this.chat.ask('Please choose your gender', 'choice', { answers: [ { value: 0, label: 'Female' }, { value: 1, label: 'Male' } ]}))
            .then(gndr => this.chat.respond(`I am ${gndr.label}`))
            .then(() =>   this.chat.say('Does not matter anyway'))
            .then(() =>   this.chat.say('Here is a file for you', [{ label: '💾 Confused Cat', href: 'https://media.tenor.com/images/5fb13c894469a7647534f65a9683a1ee/tenor.png' }]))
    }
}
</script>

<style lang="css" scoped>
    .chat {
        max-width: 600px;
    }
</style>
