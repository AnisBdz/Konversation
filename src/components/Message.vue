<template>
    <div class="konversation-message" :class="`konversation-message-${type}`">
        <transition-group name="fade">
            <span key="avatar"  v-show="show" class="konversation-message-avatar" v-html="avatar"></span>
            <span key="content" v-show="show" class="konversation-message-content">
                {{ content }}
                <Attachement v-for="attachement, i in attachements" :href="attachement.href" :label="attachement.label" :key="i" />
            </span>
        </transition-group>
    </div>
</template>

<script>
import Attachement from './Attachement.vue'

export default {
    components: { Attachement },
    props: ['type', 'content', 'avatar', 'attachements'],

    data() {
        return {
            show: false
        }
    },

    mounted() {
        this.show = true
    }
}
</script>

<style lang="scss">

.konversation {
    .konversation-message {
        display: flex;

        &.konversation-message-bot > span {
            width: 100%;
            display: block;
            display: flex;
            flex-direction: row-reverse;
        }

        .konversation-message-avatar {
            margin: 10px 0;
        }

        .konversation-message-content {
            display: inline-block;
            border-radius: 10px;
            background: #efefef;
            padding: 10px;
            max-width: 300px;
            top: 0;
            margin: 0 10px;
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
