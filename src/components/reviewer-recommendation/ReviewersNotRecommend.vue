<template>
  <div class="wrapper">
    <el-card>
      <el-form
        :model="paperForm"
        :rules="paperFormRules"
        ref="paperForm"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="paperForm.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="作者" prop="researcherIds">
          <el-select
            v-model="paperForm.researcherIds"
            multiple
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入学者信息"
            :remote-method="getResearchersByKeyword"
            :loading="isResearchersLoading"
            style="width: 100%;"
          >
            <el-tooltip
              v-for="researcher in researchersToSelect"
              :key="researcher.id"
              effect="dark"
              placement="left"
            >
              <template #content>
                <div
                  @click="jumpToResearcher(researcher.id)"
                  style="cursor: pointer"
                >
                  详情
                </div>
              </template>
              <el-option :label="researcher.name" :value="researcher.id" />
            </el-tooltip>
          </el-select>
        </el-form-item>
        <el-form-item label="摘要" prop="abs">
          <el-input
            type="textarea"
            v-model="paperForm.abs"
            placeholder="请输入摘要"
            autosize
          />
        </el-form-item>
        <el-form-item label="出版物" prop="publication">
          <el-select
            v-model="paperForm.publication"
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入出版物信息"
            :remote-method="getPublicationsByKeyword"
            :loading="isPublicationsLoading"
            style="width: 100%;"
          >
            <el-option
              v-for="publication in publicationsToSelect"
              :key="publication.id"
              :label="publication.name"
              :value="publication.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="年份" prop="date">
          <el-date-picker
            type="year"
            placeholder="选择年份"
            v-model="paperForm.date"
            style="width: 100%;"
            value-format="yyyy"
          />
        </el-form-item>
        <el-form-item label="领域" prop="domainIds">
          <el-select
            v-model="paperForm.domainIds"
            multiple
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入领域信息"
            :remote-method="getDomainsByKeyword"
            :loading="isDomainsLoading"
            style="width: 100%;"
          >
            <el-option
              v-for="domain in domainsToSelect"
              :key="domain.id"
              :label="domain.name"
              :value="domain.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="引用文献" prop="referenceIds">
          <el-select
            v-model="paperForm.referenceIds"
            multiple
            filterable
            remote
            reserve-keyword
            clearable
            placeholder="请输入引用文献信息（可选）"
            :remote-method="getReferencesByKeyword"
            :loading="isReferencesLoading"
            style="width: 100%;"
          >
            <el-option
              v-for="reference in referencesToSelect"
              :key="reference.id"
              :label="reference.title"
              :value="reference.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="float: right; margin: 5px"
            @click="upload"
          >
            计算
          </el-button>
          <el-button style="float: right; margin: 5px" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="不推荐审稿人" :visible.sync="showDialog">
      <ol v-if="reviewersNotRecommended.length > 0">
        <li v-for="reviewer of reviewersNotRecommended" :key="reviewer.id">
          <router-link :to="`/researchers/${reviewer.id}`">
            {{ reviewer.name }}
          </router-link>
        </li>
      </ol>
      <p v-else>暂无不推荐学者</p>
      <template #footer>
        <el-button type="primary" @click="showDialog = false">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  Card,
  DatePicker,
  Dialog,
  Form,
  FormItem,
  Input,
  Option,
  Select,
  Tooltip
} from "element-ui";
import { ElForm } from "element-ui/types/form";
import { NewPaper } from "@/interfaces/papers";
import { ResearcherBasic } from "@/interfaces/researchers";
import AffiliationsAPI from "@/api/affiliations";
import DomainsAPI from "@/api/domains";
import PapersAPI from "@/api/papers";
import PublicationsAPI from "@/api/publications";
import ResearcherAPI from "@/api/researchers";

