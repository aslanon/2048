<template>
  <span class="cell">{{''}}</span>
</template>

<script>
export default {
  name: "BoardCell"
};
</script>

<style lang="scss" scoped>
.cell {
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
}
</style>