<template>
  <!-- :class="{'isMoving': pastBoard[rowIndex][cIndex] !== item }" -->

  <span :value="value" class="tile">{{value != 0 ? value : null}}</span>
</template>
<script>
export default {
  name: "Tile",
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.tile {
  width: 100px;
  height: 100px;
  margin: 5px;
  line-height: 90px;
  display: inline-block;
  font-size: 55px;
  font-weight: 700;
  text-align: center;
  vertical-align: middle;
  border-radius: 7px;
  color: #766;
  background-color: #dcb;
  user-select: none;
  position: relative;

  &.isChanged {
    // animation: changed 0.25s ease both;
  }

  &[value="2"] {
    background: white;
  }
  &[value="4"] {
    background: #eec;
  }
  &[value="8"] {
    background: #fb8;
    color: #ffe;
  }
  &[value="16"] {
    background: #f96;
    color: #ffe;
  }
  &[value="32"] {
    background: #ff864a;
    color: #ffe;
  }
  &[value="64"] {
    background: #f53;
    color: #ffe;
  }
  &[value="128"] {
    background: #ec7;
  }
}
</style>