<template>
  <rule-container>
    <article class="rule" slot-scope="data" v-if="!data.loading">
      <rule-header :rule="data.rule"/>
      <section class="text">
        <h2 class="heading">{{data.rule.ruleText}}</h2>
      </section>
      <section class="rulesets">
        <h4 class="heading">Sets</h4>
        <ul v-if="data.rule.rulesets">
          <li v-for="ruleset in data.rule.rulesets" :key="ruleset.id">
            <router-link :to="{name: 'Ruleset', params: {id: ruleset.id}}">{{ruleset.name}}</router-link>
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
  </rule-container>
</template>

<script src="./single.js"></script>
<style src="./single.scss" lang="scss" scoped></style>