<template>
  <div id="app">
    <board />
  </div>
</template>

<script>
import Board from "./components/board.vue";

export default {
  name: "app",
  components: {
    Board
  }
};
</script>

<style lang="scss">
@import url("./assets/base.scss");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--color-1);
  margin-top: 60px;
}

.grid {
  display: grid;
  width: 100%;
  .grid-row {
    grid-template-rows: auto;
    &.gap-m {
      grid-row-gap: 0.5rem;
    }
    &.gap-l {
      grid-row-gap: 1rem;
    }
  }
  .grid-col {
    grid-template-columns: auto;
    &.c1 {
      grid-template-columns: 1fr;
    }
    &.c2 {
      grid-template-columns: 1fr 1fr;
    }
    &.c-auto-auto {
      grid-template-columns: auto auto;
    }
    &.gap-m {
      grid-column-gap: 0.5rem;
    }
    &.gap-l {
      grid-column-gap: 1rem;
    }
  }
}

.ai-center {
  align-items: center;
}
.ai-fs {
  align-items: flex-start;
}
.ai-fe {
  align-items: flex-end;
}
.jc-center {
  justify-content: center;
}

%btn-style {
  outline: none;
  border: 0;
  font-size: 1rem;
  border-radius: 1rem;
  height: 40px;
  width: 100%;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 5px var(--blue-2);
  transition: 1.21s ease;
  &:hover {
    box-shadow: 0 5px var(--blue-3);
  }
  &:active {
    box-shadow: inset 0 3px 0px 1px var(--blue-2), 0 5px var(--blue);
  }
}

.btn {
  @extend %btn-style;
  &.blue {
    background: var(--blue);
    color: var(--color-2);
  }
}
</style>
