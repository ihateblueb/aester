<script setup>
import VueFeather from "vue-feather";
import Icon from "./Icon.vue";
</script>

<script>
export default {
    props: {
        checked: String,
    },
};
</script>

<template>
    <div>
        <div class="formCheckbox checked" v-if="checked === 'true'">
            <Icon type="check" size="16px" />
        </div>
        <div class="formCheckbox" v-else>
            <Icon type="minus" size="16px" />
        </div>
    </div>
</template>

<style>
.formCheckbox {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: 5px;

    height: 22px;
    width: 22px;

    background-color: var(--bg3);

    border-radius: 7px;
    border: 2px solid var(--bg4);

    & .vue-feather {
        margin-top: -4px;
    }

    &.checked {
        border-color: var(--accent1);
        background-color: var(--accent1-25);
        color: var(--accent1);
    }
}
</style>
