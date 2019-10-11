import { shallowMount } from "@vue/test-utils";
import BoardTile from "@/components/board-tile.vue";

describe("board-tile.vue", () => {
  it("renders props.tile when passed", () => {
    const tile = { value: 0, isMerged: false, isMoved: false, col: 0, row: 0 };
    const wrapper = shallowMount(BoardTile, {
      propsData: tile
    });
    expect(wrapper.props().value).toBe(8);
    expect(wrapper.find("span").text()).toBe(8);
  });
});
