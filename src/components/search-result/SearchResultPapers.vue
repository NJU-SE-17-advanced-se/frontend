<template>
  <div class="wrapper">
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
    <el-card v-for="(paper, i) of papersBasicInfo" :key="i" class="result-card">
      <template #header>
        <router-link :to="paper.id">
          <strong>{{ paper.title }}</strong>
        </router-link>
      </template>
      <p>
        <strong>Publication:</strong>
        {{ paper.publication }}, {{ paper.publicationDate }}
      </p>
      <p><strong>Authors:</strong> {{ paper.researchers }}</p>
      <p><strong>Abstract:</strong> {{ getLimitedLengthAbs(paper.abs) }}</p>
      <p><strong>Citation:</strong> {{ paper.citations }}</p>
      <el-button type="primary" class="result-button">详情</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, DatePicker } from "element-ui";
import { PaperBasic } from "@/interfaces/papers";

export default Vue.extend({
  name: "SearchResultPapers",
  props: {
    keyword: String,
    page: Number
  },
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker
  },
  data() {
    const currentYearStr = new Date().getFullYear().toString();
    return {
      startDate: currentYearStr,
      endDate: currentYearStr,
      papersBasicInfo: [] as PaperBasic[]
    };
  },
  watch: {
    keyword() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    },
    page() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    },
    startDate() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    },
    endDate() {
      this.fetchSearchResult(
        this.keyword,
        this.page,
        this.startDate,
        this.endDate
      );
    }
  },
  mounted() {
    this.fetchSearchResult(
      this.keyword,
      this.page,
      this.startDate,
      this.endDate
    );
  },
  methods: {
    // 获取搜索结果
    fetchSearchResult(
      keyword: string,
      page: number,
      start?: string,
      end?: string
    ) {
      if (!start) {
        this.$message.error("请选择开始年份");
      } else if (!end) {
        this.$message.error("请选择结束年份");
      } else if (new Date(start) > new Date(end)) {
        this.$message.error("开始年份不能在结束年份之后");
      } else {
        console.log("fetching", "papers", keyword, page, start, end);
        setTimeout(() => {
          this.papersBasicInfo = [
            {
              id: "6880395",
              title:
                "Who Will Stay in the FLOSS Community? Modeling Participant’s Initial Behavior",
              abs:
                "Motivation: To survive and succeed, FLOSS projects need contributors able to accomplish critical project tasks. However, such tasks require extensive project experience of long term contributors (LTCs). Aim: We measure, understand, and predict how the newcomers' involvement and environment in the issue tracking system (ITS) affect their odds of becoming an LTC. Method: ITS data of Mozilla and Gnome, literature, interviews, and online documents were used to design measures of involvement and environment. A logistic regression model was used to explain and predict contributor's odds of becoming an LTC. We also reproduced the results on new data provided by Mozilla. Results: We constructed nine measures of involvement and environment based on events recorded in an ITS. Macro-climate is the overall project environment while micro-climate is person-specific and varies among the participants. Newcomers who are able to get at least one issue reported in the first month to be fixed, doubled their odds of becoming an LTC. The macro-climate with high project popularity and the micro-climate with low attention from peers reduced the odds. The precision of LTC prediction was 38 times higher than for a random predictor. We were able to reproduce the results with new Mozilla data without losing the significance or predictive power of the previously published model. We encountered unexpected changes in some attributes and suggest ways to make analysis of ITS data more reproducible. Conclusions: The findings suggest the importance of initial behaviors and experiences of new participants and outline empirically-based approaches to help the communities with the recruitment of contributors for long-term participation and to help the participants contribute more effectively. To facilitate the reproduction of the study and of the proposed measures in other contexts, we provide the data we retrieved and the scripts we wrote at https://www.passion-lab.org/projects/developerfluency.html.",
              publication: "32_7004098",
              publicationDate: "2015",
              citations: 33,
              researchers: ["37315742600", "37417468700"]
            },
            {
              id: "6880395",
              title:
                "Who Will Stay in the FLOSS Community? Modeling Participant’s Initial Behavior",
              abs:
                "Motivation: To survive and succeed, FLOSS projects need contributors able to accomplish critical project tasks. However, such tasks require extensive project experience of long term contributors (LTCs). Aim: We measure, understand, and predict how the newcomers' involvement and environment in the issue tracking system (ITS) affect their odds of becoming an LTC. Method: ITS data of Mozilla and Gnome, literature, interviews, and online documents were used to design measures of involvement and environment. A logistic regression model was used to explain and predict contributor's odds of becoming an LTC. We also reproduced the results on new data provided by Mozilla. Results: We constructed nine measures of involvement and environment based on events recorded in an ITS. Macro-climate is the overall project environment while micro-climate is person-specific and varies among the participants. Newcomers who are able to get at least one issue reported in the first month to be fixed, doubled their odds of becoming an LTC. The macro-climate with high project popularity and the micro-climate with low attention from peers reduced the odds. The precision of LTC prediction was 38 times higher than for a random predictor. We were able to reproduce the results with new Mozilla data without losing the significance or predictive power of the previously published model. We encountered unexpected changes in some attributes and suggest ways to make analysis of ITS data more reproducible. Conclusions: The findings suggest the importance of initial behaviors and experiences of new participants and outline empirically-based approaches to help the communities with the recruitment of contributors for long-term participation and to help the participants contribute more effectively. To facilitate the reproduction of the study and of the proposed measures in other contexts, we provide the data we retrieved and the scripts we wrote at https://www.passion-lab.org/projects/developerfluency.html.",
              publication: "32_7004098",
              publicationDate: "2015",
              citations: 33,
              researchers: ["37315742600", "37417468700"]
            },
            {
              id: "6880395",
              title:
                "Who Will Stay in the FLOSS Community? Modeling Participant’s Initial Behavior",
              abs:
                "Motivation: To survive and succeed, FLOSS projects need contributors able to accomplish critical project tasks. However, such tasks require extensive project experience of long term contributors (LTCs). Aim: We measure, understand, and predict how the newcomers' involvement and environment in the issue tracking system (ITS) affect their odds of becoming an LTC. Method: ITS data of Mozilla and Gnome, literature, interviews, and online documents were used to design measures of involvement and environment. A logistic regression model was used to explain and predict contributor's odds of becoming an LTC. We also reproduced the results on new data provided by Mozilla. Results: We constructed nine measures of involvement and environment based on events recorded in an ITS. Macro-climate is the overall project environment while micro-climate is person-specific and varies among the participants. Newcomers who are able to get at least one issue reported in the first month to be fixed, doubled their odds of becoming an LTC. The macro-climate with high project popularity and the micro-climate with low attention from peers reduced the odds. The precision of LTC prediction was 38 times higher than for a random predictor. We were able to reproduce the results with new Mozilla data without losing the significance or predictive power of the previously published model. We encountered unexpected changes in some attributes and suggest ways to make analysis of ITS data more reproducible. Conclusions: The findings suggest the importance of initial behaviors and experiences of new participants and outline empirically-based approaches to help the communities with the recruitment of contributors for long-term participation and to help the participants contribute more effectively. To facilitate the reproduction of the study and of the proposed measures in other contexts, we provide the data we retrieved and the scripts we wrote at https://www.passion-lab.org/projects/developerfluency.html.",
              publication: "32_7004098",
              publicationDate: "2015",
              citations: 33,
              researchers: ["37315742600", "37417468700"]
            },
            {
              id: "6880395",
              title:
                "Who Will Stay in the FLOSS Community? Modeling Participant’s Initial Behavior",
              abs:
                "Motivation: To survive and succeed, FLOSS projects need contributors able to accomplish critical project tasks. However, such tasks require extensive project experience of long term contributors (LTCs). Aim: We measure, understand, and predict how the newcomers' involvement and environment in the issue tracking system (ITS) affect their odds of becoming an LTC. Method: ITS data of Mozilla and Gnome, literature, interviews, and online documents were used to design measures of involvement and environment. A logistic regression model was used to explain and predict contributor's odds of becoming an LTC. We also reproduced the results on new data provided by Mozilla. Results: We constructed nine measures of involvement and environment based on events recorded in an ITS. Macro-climate is the overall project environment while micro-climate is person-specific and varies among the participants. Newcomers who are able to get at least one issue reported in the first month to be fixed, doubled their odds of becoming an LTC. The macro-climate with high project popularity and the micro-climate with low attention from peers reduced the odds. The precision of LTC prediction was 38 times higher than for a random predictor. We were able to reproduce the results with new Mozilla data without losing the significance or predictive power of the previously published model. We encountered unexpected changes in some attributes and suggest ways to make analysis of ITS data more reproducible. Conclusions: The findings suggest the importance of initial behaviors and experiences of new participants and outline empirically-based approaches to help the communities with the recruitment of contributors for long-term participation and to help the participants contribute more effectively. To facilitate the reproduction of the study and of the proposed measures in other contexts, we provide the data we retrieved and the scripts we wrote at https://www.passion-lab.org/projects/developerfluency.html.",
              publication: "32_7004098",
              publicationDate: "2015",
              citations: 33,
              researchers: ["37315742600", "37417468700"]
            },
            {
              id: "6880395",
              title:
                "Who Will Stay in the FLOSS Community? Modeling Participant’s Initial Behavior",
              abs:
                "Motivation: To survive and succeed, FLOSS projects need contributors able to accomplish critical project tasks. However, such tasks require extensive project experience of long term contributors (LTCs). Aim: We measure, understand, and predict how the newcomers' involvement and environment in the issue tracking system (ITS) affect their odds of becoming an LTC. Method: ITS data of Mozilla and Gnome, literature, interviews, and online documents were used to design measures of involvement and environment. A logistic regression model was used to explain and predict contributor's odds of becoming an LTC. We also reproduced the results on new data provided by Mozilla. Results: We constructed nine measures of involvement and environment based on events recorded in an ITS. Macro-climate is the overall project environment while micro-climate is person-specific and varies among the participants. Newcomers who are able to get at least one issue reported in the first month to be fixed, doubled their odds of becoming an LTC. The macro-climate with high project popularity and the micro-climate with low attention from peers reduced the odds. The precision of LTC prediction was 38 times higher than for a random predictor. We were able to reproduce the results with new Mozilla data without losing the significance or predictive power of the previously published model. We encountered unexpected changes in some attributes and suggest ways to make analysis of ITS data more reproducible. Conclusions: The findings suggest the importance of initial behaviors and experiences of new participants and outline empirically-based approaches to help the communities with the recruitment of contributors for long-term participation and to help the participants contribute more effectively. To facilitate the reproduction of the study and of the proposed measures in other contexts, we provide the data we retrieved and the scripts we wrote at https://www.passion-lab.org/projects/developerfluency.html.",
              publication: "32_7004098",
              publicationDate: "2015",
              citations: 33,
              researchers: ["37315742600", "37417468700"]
            }
          ];
          // 为了在 JSX 中解析，此处事件名称必须为 camelCase
          // 并且我不想引入一个新的库
          this.$emit("totalChange", 50);
        }, 500);
      }
    },
    getLimitedLengthAbs(abs: string) {
      // 截取前500个字符，相当于前100词左右
      // 据某统计数据表示，平均单词长度为4-5个字母
      const LIMIT = 500;
      return abs.length > LIMIT ? abs.substr(0, LIMIT) + "..." : abs;
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
