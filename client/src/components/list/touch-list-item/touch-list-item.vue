<template>
  <li class="container">
    <v-touch class="touch" ref="link"
      v-on:panstart="handlePanStart"
      v-on:panmove="handlePanMove"
      v-on:panend="handlePanEnd"
    > 
      <div class="item">
        <slot name="item"></slot>
      </div>
    </v-touch>
    <ul :class="['sub-menu', dragDirection]">
      <slot name="menu"></slot>
    </ul>
  </li>
</template>

<script src="./touch-list-item.js"></script>
<style src="./touch-list-item.scss" lang="scss" scoped></style>
