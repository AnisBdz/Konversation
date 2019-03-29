<template>
    <div class="konversation-question-input-file">
        <input type="file" ref="file" clas="konversation-question-input-file-input"/>
        <SendButton @click="done"/>
        <span v-if="uploading" class="konversation-question-input-file-progress">{{ progress }}%</span>
    </div>
</template>

<script>
import SendButton from './SendButton.vue'
import axios from 'axios'

export default {
    props: ['api'],
    components: { SendButton },

    data() {
        return {
            uploading: false,
            progress: 0
        }
    },

    methods: {
        done() {
            let data = new FormData()
            data.append('file', this.$refs.file.files[0])
            this.uplaoding = true
            return axios.post(this.api, data, {
                headers: { 'Content-Type': 'multipart/form-data' },

                // update progress
                onUploadProgress: e => {
    				this.progress = Math.round((e.loaded * 100) / e.total)
    			}
            })

            .then(res => res.data)
            .then(href => {
                this.uploading = false
                this.$emit('response', href)
            })
        }
    }
}
</script>

<style lang="scss">
.konversation {
    .konversation-question {
        .konversation-question-input-file {
            .konversation-question-input-file-input {
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
