<template>
  <li class="item">
    <v-touch class="link" ref="link"
      v-on:panstart="handlePanStart"
      v-on:panmove="handlePanMove"
      v-on:panend="handlePanEnd"
    >
      <slot name="item"></slot>
    </v-touch>
    <ul :class="['sub-menu', dragDirection]">
      <slot name="menu"></slot>
    </ul>
  </li>
</template>

<script src="./touch-list-item.js"></script>
<style src="./touch-list-item.scss" lang="scss" scoped></style>
