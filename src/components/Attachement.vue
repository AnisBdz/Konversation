<template>
    <a type="button" class="konversation-message-attachement" :href="href" v-html="label"></a>
</template>

<script>
export default {
    props: ['href', 'label']
}
</script>

<style lang="scss">
.konversation {
    .konversation-message {
        .konversation-message-attachement {
            display: block;
            background: white;
            border-radius: 5px;
            padding: 5px 10px;
            color: black;
            text-decoration: none;
            margin-top: 10px;
        }
    }
}
</style>
