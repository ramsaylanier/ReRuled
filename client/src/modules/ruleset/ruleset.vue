<template>
  <article class="ruleset">
    <ruleset-header 
      :ruleset="ruleset"
      :onMenuToggle="handleMenuToggle"
      :onRemove="handleRemoveItemsFromRuleset"
      :menuOpen="menuOpen"
    />
    <section class="sub-header">
    <h2 class="heading">{{ruleset.name}}</h2>
    </section>
    <section class="rules">
      <transition-group
        name="rule-list"
        v-on:before-enter="beforeEnterRuleset"
        v-on:enter="enterRuleset"
        v-on:leave="leaveRuleset"
        appear
        tag="ul"
        class="rule-list"
        v-if="ruleset.rules"
      >
        <li class="rule-list-item"
          v-for="(rule, index) in ruleset.rules"
          :key="rule.id"
          :class="rule.categories[0].toLowerCase()"
          :data-index="index"
        >
          <router-link  class="rule" :to="{
            name: 'Rule',
            params: {ruleId: rule.id},
            query: $route.query}
          ">
            <rule-text :text="rule.ruleText"/>
          </router-link>
          <div class="action">
            <transition
              v-bind:css="false"
              v-on:enter="enter"
              v-on:leave="leave"
            >
              <checkbox v-if="menuOpen" :onCheck="(isChecked) => handleCheckRule(rule, isChecked)"/>
              <rule-category v-else :category="rule.categories[0]"/>
            </transition>
          </div>
        </li>
      </transition-group>
    </section>
  </article>
</template>

<script src="./ruleset.js"></script>
<style src="./ruleset.scss" lang="scss" scoped></style>