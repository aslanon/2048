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
  color: #2c3e50;
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
.jc-center {
  justify-content: center;
}

%btn-style {
  outline: none;
  border: 0;
  font-size: 1rem;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  cursor: pointer;
  box-shadow: 0 5px #2a48ce;
  transition: 0.21s ease;
  &:hover {
    box-shadow: 0 5px #3150db;
  }
  &:active {
    box-shadow: inset 0 3px 0px 1px #1a3cd2, 0 5px #3c60ff;
  }
}

.btn {
  @extend %btn-style;
  &.blue {
    background: rgb(60, 96, 255);
    color: White;
  }
}

@for $row from 0 through 3 {
  @for $column from 0 through 3 {
    .position_#{$row}_#{$column}:not(.isMoving) {
      top: 110px * $row + 5px;
      left: 110px * $column + 5px;
    }
  }
}

@for $fromRow from 0 through 3 {
  @for $toRow from 0 through 3 {
    $name: row_from_#{$fromRow}_to_#{$toRow};

    @if $fromRow == $toRow {
      .#{$name} {
        top: 110px * $toRow + 5px;
      }
    } @else {
      .#{$name} {
        animation-duration: 0.2s;
        animation-name: $name;
        animation-fill-mode: forwards;
      }

      @keyframes #{$name} {
        from {
          top: 110px * $fromRow + 5px;
        }
        to {
          top: 110px * $toRow + 5px;
        }
      }
    }
  }
}

@for $fromColumn from 0 through 3 {
  @for $toColumn from 0 through 3 {
    $name: column_from_#{$fromColumn}_to_#{$toColumn};

    @if $fromColumn == $toColumn {
      .#{$name} {
        left: 110px * $toColumn + 5px;
      }
    } @else {
      .#{$name} {
        animation-duration: 0.2s;
        animation-name: $name;
        animation-fill-mode: forwards;
      }

      @keyframes #{$name} {
        from {
          left: 110px * $fromColumn + 5px;
        }
        to {
          left: 110px * $toColumn + 5px;
        }
      }
    }
  }
}
</style>
