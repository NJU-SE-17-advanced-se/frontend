<template>
  <div class="wrapper">
    <el-header>
      <el-button type="primary" style="float: left" @click="$router.go(-1)">
        <i class="el-icon-back" /> 返回
      </el-button>
      <h1 style="text-align: center">{{ pageTitle }}</h1>
    </el-header>
    <el-main>
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="论文详情" name="detail" lazy>
          <el-card class="result-card" v-loading="isLoading">
            <template #header>
              <h2>{{ paperInfo.title }}</h2>
            </template>
            <p>
              <strong>Publication:</strong>
              {{ paperInfo.publication.name }}, {{ paperInfo.publicationDate }}
            </p>
            <!--学者-->
            <p>
              <strong>Authors:</strong>
              <span v-if="paperInfo.researchers.length === 0"> 暂无数据</span>
            </p>
            <ul>
              <li
                v-for="(researcher, i) of paperInfo.researchers"
                :key="researcher.id + 'r' + i"
              >
                <router-link :to="`/researchers/${researcher.id}`">
                  {{ researcher.name }}
                </router-link>
              </li>
            </ul>
            <!--领域-->
            <p>
              <strong>Domains:</strong>
              <span v-if="paperInfo.domains.length === 0"> 暂无数据</span>
            </p>
            <ul>
              <li
                v-for="(domain, i) of paperInfo.domains"
                :key="domain.id + 'd' + i"
              >
                <router-link :to="`/domains/${domain.id}`">
                  {{ domain.name }}
                </router-link>
              </li>
            </ul>
            <p><strong>Abstract:</strong> {{ paperInfo.abs }}</p>
            <p>
              <strong>Link:</strong>
              <a
                :href="`https://${paperInfo.link}`"
                target="_blank"
                rel="noopener noreferer"
              >
                {{ paperInfo.link }}
              </a>
            </p>
            <p><strong>Citation:</strong> {{ paperInfo.citations }}</p>
            <p><strong>OASIS-impact:</strong> {{ paperImpact }}</p>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="引用文献" name="citations" lazy>
          <paper-references
            :id="paperInfo.id"
            :references="paperInfo.references"
            @refresh="switchTab"
          />
        </el-tab-pane>
        <el-tab-pane label="相关论文" name="related-papers" lazy>
          <paper-related-papers :id="paperInfo.id" @refresh="switchTab" />
        </el-tab-pane>
        <el-tab-pane label="相关学者" name="related-researchers" lazy>
          <paper-related-researchers :id="paperInfo.id" />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Card, Header, Main, TabPane, Tabs } from "element-ui";
import { PaperDisplay } from "@/interfaces/papers";
import DomainsAPI from "@/api/domains";
import PapersAPI from "@/api/papers";
import PublicationsAPI from "@/api/publications";
import ResearcherAPI from "@/api/researchers";

export default Vue.extend({
  name: "Paper",
  props: {
    id: String
  },
  components: {
    [Card.name]: Card,
    [Header.name]: Header,
    [Main.name]: Main,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    PaperReferences: () => import("@/components/PaperReferences.vue"),
    PaperRelatedPapers: () => import("@/components/PaperRelatedPapers.vue"),
    PaperRelatedResearchers: () =>
      import("@/components/PaperRelatedResearchers.vue")
  },
  data() {
    return {
      activeTabName: "detail",
      isLoading: false,
      paperInfo: {
        id: "",
        title: "未知论文",
        abs: "暂无摘要",
        publication: { id: "", name: "未知出版物", publicationDate: "" },
        publicationDate: "未知日期",
        link: "未知链接",
        citations: 0,
        researchers: [],
        domains: [],
        references: []
      } as PaperDisplay,
      paperImpact: "分析中..."
    };
  },
  computed: {
    pageTitle(): string {
      switch (this.activeTabName) {
        case "detail":
          return "论文详情";
        case "citations":
          return "引用文献";
        case "related-papers":
          return "相关论文";
        case "related-researchers":
          return "相关学者";
        default:
          return "未知";
      }
    }
  },
  // 处理路由变化时的行为
  watch: {
    id(newId: string) {
      this.fetchPaper(newId);
    }
  },
  mounted() {
    this.fetchPaper(this.id);
  },
  methods: {
    async fetchPaper(id: string) {
      this.isLoading = true;
      try {
        const paperInfo = (await PapersAPI.getInfoById(id)).data;
        this.paperInfo.id = paperInfo.id;
        this.paperInfo.title = paperInfo.title;
        this.paperInfo.abs = paperInfo.abs;
        this.paperInfo.publicationDate = paperInfo.publicationDate;
        this.paperInfo.link = paperInfo.link;
        this.paperInfo.references = paperInfo.references;
        // 这里可能会存在严重的性能问题，但是鉴于目前的数据量不是很大，应该不会造成非常严重的后果
        // 出版物
        const publicationsBasicInfoReq = PublicationsAPI.getBasicInfoById(
          paperInfo.publication
        );
        setTimeout(async () => {
          const researchersRes = await publicationsBasicInfoReq;
          // 一个暂时的 hack，按理来说不会出现这种情况，即超出预定范围的论文
          this.paperInfo.publication = researchersRes.data;
        }, 0);
        // 学者
        const researchersBasicInfoReqs = paperInfo.researchers.map(id =>
          ResearcherAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const researchersRes = await Promise.all(researchersBasicInfoReqs);
          this.paperInfo.researchers = researchersRes.map(res => res.data);
        }, 0);
        // 领域
        const domainsBasicInfoReqs = paperInfo.domains.map(id =>
          DomainsAPI.getBasicInfoById(id)
        );
        setTimeout(async () => {
          const domainsRes = await Promise.all(domainsBasicInfoReqs);
          this.paperInfo.domains = domainsRes.map(res => res.data);
        }, 0);
        // 影响力
        setTimeout(async () => {
          const impactRes = await PapersAPI.getImpact(paperInfo.id);
          this.paperImpact = impactRes.data.toString();
        }, 0);
      } catch (e) {
        console.log(e.toString());
      } finally {
        this.isLoading = false;
      }
    },
    switchTab(name = "detail") {
      this.activeTabName = name;
    }
  }
});
</script>

<style scoped lang="less">
.wrapper {
  min-height: 60vh;

  .result-card {
    min-height: 60vh;
    margin-bottom: 20px;

    .result-button {
      float: right;
      margin-bottom: 20px;
    }
  }
}
</style>
