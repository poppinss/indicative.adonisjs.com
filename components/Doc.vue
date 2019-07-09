<template>
  <div class="document">
    <div class="wysiwyg">
      <h1> {{ doc.title }} </h1>
      <div class="lead" v-if="doc.summary" v-html="doc.summary"> </div>
      <dimer-tree :node="doc.content" />
    </div>

    <footer class="doc-footer">
      <p>
        Caught a mistake or want to contribute to the documentation?
        <a :href="doc.gh_link" target="_blank" rel="noopener">Edit this page on GitHub!</a>
      </p>
    </footer>
  </div>
</template>

<script>
  export default {
    props: ['doc'],
    watch: {
      '$route' () {
        this.highlightCodeBlocks()
      }
    },
    mounted () {
      this.highlightCodeBlocks()
    },
    updated () {
      this.highlightCodeBlocks()
    },
    methods: {
      highlightCodeBlocks () {
        this.$nextTick(() => Prism.highlightAll())
      }
    }
  }
</script>

<style>
  .document {
    max-width: 770px;
    width: 100%;
  }

  .wysiwyg {
    padding-top: 2rem;
  }

  .fancy-label {
    border-radius: 4px;
    padding: 4px 18px;
    font-weight: 600;
    font-size: 12px;
    display: inline-block;
    margin-right: 5px;
    font-family: var(--pre-font);
  }

  .fancy-label.string {
    color: #2bd87f;
    background-color: rgba(43,216,127,.1);
  }

  .fancy-label.date {
    color: #7634fe;
    background-color: rgba(118,52,254,.1);
  }

  .fancy-label.boolean {
    color: #ffa33c;
    background-color: rgba(255,163,60,.1);
  }

  .fancy-label.array, .fancy-label.integer {
    color: #fc395e;
    background-color: rgba(252,57,94,.1);
  }

  .wysiwyg .lead p {
    color: #888;
    font-size: 2rem;
    padding: 0;
    margin-bottom: 1rem;
  }

  .wysiwyg {
    line-height: 1.7;
  }

  .wysiwyg h1, .wysiwyg h2, .wysiwyg h3, .wysiwyg h4 {
    color: var(--headings-color);
    font-family: var(--headings-color);
    font-weight: 500;
  }

  .wysiwyg h1 a, .wysiwyg h2 a, .wysiwyg h3 a, .wysiwyg h4 a {
    position: relative;
  }

  .wysiwyg h1 {
    margin-bottom: 3rem;
    padding-top: 1rem;
    padding-bottom: 1.3rem;
    font-size: 3.4rem;
    border-bottom: 1px solid rgba(0, 0, 0, .12);
    font-weight: 700;
  }

  .wysiwyg h2 {
    padding-top: 4.5rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
    font-size: 2.3rem;
  }

  .wysiwyg h3 {
    font-size: 1.8rem;
    line-height: 2.4rem;
    padding-top: 2rem;
    font-weight: 600;
    margin-top: 3rem;
    margin-bottom: .8rem;
  }

  .wysiwyg h4 {
    font-size: 1.7rem;
    line-height: 2rem;
    padding-top: 2rem;
    font-weight: 600;
    margin-top: 3rem;
    margin-bottom: .8rem;
  }

  .wysiwyg p, .wysiwyg .alert, .wysiwyg .embed, .wysiwyg img, .wysiwyg .dimer-highlight {
    margin-bottom: 2.8rem;
  }

  .wysiwyg .dimer-highlight {
    background: var(--pre-background);
    margin-bottom: 3.2rem;
    border-radius: 6px;
  }

  .wysiwyg code {
    font-family: var(--pre-font);
  }

  .wysiwyg p > code, .wysiwyg li > code, .wysiwyg td > code {
    white-space: nowrap;
    background: #f7f7f7;
    padding: 0 3px;
    color: var(--headings-color);
    font-size: 1.5rem;
  }

  .wysiwyg a {
    color: var(--links-color);
  }

  .wysiwyg ul, .wysiwyg ol {
    list-style: none;
    margin: 4rem 0;
  }

  .wysiwyg table {
    margin: 1.2rem 0 4rem 0;
  }

  .wysiwyg li {
    padding-left: 2.2rem;
    position: relative;
    line-height: 1.4;
    margin-bottom: 1.6rem;
  }

  .wysiwyg li p {
    margin-bottom: 1rem;
  }

  .wysiwyg ul li:before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: "\2022";
    font-size: 2.2rem;
    line-height: 1;
  }

  .wysiwyg ol {
    counter-reset: numbered-counter;
  }

  .wysiwyg ol li:before {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    content: counter(numbered-counter, decimal) ".";
    counter-increment: numbered-counter;
  }

  .wysiwyg img {
    max-width: 100%;
  }

  .wysiwyg .alert {
    position: relative;
    border-radius: 6px;
    background: var(--alerts-bg);
    padding: 19px 15px 19px 55px;
  }

  .wysiwyg .alert *:last-child {
    margin-bottom: 0;
  }

  .wysiwyg .alert *:first-child {
    margin-top: 0;
  }

  .wysiwyg .alert:before {
    border-radius: 6px 0 0 6px;
    content: "";
    width: 30px;
    left: 0;
    position: absolute;
    top: 0;
    bottom: 0;
  }

  .wysiwyg .alert-note:before {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTggMTZBOCA4IDAgMSAwIDggMGE4IDggMCAwIDAgMCAxNnptLS42NzUtNC4wMDh2LTQuNjVhLjY3NS42NzUgMCAxIDEgMS4zNSAwdjQuNjVhLjY3NS42NzUgMCAwIDEtMS4zNSAwem0uNjczLTguOTZjLjU1MiAwIC44ODIuMzI3Ljg4Mi44NzUgMCAuNTYtLjMzLjg4Ni0uODgyLjg4Ni0uNTQ4IDAtLjg3Ny0uMzI3LS44NzctLjg4NiAwLS41NDguMzI5LS44NzQuODc3LS44NzR6Ii8+PC9zdmc+) no-repeat 50% var(--note-color);
  }

  .wysiwyg .alert-tip:before {
    background: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNSIgdmlld0JveD0iMCAwIDE0IDE1Ij4gIDxwYXRoIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTIuNDM5IDBhLjUyNS41MjUgMCAwIDAtLjM4OC4xNjYuNTg3LjU4NyAwIDAgMCAwIC44LjUyLjUyIDAgMCAwIC43NjEgMCAuNTg3LjU4NyAwIDAgMCAwLS44QS41MjYuNTI2IDAgMCAwIDIuNDQgMHptOS4xMzggMGEuNTI1LjUyNSAwIDAgMC0uMzkuMTY2LjU4Ny41ODcgMCAwIDAgMCAuOC41Mi41MiAwIDAgMCAuNzYyIDAgLjU4Ny41ODcgMCAwIDAgMC0uOC41MjYuNTI2IDAgMCAwLS4zNzItLjE2NnpNNyAuMjc0Yy0yLjY3NyAwLTQuODQ2IDIuMjgyLTQuODQ2IDUuMDk4IDAgMi44MzIgMi4xNTQgMy45NjQgMy4yMyA2LjIzaDMuMjMxYzEuMDc3LTIuMjY2IDMuMjMxLTMuMzk4IDMuMjMxLTYuMjNDMTEuODQ2IDIuNTU2IDkuNjc2LjI3NCA3IC4yNzR6TS41MzggNC44MDVBLjU1My41NTMgMCAwIDAgMCA1LjM3MmMwIC4zMTMuMjQxLjU2Ni41MzguNTY2YS41NTMuNTUzIDAgMCAwIC41MzktLjU2Ni41NTMuNTUzIDAgMCAwLS41MzktLjU2N3ptMTIuOTI0IDBhLjU1My41NTMgMCAwIDAtLjUzOS41NjdjMCAuMzEzLjI0MS41NjYuNTM5LjU2NkEuNTUzLjU1MyAwIDAgMCAxNCA1LjM3MmEuNTUzLjU1MyAwIDAgMC0uNTM4LS41Njd6TTIuNDM5IDkuNjExYS41MjUuNTI1IDAgMCAwLS4zOS4xNjYuNTg3LjU4NyAwIDAgMCAwIC44LjUyNS41MjUgMCAwIDAgLjM4Mi4xNjdjLjE0MyAwIC4yOC0uMDYuMzgxLS4xNjdhLjU4Ny41ODcgMCAwIDAgMC0uOC41MjYuNTI2IDAgMCAwLS4zNzMtLjE2NnptOS4xMzcgMGEuNTI1LjUyNSAwIDAgMC0uMzg4LjE2Ni41ODIuNTgyIDAgMCAwLS4xNTguNGMwIC4xNTEuMDU3LjI5NS4xNTguNDAyYS41Mi41MiAwIDAgMCAuNzYxIDAgLjU4Mi41ODIgMCAwIDAgLjE1OC0uNDAxLjU4Mi41ODIgMCAwIDAtLjE1OC0uNDAxLjUyNi41MjYgMCAwIDAtLjM3My0uMTY1em0tNi4xOTEgMy4xMjR2LjU2NmMwIC42MjYuNDgyIDEuMTMzIDEuMDc3IDEuMTMzIDAgLjMxMi4yNC41NjYuNTM4LjU2NmEuNTUzLjU1MyAwIDAgMCAuNTM4LS41NjZjLjU5NSAwIDEuMDc3LS41MDcgMS4wNzctMS4xMzN2LS41NjZoLTMuMjN6Ii8+PC9zdmc+) no-repeat 50% var(--tip-color);
  }

  .wysiwyg table {
    border-spacing: 0;
    border-collapse: collapse;
    position: relative;
    -webkit-box-shadow: 0 1px 0 rgba(0,0,0, .06) inset;
    box-shadow: inset 0 1px 0 rgba(0,0,0, .06);
    width: 100%;
  }

  .wysiwyg table th {
    hyphens: none;
    white-space: nowrap;
    background-color: var(--grey-100);
  }

  .wysiwyg table th, .wysiwyg table td {
    padding: 0.8rem 1.8rem;
    text-align: left;
  }

  .wysiwyg table tr:nth-of-type(2n) {
    background-color: var(--grey-100);
  }

  .doc-footer {
    padding: 3rem 0 4rem 0;
    margin-top: 70px;
    border-top: 1px solid var(--grey-100);
    font-size: 1.3rem;
  }

  .doc-footer a {
    color: var(--links-color);
  }

  @media (min-width: 1024px) {
    .wysiwyg {
      padding: 6rem 10rem 0 0;
    }

    .wysiwyg h2 .icon-link:before {
      content: '#';
      color: #bbb;
      left: -30px;
      top: -3px;
      text-decoration: none;
      position: absolute;
    }
  }
</style>
