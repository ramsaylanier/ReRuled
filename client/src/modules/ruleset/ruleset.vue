<template>
  <article class="ruleset">
    <ruleset-header :ruleset="ruleset"/>
    <section class="sub-header">
      <h2 class="heading">{{ruleset.name}}</h2>

      <button class="menu-toggle" @click="handleMenuToggle">
        <svg class="icon">
          <use xlink:href="#dots-icon"/>
        </svg>
      </button>
    </section>
    <section class="rules">
      <ul class="rule-list" v-if="ruleset.rules">
        <list-item
          v-for="rule in ruleset.rules"
          :key="rule.id"
          :class="rule.categories[0].toLowerCase()"
        >
          <div class="rule">
            <rule-category :category="rule.categories[0]"/>
            <rule-text :text="rule.ruleText"/>
          </div>
          <div class="action">
            <input type="checkbox" hidden/>
            <button>
              <svg class="icon">
                <use xlink:href="#checkbox-icon"/>
              </svg>
            </button> 
          </div>
        </list-item>
      </ul>
    </section>
  </article>
</template>

<script src="./ruleset.js"></script>
<style src="./ruleset.scss" lang="scss" scoped></style>