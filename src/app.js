/* global algoliasearch instantsearch */

const searchClient = algoliasearch(
  process.env.APPLICATION_ID,
  process.env.SEARCH_APIKEY
);

const search = instantsearch({
  indexName: 'sfccamplienceproduct.dynamic-banners',
  searchClient,
  routing: {
    stateMapping: instantsearch.stateMappings.singleIndex(
      'sfccamplienceproduct.dynamic-banners'
    ),
  },
});

// change mediaHost to your VSE for use with staging /preview environments
const mediaHost = 'https://i8.amplience.net';

search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 1,
    // facetFilters: ['category:Women/Clothing'],
  }),
  instantsearch.widgets.hits({
    container: '#hits',
    templates: {
      item: `
        <img src="${mediaHost}/i/{{image.image.endpoint}}/{{image.image.name}}?w=1200" alt="{{image.image.altText}}"></a>
        <p>Header: {{ header }}</p>
        <p>Subheader: {{ subheader }}</p>
        <p>Categories: {{ category }}</p>
        <p>Boost ranking: {{ ranking }}</p>
      `,
    },
  }),
  instantsearch.widgets.menuSelect({
    container: '#menu-select',
    attribute: 'category',
    templates: {
      item: '{{label}}',
      defaultOption: 'Choose category',
    },
  }),
]);

search.start();