export default Vue.extend({
  name: "ReviewersNotRecommend",
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker,
    [Dialog.name]: Dialog,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      showDialog: false,
      paperForm: {
        title: "",
        abs: "",
        researcherIds: [],
        publication: "",
        date: "",
        domainIds: [],
        referenceIds: []
      } as NewPaper,
      paperFormRules: {
        title: { required: true, message: "请填写论文标题", trigger: "blur" },
        abs: { required: true, message: "请填写论文摘要", trigger: "blur" },
        date: {
          required: true,
          message: "请选择论文发表年份",
          trigger: "change"
        },
        researcherIds: {
          type: "array",
          required: true,
          message: "请至少选择一个学者",
          trigger: "change"
        },
        publication: {
          required: true,
          message: "请选择论文发表的出版物",
          trigger: "change"
        },
        domainIds: {
          required: true,
          message: "请选择论文的领域",
          trigger: "change"
        }
      },
      // 学者
      isResearchersLoading: false,
      researchersToSelect: [] as { id: string; name: string }[],
      // 出版物
      isPublicationsLoading: false,
      publicationsToSelect: [] as { id: string; name: string }[],
      // 领域
      isDomainsLoading: false,
      domainsToSelect: [] as { id: string; name: string }[],
      // 引用文献
      isReferencesLoading: false,
      referencesToSelect: [] as { id: string; title: string }[],
      // 不推荐的审稿人
      reviewersNotRecommended: [] as ResearcherBasic[]
    };
  },
  methods: {
    async getResearchersByKeyword(keyword: string) {
      if (keyword) {
        this.isResearchersLoading = true;
        try {
          const researcherSearchRes = await ResearcherAPI.search(keyword);
          const researcherIds = researcherSearchRes.data.result;
          // 每一页数量必然在 0 - 10（约定）
          const researchersBasicInfoReqs = researcherIds.map(id =>
            ResearcherAPI.getBasicInfoById(id)
          );
          // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
          const reqBatch1 = Promise.all(researchersBasicInfoReqs.slice(0, 4));
          const reqBatch2 = Promise.all(researchersBasicInfoReqs.slice(4, 7));
          const reqBatch3 = Promise.all(researchersBasicInfoReqs.slice(7, 10));
          const res1 = await reqBatch1;
          const res2 = await reqBatch2;
          const res3 = await reqBatch3;
          this.researchersToSelect = [...res1, ...res2, ...res3].map(res => ({
            id: res.data.id,
            name: res.data.name + ", 机构加载中..."
          }));
          // 释放主线程，然后加载机构
          // 保留最后一个机构的 id
          setTimeout(() => {
            this.fetchResearchersAffiliation(
              [...res1, ...res2, ...res3].map(
                res => res.data.affiliation[res.data.affiliation.length - 1]
              )
            );
          }, 0);
        } catch (e) {
          console.log(e.toString());
        } finally {
          this.isResearchersLoading = false;
        }
      }
    },
    async fetchResearchersAffiliation(ids: (string | undefined)[]) {
      try {
        // 严格相等，避免过滤为空串的 id，虽然并不可能出现，但没有必要扩大范围
        const researchersAffiliationBasicInfoReqs = ids.map(id =>
          id !== undefined
            ? AffiliationsAPI.getBasicInfoById(id)
            : AffiliationsAPI.getUnknownAffiliation()
        );
        // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
        const researcherAffiliationReqBatch1 = Promise.all(
          researchersAffiliationBasicInfoReqs.slice(0, 4)
        );
        const researcherAffiliationReqBatch2 = Promise.all(
          researchersAffiliationBasicInfoReqs.slice(4, 7)
        );
        const researcherAffiliationReqBatch3 = Promise.all(
          researchersAffiliationBasicInfoReqs.slice(7, 10)
        );
        const researcherAffiliationRes = [
          ...(await researcherAffiliationReqBatch1),
          ...(await researcherAffiliationReqBatch2),
          ...(await researcherAffiliationReqBatch3)
        ];
        // 去除加载提示，更换为真实的机构名
        this.researchersToSelect = this.researchersToSelect.map((item, i) => ({
          ...item,
          name:
            item.name.split(", ")[0] +
            ", " +
            researcherAffiliationRes[i].data.name
        }));
      } catch (e) {
        console.log(e.toString());
      }
    },
    async getPublicationsByKeyword(keyword: string) {
      if (keyword) {
        this.isPublicationsLoading = true;
        try {
          const publicationSearchRes = await PublicationsAPI.search(keyword);
          const publicationIds = publicationSearchRes.data.result;
          // 每一页数量必然在 0 - 10（约定）
          const publicationsBasicInfoReqs = publicationIds.map(id =>
            PublicationsAPI.getBasicInfoById(id)
          );
          // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
          const reqBatch1 = Promise.all(publicationsBasicInfoReqs.slice(0, 4));
          const reqBatch2 = Promise.all(publicationsBasicInfoReqs.slice(4, 7));
          const reqBatch3 = Promise.all(publicationsBasicInfoReqs.slice(7, 10));
          const res1 = await reqBatch1;
          const res2 = await reqBatch2;
          const res3 = await reqBatch3;
          // 手动去重，暂时的一个 hack
          // 这里很明显会得到错误的结果
          const res = [...res1, ...res2, ...res3];
          const publicationNameNoRepeat = new Set(
            res.map(res => res.data.name)
          );
          const publicationNoRepeat: { id: string; name: string }[] = [];
          for (const r of res) {
            if (publicationNameNoRepeat.has(r.data.name)) {
              publicationNoRepeat.push({
                id: r.data.id,
                name: r.data.name
              });
              publicationNameNoRepeat.delete(r.data.name);
            }
          }
          this.publicationsToSelect = publicationNoRepeat;
        } catch (e) {
          console.log(e.toString());
        } finally {
          this.isPublicationsLoading = false;
        }
      }
    },
    async getDomainsByKeyword(keyword: string) {
      if (keyword) {
        this.isDomainsLoading = true;
        try {
          const domainSearchRes = await DomainsAPI.search(keyword);
          const domainIds = domainSearchRes.data.ids;
          // 每一页数量必然在 0 - 10（约定）
          const domainsBasicInfoReqs = domainIds.map(id =>
            DomainsAPI.getBasicInfoById(id)
          );
          // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
          const reqBatch1 = Promise.all(domainsBasicInfoReqs.slice(0, 4));
          const reqBatch2 = Promise.all(domainsBasicInfoReqs.slice(4, 7));
          const reqBatch3 = Promise.all(domainsBasicInfoReqs.slice(7, 10));
          const res1 = await reqBatch1;
          const res2 = await reqBatch2;
          const res3 = await reqBatch3;
          this.domainsToSelect = [...res1, ...res2, ...res3].map(res => ({
            id: res.data.id,
            name: res.data.name
          }));
        } catch (e) {
          console.log(e.toString());
        } finally {
          this.isDomainsLoading = false;
        }
      }
    },
    async getReferencesByKeyword(keyword: string) {
      if (keyword) {
        this.isReferencesLoading = true;
        try {
          const paperSearchRes = await PapersAPI.search(keyword);
          const paperIds = paperSearchRes.data.ids;
          // 每一页数量必然在 0 - 10（约定）
          const papersBasicInfoReqs = paperIds.map(id =>
            PapersAPI.getBasicInfoById(id)
          );
          // HTTP/1.1 浏览器最大连接数大致为 4 - 6，取最小值
          const reqBatch1 = Promise.all(papersBasicInfoReqs.slice(0, 4));
          const reqBatch2 = Promise.all(papersBasicInfoReqs.slice(4, 7));
          const reqBatch3 = Promise.all(papersBasicInfoReqs.slice(7, 10));
          const res1 = await reqBatch1;
          const res2 = await reqBatch2;
          const res3 = await reqBatch3;
          this.referencesToSelect = [...res1, ...res2, ...res3].map(res => ({
            id: res.data.id,
            title: res.data.title
          }));
        } catch (e) {
          console.log(e.toString());
        } finally {
          this.isReferencesLoading = false;
        }
      }
    },
    upload() {
      const paperForm = this.$refs.paperForm as ElForm;
      paperForm.validate().then(async valid => {
        if (valid) {
          console.log(this.paperForm);
          const reviewers = (
            await PapersAPI.getNotRecommendReviewers(this.paperForm)
          ).data;
          this.showDialog = true;
          const reviewersBasicInfoReqs = reviewers.map(id =>
            ResearcherAPI.getBasicInfoById(id)
          );
          setTimeout(async () => {
            const reviewersRes = await Promise.all(reviewersBasicInfoReqs);
            this.reviewersNotRecommended = reviewersRes.map(res => res.data);
          }, 0);
          this.reset();
        }
      });
    },
    reset() {
      const paperForm = this.$refs.paperForm as ElForm;
      paperForm.resetFields();
    },
    jumpToResearcher(id: string) {
      const url = this.$router.resolve(`/researchers/${id}`);
      const openWindow = window.open(url.href, "_blank");
      (openWindow as Window).opener = null;
    }
  }
});
</script>
