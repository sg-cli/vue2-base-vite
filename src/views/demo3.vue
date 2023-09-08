<template>
  <div id="container"></div>
</template>

<script>
import G6 from "@antv/g6";

export default {
  name: "G6Demo",
  mounted() {
    this.initTree();
  },
  methods: {
    initTree() {
 
      const data = {
        nodes: [
          {
            id: "阶段一",
            label: "阶段一",
            level: "ROOT",
            jieduan:"ONE",
            children: [
          {
            id: "A1",
            label: "测试",
            children: [
              { id: "A11" },
              { id: "A12" },
              { id: "A13" },
              { id: "A14" },
            ],
          },
          {
            id: "A2",
            children: [
              {
                id: "A21",
                children: [
                  {
                    id: "A211",
                    children: [
                      { id: "A2111" },
                      { id: "A2112" },
                      { id: "A2113" },
                      { id: "A2114" },
                    ],
                  },
                  { id: "A212" },
                ],
              },
              {
                id: "A22",
              },
            ],
          },
          {
            id: "A3",
            children: [
              {
                id: "A31",
                children: [{ id: "A311" }, { id: "A312" }],
              },
              {
                id: "A32",
              },
            ],
          },
        ],
          },
          {
            id: "阶段二",
            label: "阶段二",
            level: "ROOT",
          },
          {
            id: "阶段三",
            label: "阶段三",
            level: "ROOT",
          },
          {
            id: "阶段四",
            label: "阶段四",
            level: "ROOT",
          },
          {
            id: "阶段五",
            label: "阶段五",
            level: "ROOT",
          },
          {
            id: "阶段六",
            label: "阶段六",
            level: "ROOTONE",
          },
        ],
        edges: [
          { source: "阶段一", target: "阶段二" },
          { source: "阶段二", target: "阶段三" },
          { source: "阶段三", target: "阶段四" },
          { source: "阶段四", target: "阶段五" },
          // { source: "阶段五", target: "阶段六"},
        ],
      };

      const graph = new G6.Graph({
        container: "container",
        width: window.innerWidth,
        height: window.innerHeight - 100,
        layout: {
          pipes: [
            {
              type: "dagre",
              rankdir: "LR",
              nodesep: window.innerHeight - 100,
              ranksep: 10, //节点间的距离
              begin: [120, 400],
              nodesFilter: function nodesFilter(node) {
                let flag = ["ROOT"].includes(node.level);
                return flag;
              },
            }
          ],
        },
       

        defaultNode: {
          size: [200, 60],
          type: "rect",
        },
        modes: {
          default: [
            // "drag-canvas",
            // "zoom-canvas",
          ], //可以拖动画布
        },
      });
      graph.data(data);
      graph.render();
    },
  },
};
</script>
<style>
#container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
