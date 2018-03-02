<template>
  <article class="rule">
    <rule-header :rule="rule"/>
    <section class="rule-text">
      <rule-text :text="rule.ruleText"/>
    </section>
    <section class="rulesets">
      <h4 class="heading">Sets</h4>
      <ul v-if="rule.rulesets">
        <li v-for="ruleset in rule.rulesets" :key="ruleset.id">
          <router-link :to="{name: 'Ruleset', params: {rulesetId: ruleset.id}}">{{ruleset.name}}</router-link>
        </li>
      </ul>
    </section>
    <ul class="menu">
      <li class="menu-item">
        <button class="button" @click="handleDelete">
          <svg class="icon">
            <use xlink:href="#delete-icon" />
          </svg>
        </button>
      </li>
      <li class="menu-item">
        <button class="button" @click="togglePopover">
          <svg class="icon">
            <use xlink:href="#add-to-ruleset-icon" />
          </svg>
        </button>
      </li>
    </ul>
    <popover v-if="showPopover" :handleClose="() => showPopover = false">
      <ul v-if="me.rulesets">
        <li v-for="ruleset in me.rulesets" :key="ruleset.id" @click="() => handleAddToRuleset(ruleset)">
          {{ruleset.name}}
        </li>
      </ul>

      <div v-else>
        <p>You don't have any ruleset created for this game.</p>
        <router-link :to="{name: 'Create Ruleset'}">Create One</router-link>
      </div>
    </popover>
  </article>
</template>

<script src="./rule.js"></script>
<style src="./rule.scss" lang="scss" scoped></style>