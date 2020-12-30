<template>
  <div class="wrapper">
    <el-card class="result-card" v-loading="isLoading">
      <template #header>
        <div class="date-select">
          <el-date-picker
            v-model="startDate"
            type="year"
            placeholder="开始年份"
            value-format="yyyy"
          />
          -
          <el-date-picker
            v-model="endDate"
            type="year"
            placeholder="结束年份"
            value-format="yyyy"
          />
        </div>
      </template>
      <div id="main" style="width: 600px; height:400px;"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import {
  EchartsItemEdge,
  EchartsItemNode,
  EchartsLink,
  EchartsNode
} from "@/interfaces/echarts";
import { errorMsg } from "@/utils/message";
import ResearchersAPI from "@/api/researchers";

export default Vue.extend({
  name: "ResearcherPartnership",
  props: {
    id: String,
    impact: String
  },
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker
  },
  data() {
    const currentYearStr = new Date().getFullYear().toString();
    return {
      isLoading: false,
      startDate: currentYearStr,
      endDate: currentYearStr,
      // 关系图
      echartsInstance: null,
      nodes: [] as EchartsNode[],
      links: [] as EchartsLink[]
    };
  },
  watch: {
    startDate() {
      this.fetchPartnership(this.id, this.startDate, this.endDate);
    },
    endDate() {
      this.fetchPartnership(this.id, this.startDate, this.endDate);
    },
    id() {
      this.fetchPartnership(this.id, this.startDate, this.endDate);
      // 为了关系图的完整体验，暂时先不回到详情页，但是要刷新关系图
      // this.$emit("refresh");
      this.drawRelationGraph(this.echartsInstance, this.nodes, this.links);
    }
  },
  mounted() {
    this.echartsInstance = echarts.init(document.getElementById("main"));
    // 需要强制类型转换
    ((this.echartsInstance as unknown) as EchartsInstance).on("click", item => {
      // 点击与当前结点不同的结点时更新
      const isDifferentNode = item.data.id !== this.id;
      if (item.dataType === "node" && isDifferentNode) {
        this.$router.push(`/researchers/${item.data.id}`);
      }
    });
    this.fetchPartnership(this.id, this.startDate, this.endDate);
  },
  methods: {
    async fetchPartnership(id: string, start: string, end: string) {
      if (!start) {
        errorMsg("请选择开始年份");
      } else if (!end) {
        errorMsg("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        errorMsg("开始年份不能在结束年份之后");
      } else {
        this.isLoading = true;
        try {
          const partnershipRes = (
            await ResearchersAPI.getPartnersByTimeRange(id, start, end)
          ).data;
          // 如果存在 partners 再获取
          if (
            partnershipRes.partners &&
            partnershipRes.impacts &&
            partnershipRes.weight
          ) {
            // 相加获取权重
            const origWeights = partnershipRes.weight;
            const weights = partnershipRes.weight.map(t => t[0] + t[1]);
            // 绘制关系图，要包括自己
            const impacts = [Number(this.impact), ...partnershipRes.impacts];
            this.nodes = [this.id, ...partnershipRes.partners].map((id, i) => ({
              id,
              name: "加载中...",
              symbolSize: Math.min(Math.max(impacts[i] * 10, 10), 40),
              value: impacts[i]
            }));
            this.links = partnershipRes.partners.map((id, i) => ({
              source: this.id,
              target: id,
              value: weights[i],
              weight: origWeights[i]
            }));
            this.drawRelationGraph(
              this.echartsInstance,
              this.nodes,
              this.links
            );
            // 获取进一步的数据，要包括自己
            const partnershipBasicInfoReqs = [
              this.id,
              ...partnershipRes.partners
            ].map(id => ResearchersAPI.getBasicInfoById(id));
            setTimeout(async () => {
              const partnershipRes = await Promise.all(
                partnershipBasicInfoReqs
              );
              const partnershipInfo = partnershipRes.map(res => res.data);
              this.nodes.forEach((node, i) => {
                node.name = partnershipInfo[i].name;
              });
              this.drawRelationGraph(
                this.echartsInstance,
                this.nodes,
                this.links
              );
              this.isLoading = false;
            }, 0);
          } else {
            this.drawRelationGraph(this.echartsInstance, [], []);
            this.isLoading = false;
          }
        } catch (e) {
          console.log(e.toString());
          this.isLoading = false;
        }
      }
    },
    drawRelationGraph(
      echartInstance: EchartsInstance | null,
      nodes: EchartsNode[],
      links: EchartsLink[]
    ) {
      const isGraphEmpty = nodes.length === 0 && links.length === 0;
      const noDataOption = {
        title: {
          text: "暂无数据",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16
          }
        }
      };
      const normalOption = {
        tooltip: {
          formatter(item: EchartsItemNode | EchartsItemEdge) {
            if (item.dataType === "node") {
              return `
              <div>
                <p>${item.data.name}</p>
                <p>影响力: ${item.data.value}</p>
              </div>`;
            } else {
              // weight 是一个二元组 [合作，共引]
              return `
              <div>
                <p>合作: ${item.data.weight[0]}</p>
                <p>共引: ${item.data.weight[1]}</p>
              </div>`;
            }
          }
        },
        series: [
          {
            type: "graph",
            layout: "force",
            data: nodes,
            links,
            draggable: true,
            label: {
              position: "right"
            },
            force: {
              edgeLength: [20, 100]
            }
          }
        ]
      };
      const option = isGraphEmpty ? noDataOption : normalOption;
      if (echartInstance) {
        echartInstance.setOption(option);
      }
    }
  }
});
</script>

<style scoped lang="less">
.wrapper {
  min-height: 70vh;

  .date-select {
    text-align: center;
    margin-bottom: 20px;
  }

  .result-card {
    margin-bottom: 40px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
