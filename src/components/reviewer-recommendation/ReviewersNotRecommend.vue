<template>
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
          <el-option
            v-for="researcher in researchersToSelect"
            :key="researcher.id"
            :label="researcher.name"
            :value="researcher.id"
          />
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
      <el-form-item label="年份" prop="date">
        <el-date-picker
          type="year"
          placeholder="选择年份"
          v-model="paperForm.date"
          style="width: 100%;"
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
          placeholder="请输入领域信息（可选）"
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
          立即创建
        </el-button>
        <el-button style="float: right; margin: 5px" @click="reset">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from "vue";
import {
  Card,
  DatePicker,
  Form,
  FormItem,
  Input,
  Option,
  Select
} from "element-ui";
import { ElForm } from "element-ui/types/form";

export default Vue.extend({
  name: "ReviewersNotRecommend",
  components: {
    [Card.name]: Card,
    [DatePicker.name]: DatePicker,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      paperForm: {
        title: "",
        abs: "",
        researcherIds: [],
        publication: "",
        date: "",
        domainIds: [],
        referenceIds: []
      },
      paperFormRules: {
        title: { required: true, message: "请填写论文标题", trigger: "blur" },
        abs: { required: true, message: "请填写论文摘要", trigger: "blur" },
        date: {
          type: "date",
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
        }
      },
      // 学者
      isResearchersLoading: false,
      researchersToSelect: [] as { id: string; name: string }[],
      // 领域
      isDomainsLoading: false,
      domainsToSelect: [] as { id: string; name: string }[],
      // 引用文献
      isReferencesLoading: false,
      referencesToSelect: [] as { id: string; title: string }[]
    };
  },
  methods: {
    getResearchersByKeyword(keyword: string) {
      if (keyword) {
        this.isResearchersLoading = true;
        setTimeout(() => {
          // TODO: 如果出现同名学者，如何处理？增加信息？
          this.researchersToSelect = [
            { id: "1", name: "Wen Sun 1" },
            { id: "2", name: "Wen Sun 2" },
            { id: "3", name: "Wen Sun 3" },
            { id: "4", name: "Wen Sun 4" },
            { id: "5", name: "Wen Sun 5" }
          ];
          this.isResearchersLoading = false;
        }, 500);
      }
    },
    getDomainsByKeyword(keyword: string) {
      if (keyword) {
        this.isDomainsLoading = true;
        setTimeout(() => {
          this.domainsToSelect = [
            { id: "1", name: "Domain 1" },
            { id: "2", name: "Domain 2" },
            { id: "3", name: "Domain 3" },
            { id: "4", name: "Domain 4" },
            { id: "5", name: "Domain 5" }
          ];
          this.isDomainsLoading = false;
        }, 500);
      }
    },
    getReferencesByKeyword(keyword: string) {
      if (keyword) {
        this.isReferencesLoading = true;
        setTimeout(() => {
          this.referencesToSelect = [
            { id: "1", title: "Paper 1" },
            { id: "2", title: "Paper 2" },
            { id: "3", title: "Paper 3" },
            { id: "4", title: "Paper 4" },
            { id: "5", title: "Paper 5" }
          ];
          this.isReferencesLoading = false;
        }, 500);
      }
    },
    upload() {
      const paperForm = this.$refs.paperForm as ElForm;
      paperForm.validate().then(valid => {
        if (valid) {
          console.log(this.paperForm);
          // 上传
          this.reset();
        }
      });
    },
    reset() {
      const paperForm = this.$refs.paperForm as ElForm;
      paperForm.resetFields();
    }
  }
});
</script>
