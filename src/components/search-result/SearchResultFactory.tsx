import Vue from "vue";

// 展示搜索结果，简单工厂模式
export default Vue.extend({
  name: "SearchResultFactory",
  props: {
    mode: String,
    keyword: String,
    page: Number
  },
  components: {
    SearchResultAffiliations: () =>
      import("@/components/search-result/SearchResultAffiliations.vue"),
    SearchResultDomains: () =>
      import("@/components/search-result/SearchResultDomains.vue"),
    SearchResultNotFound: () =>
      import("@/components/search-result/SearchResultNotFound"),
    SearchResultPapers: () =>
      import("@/components/search-result/SearchResultPapers.vue"),
    SearchResultPublications: () =>
      import("@/components/search-result/SearchResultPublications.vue"),
    SearchResultResearchers: () =>
      import("@/components/search-result/SearchResultResearchers.vue")
  },
  methods: {
    onTotalPagesChange(pages: number) {
      this.$emit("total-change", pages);
    }
  },
  render() {
    switch (this.mode) {
      case "affiliations":
        return (
          <search-result-affiliations
            keyword={this.keyword}
            page={this.page}
            onTotalChange={this.onTotalPagesChange}
          />
        );
      case "domains":
        return (
          <search-result-domains
            keyword={this.keyword}
            page={this.page}
            onTotalChange={this.onTotalPagesChange}
          />
        );
      case "papers":
        return (
          <search-result-papers
            keyword={this.keyword}
            page={this.page}
            onTotalChange={this.onTotalPagesChange}
          />
        );
      case "publications":
        return (
          <search-result-publications
            keyword={this.keyword}
            page={this.page}
            onTotalChange={this.onTotalPagesChange}
          />
        );
      case "researchers":
        return (
          <search-result-researchers
            keyword={this.keyword}
            page={this.page}
            onTotalChange={this.onTotalPagesChange}
          />
        );
      default:
        return <search-result-not-found />;
    }
  }
});
