function htmlToVue(html) {
  return `
  <template>
    <section class="limy-doc-markdown">
    ${html}
    </section>
  </template>
  `;
}

module.exports = htmlToVue;
