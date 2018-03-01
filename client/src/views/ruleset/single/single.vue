<template>
  <ruleset-container>
    <article class="ruleset" slot-scope="data" v-if="!data.loading">
      <ruleset-header :ruleset="data.ruleset"/>
      <section class="text">
        <h2 class="heading">{{data.ruleset.name}}</h2>
      </section>
      <section class="rules">
        <ul v-if="data.ruleset.rules">
          <li v-for="rule in data.ruleset.rules" :key="rule.id">
            <router-link :to="{name: 'Rule', params: {ruleId: rule.id}}">{{rule.ruleText}}</router-link>
          </li>
        </ul>
      </section>
      <ul class="menu">
        <li class="menu-item">
          <button class="button" @click="handleDelete">
            <svg class="icon">
              <use xlink:href="#delete-icon"/>
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
        <ul v-if="me.rulesCreated.length > 0">
          <li v-for="rule in me.rulesCreated" :key="rule.id" @click="() => handleAddToRuleset(rule)">
            {{rule.ruleText}}
          </li>
        </ul>

        <div v-else>
          <p>You don't have any ruleset created for this game.</p>
          <router-link :to="{name: 'Create Ruleset'}">Create One</router-link>
        </div>
      </popover>
    </article>
  </ruleset-container>
</template>

<script src="./single.js"></script>
<style src="./single.scss" lang="scss" scoped></style>