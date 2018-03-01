<template>
  <rule-container>
    <div class="rule" slot-scope="data" v-if="!data.loading">
      <rule-header :rule="data.rule"/>
      <div class="body">
        <h3 class="text">{{data.rule.ruleText}}</h3>
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

        <ul v-if="data.rule.rulesets">
          <li v-for="ruleset in data.rule.rulesets" :key="ruleset.id">
            {{ruleset.name}}
          </li>
        </ul>
      </div>

      <!-- <popover v-if="showPopover" :handleClose="() => showPopover = false">
        <ul v-if="me.rulesetsCreated.length > 0">
          <li v-for="ruleset in me.rulesetsCreated" :key="ruleset.id" @click="() => handleAddToRuleset(ruleset)">
            {{ruleset.name}}
          </li>
        </ul>

        <div v-else>
          <p>You don't have any ruleset created for this game.</p>
          <router-link :to="{name: 'Create Ruleset'}">Create One</router-link>
        </div>
      </popover> -->
    </div>
  </rule-container>
</template>

<script src="./single.js"></script>
<style src="./single.scss" lang="scss" scoped></style>