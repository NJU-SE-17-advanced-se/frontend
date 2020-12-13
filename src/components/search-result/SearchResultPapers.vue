<template>
  <div class="wrapper">
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
import { Card } from "element-ui";
import { PaperBasic } from "@/interfaces/papers";

export default Vue.extend({
  name: "SearchResultPapers",
  props: {
    keyword: String,
    page: Number
  },
  components: {
    [Card.name]: Card
  },
  data() {
    return {
      papersBasicInfo: [] as PaperBasic[]
    };
  },
  watch: {
    keyword() {
      this.fetchSearchResult(this.keyword, this.page);
    },
    page() {
      this.fetchSearchResult(this.keyword, this.page);
    }
  },
  mounted() {
    this.fetchSearchResult(this.keyword, this.page);
  },
  methods: {
    // 获取搜索结果
    fetchSearchResult(keyword: string, page = 1) {
      console.log("fetching", "papers", keyword, page);
      setTimeout(() => {
        this.papersBasicInfo = [
          {
            id: "04a2b35024fdbe8439bdb115ea8c24e7",
            title:
              "An Empirical Study Towards Characterizing Deep Learning Development and Deployment Across Different Frameworks and Platforms",
            abs:
              "Deep Learning (DL) has recently achieved tremendous success. A variety of DL frameworks and platforms play a key role to catalyze such progress. However, the differences in architecture designs and implementations of existing frameworks and platforms bring new challenges for DL software development and deployment. Till now, there is no study on how various mainstream frameworks and platforms influence both DL software development and deployment in practice. To fill this gap, we take the first step towards understanding how the most widely-used DL frameworks and platforms support the DL software development and deployment. We conduct a systematic study on these frameworks and platforms by using two types of DNN architectures and three popular datasets. (1) For development process, we investigate the prediction accuracy under the same runtime training configuration or same model weights/biases. We also study the adversarial robustness of trained models by leveraging the existing adversarial attack techniques. The experimental results show that the computing differences across frameworks could result in an obvious prediction accuracy decline, which should draw the attention of DL developers. (2) For deployment process, we investigate the prediction accuracy and performance (refers to time cost and memory consumption) when the trained models are migrated/quantized from PC to real mobile devices and web browsers. The DL platform study unveils that the migration and quantization still suffer from compatibility and reliability issues. Meanwhile, we find several DL software bugs by using the results as a benchmark. We further validate the results through bug confirmation from stakeholders and industrial positive feedback to highlight the implications of our study. Through our study, we summarize practical guidelines, identify challenges and pinpoint new research directions, such as understanding the characteristics of DL frameworks and platforms, avoiding compatibility and reliability issues, detecting DL software bugs, and reducing time cost and memory consumption towards developing and deploying high quality DL systems effectively.",
            publication: "64db86c6db6cec0c858dcfaf66dfa8d6",
            publicationDate: "2019",
            citations: 2,
            researchers: [
              "IEEE_37085795499",
              "IEEE_37086105481",
              "IEEE_37086128415",
              "IEEE_37086803095",
              "IEEE_37086842777",
              "IEEE_37086956653",
              "IEEE_37086958122",
              "IEEE_37087233505",
              "IEEE_37087235413"
            ]
          },
          {
            id: "04a2b35024fdbe8439bdb115ea8c24e7",
            title:
              "An Empirical Study Towards Characterizing Deep Learning Development and Deployment Across Different Frameworks and Platforms",
            abs:
              "Deep Learning (DL) has recently achieved tremendous success. A variety of DL frameworks and platforms play a key role to catalyze such progress. However, the differences in architecture designs and implementations of existing frameworks and platforms bring new challenges for DL software development and deployment. Till now, there is no study on how various mainstream frameworks and platforms influence both DL software development and deployment in practice. To fill this gap, we take the first step towards understanding how the most widely-used DL frameworks and platforms support the DL software development and deployment. We conduct a systematic study on these frameworks and platforms by using two types of DNN architectures and three popular datasets. (1) For development process, we investigate the prediction accuracy under the same runtime training configuration or same model weights/biases. We also study the adversarial robustness of trained models by leveraging the existing adversarial attack techniques. The experimental results show that the computing differences across frameworks could result in an obvious prediction accuracy decline, which should draw the attention of DL developers. (2) For deployment process, we investigate the prediction accuracy and performance (refers to time cost and memory consumption) when the trained models are migrated/quantized from PC to real mobile devices and web browsers. The DL platform study unveils that the migration and quantization still suffer from compatibility and reliability issues. Meanwhile, we find several DL software bugs by using the results as a benchmark. We further validate the results through bug confirmation from stakeholders and industrial positive feedback to highlight the implications of our study. Through our study, we summarize practical guidelines, identify challenges and pinpoint new research directions, such as understanding the characteristics of DL frameworks and platforms, avoiding compatibility and reliability issues, detecting DL software bugs, and reducing time cost and memory consumption towards developing and deploying high quality DL systems effectively.",
            publication: "64db86c6db6cec0c858dcfaf66dfa8d6",
            publicationDate: "2019",
            citations: 2,
            researchers: [
              "IEEE_37085795499",
              "IEEE_37086105481",
              "IEEE_37086128415",
              "IEEE_37086803095",
              "IEEE_37086842777",
              "IEEE_37086956653",
              "IEEE_37086958122",
              "IEEE_37087233505",
              "IEEE_37087235413"
            ]
          },
          {
            id: "04a2b35024fdbe8439bdb115ea8c24e7",
            title:
              "An Empirical Study Towards Characterizing Deep Learning Development and Deployment Across Different Frameworks and Platforms",
            abs:
              "Deep Learning (DL) has recently achieved tremendous success. A variety of DL frameworks and platforms play a key role to catalyze such progress. However, the differences in architecture designs and implementations of existing frameworks and platforms bring new challenges for DL software development and deployment. Till now, there is no study on how various mainstream frameworks and platforms influence both DL software development and deployment in practice. To fill this gap, we take the first step towards understanding how the most widely-used DL frameworks and platforms support the DL software development and deployment. We conduct a systematic study on these frameworks and platforms by using two types of DNN architectures and three popular datasets. (1) For development process, we investigate the prediction accuracy under the same runtime training configuration or same model weights/biases. We also study the adversarial robustness of trained models by leveraging the existing adversarial attack techniques. The experimental results show that the computing differences across frameworks could result in an obvious prediction accuracy decline, which should draw the attention of DL developers. (2) For deployment process, we investigate the prediction accuracy and performance (refers to time cost and memory consumption) when the trained models are migrated/quantized from PC to real mobile devices and web browsers. The DL platform study unveils that the migration and quantization still suffer from compatibility and reliability issues. Meanwhile, we find several DL software bugs by using the results as a benchmark. We further validate the results through bug confirmation from stakeholders and industrial positive feedback to highlight the implications of our study. Through our study, we summarize practical guidelines, identify challenges and pinpoint new research directions, such as understanding the characteristics of DL frameworks and platforms, avoiding compatibility and reliability issues, detecting DL software bugs, and reducing time cost and memory consumption towards developing and deploying high quality DL systems effectively.",
            publication: "64db86c6db6cec0c858dcfaf66dfa8d6",
            publicationDate: "2019",
            citations: 2,
            researchers: [
              "IEEE_37085795499",
              "IEEE_37086105481",
              "IEEE_37086128415",
              "IEEE_37086803095",
              "IEEE_37086842777",
              "IEEE_37086956653",
              "IEEE_37086958122",
              "IEEE_37087233505",
              "IEEE_37087235413"
            ]
          },
          {
            id: "04a2b35024fdbe8439bdb115ea8c24e7",
            title:
              "An Empirical Study Towards Characterizing Deep Learning Development and Deployment Across Different Frameworks and Platforms",
            abs:
              "Deep Learning (DL) has recently achieved tremendous success. A variety of DL frameworks and platforms play a key role to catalyze such progress. However, the differences in architecture designs and implementations of existing frameworks and platforms bring new challenges for DL software development and deployment. Till now, there is no study on how various mainstream frameworks and platforms influence both DL software development and deployment in practice. To fill this gap, we take the first step towards understanding how the most widely-used DL frameworks and platforms support the DL software development and deployment. We conduct a systematic study on these frameworks and platforms by using two types of DNN architectures and three popular datasets. (1) For development process, we investigate the prediction accuracy under the same runtime training configuration or same model weights/biases. We also study the adversarial robustness of trained models by leveraging the existing adversarial attack techniques. The experimental results show that the computing differences across frameworks could result in an obvious prediction accuracy decline, which should draw the attention of DL developers. (2) For deployment process, we investigate the prediction accuracy and performance (refers to time cost and memory consumption) when the trained models are migrated/quantized from PC to real mobile devices and web browsers. The DL platform study unveils that the migration and quantization still suffer from compatibility and reliability issues. Meanwhile, we find several DL software bugs by using the results as a benchmark. We further validate the results through bug confirmation from stakeholders and industrial positive feedback to highlight the implications of our study. Through our study, we summarize practical guidelines, identify challenges and pinpoint new research directions, such as understanding the characteristics of DL frameworks and platforms, avoiding compatibility and reliability issues, detecting DL software bugs, and reducing time cost and memory consumption towards developing and deploying high quality DL systems effectively.",
            publication: "64db86c6db6cec0c858dcfaf66dfa8d6",
            publicationDate: "2019",
            citations: 2,
            researchers: [
              "IEEE_37085795499",
              "IEEE_37086105481",
              "IEEE_37086128415",
              "IEEE_37086803095",
              "IEEE_37086842777",
              "IEEE_37086956653",
              "IEEE_37086958122",
              "IEEE_37087233505",
              "IEEE_37087235413"
            ]
          },
          {
            id: "04a2b35024fdbe8439bdb115ea8c24e7",
            title:
              "An Empirical Study Towards Characterizing Deep Learning Development and Deployment Across Different Frameworks and Platforms",
            abs:
              "Deep Learning (DL) has recently achieved tremendous success. A variety of DL frameworks and platforms play a key role to catalyze such progress. However, the differences in architecture designs and implementations of existing frameworks and platforms bring new challenges for DL software development and deployment. Till now, there is no study on how various mainstream frameworks and platforms influence both DL software development and deployment in practice. To fill this gap, we take the first step towards understanding how the most widely-used DL frameworks and platforms support the DL software development and deployment. We conduct a systematic study on these frameworks and platforms by using two types of DNN architectures and three popular datasets. (1) For development process, we investigate the prediction accuracy under the same runtime training configuration or same model weights/biases. We also study the adversarial robustness of trained models by leveraging the existing adversarial attack techniques. The experimental results show that the computing differences across frameworks could result in an obvious prediction accuracy decline, which should draw the attention of DL developers. (2) For deployment process, we investigate the prediction accuracy and performance (refers to time cost and memory consumption) when the trained models are migrated/quantized from PC to real mobile devices and web browsers. The DL platform study unveils that the migration and quantization still suffer from compatibility and reliability issues. Meanwhile, we find several DL software bugs by using the results as a benchmark. We further validate the results through bug confirmation from stakeholders and industrial positive feedback to highlight the implications of our study. Through our study, we summarize practical guidelines, identify challenges and pinpoint new research directions, such as understanding the characteristics of DL frameworks and platforms, avoiding compatibility and reliability issues, detecting DL software bugs, and reducing time cost and memory consumption towards developing and deploying high quality DL systems effectively.",
            publication: "64db86c6db6cec0c858dcfaf66dfa8d6",
            publicationDate: "2019",
            citations: 2,
            researchers: [
              "IEEE_37085795499",
              "IEEE_37086105481",
              "IEEE_37086128415",
              "IEEE_37086803095",
              "IEEE_37086842777",
              "IEEE_37086956653",
              "IEEE_37086958122",
              "IEEE_37087233505",
              "IEEE_37087235413"
            ]
          }
        ];
        // 为了在 JSX 中解析，此处事件名称必须为 camelCase
        // 并且我不想引入一个新的库
        this.$emit("totalChange", 50);
      }, 500);
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
  min-height: 450px;

  .result-card {
    margin-bottom: 40px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
