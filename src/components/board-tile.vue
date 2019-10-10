<template>
  <!-- :class="{'isMoving': pastBoard[rowIndex][cIndex] !== item }" -->

  <span :class="{'isChanged': tile > 0  }" :value="tile" class="tile">{{tile != 0 ? tile : null}}</span>
</template>
<script>
export default {
  name: "BoardTile",
  props: {
    tile: {
      type: Number,
      default: 0
    }
  }
};
</script>

