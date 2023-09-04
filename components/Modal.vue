<script setup>
import VueFeather from 'vue-feather';
</script>

<script>
export default {
    data: () => ({
        fillcolor: "none",
    }),
    props: {
        name: String,
    },
    mounted() {
        console.log('e')

        function closeModal() {
            this.removeLocalStorage('ui_modal')
        }
    }, 
    method: {
        setLocalStorage(key, value) {
            if (process.client) {
                localStorage.setItem(key, value)
            }
        },
        getLocalStorage(key) {
            if (process.client) {
                return localStorage.getItem(key);
            }
        },
        removeLocalStorage(key) {
            if (process.client) {
                return localStorage.removeItem(key);
            }
        }
    }
}
</script>

<template>
    <div class="modal" v-if="this.name === 'settings'">
        <div class="modalHeader">
            <div class="modalText">
                <h2>Settings</h2>
            </div>
            <div class="modalButtons">
                <button @click="closeModal()" class="btn modalClose">
                    <Icon type="x" />
                </button>
            </div>
        </div>
        <div class="modalContent">
            <h4 class="settingHeading">Theming</h4>
            <div>
                <p>Accent Color</p>
                <p>The color used for highlighting important content, selection, and more.</p>
            </div>
        </div>
    </div>
</template>

<style>
.settingHeading {
    color: var(--txt1);
}

.modal {
    background-color: var(--bg1);

    height: 70%;
    width: 550px;

    border-radius: 10px;
}

.modalContent {
    overflow-y: scroll;

    padding-left: 15px;
    padding-right: 15px;
}

.modalHeader {
    display: flex;
    align-items: center;
    align-content: center;
}

.modalText {
    flex-grow: 3;

    display: flex;
    align-items: center;
    align-content: center;

    padding: 15px;

    color: var(--txt1);
}

.modalClose {
    background-color: transparent;
    border: none;

    display: flex;
    align-items: center;
    align-content: center;

    padding: 15px;

    color: var(--txt1);
}
.modalClose:hover {
    color: var(--txt2);
}
</style>